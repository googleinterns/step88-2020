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

import java.util.Comparator;

public class Edge {
  private Attraction u;
  private Attraction v;
  private long distance;

  public Edge(Attraction u, Attraction v, long distance) {
    this.u = u;
    this.v = v;
    this.distance = distance;
  }

  public long getDistance() {
    return this.distance;
  }

  /**
   * Given one endpoint of this edge, return the other endpoint
   * @param w one Attraction endpoint of this edge
   * @return the Attraction at the other endpoint this edge
   */
  public Attraction getOtherEndpoint(Attraction w) {
    return w.equals(u) ? v : u;
  }

  public Attraction[] getEndpoints() {
    return new Attraction[] {u, v};

  }

  public static Comparator<Edge> comparator = new Comparator<Edge>() {
    @Override
    public int compare(Edge a, Edge b) {
      return Long.compare(a.getDistance(), b.getDistance());
    }
  };

  @Override
  public boolean equals(Object other) {
    if (!(other instanceof Edge)) {
      return false;
    }
    Edge e = (Edge) other;
    boolean hasSameEndpoints = this.u.equals(e.getOtherEndpoint(this.v)) && this.v.equals(e.getOtherEndpoint(this.u));
    return this.distance == e.getDistance() && hasSameEndpoints;
  }

  @Override
  public String toString() {
    return String.format("(u: %s, v: %s, Distance: %d)", this.u, this.v, this.distance);
  }
}