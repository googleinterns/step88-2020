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
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import com.google.appengine.api.datastore.EmbeddedEntity;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.util.ArrayList;
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
      "{\"isOptimized\":true,\"searchText\":\"Milano\",\"tripName\":\"My Milan Trip\",\"centerLng\":0,\"centerLat\":0,\"attractions\":[{\"name\":\"Milano Giuseppe\",\"photoUrl\":\"2234f23f23r133fqfqef\",\"routeIndex\":0,\"lat\":1,\"lng\":1}]}";
  private static final String TRIP_DATA_2 =
      "{\"isOptimized\":true,\"searchText\":\"Milano\",\"tripName\":\"My Awesome Milan Trip\",\"centerLng\":0,\"centerLat\":0,\"attractions\":[{\"name\":\"Milano Giuseppe\",\"photoUrl\":\"2234f23f23r133fqfqef\",\"routeIndex\":0,\"lat\":1,\"lng\":1}]}";
  private static final String BAD_TRIP_DATA = "{\"isOptimized\":true,\"searchText\":\"Milano\"}";

  private static final String EMAIL = "testEMAIL@gmail.com";
  private static final Long INVALID_TRIP_ID = 111222333L;

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
    Entity readTripEntity = TripCrud.readTrip(tripEntity.getKey().getId());

    assertEquals(tripEntity, readTripEntity);
  }

  @Test
  public void readTrip_noTripFound() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    Entity actual = TripCrud.readTrip(INVALID_TRIP_ID);

    assertNull(actual);
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingTripName() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);

    assertEquals("My Milan Trip", (String) tripEntityConverted.getProperty("tripName"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingSearchText() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);

    assertEquals("Milano", (String) tripEntityConverted.getProperty("searchText"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingIsOptimized() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);

    assertTrue((Boolean) tripEntityConverted.getProperty("isOptimized"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingCenterLat() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);

    assertEquals(0, tripEntityConverted.getProperty("centerLat"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingCenterLng() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);

    assertEquals(0, tripEntityConverted.getProperty("centerLng"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingAttractionName() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);
    EmbeddedEntity readAttraction =
        (EmbeddedEntity) ((ArrayList) tripEntityConverted.getProperty("attractions")).get(0);

    assertEquals("Milano Giuseppe", readAttraction.getProperty("name"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingAttractionPhotoUrl() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);
    EmbeddedEntity readAttraction =
        (EmbeddedEntity) ((ArrayList) tripEntityConverted.getProperty("attractions")).get(0);

    assertEquals("2234f23f23r133fqfqef", readAttraction.getProperty("photoUrl"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingAttractionRouteIndex() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);
    EmbeddedEntity readAttraction =
        (EmbeddedEntity) ((ArrayList) tripEntityConverted.getProperty("attractions")).get(0);

    assertEquals(0, readAttraction.getProperty("routeIndex"));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingAttractionLat() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);
    EmbeddedEntity readAttraction =
        (EmbeddedEntity) ((ArrayList) tripEntityConverted.getProperty("attractions")).get(0);

    assertEquals(1, Integer.parseInt((String) readAttraction.getProperty("lat")));
  }

  @Test
  public void toEntity_returnsTripEntityFromJsonMatchingAttractionLng() {
    Entity tripEntityConverted = TripCrud.toEntity(TRIP_DATA, null, null);
    EmbeddedEntity readAttraction =
        (EmbeddedEntity) ((ArrayList) tripEntityConverted.getProperty("attractions")).get(0);

    assertEquals(1, Integer.parseInt((String) readAttraction.getProperty("lng")));
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingSearchText() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);

    assertEquals("Milano", tripDataJson.get("searchText").getAsString());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingTripName() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);

    assertEquals("My Milan Trip", tripDataJson.get("tripName").getAsString());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingIsOptimized() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);

    assertTrue(tripDataJson.get("isOptimized").getAsBoolean());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingCenterLat() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    assertEquals(0, tripDataJson.get("centerLat").getAsInt());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingCenterLng() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    assertEquals(0, tripDataJson.get("centerLng").getAsInt());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingAttractionName() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    JsonArray attractions = (JsonArray) tripDataJson.get("attractions");
    assertEquals("Milano Giuseppe", ((JsonObject) attractions.get(0)).get("name").getAsString());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingAttractionPhotoUrl() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    JsonArray attractions = (JsonArray) tripDataJson.get("attractions");
    assertEquals(
        "2234f23f23r133fqfqef", ((JsonObject) attractions.get(0)).get("photoUrl").getAsString());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingAttractionRouteIndex() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    JsonArray attractions = (JsonArray) tripDataJson.get("attractions");
    assertEquals(0, ((JsonObject) attractions.get(0)).get("routeIndex").getAsInt());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingAttractionLat() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    JsonArray attractions = (JsonArray) tripDataJson.get("attractions");
    assertEquals(1, ((JsonObject) attractions.get(0)).get("lat").getAsInt());
  }

  @Test
  public void toJson_returnsTripJsonFromEntityMatchingAttractionLng() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    JsonObject tripDataJson = TripCrud.toJson(tripEntity);
    JsonArray attractions = (JsonArray) tripDataJson.get("attractions");
    assertEquals(1, ((JsonObject) attractions.get(0)).get("lng").getAsInt());
  }

  @Test
  public void updateTrip_returnsUpdatedTripNameForUpdatedEntity() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    TripCrud.updateTrip(tripEntity.getKey().getId(), TRIP_DATA_2);
    Entity tripFound = TripCrud.readTrip(tripEntity.getKey().getId());

    assertEquals("My Awesome Milan Trip", (String) tripFound.getProperty("tripName"));
  }

  @Test
  public void updateTrip_noTripFound() {
    Entity actual = TripCrud.readTrip(INVALID_TRIP_ID);

    assertNull(actual);
  }

  @Test(expected = NullPointerException.class)
  public void createTrip_throwsExceptionWithoutCreatingUser() {
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
  }

  @Test(expected = IllegalArgumentException.class)
  public void toJson_throwsExceptionForMissingTrip() {
    TripCrud.toJson(new Entity(""));
  }

  @Test(expected = NullPointerException.class)
  public void createTrip_throwsExceptionForMissingTripInfo() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, BAD_TRIP_DATA);
  }

  @Test(expected = NullPointerException.class)
  public void toEntity_throwsExceptionForMissingTripInfo() {
    Entity tripEntityConverted = TripCrud.toEntity(BAD_TRIP_DATA, null, null);
  }

  @Test(expected = NullPointerException.class)
  public void updateTrip_throwsExceptionForMissingTripInfo() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity tripEntity = TripCrud.createTrip(EMAIL, TRIP_DATA);
    TripCrud.updateTrip(tripEntity.getKey().getId(), BAD_TRIP_DATA);
  }
}
