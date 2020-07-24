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

/** Class to handles CRU related to the Trip */
public class TripCRUD {
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
    UserCrud.addTripId(email, tripEntity.getKey().getId());
    return tripEntity;
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

    tripEntity.setProperty("isOptimized", jsonObject.get("isOptimized").getAsBoolean());
    tripEntity.setProperty("searchText", jsonObject.get("searchText").getAsString());
    tripEntity.setProperty("tripName", jsonObject.get("tripName").getAsString());
    ArrayList<EmbeddedEntity> attractions = new ArrayList<EmbeddedEntity>();

    for (JsonElement attractionElement : jsonObject.getAsJsonArray("attractions")) {
      JsonObject attraction =
          attractionElement.getAsJsonObject(); // needed? might only need JsonElement
      EmbeddedEntity embeddedAttraction = new EmbeddedEntity();
      embeddedAttraction.setProperty(
          "attractionName", attraction.get("attractionName").getAsString());
      embeddedAttraction.setProperty(
          "photoReference", attraction.get("photoReference").getAsString());
      embeddedAttraction.setProperty("routeIndex", attraction.get("routeIndex").getAsInt());
      embeddedAttraction.setProperty("coordinates", attraction.get("coordinates").getAsString());
      attractions.add(embeddedAttraction);
    }
    tripEntity.setProperty("attractions", attractions);
  }

  /**
   * Finds a trip entity by id
   *
   * @param tripId id of the trip to find
   * @throws EntityNotFoundException if trip entity is not found
   * @return Trip entity
   */
  public static Entity readTrip(String tripId) throws EntityNotFoundException {
    Key entityKey = KeyFactory.createKey("Trip", Long.parseLong(tripId));
    return datastore.get(entityKey);
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
    jsonTrip.addProperty("isOptimized", (Boolean) tripEntity.getProperty("isOptimized"));
    jsonTrip.addProperty("searchText", (String) tripEntity.getProperty("searchText"));
    jsonTrip.addProperty("tripName", (String) tripEntity.getProperty("tripName"));

    JsonArray attractions = new JsonArray();
    for (EmbeddedEntity attraction :
        (ArrayList<EmbeddedEntity>) tripEntity.getProperty("attractions")) {
      JsonObject attractionJson = new JsonObject();
      attractionJson.addProperty(
          "attractionName", (String) attraction.getProperty("attractionName"));
      attractionJson.addProperty(
          "photoReference", (String) attraction.getProperty("photoReference"));
      attractionJson.addProperty("routeIndex", (Integer) attraction.getProperty("routeIndex"));
      attractionJson.addProperty("coordinates", (String) attraction.getProperty("coordinates"));
      attractions.add(attractionJson);
    }
    jsonTrip.add("attractions", attractions);
    return jsonTrip;
  }

  /**
   * Updates a trip's properties
   *
   * @param tripId id of the trip to find
   * @param tripData string representation of tripData json
   */
  public static void updateTrip(String tripId, String tripData) throws EntityNotFoundException {
    Entity tripEntity;
    tripEntity = TripCRUD.readTrip(tripId);
    setProperties(tripEntity, tripData);
    datastore.put(tripEntity);
  }
}
