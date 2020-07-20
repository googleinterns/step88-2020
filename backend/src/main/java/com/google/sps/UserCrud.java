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
import com.google.gson.*;
import java.util.List;

public class UserCrud {
  DatastoreService datastore;

  public UserCrud(DatastoreService datastore) {
    this.datastore = datastore;
  }

  public void createUser(String email) {
    Entity userEntity = new Entity("User");
    userEntity.setProperty("email", email);
    userEntity.setProperty("tripIds", "[]");
    datastore.put(userEntity);
  }

  public Entity readEntity(String property, String match, String table) {
    Filter propertyFilter = new FilterPredicate(property, FilterOperator.EQUAL, match);
    Query query = new Query(table).setFilter(propertyFilter);
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());
    if (results.size() > 0) {
      return results.get(0);
    }
    return null;
  }

  public Entity readTrip(String tripId) throws EntityNotFoundException {
    Key entityKey = KeyFactory.createKey("Trip", tripId);
    return datastore.get(entityKey);
  }

  public void createTrip(String email, String tripData) {
    // create tripObject
    Entity tripEntity = new Entity("Trip");
    tripEntity.setProperty("tripData", tripData);

    // save tripObject
    datastore.put(tripEntity);

    // read user tripIds
    Entity userEntity = this.readEntity("email", email, "User");
    String trips = (String) userEntity.getProperty("tripIds");
    JsonParser parser = new JsonParser();
    JsonElement jsonElement = parser.parse(trips);
    JsonArray tripIds = jsonElement.getAsJsonArray();

    // add tripId
    tripIds.add(tripEntity.getKey().getId());

    // save tripIds
    userEntity.setProperty("tripIds", tripIds.toString());
    datastore.put(userEntity);
  }

  public void updateUser(Entity userEntity, String tripIds) {
    userEntity.setProperty("tripIds", tripIds);
    datastore.put(userEntity);
  }
}
