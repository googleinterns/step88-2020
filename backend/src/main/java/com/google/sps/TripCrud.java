package com.google.sps;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.EmbeddedEntity;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;

/** Class to handles CRU related to the Trip */
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
    Entity tripEntity = toEntity(tripData, "", null);
    datastore.put(tripEntity);
    long id = tripEntity.getKey().getId();
    UserCrud.addTripId(email, id);
    TripCrud.addTripId(Long.toString(id));
    return TripCrud.readTrip(Long.toString(id));
  }

  /**
   * Add tripId property to Trip Entity
   *
   * @param id the trip id
   */
  public static void addTripId(String id) {
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
  public static Entity toEntity(String tripData, String tripId, Key tripKey) {
    Entity tripEntity = tripId == "" ? new Entity("Trip") : new Entity("Trip", tripId, tripKey);
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
    tripEntity.setProperty(
        "isOptimized", Boolean.parseBoolean(jsonObject.get("isOptimized").toString()));
    tripEntity.setProperty("searchText", jsonObject.get("searchText").toString());
    tripEntity.setProperty("tripName", jsonObject.get("tripName").toString());
    tripEntity.setProperty("centerLocation", jsonObject.get("centerLocation").toString());
    ArrayList<EmbeddedEntity> attractions = new ArrayList<EmbeddedEntity>();
    for (JsonElement attractionElement : jsonObject.getAsJsonArray("attractions")) {
      JsonObject attraction = attractionElement.getAsJsonObject();
      EmbeddedEntity embeddedAttraction = new EmbeddedEntity();
      embeddedAttraction.setProperty("name", attraction.get("name").toString());
      embeddedAttraction.setProperty("photoUrl", attraction.get("photoUrl").toString());
      embeddedAttraction.setProperty(
          "routeIndex", Integer.parseInt(attraction.get("routeIndex").toString()));
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
  public static Entity readTrip(String tripId) {
    Key entityKey = KeyFactory.createKey("Trip", Long.parseLong(tripId));
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
    jsonTrip.addProperty("centerLocation", tripEntity.getProperty("centerLocation").toString());
    ArrayList<JsonObject> attractions = new ArrayList<JsonObject>();
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
    jsonTrip.addProperty("attractions", attractions.toString());
    return jsonTrip;
  }

  /**
   * Updates a trip's properties
   *
   * @param tripId id of the trip to find
   * @param tripData string representation of tripData json
   */
  public static void updateTrip(String tripId, String tripData) {
    Entity tripEntity = TripCrud.readTrip(tripId);
    if (tripEntity == null) {
      return;
    }
    setProperties(tripEntity, tripData);
    datastore.put(tripEntity);
  }
}
