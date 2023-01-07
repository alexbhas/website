---
title: In Depth | Game of Life
created: 2023-01-02
updated: 2023-01-07
image: /life/game-of-life.webp
tags: ['Projects']
---
---
Many years ago, I was introduced to the concept of Conway's Game of Life. Since then I have been fascinated by how a simple ruleset can create such complex and geometric patterns.

The Game of Life revolves around cells and their neighbours. This can be easily represented by a grid, where an individual cell's neighbours are the adjacent vertical, horizontal, and diagonal 8 cells. A cell is either in an alive or dead state, and this state changes depending on if certain conditions are met. Generally, the game will start with a randomly generated grid of alive and dead cells. Every iteration, the grid will update based on how the cells meet their conditions.

The conditions for each cell are then as follows:  
1. Any live cell with less than 2 live neighbours dies
2. Any live cell either 2 or 3 live neighbours stays alive
3. Any live cell with more than 3 live neighbours dies
4. Any dead cell with exactly 3 live neighbours becomes alive

It is by these simple rules, that the Game of Life is simulated and becomes capable of generating massive and intricate patterns. On a smaller grid size, you can see how a simulation will end, with some groups of cells becoming permenantly alive as they form a pattern that will meet all of the conditions infinitely.

I decided to implement a simple JavaScript version of it, using the HTML canvas to draw squares that represent the cells. I added functionality to pause and reset the game since on the smaller grid that I have chosen the game can end quite quickly as it updates 10 times per second. 

You can view my Game of Life implementation here:  
[Demo](https://alexbhasin.ca/game-of-life/)  
[Github Repository](https://github.com/alexbhas/game-of-life) 