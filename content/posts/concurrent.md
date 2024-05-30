---
title: Concurrent Fitness Centre
summary: |
    Simulated embedded software for a fitness centre written in C using QNX Neutrino.
description: |
    Simulated embedded software for a fitness centre written in C using QNX Neutrino.
date: 2023-01-02
---

For my group's final project in the 'Real Time Operating Systems' class, we created back-end monitoring software for a fitness centre as well as a web application that displays the statistics of the centre.

The back-end was written in C, making use of the QNX Neutrino operating system and its exclusive libraries. This allowed us to create a monitoring server and many clients that kept track of the different areas of the gym and variables relating to those areas. For example, the tempertaute of the pool and sauna is always tracked, emergencies are tracked, heart rates on cardio machines, etc. The use of an RTOS allows for a very fast response time which would be very beneficial in the environment of a fitness centre where many things are going on at once.

The front-end was written in JavaScript, and made use of libraries such as Plotly.js to display statistical information about the events occuring in the gym. It displays average temperatures, amounts of emergencies/mishaps, and other information that would be useful to have information for in a fitness centre.

[Github Repository](https://github.com/alexbhas/RTOS-Fitness-Centre)
