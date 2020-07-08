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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class TspOptimizerTest {
  // Mock attractions, used as vertices in the graph
  private static final Attraction A = new Attraction("A");
  private static final Attraction B = new Attraction("B");
  private static final Attraction C = new Attraction("C");
  private static final Attraction D = new Attraction("D");
  private static final Attraction E = new Attraction("E");
  private static final Attraction F = new Attraction("F");
  private static final Attraction G = new Attraction("G");

  // Straight forward triangle graph
  private static final HashMap<Attraction, ArrayList<Edge>> TRIANGLE = create_TRIANGLE();
  private static final HashMap<Attraction, ArrayList<Edge>> TRIANGLE_MST = create_TRIANGLE_MST();

  // Complete graph with 4 vertices that has a single optimal solution
  private static final HashMap<Attraction, ArrayList<Edge>> K4 = create_K4();
  private static final HashMap<Attraction, ArrayList<Edge>> K4_MST = create_K4_MST();

  @Test
  public void mst_TRIANGLE_A() {
    // Generate the MST of the TRIANGLE graph starting at vertex A

    HashMap<Attraction, ArrayList<Edge>> actual = TspOptimizer.getMst(A, TRIANGLE);
    checkGraphEquals(TRIANGLE_MST, actual);
  }

  @Test
  public void mst_TRIANGLE_B() {
    // Generate the MST of the TRIANGLE graph starting at vertex B

    HashMap<Attraction, ArrayList<Edge>> actual = TspOptimizer.getMst(B, TRIANGLE);
    checkGraphEquals(TRIANGLE_MST, actual);
  }

  @Test
  public void mst_K4_A() {
    // Generate the MST of the K4 graph starting at vertex A

    HashMap<Attraction, ArrayList<Edge>> actual = TspOptimizer.getMst(A, K4);
    checkGraphEquals(K4_MST, actual);
  }

  @Test
  public void mst_K4_C() {
    // Generate the MST of the K4 graph starting at vertex C

    HashMap<Attraction, ArrayList<Edge>> actual = TspOptimizer.getMst(C, K4);
    checkGraphEquals(K4_MST, actual);
  }

  @Test
  @Ignore
  public void dfs_TRIANGLE() {
    // Generate the MST of the TRIANGLE graph

    ArrayList<Attraction> expected1 = new ArrayList<>(Arrays.asList(A, B, C));
    ArrayList<Attraction> expected2 = new ArrayList<>(Arrays.asList(A, C, B));
    ArrayList<Attraction> actual = TspOptimizer.dfs(A, TRIANGLE_MST);
    Assert.assertTrue(expected1.equals(actual) || expected2.equals(actual));
  }

  @Test
  @Ignore
  public void optimize_TRIANGLE_pickRandomSourceAttraction() {
    // Use triangle graph. Choose a random Attraction as source. 
    // Algorithm should return a path with the two shortest edges A--B--C.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(A, B, C));
    ArrayList<Attraction> actual = TspOptimizer.optimize(TRIANGLE);
    Assert.assertEquals(expected, actual);
  }

  @Test
  @Ignore
  public void optimize_TRIANGLE_DFSOptimalPath() {
    // Use triangle graph. DFS traversal of MST is the optimal path.
    // Algorithm should return a path with the two shortest edges A--B--C.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(A, B, C));
    ArrayList<Attraction> actual = TspOptimizer.optimize(A, TRIANGLE);
    Assert.assertEquals(expected, actual);
  }

  @Test
  @Ignore
  public void optimize_TRIANGLE_deleteEdgeForOptimalPath() {
    // Use triangle graph. DFS traversal of MST is not the optimal path, optimal path requires deletion of heaviest edge in cycle.
    // Algorithm should return a path with the two shortest edges A--B--C.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(A, B, C));
    ArrayList<Attraction> actual = TspOptimizer.optimize(B, TRIANGLE);
    Assert.assertEquals(expected, actual);
  }

  @Test
  @Ignore
  public void optimize_K4_findDFSOptimalPath() {
    // Create complete graph with 4 vertices. DFS traversal of MST is the optimal path.
    // Algorithm should return a path with three shortest edges A--B--C--D.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(A, B, C, D));
    ArrayList<Attraction> actual = TspOptimizer.optimize(A, K4);
    Assert.assertEquals(expected, actual);
  }

  @Test
  @Ignore
  public void optimize_K4_possiblyFindSuboptimalApproximation() {
    // Create complete graph with 4 vertices. DFS traversal of MST is not the optimal path.
    // Algorithm should return a path 6/5 times length of optimal path C--D--B--A or the optimal path A--B--C--D.

    ArrayList<Attraction> expectedOptimal = new ArrayList<>(Arrays.asList(A, B, C, D));
    ArrayList<Attraction> expectedSuboptimal = new ArrayList<>(Arrays.asList(C, D, B, A));
    ArrayList<Attraction> actual = TspOptimizer.optimize(C, K4);
    Assert.assertTrue(expectedOptimal.equals(actual) || expectedSuboptimal.equals(actual));
  }

  private void checkGraphEquals(
      HashMap<Attraction, ArrayList<Edge>> expected, HashMap<Attraction, ArrayList<Edge>> actual) {
    for (Attraction a : expected.keySet()) {
      ArrayList<Edge> expectedEdges = expected.get(a);
      ArrayList<Edge> actualEdges = actual.get(a);
      Collections.sort(actualEdges, Edge.comparator);
      Assert.assertEquals(expectedEdges, actualEdges);
    }
  }

  private static HashMap<Attraction, ArrayList<Edge>> create_TRIANGLE() {
    HashMap<Attraction, ArrayList<Edge>> graph = new HashMap<>();
    Edge ab = new Edge(A, B, 1);
    Edge ac = new Edge(A, C, 2);
    Edge bc = new Edge(B, C, 3);
    graph.put(A, new ArrayList<Edge>(Arrays.asList(ab, ac)));
    graph.put(B, new ArrayList<Edge>(Arrays.asList(ab, bc)));
    graph.put(C, new ArrayList<Edge>(Arrays.asList(bc, ac)));
    return graph;
  }

  private static HashMap<Attraction, ArrayList<Edge>> create_TRIANGLE_MST() {
    HashMap<Attraction, ArrayList<Edge>> graph = new HashMap<>();
    Edge ab = new Edge(A, B, 1);
    Edge ac = new Edge(A, C, 2);
    graph.put(A, new ArrayList<Edge>(Arrays.asList(ab, ac)));
    graph.put(B, new ArrayList<Edge>(Arrays.asList(ab)));
    graph.put(C, new ArrayList<Edge>(Arrays.asList(ac)));
    return graph;
  }

  private static HashMap<Attraction, ArrayList<Edge>> create_K4() {
    HashMap<Attraction, ArrayList<Edge>> graph = new HashMap<>();
    Edge ab = new Edge(A, B, 1);
    Edge ac = new Edge(A, C, 4);
    Edge ad = new Edge(A, D, 4);
    Edge bc = new Edge(B, C, 2);
    Edge bd = new Edge(B, D, 3);
    Edge cd = new Edge(C, D, 2);
    graph.put(A, new ArrayList<Edge>(Arrays.asList(ab, ac, ad)));
    graph.put(B, new ArrayList<Edge>(Arrays.asList(ab, bc, bd)));
    graph.put(C, new ArrayList<Edge>(Arrays.asList(ac, bc, cd)));
    graph.put(D, new ArrayList<Edge>(Arrays.asList(ad, bd, cd)));
    return graph;
  }

  private static HashMap<Attraction, ArrayList<Edge>> create_K4_MST() {
    HashMap<Attraction, ArrayList<Edge>> graph = new HashMap<>();
    Edge ab = new Edge(A, B, 1);
    Edge bc = new Edge(B, C, 2);
    Edge cd = new Edge(C, D, 2);
    graph.put(A, new ArrayList<Edge>(Arrays.asList(ab)));
    graph.put(B, new ArrayList<Edge>(Arrays.asList(ab, bc)));
    graph.put(C, new ArrayList<Edge>(Arrays.asList(bc, cd)));
    graph.put(D, new ArrayList<Edge>(Arrays.asList(cd)));
    return graph;
  }
}