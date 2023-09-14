---
name: RFID Binary Tree Collision Avoidance
created: 2023-04-23T00:00:00
kind: Python application / research simulation
summary: A Python simulation that re-creates the work of an RFID anti collision algorithms research paper.
coverImageUrl: /media/projects/blogposts/rfid.webp
repo: https://github.com/alexbhas/RFID-Binary-Tree-Collision-Avoidance
---

![An image depicting RFID](/media/projects/blogposts/rfid.webp)

<script context="module">
  import { load } from "./_load"
  export { load }
</script>

This is a Python simulation for the COMP 4203 project, which replicates the work of Cheng and Jin's research paper, [Analysis and Simulation of RFID Anti-collision Algorithms](https://ieeexplore.ieee.org/abstract/document/4195229). The purpose of the project is to compare the performance of the Binary Tree RFID anti-collision algorithm against other anti-collision methods, specifically focusing on the effectiveness of the Binary Tree algorithm approach to tag identification and collision avoidance by evaluating the number of slots taken to differentiate all tags.