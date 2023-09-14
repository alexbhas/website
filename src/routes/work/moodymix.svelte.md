---
name: MoodyMix
created: 2023-05-23T00:00:00
kind: Web app
summary: A full stack web application that allows users to map songs to different combinations of emotions.
coverImageUrl: /media/projects/blogposts/moody.webp
repo: https://github.com/alexbhas/moodymix
---

![A screenshot of MoodyMix](/media/projects/blogposts/moody.webp)

<script context="module">
  import { load } from "./_load"
  export { load }
</script>

I've wanted to make my first real project with Svelte for quite some time now, since I have been learning it over the past few months. The idea I came up with was for MoodyMix, a web application that allows for users to get song recommendations based off selecting different emotions in a grid.

The app was built using Svelte for the front-end, and Python for the back-end (Flask). I'm using MongoDB as the main database, which stores all of the song information.

Eventually, I will be scaling up this application. The goal is that it will be a website where users can come and create their own list of songs, and then generate a link to their own custom emotion boards, to get recommendations based off that specific user's interpretations of songs. I will be containerizing the application and hosting it on a cloud service.