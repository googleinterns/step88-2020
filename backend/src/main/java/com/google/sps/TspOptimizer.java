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

package com.google.sps;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.PriorityQueue;

public final class TspOptimizer {
  /**
   * Call optimize(source) after determining a source Attraction from which to run MST algorithm.
   * @return list of attractions in optimal visiting order
   */
  public static ArrayList<Attraction> optimize(HashMap<Attraction, ArrayList<Edge>> graph) {
    ArrayList<Attraction> optimizedOrder = new ArrayList<>();
    for (Attraction a : graph.keySet()) {
      optimizedOrder.add(a);
    }
    return optimizedOrder;
  }

  /**
   * Run TSP approximation algorithm.
   * @param source the source Attraction from which to run MST algorithm
   * @return list of attractions in optimal visiting order
   */
  public static ArrayList<Attraction> optimize(
      Attraction source, HashMap<Attraction, ArrayList<Edge>> graph) {
    return null;
  }

  /**
   * Runs Prim's algorithm to return the minimum spanning tree of the given graph.
   * @param source the vertex to start at when running Prim's
   * @param graph the graph of which to find the mst
   * @return the mst of graph
   */
  static HashMap<Attraction, ArrayList<Edge>> getMst(
      Attraction source, HashMap<Attraction, ArrayList<Edge>> graph) {
    PriorityQueue<Edge> fringe = new PriorityQueue<Edge>(Edge.comparator);
    HashSet<Attraction> visited = new HashSet<>();
    HashMap<Attraction, ArrayList<Edge>> mst = new HashMap<>();

    ArrayList<Edge> adjacentEdges = graph.get(source);
    fringe.addAll(adjacentEdges);
    visited.add(source);

    while (fringe.size() > 0) {
      Edge e = fringe.poll();
      Attraction[] endpoints = e.getEndpoints();

      // determine the visited and unvisited endpoints of Edge e
      Attraction curr;
      Attraction neighbor;
      if (visited.contains(endpoints[0]) && visited.contains(endpoints[1])) {
        continue;
      } else if (visited.contains(endpoints[0])) {
        curr = endpoints[0];
        neighbor = endpoints[1];
      } else {
        curr = endpoints[1];
        neighbor = endpoints[0];
      }

      // construct mst
      visited.add(neighbor);
      ArrayList<Edge> edges = mst.getOrDefault(curr, new ArrayList<>());
      edges.add(e);
      mst.put(curr, edges);
      edges = mst.getOrDefault(neighbor, new ArrayList<>());
      edges.add(e);
      mst.put(neighbor, edges);

      // add adjacent edges to fringe if it has an unvisited endpoint
      for (Edge adjacentEdge : graph.get(neighbor)) {
        if (!visited.contains(adjacentEdge.getOtherEndpoint(neighbor))) {
          fringe.add(adjacentEdge);
        }
      }
    }

    return mst;
  }

  /**
   * Return list of attractions in pre-order DFS traversal order.
   * @param source the vertex on which to start DFS
   * @param graph the MST on which to run DFS
   */
  static ArrayList<Attraction> dfs(Attraction source, HashMap<Attraction, ArrayList<Edge>> graph) {
    return dfsHelper(source, graph, new HashSet<>());
  }

  /**
   * Helper function for dfs.
   * @param curr the vertex that is currently being visited in the DFS traversal
   * @param graph the MST on which to run DFS
   * @param visited set of visited vertices
   */
  private static ArrayList<Attraction> dfsHelper(
      Attraction curr, HashMap<Attraction, ArrayList<Edge>> graph, HashSet<Attraction> visited) {
    ArrayList<Attraction> dfsOrdering = new ArrayList<>();
    dfsOrdering.add(curr);
    visited.add(curr);
    for (Edge e : graph.get(curr)) {
      Attraction neighbor = e.getOtherEndpoint(curr);
      if (!visited.contains(neighbor)) {
        dfsOrdering.addAll(dfsHelper(neighbor, graph, visited));
      }
    }
    return dfsOrdering;
  }
}