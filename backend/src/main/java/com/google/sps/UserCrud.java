package com.google.sps;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.util.List;

/** Class to handle CRUD related to user and trip entities */
public class UserCrud {
  private DatastoreService datastore;

  public UserCrud(DatastoreService datastore) {
    this.datastore = datastore;
  }

  /**
   * Create a user and give it email and array of tripIds
   *
   * @param email email of new user
   */
  public void createUser(String email) {
    Entity userEntity = new Entity("User");
    userEntity.setProperty("email", email);
    userEntity.setProperty("tripIds", "[]");
    datastore.put(userEntity);
  }

  /**
   * Find a user entity and return it
   *
   * @param property property refering to
   * @param value value to find
   * @param table table to search through
   * @return trip entity or null if not found
   */
  public Entity readEntity(String property, String value, String table) {
    Filter propertyFilter = new FilterPredicate(property, FilterOperator.EQUAL, value);
    Query query = new Query(table).setFilter(propertyFilter);
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());
    if (results.size() > 0) {
      return results.get(0);
    }
    return null;
  }

  /**
   * Find a trip entity and return it
   *
   * @param tripId id of the trip to find
   * @return trip entity or null if not found
   */
  public Entity readTrip(String tripId) throws EntityNotFoundException {
    Key entityKey = KeyFactory.createKey("Trip", tripId);
    return datastore.get(entityKey);
  }

  /**
   * Create a new trip
   *
   * @param email email of user
   * @param tripData json of tripData as string
   */
  public void createTrip(String email, String tripData) {
    Entity tripEntity = new Entity("Trip");
    tripEntity.setProperty("tripData", tripData);

    datastore.put(tripEntity);

    Entity userEntity = this.readEntity("email", email, "User");
    String trips = (String) userEntity.getProperty("tripIds");
    JsonParser parser = new JsonParser();
    JsonElement jsonElement = parser.parse(trips);
    JsonArray tripIds = jsonElement.getAsJsonArray();

    tripIds.add(tripEntity.getKey().getId());

    userEntity.setProperty("tripIds", tripIds.toString());
    datastore.put(userEntity);
  }

  /**
   * Update the user property of tripIds
   *
   * @param userEntity user entity
   * @param tripIds array of trip ids as string
   */
  public void updateUser(Entity userEntity, String tripIds) {
    userEntity.setProperty("tripIds", tripIds);
    datastore.put(userEntity);
  }
}
