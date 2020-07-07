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

public class Edge {
  private Vertex u;
  private Vertex v;
  private long distance;

  public Edge(Vertex u, Vertex v, long distance) {
    this.u = u;
    this.v = v;
    this.distance = distance;
  }

  public long getDistance() {
    return this.distance;
  }

  /**
   * Given one endpoint of this edge, return the other endpoint
   * @param w one vertex endpoint of this edge
   * @return the vertex at the other endpoint this edge
   */
  public Vertex getOtherEndpoint(Vertex w) {
    return w.equals(u) ? v : u;
  }

  @Override
  public String toString() {
    return String.format("(u: %s, v: %s, Distance: %d)", this.u.getAttraction(), this.v.getAttraction(), this.distance);
  }
}