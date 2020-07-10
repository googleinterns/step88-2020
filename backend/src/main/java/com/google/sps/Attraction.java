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

public class Attraction {
  private String name;
  private String description;
  private String photoUrl;
  private double lat;
  private double lng;
  private int routeIndex;
  private boolean selected;

  public Attraction(String name, String description, String photoUrl, double lat, double lng, int routeIndex, boolean selected) {
    this.name = name;
    this.description = description;
    this.photoUrl = photoUrl;
    this.lat = lat;
    this.lng = lng;
    this.routeIndex = routeIndex;
    this.selected = selected;
  }

  public Attraction(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  public String getCoordinates() {
    return String.format("%f,%f", this.lat, this.lng);
  }

  @Override
  public boolean equals(Object other) {
    return other instanceof Attraction && this.name.equals(((Attraction) other).getName());
  }

  @Override
  public String toString() {
    return this.name;
  }
}