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
  public String name;
  public String description;
  public String image;
  public double lat;
  public double lng;

  public Attraction(String name, String description, String image, double lat, double lng) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.lat = lat;
    this.lng = lng;
  }
}