// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.sps.Attraction;
import com.google.sps.Edge;
import com.google.sps.TspOptimizer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;

/** Servlet that returns the optimized route between list of attractions */
@WebServlet("/optimize")
public class OptimizeServlet extends HttpServlet {
  private static final GeoApiContext context =
          new GeoApiContext.Builder().apiKey("AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg").build();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String body = IOUtils.toString(request.getReader());
    Gson g = new Gson();
    JSON json = g.fromJson(body, JSON.class);
    ArrayList<Attraction> attractions = json.attractions;

    // call Distance Matrix API
    String[] attractionNames = attractions.stream().map(Attraction::getName).toArray(String[]::new);
    DistanceMatrix matrix = createDistanceMatrix(attractionNames);

    // construct graph
    HashMap<Attraction, ArrayList<Edge>> graph = new HashMap<>();
    for (int i = 0; i < attractions.size(); i++) {
      Attraction v = attractions.get(i);
      ArrayList<Edge> edges = new ArrayList<>();
      for (int j = 0; j < attractions.size(); j++) {
        if (i != j) {
          long distance = matrix.rows[i].elements[j].distance.inMeters;
          Attraction u = attractions.get(j);
          Edge e = new Edge(v, u, distance);
          edges.add(e);
        }
      }
      graph.put(v, edges);
    }

    // call TSP approximation algorithm
    ArrayList<Attraction> optimizedOrder = TspOptimizer.optimize(graph);

    String optimizedOrderJSON = g.toJson(optimizedOrder);
    response.setContentType("json;");
    response.getWriter().println(optimizedOrderJSON);
  }

  private DistanceMatrix createDistanceMatrix(String[] attractions) {
    try {
      DistanceMatrixApiRequest req = DistanceMatrixApi.newRequest(context);
      return req.origins(attractions).destinations(attractions).await();
    } catch (Exception e) {
      return null;
    }
  }

  private class JSON {
    private ArrayList<Attraction> attractions;

    private JSON(ArrayList<Attraction> attractions) {
      this.attractions = attractions;
    }
  }
}
