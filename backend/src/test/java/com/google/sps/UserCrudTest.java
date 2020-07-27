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
  private static final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private static final String EMAIL = "testEMAIL@gmail.com";
  private static final String EMAIL_2 = "testEMAIL_2@gmail.com";
  private static final Long TRIP_ID = 111222333L;
  private static final ArrayList<String> EMPTY_TRIP_IDS = new ArrayList<String>();
  private static final ArrayList<String> SINGLE_TRIP_ID = new ArrayList<String>() {
    { add(Long.toString(TRIP_ID)); }
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
  public void createUser_returnsEmailForCreatedUser() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    assertEquals(EMAIL, userEntity.getProperty("email").toString());
  }

  @Test
  public void createUser_returnsEmptyArrayListOfStrings() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    assertEquals(EMPTY_TRIP_IDS, (ArrayList<String>) userEntity.getProperty("tripIds"));
  }

  @Test
  public void readEntity_returnsEmailForFoundEntity() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    Entity readEntity = UserCrud.readEntity("email", EMAIL, "User");
    assertEquals(EMAIL, readEntity.getProperty("email").toString());
  }

  @Test
  public void readEntity_returnsNullForMissingEntity() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    assertEquals(null, UserCrud.readEntity("email", EMAIL_2, "User"));
  }

  @Test
  public void addTripId_returnsArrayListOfUpdateTripIds() {
    Entity userEntity = UserCrud.createUser(EMAIL);
    UserCrud.addTripId(EMAIL, TRIP_ID);
    userEntity = UserCrud.readEntity("email", EMAIL, "User");
    ArrayList<String> tripIds = (ArrayList<String>) userEntity.getProperty("tripIds");
    assertEquals(SINGLE_TRIP_ID, tripIds);
  }
}
