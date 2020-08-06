package com.google.sps;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.EmbeddedEntity;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;

/** Class to handle CRU functions related to the Trip */
public class TripCrud {
  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  /**
   * Create a new trip
   *
   * @param email email of user
   * @param tripData json of tripData as string
   * @return tripEntity a trip entity
   */
  public static Entity createTrip(String email, String tripData) {
    Entity tripEntity = toEntity(tripData, null, null);
    datastore.put(tripEntity);
    Long id = tripEntity.getKey().getId();
    UserCrud.addTripId(email, id);
    TripCrud.addTripId(id);
    return TripCrud.readTrip(id);
  }

  /**
   * Add tripId property to Trip Entity
   *
   * @param id the trip id
   */
  private static void addTripId(Long id) {
    Entity tripEntity = TripCrud.readTrip(id);
    tripEntity.setProperty("tripId", id);
    datastore.put(tripEntity);
  }

  /**
   * Converts string tripData to Trip Entity
   *
   * @param tripData tripData string representation of a trip json
   * @param tripId trip id
   * @param tripKey trip key, can be null
   * @return tripEntity from tripData
   */
  public static Entity toEntity(String tripData, Long tripId, Key tripKey) {
    Entity tripEntity = tripId == null ? new Entity("Trip") : new Entity("Trip", tripId, tripKey);
    setProperties(tripEntity, tripData);
    return tripEntity;
  }

  /**
   * Mutates trip entity properties given string representation of tripData json
   *
   * @param tripEntity Trip Entity
   * @param tripData tripData string representation of a trip json
   */
  private static void setProperties(Entity tripEntity, String tripData) {
    JsonParser parser = new JsonParser();
    JsonElement jsonElement = parser.parse(tripData);
    JsonObject jsonObject = jsonElement.getAsJsonObject();
    tripEntity.setProperty("isOptimized", jsonObject.get("isOptimized").getAsBoolean());
    tripEntity.setProperty("searchText", jsonObject.get("searchText").toString());
    tripEntity.setProperty("tripName", jsonObject.get("tripName").toString());
    tripEntity.setProperty("centerLocation", jsonObject.get("centerLocation").toString());
    ArrayList<EmbeddedEntity> attractions = new ArrayList<EmbeddedEntity>();
    for (JsonElement attractionElement : jsonObject.getAsJsonArray("attractions")) {
      JsonObject attraction = attractionElement.getAsJsonObject();
      EmbeddedEntity embeddedAttraction = new EmbeddedEntity();
      embeddedAttraction.setProperty("name", attraction.get("name").toString());
      embeddedAttraction.setProperty("photoUrl", attraction.get("photoUrl").toString());
      embeddedAttraction.setProperty("routeIndex", attraction.get("routeIndex").getAsInt());
      embeddedAttraction.setProperty("lat", attraction.get("lat").toString());
      embeddedAttraction.setProperty("lng", attraction.get("lng").toString());
      attractions.add(embeddedAttraction);
    }
    tripEntity.setProperty("attractions", attractions);
  }

  /**
   * Finds a trip entity by id
   *
   * @param tripId id of the trip to find
   * @return Trip entity if found, null if EntityNotFoundException is caught
   */
  public static Entity readTrip(Long tripId) {
    Key entityKey = KeyFactory.createKey("Trip", tripId);
    Entity tripEntity;
    try {
      tripEntity = datastore.get(entityKey);
    } catch (EntityNotFoundException e) {
      return null;
    }
    return tripEntity;
  }

  /**
   * Converts Trip Entity to Json
   *
   * @param tripEntity Trip Entity
   * @return JsonObject of trip
   */
  public static JsonObject toJson(Entity tripEntity) {
    JsonObject jsonTrip = new JsonObject();
    jsonTrip.addProperty("tripId", Long.toString(tripEntity.getKey().getId()));
    jsonTrip.addProperty(
        "isOptimized", Boolean.parseBoolean(tripEntity.getProperty("isOptimized").toString()));
    jsonTrip.addProperty("searchText", tripEntity.getProperty("searchText").toString());
    jsonTrip.addProperty("tripName", tripEntity.getProperty("tripName").toString());
    JsonParser parser = new JsonParser();
    JsonObject centerLocation =
        (JsonObject) parser.parse(tripEntity.getProperty("centerLocation").toString());

    jsonTrip.addProperty("centerLng", centerLocation.get("lng").getAsInt());
    jsonTrip.addProperty("centerLat", centerLocation.get("lat").getAsInt());
    JsonArray attractions = new JsonArray();
    for (EmbeddedEntity attraction :
        (ArrayList<EmbeddedEntity>) tripEntity.getProperty("attractions")) {
      JsonObject attractionJson = new JsonObject();
      attractionJson.addProperty("name", attraction.getProperty("name").toString());
      attractionJson.addProperty("photoUrl", attraction.getProperty("photoUrl").toString());
      attractionJson.addProperty(
          "routeIndex", Integer.parseInt(attraction.getProperty("routeIndex").toString()));
      attractionJson.addProperty("lat", attraction.getProperty("lat").toString());
      attractionJson.addProperty("lng", attraction.getProperty("lng").toString());
      attractions.add(attractionJson);
    }
    // String attractionsStr = attractions.toString();
    jsonTrip.add("attractions", attractions);
    return jsonTrip;
  }

  /**
   * Updates a trip's properties
   *
   * @param tripId id of the trip to find
   * @param tripData string representation of tripData json
   */
  public static void updateTrip(Long tripId, String tripData) {
    Entity tripEntity = TripCrud.readTrip(tripId);
    if (tripEntity == null) {
      return;
    }
    setProperties(tripEntity, tripData);
    datastore.put(tripEntity);
  }
}
