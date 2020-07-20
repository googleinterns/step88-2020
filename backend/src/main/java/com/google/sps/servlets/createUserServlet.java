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
import com.google.gson.JsonObject;
import com.google.sps.UserCrud;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that creates a new user */
@WebServlet("/api/v1/createUser")
public class createUserServlet extends HttpServlet {
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  UserCrud userCrud = new UserCrud(datastore);

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String email = request.getParameter("email");
    if (email == "" || email == null) {
      return;
    }
    if (userCrud.readEntity(email)) {
      return;
    }

    userCrud.createUser(email);

    JsonObject jsonResults = new JsonObject();
    response.setContentType("application/json;");
    response.getWriter().println(jsonResults);
  }
}
