package com.google.sps;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import java.lang.IllegalArgumentException;
import java.util.ArrayList;
import java.util.List;

/** Class to handles CRUD related to the User */
public class UserCrud {
  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  /**
   * Creates a User Entity
   *
   * @param email email of new user
   * @return User Entity
   */
  public static Entity createUser(String email) {
    Entity userEntity = UserCrud.readEntity("email", email, "User");
    if (userEntity != null) {
      return null;
    }
    userEntity = new Entity("User");
    userEntity.setProperty("email", email);
    userEntity.setProperty("tripIds", new ArrayList<String>());
    datastore.put(userEntity);
    return userEntity;
  }

  /**
   * Find a user entity
   *
   * @param property property refering to
   * @param value value to find
   * @param table table to search in
   * @return Trip entity or null if not found
   */
  public static Entity readEntity(String property, String value, String table) {
    Filter propertyFilter = new FilterPredicate(property, FilterOperator.EQUAL, value);
    Query query = new Query(table).setFilter(propertyFilter);
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());
    if (results.size() > 0) {
      return results.get(0);
    }
    return null;
  }

  /**
   * Add trip Id to User Trip ids
   *
   * @param email user email
   * @param tripId trip id
   */
  public static void addTripId(String email, Long tripId) throws IllegalArgumentException {
    Entity userEntity = UserCrud.readEntity("email", email, "User");
    ArrayList<String> tripIds = (ArrayList<String>) userEntity.getProperty("tripIds");
    if (tripIds == null) {
      tripIds = new ArrayList<String>();
    }
    if (tripIds.contains(Long.toString(tripId))) {
      throw new IllegalArgumentException("Duplicate tripId");
    }
    tripIds.add(Long.toString(tripId));
    userEntity.setProperty("tripIds", tripIds);
    datastore.put(userEntity);
  }
}
