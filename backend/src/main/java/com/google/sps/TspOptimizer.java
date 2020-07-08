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

public final class TspOptimizer {
  /**
    * Call optimize(source) after determining a source Attraction from which to run MST algorithm.
    * @return list of attractions in optimal visiting order  
    */
  public static ArrayList<Attraction> optimize(HashMap<Attraction, ArrayList<Edge>> graph) {
    System.out.println(graph);

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
  public static ArrayList<Attraction> optimize(Attraction source, HashMap<Attraction, ArrayList<Edge>> graph) {
    return null;
  }

  // Visible for testing
  static HashMap<Attraction, ArrayList<Edge>> mst(Attraction source) {
    return null;
  }

  // Visible for testing
  static ArrayList<Attraction> dfs(Attraction source, HashMap<Attraction, ArrayList<Edge>> graph) {
    return null;
  }

}