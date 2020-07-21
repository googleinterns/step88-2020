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
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

public class TodoDataServicesTest {

  private static final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(
          new LocalDatastoreServiceTestConfig()
              .setDefaultHighRepJobPolicyUnappliedJobPercentage(0));
  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private UserCrud userCrud = new UserCrud(datastore);

  @BeforeClass
  public static void setup() {
    helper.setUp();
  }

  @AfterClass
  public static void done() {
    helper.tearDown();
  }

  @Test
  public void saveTask_test_valid_parameter() {
    Key key = dataServices.saveTask("daily", "unique_id343434");
    assertEquals("unique_id343434", key.getName());
  }

  @Test
  public void getTask_test() throws EntityNotFoundException {
    Entity entity = dataServices.getTask("unique_id343434");
    assertEquals("unique_id343434", entity.getKey().getName());
  }
}
