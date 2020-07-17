package com.google.sps;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.gson.*;

public class UserCrud {
  DatastoreService datastore;

  public UserCrud(DatastoreService datastore) {
    this.datastore = datastore;
  }

  public void createUser(String email) {
    Entity userEntity = new Entity("User");
    userEntity.setProperty("email", email);
    userEntity.setProperty("trips", "[]");
    datastore.put(userEntity);
  }

  public Entity readUser(String email) {
    Query query = new Query("User");
    PreparedQuery results = datastore.prepare(query);
    for (Entity userEntity : results.asIterable()) {
      String entityEmail = userEntity.getProperty("email").toString();
      if (entityEmail.equals(email)) {
        return userEntity;
      }
    }
    return null;
  }

  public void updateUser(Entity userEntity, String trips) {
    userEntity.setProperty("trips", trips);
    datastore.put(userEntity);
  }
}
