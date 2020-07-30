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

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.gson.JsonObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class TripCrudTest {
  private static final LocalServiceTestHelper DATASTORE_SERVICE_HELPER =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private static final String TRIP_DATA =
      "{\"isOptimized\":true,\"searchText\":\"Milano\",\"tripName\":\"My Milan Trip\",\"centerLocation\":{\"lat\":0,\"lng\":0},\"attractions\":[{\"name\":\"Milano Giuseppe\",\"photoUrl\":\"2234f23f23r133fqfqef\",\"routeIndex\":0,\"lat\":1,\"lng\":1}]}";
  private static final String TRIP_DATA_2 =
      "{\"isOptimized\":true,\"searchText\":\"Milano\",\"tripName\":\"My Awesome Milan Trip\",\"centerLocation\":{\"lat\":0,\"lng\":0},\"attractions\":[{\"name\":\"Milano Giuseppe\",\"photoUrl\":\"2234f23f23r133fqfqef\",\"routeIndex\":0,\"lat\":1,\"lng\":1}]}";
  private static final String BAD_TRIP_DATA = "{\"isOptimized\":true,\"searchText\":\"Milano\"}";

  private static final String EMAIL = "testEMAIL@gmail.com";
  private static final String INVALID_TRIP_ID = "111222333";

  @Before
  public void setUp() {
    DATASTORE_SERVICE_HELPER.setUp();
  }

  @After
  public void tearDown() {
    DATASTORE_SERVICE_HELPER.tearDown();
  }

  @Test
  public void createTrip_returnsEntityForCreatedTrip() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    Entity readTripEntity = TripCrud.readTrip(Long.toString(tripEntity.getKey().getId()));
    assertEquals(tripEntity, readTripEntity);
  }

  @Test
  public void readTrip_returnsEntityForTrip() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    Entity readTripEntity = TripCrud.readTrip(Long.toString(tripEntity.getKey().getId()));
    assertEquals(tripEntity, readTripEntity);
  }

  @Test
  public void readTrip_noTripFound() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    Entity actual = TripCrud.readTrip(INVALID_TRIP_ID);
    assertEquals(null, actual);
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingTripName() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, "", null);
    assertEquals("\"My Milan Trip\"", (String) tripEntityConverted.getProperty("tripName"));
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingSearchText() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    assertEquals("\"Milano\"", tripDataJson.get("searchText").getAsString());
  }

  @Test
  public void updateTrip_returnsUpdatedTripNameForUpdatedEntity() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    TripCrud.updateTrip(Long.toString(tripEntity.getKey().getId()), TRIP_DATA_2);
    Entity tripFound = TripCrud.readTrip(Long.toString(tripEntity.getKey().getId()));
    assertEquals("\"My Awesome Milan Trip\"", (String) tripFound.getProperty("tripName"));
  }

  @Test
  public void updateTrip_noTripFound() {
    Entity actual = TripCrud.readTrip(INVALID_TRIP_ID);
    assertEquals(null, actual);
  }

  @Test(expected = Exception.class)
  public void createTrip_throwsExceptionWithoutCreatingUser() {
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
  }

  @Test(expected = Exception.class)
  public void toJson_throwsExceptionForMissingTrip() {
    TripCrud.toJson(new Entity(""));
  }

  @Test(expected = Exception.class)
  public void createTrip_throwsExceptionForMissingTripInfo() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, BAD_TRIP_DATA);
  }

  @Test(expected = Exception.class)
  public void toEntity_throwsExceptionForMissingTripInfo() {
    Entity tripEntityConverted = TripCrud.toEntity(BAD_TRIP_DATA, "", null);
  }

  @Test(expected = Exception.class)
  public void updateTrip_throwsExceptionForMissingTripInfo() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    TripCrud.updateTrip(Long.toString(tripEntity.getKey().getId()), BAD_TRIP_DATA);
  }
}
