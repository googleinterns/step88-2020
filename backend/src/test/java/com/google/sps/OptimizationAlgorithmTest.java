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
import java.util.HashMap;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class OptimizationAlgorithmTest {

  // Mock attractions
  private static final Attraction ATTR_A = new Attraction("A");
  private static final Attraction ATTR_B = new Attraction("B");
  private static final Attraction ATTR_C = new Attraction("C");
  private static final Attraction ATTR_D = new Attraction("D");
  private static final Attraction ATTR_E = new Attraction("E");
  private static final Attraction ATTR_F = new Attraction("F");
  private static final Attraction ATTR_G = new Attraction("G");

  // Mock vertices that contain mock attractions
  private static final Vertex A = new Vertex(ATTR_A);
  private static final Vertex B = new Vertex(ATTR_B);
  private static final Vertex C = new Vertex(ATTR_C);
  private static final Vertex D = new Vertex(ATTR_D);
  private static final Vertex E = new Vertex(ATTR_E);
  private static final Vertex F = new Vertex(ATTR_F);
  private static final Vertex G = new Vertex(ATTR_G);

  // Straight forward triangle graph
  private static final HashMap<Vertex, ArrayList<Edge>> TRIANGLE = create_TRIANGLE();

  // MST of TRIANGLE with source vertex A
  private static final HashMap<Vertex, ArrayList<Edge>> TRIANGLE_MST_A = create_TRIANGLE_MST_A();

  // Complete graph with 4 vertices that has a single optimal solution 
  private static final HashMap<Vertex, ArrayList<Edge>> K4 = create_K4();

  private static HashMap<Vertex, ArrayList<Edge>> create_TRIANGLE() {
    HashMap<Vertex, ArrayList<Edge>> graph = new HashMap<>();
    Edge ab = new Edge(A, B, 1);
    Edge ac = new Edge(A, C, 3);
    Edge bc = new Edge(B, C, 2);
    graph.put(A, new ArrayList<Edge>(Arrays.asList(ab, ac)));
    graph.put(B, new ArrayList<Edge>(Arrays.asList(ab, bc)));
    graph.put(C, new ArrayList<Edge>(Arrays.asList(bc, ac)));
    return graph;
  }

  private static HashMap<Vertex, ArrayList<Edge>> create_TRIANGLE_MST_A() {
    HashMap<Vertex, ArrayList<Edge>> graph = new HashMap<>();
    Edge ab = new Edge(A, B, 1);
    Edge ac = new Edge(A, C, 3);
    graph.put(A, new ArrayList<Edge>(Arrays.asList(ab, ac)));
    return graph;
  }
  
  private static HashMap<Vertex, ArrayList<Edge>> create_K4() {
    HashMap<Vertex, ArrayList<Edge>> graph = new HashMap<>();
    Edge ab = new Edge(A, B, 1);
    Edge ac = new Edge(A, C, 4);
    Edge ad = new Edge(A, D, 4);
    Edge bc = new Edge(A, C, 2);
    Edge bd = new Edge(A, D, 3);
    Edge cd = new Edge(C, D, 2);
    graph.put(A, new ArrayList<Edge>(Arrays.asList(ab, ac, ad)));
    graph.put(B, new ArrayList<Edge>(Arrays.asList(ab, bc, bd)));
    graph.put(C, new ArrayList<Edge>(Arrays.asList(ac, bc, cd)));
    graph.put(D, new ArrayList<Edge>(Arrays.asList(ad, bd, cd)));
    return graph;
  }

  @Test
  public void mst_TRIANGLE() {
    // Generate the MST of the TRIANGLE graph

    HashMap<Vertex, ArrayList<Edge>> actual = new OptimizationAlgorithm(TRIANGLE).mst(A);
    Assert.assertEquals(TRIANGLE_MST_A, actual);
  }

  @Test
  public void dfs_TRIANGLE() {
    // Generate the MST of the TRIANGLE graph

    ArrayList<Vertex> expected1 = new ArrayList<>(Arrays.asList(A, B, C));
    ArrayList<Vertex> expected2 = new ArrayList<>(Arrays.asList(A, C, B));
    ArrayList<Vertex> actual = new OptimizationAlgorithm(TRIANGLE).dfs(A, TRIANGLE_MST_A);
    Assert.assertTrue(expected1.equals(actual) || expected2.equals(actual));
  }

  @Test
  public void optimize_TRIANGLE_pickRandomSourceVertex() {
    // Use triangle graph. Choose a random vertex as source. 
    // Algorithm should return a path with the two shortest edges A--B--C.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(ATTR_A, ATTR_B, ATTR_C));
    ArrayList<Attraction> actual = new OptimizationAlgorithm(TRIANGLE).optimize();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void optimize_TRIANGLE_DFSOptimalPath() {
    // Use triangle graph. DFS traversal of MST is the optimal path.
    // Algorithm should return a path with the two shortest edges A--B--C.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(ATTR_A, ATTR_B, ATTR_C));
    ArrayList<Attraction> actual = new OptimizationAlgorithm(TRIANGLE).optimize(A);
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void optimize_TRIANGLE_deleteEdgeForOptimalPath() {
    // Use triangle graph. DFS traversal of MST is not the optimal path, optimal path requires deletion of heaviest edge in cycle.
    // Algorithm should return a path with the two shortest edges A--B--C.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(ATTR_A, ATTR_B, ATTR_C));
    ArrayList<Attraction> actual = new OptimizationAlgorithm(TRIANGLE).optimize(B);
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void optimize_K4_findDFSOptimalPath() {
    // Create complete graph with 4 vertices. DFS traversal of MST is the optimal path.
    // Algorithm should return a path with three shortest edges A--B--C--D.

    ArrayList<Attraction> expected = new ArrayList<>(Arrays.asList(ATTR_A, ATTR_B, ATTR_C, ATTR_D));
    ArrayList<Attraction> actual = new OptimizationAlgorithm(K4).optimize(A);
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void optimize_K4_possiblyFindSuboptimalApproximation() {
    // Create complete graph with 4 vertices. DFS traversal of MST is not the optimal path.
    // Algorithm should return a path 6/5 times length of optimal path C--D--B--A or the optimal path A--B--C--D.

    ArrayList<Attraction> expectedOptimal = new ArrayList<>(Arrays.asList(ATTR_A, ATTR_B, ATTR_C, ATTR_D));
    ArrayList<Attraction> expectedSuboptimal = new ArrayList<>(Arrays.asList(ATTR_C, ATTR_D, ATTR_B, ATTR_A));
    ArrayList<Attraction> actual = new OptimizationAlgorithm(K4).optimize(C);
    Assert.assertTrue(expectedOptimal.equals(actual) || expectedSuboptimal.equals(actual));
  }
}