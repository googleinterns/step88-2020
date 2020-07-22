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

/** Class to handle CRUD related to user and trip entities */
public class TripCRUD {
  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  /** private constructor */
  private TripCRUD() {};

  /**
   * Create a new trip
   *
   * @param email email of user
   * @param tripData json of tripData as string
   */
  public static Entity createTrip(String email, String tripData) {
    Entity tripEntity = toEntity(tripData, "", null);
    datastore.put(tripEntity);
    UserCrud.addTripId(email, tripEntity.getKey().getId());
    return tripEntity;
  }

  public static Entity toEntity(String tripData, String tripId, Key tripKey) {
    JsonParser parser = new JsonParser();
    JsonElement jsonElement = parser.parse(tripData);
    JsonObject jsonObject = jsonElement.getAsJsonObject();
    Entity tripEntity = tripId == "" ? new Entity("Trip") : new Entity("Trip", tripId, tripKey);

    tripEntity.setProperty(
        "isOptimized", Boolean.parseBoolean(jsonObject.get("isOptimized").toString()));
    tripEntity.setProperty("searchText", jsonObject.get("searchText").toString());
    tripEntity.setProperty("tripName", jsonObject.get("tripName").toString());
    ArrayList<EmbeddedEntity> attractions = new ArrayList<EmbeddedEntity>();

    for (JsonElement attractionElement : jsonObject.getAsJsonArray("attractions")) {
      JsonObject attraction = attractionElement.getAsJsonObject();
      EmbeddedEntity embeddedAttraction = new EmbeddedEntity();
      embeddedAttraction.setProperty("attractionName", attraction.get("attractionName").toString());
      embeddedAttraction.setProperty("photoReference", attraction.get("photoReference").toString());
      embeddedAttraction.setProperty(
          "routeIndex", Integer.parseInt(attraction.get("routeIndex").toString()));
      embeddedAttraction.setProperty("coordinates", attraction.get("coordinates").toString());
      attractions.add(embeddedAttraction);
    }
    tripEntity.setProperty("attractions", attractions);
    return tripEntity;
  }

  /**
   * Find a trip entity and return it
   *
   * @param tripId id of the trip to find
   * @return trip entity or null if not found
   */
  public static Entity readTrip(String tripId) throws EntityNotFoundException {
    Key entityKey = KeyFactory.createKey("Trip", Long.parseLong(tripId));
    return datastore.get(entityKey);
  }

  public static JsonObject toJson(Entity tripEntity) {
    JsonObject jsonTrip = new JsonObject();
    jsonTrip.addProperty("tripId", Long.toString(tripEntity.getKey().getId()));
    jsonTrip.addProperty(
        "isOptimized", Boolean.parseBoolean(tripEntity.getProperty("isOptimized").toString()));
    jsonTrip.addProperty("searchText", tripEntity.getProperty("searchText").toString());
    jsonTrip.addProperty("tripName", tripEntity.getProperty("tripName").toString());
    ArrayList<JsonObject> attractions = new ArrayList<JsonObject>();
    for (EmbeddedEntity attraction :
        (ArrayList<EmbeddedEntity>) tripEntity.getProperty("attractions")) {
      JsonObject attractionJson = new JsonObject();
      attractionJson.addProperty(
          "attractionName", attraction.getProperty("attractionName").toString());
      attractionJson.addProperty(
          "photoReference", attraction.getProperty("photoReference").toString());
      attractionJson.addProperty(
          "routeIndex", Integer.parseInt(attraction.getProperty("routeIndex").toString()));
      attractionJson.addProperty("coordinates", attraction.getProperty("coordinates").toString());
      attractions.add(attractionJson);
    }
    jsonTrip.addProperty("attractions", attractions.toString());
    return jsonTrip;
  }

  /**
   * Update a trip's data
   *
   * @param tripId id of the trip to find
   */
  // use readTrip
  // pass in only trip Data and trip id
  // just replace trip in datastore -> overwrites
  public static void updateTrip(String tripId, Key tripKey, String tripData) {
    Entity tripEntity = toEntity(tripData, tripId, tripKey);
    System.out.println(tripEntity);
    datastore.put(tripEntity);
  }
}
