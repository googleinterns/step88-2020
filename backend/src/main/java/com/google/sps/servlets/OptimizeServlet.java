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

import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns the optimized route between list of attractions */
@WebServlet("/optimize")
public class OptimizeServlet extends HttpServlet {
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException { 
    try {
      // call Distance Matrix API
      GeoApiContext context = new GeoApiContext.Builder()
        .apiKey("AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg")
        .build();
      String[] origins = new String[] {"Vancouver BC", "Seattle"};
      String[] destinations = new String[] {"San Francisco", "Victoria BC"};
      DistanceMatrixApiRequest req = DistanceMatrixApi.newRequest(context); 
      DistanceMatrix result = req.origins(origins)
        .destinations(destinations)
        .await();

      for(int i = 0; i < origins.length; i++){
        for(int j = 0; j < destinations.length; j++){
          int distance = result.rows[i].elements[j].distance.inMeters;
        }
      } 
    } catch (Exception e) {
      System.out.println(e);
    }

    response.setContentType("text/html;");
    response.getWriter().println("Hello Packaged BEANS!");
  }
}
