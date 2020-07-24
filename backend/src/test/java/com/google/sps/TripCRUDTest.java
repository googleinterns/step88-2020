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
  private static final String Email = "testEmail@gmail.com";
  private static final Boolean isOptimized = true;
  private static final String searchText = "Milano";
  private static final String tripName = "My Milan Trip";
  private static final String InvalidTripId = "111222333";

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }
  // need mock tripData
  // createTrip
  // read trip isOptimized
  // read trip searchText
  // read trip name
  // read attractions
  // read attraction name
  // read attraction routeIndex
  // read attraction photoReference
  // read attraction coordinates
  // user has created tripId
  // toEntity
  // setProperties
  // readTrip
  // toJson
  // updateTrip

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
}
