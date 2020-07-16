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

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.gson.*;
import java.io.IOException;
import java.util.stream.Collectors;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/api/v1/createUser")
public class UserCRUD extends HttpServlet {

  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    JsonObject json = new JsonObject();
    String requestData = request.getReader().lines().collect(Collectors.joining());
    Gson gson = new Gson();
    String bodyData = gson.fromJson(requestData, String.class);
    System.out.println(bodyData);
    createUser(bodyData);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  public String createUser(String email) {
    Entity userEntity = new Entity("User");
    userEntity.setProperty("email", email);
    userEntity.setProperty("trips", "[]");
    // String trips = (String) userEntity.getProperty("trips");
    // JsonParser parser = new JsonParser();
    // JsonElement jsonElement = parser.parse(trips);
    // JsonArray tripsArray = jsonElement.getAsJsonArray();
    // System.out.println(tripsArray);
    datastore.put(userEntity);
    return KeyFactory.keyToString(userEntity.getKey());
  }
}
