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
import com.google.gson.*;
import com.google.sps.UserCrud;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that creates a new user */
@WebServlet("/api/v1/updateUser")
public class updateUserServlet extends HttpServlet {
  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private UserCrud userCrud = new UserCrud(datastore);

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String email = request.getParameter("email");
    if (email == "" || email == null) {
      throw new IllegalArgumentException("Email passed is not valid");
    }
    String trips = request.getParameter("trips");
    if (trips == "" || trips == null) {
      throw new IllegalArgumentException("Trips passed is not valid");
    }

    Entity userEntity = userCrud.readEntity("email", email, "User");
    if (userEntity == null) {
      throw new Exception("User not found");
    }
    userCrud.updateUser(userEntity, trips);
    JsonObject jsonResults = new JsonObject();
    response.setContentType("application/json;");
    response.getWriter().println(jsonResults);
  }
}