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

public final class OptimizationAlgorithm {

  private HashMap<Vertex, ArrayList<Edge>> graph;

  public OptimizationAlgorithm(HashMap<Vertex, ArrayList<Edge>> graph) {
    this.graph = graph;
  }

  public ArrayList<Attraction> optimize() {
    System.out.println(graph);

    ArrayList<Attraction> optimizedOrder = new ArrayList<>();
    for (Vertex v : graph.keySet()) {
      optimizedOrder.add(v.getAttraction());
    }
    return optimizedOrder;
  }

  private void mst() {
    return;
  }

  private void dfs() {
    return;
  }

}