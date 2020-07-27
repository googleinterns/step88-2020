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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.gson.JsonObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class TripCRUDTest {

  private final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private static final String TripData =
      "{\"isOptimized\":true,\"searchText\":\"Milano\",\"tripName\":\"My Milan Trip\",\"attractions\":[{\"attractionName\":\"Milano Giuseppe\",\"photoReference\":\"2234f23f23r133fqfqef\",\"routeIndex\":0,\"coordinates\":{\"lat\":1,\"lng\":1}}]}";
  private static final String TripData2 =
      "{\"isOptimized\":true,\"searchText\":\"Milano\",\"tripName\":\"My Awesome Milan Trip\",\"attractions\":[{\"attractionName\":\"Milano Giuseppe\",\"photoReference\":\"2234f23f23r133fqfqef\",\"routeIndex\":0,\"coordinates\":{\"lat\":1,\"lng\":1}}]}";

  private static final String Email = "testEmail@gmail.com";
  private static final String InvalidTripId = "111222333";

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void createTrip() { // need to create an identical trip entity
    Entity userEntity = UserCrud.createUser(Email);
    Entity tripEntity = TripCRUD.createTrip(Email, TripData);
    Entity readTripEntity;
    try {
      readTripEntity = TripCRUD.readTrip(Long.toString(tripEntity.getKey().getId()));
    } catch (EntityNotFoundException e) {
      return;
    }
    assertEquals(tripEntity, readTripEntity);
  }

  @Test
  public void readTripSuccess() {
    Entity userEntity = UserCrud.createUser(Email);
    Entity tripEntity = TripCRUD.createTrip(Email, TripData);
    Entity readTripEntity = new Entity("Trip");
    try {
      readTripEntity = TripCRUD.readTrip(Long.toString(tripEntity.getKey().getId()));
    } catch (EntityNotFoundException e) {
    }
    assertEquals(tripEntity, readTripEntity);
  }

  @Test
  public void readTripFails() {
    Entity userEntity = UserCrud.createUser(Email);
    Entity tripEntity = TripCRUD.createTrip(Email, TripData);
    Entity readTripEntity = new Entity("Trip");
    try {
      readTripEntity = TripCRUD.readTrip(InvalidTripId);
    } catch (EntityNotFoundException e) {
    }
    assertNotEquals(tripEntity, readTripEntity);
  }

  @Test
  public void toEntityConverter() {
    Entity userEntity = UserCrud.createUser(Email);
    Entity tripEntity = TripCRUD.createTrip(Email, TripData);
    Entity tripEntityConverted = TripCRUD.toEntity(TripData, "", null);
    assertEquals(
        (String) tripEntity.getProperty("tripName"),
        (String) tripEntityConverted.getProperty("tripName"));
  }

  @Test
  public void toJsonConverter() {
    Entity userEntity = UserCrud.createUser(Email);
    Entity tripEntity = TripCRUD.createTrip(Email, TripData);
    JsonObject tripDataJson = TripCRUD.toJson(tripEntity);
    assertEquals("\"Milano\"", tripDataJson.get("searchText").getAsString());
  }

  @Test
  public void tripUpdate() {
    Entity userEntity = UserCrud.createUser(Email);
    Entity tripEntity = TripCRUD.createTrip(Email, TripData);
    TripCRUD.updateTrip(Long.toString(tripEntity.getKey().getId()), TripData2);
    Entity tripFound = new Entity("Trip");
    try {
      tripFound = TripCRUD.readTrip(Long.toString(tripEntity.getKey().getId()));
    } catch (EntityNotFoundException e) {
    }
    assertEquals("\"My Awesome Milan Trip\"", (String) tripFound.getProperty("tripName"));
  }
}
