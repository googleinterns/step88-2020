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
  private Vertex start;
  private Vertex end;
  private long distance;

  public Edge(Vertex start, Vertex end, long distance) {
    this.start = start;
    this.end = end;
    this.distance = distance;
  }

  public Vertex getStart() {
    return this.start;
  }

  public Vertex getEnd() {
    return this.end;
  }

  public long getDistance() {
    return this.distance;
  }

  @Override
  public String toString() {
    return String.format("(Start: %s, End: %s, Distance: %d)", this.start.getAttraction(), this.end.getAttraction(), this.distance);
  }
}