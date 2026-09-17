# COSMO TRIPPIN'

## Pitch

Cosmo Trippin' is a fast-paced pixel-art arcade game where the player controls an astronaut, dodges obstacles, collects stars, and survives as the space track gets faster.

## How to Play

Move the astronaut between three lanes to avoid obstacles and collect stars.

### Desktop
- Use the `←` and `→` arrow keys to move.
- You can also use `A` and `D`.

### Mobile
- Use the on-screen left and right buttons.

### Goal
- Collect stars to increase your score.
- Avoid asteroids, UFOs, and black holes.
- You have three lives.
- The game gets faster as you collect stars.

## Tools Used

- Figma Make
- ChatGPT
- GitHub
- Vercel
- VS Code
- React
- TypeScript
- HTML
- CSS
- JavaScript
- SVG

## My 3 Best Prompts

### 1. Game Concept

> Create a browser-based vertical arcade game called "Cosmo Trippin". The player controls a pixel-art astronaut moving between three perspective lanes. The player must dodge asteroids, UFOs and black holes, collect stars to increase the score, and survive as the game becomes faster. Include Home, Game and How To Play pages with the same navigation. The game must work on desktop with keyboard controls and on mobile with visible touch controls.

### 2. Visual Style and Assets

> Create the Cosmo Trippin visual style as retro pixel art with a black space background and small white stars. Use a three-lane perspective track with pink on the left lane, yellow in the center, and cyan on the right. Use thick pixel-art outlines and transparent backgrounds for the astronaut, asteroid, UFO, star and black hole assets. Keep the visual identity consistent across the game, buttons and navigation.

### 3. Desktop Game Layout

> Fix only the desktop Game page layout. Keep the existing gameplay, assets, mobile layout, Home page, How To Play page and navigation unchanged. Center the gameplay frame horizontally and position it directly above the navigation so the entire game is visible in the browser without vertical scrolling.

## One Thing the AI Got Wrong and How I Fixed It

The AI-generated desktop Game layout was incorrectly positioned. The gameplay frame was shifted and its lower section could be cut off, which required scrolling to see the complete game.

I inspected the generated React code and manually fixed the desktop positioning and scaling logic. I adjusted the Game container and its available height so the gameplay frame is centered and fits completely above the navigation without requiring vertical scrolling.
