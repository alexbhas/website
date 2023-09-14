---
name: Dark Mode Colours Tool
created: 2023-01-02T00:00:00
kind: Web app
summary: A developer tool that allows users to select background/foreground colours that pass contrast ratio requirements.
coverImageUrl: /media/projects/blogposts/dark-mode.webp
repo: https://github.com/alexbhas/RTOS-Fitness-Centre
url: https://dark-mode-colours-tool-alexbhas.vercel.app/
---

![A screenshot of the Dark Mode Colours Tool](/media/projects/blogposts/dark-mode.webp)

<script context="module">
  import { load } from "./_load"
  export { load }
</script>

I came up with the idea for this web application while designing a website. I wanted to implement a dark mode theme to the website that only changed the background colour and not the foreground colours. The problem with this though, is that the foreground colour would have to pass the WCAG contrast check for both background colours. As I tried different colours and found none that would work, I started to look for a tool that could provide me with the colours. I could not find anything that useful, so I decided to make the tool myself. 

The tool works by entering two HTML colour codes. Then, the application will generate some of the colours that pass the contrast check for both of the background colours. I say _some_ as there are way too many combinations of colours to check, so I shortened the list by skipping many colours, but still including ones that are relatively close to them. The tool will display all of the colours in a scrollable grid, showing the colour, its code, and rgb value.

Implementing this took quite some thought. The first thing that needs to be done with the inputted values is converting them from hex to RGB, so that their luminance can be calculated. This is important as the contrast ratio is calculated using the luminance of the two colours. To calculate the luminance, we use the formula `L = 0.2126 * R + 0.7152 * G + 0.0722 * B` where R, G, and B are modified versions of our original RGB values. You can read more about this here:
[w3.org](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance)

With the values the user entered converted, we then iterate over all of the RGB values, skipping over many values since there are over 16 million possible colours. This does not hinder the results that much in my opinion, as for example if there were thousands of shades of blue that would pass the contrast check, many of them would be indistinguishably different from eachother, and so they could be easily represented by less shades.