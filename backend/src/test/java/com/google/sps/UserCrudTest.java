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

package com.google.sps;

import static org.junit.Assert.assertEquals;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import java.util.ArrayList;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class UserCrudTest {
  private final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private static final String Email = "testEmail@gmail.com";
  private static final String Email2 = "testEmail2@gmail.com";
  private static final Long TripId = Long.parseLong("111222333");
  private static final ArrayList<String> EmptyTripIds = new ArrayList<String>();
  private static final ArrayList<String> SingleTripId = new ArrayList<String>() {
    { add("111222333"); }
  };

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void createUserEmail() {
    Entity userEntity = UserCrud.createUser(Email);
    assertEquals(Email, userEntity.getProperty("email").toString());
  }

  @Test
  public void createUserTripIds() {
    Entity userEntity = UserCrud.createUser(Email);
    assertEquals(EmptyTripIds, (ArrayList<String>) userEntity.getProperty("tripIds"));
  }

  @Test
  public void readUserEmail() {
    Entity userEntity = UserCrud.createUser(Email);
    Entity readEntity = UserCrud.readEntity("email", Email, "User");
    assertEquals(Email, readEntity.getProperty("email").toString());
  }

  @Test
  public void noUserRead() {
    Entity userEntity = UserCrud.createUser(Email);
    assertEquals(null, UserCrud.readEntity("email", Email2, "User"));
  }

  @Test
  public void addTripId() {
    Entity userEntity = UserCrud.createUser(Email);
    UserCrud.addTripId(Email, TripId);
    userEntity = UserCrud.readEntity("email", Email, "User");
    ArrayList<String> tripIds = (ArrayList<String>) userEntity.getProperty("tripIds");
    assertEquals(SingleTripId, tripIds);
  }
}
