// // Copyright 2019 Google LLC
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     https://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
//
// package com.google.sps;
//
// import com.google.appengine.api.datastore.DatastoreService;
// import com.google.appengine.api.datastore.DatastoreServiceFactory;
// import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
// import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
// import org.junit.After;
// import org.junit.Before;
//
// public class UserCrudTest {
//   private final LocalServiceTestHelper helper =
//       new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
//
//   private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
//   private UserCrud userCrud = new UserCrud(datastore);
//
//   @Before
//   public void setUp() {
//     helper.setUp();
//   }
//
//   @After
//   public void tearDown() {
//     helper.tearDown();
//   }
//
//   // @Test
//   // public void createUserTest() {
//   //   Entity userEntity = userCrud.createUser("temail@gmail.com");
//   //   String userEmail = (String) userEntity.getProperty("email");
//   //   System.out.println(userEmail);
//   //   // Key key = dataServices.saveTask("daily", "unique_id343434");
//   //   // assertEquals("unique_id343434", key.getName());
//   // }
// }
