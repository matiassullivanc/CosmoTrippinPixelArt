IMPORTANT: Do not redesign the game or change the existing visual style, layout, navigation, controls, scoring system, astronaut design, track, colors, typography, or overall art direction.

Improve ONLY the gameplay difficulty, obstacle variety, obstacle spawning, and progressive speed scaling.

I tested the current game by playing it and the main issue is that the game remains too easy and the speed does not noticeably increase when the astronaut collects stars.

GOAL:
Make the game progressively more challenging and engaging while keeping it fun and playable. The player should immediately feel that collecting more stars causes the game to become faster and more difficult.

1. PROGRESSIVE SPEED SYSTEM

Create a real difficulty progression based on the number of stars collected.

- The initial speed should remain close to the current starting speed.
- Every time the astronaut collects a star, increase the game speed slightly.
- The increase should be cumulative.
- Do NOT reset the speed after collecting another star.
- The speed increase should be noticeable but gradual.
- Avoid making the game suddenly impossible after only a few stars.

Suggested progression:
- 0–2 stars: 100% starting speed
- 3–5 stars: 115%
- 6–9 stars: 130%
- 10–14 stars: 150%
- 15–19 stars: 170%
- 20+ stars: 190–200%

Use smooth interpolation rather than abrupt jumps whenever possible.

The speed should affect the movement of the track/environment and the obstacle spawning cadence so that the entire game genuinely becomes faster, not just the visual animation.

2. MUCH MORE OBSTACLE VARIETY

The current obstacle pattern feels repetitive and predictable.

Create a pool of different obstacle types using the existing visual assets/style whenever possible.

Obstacles should include a mixture of:
- stationary obstacles
- moving obstacles
- obstacles that move horizontally across the track
- obstacles that move vertically
- obstacles that change lane
- narrow obstacles requiring precise positioning
- wider obstacles that block larger portions of the track
- obstacles appearing in different lanes
- combinations of 2 or more obstacles
- occasional obstacle sequences that force the player to quickly change position

Do not make every obstacle behave identically.

3. RANDOMIZED BUT FAIR SPAWNING

Obstacles should spawn in varied positions and patterns.

Avoid:
- always spawning obstacles in the same lane
- predictable repeating patterns
- long periods with no obstacles
- impossible combinations where every lane is blocked
- obstacles spawning directly on top of the astronaut
- unavoidable collisions

Always leave at least one reasonable path for the astronaut to survive.

Introduce different spacing between obstacles so the player cannot simply memorize the timing.

4. DIFFICULTY SHOULD SCALE WITH STARS

As the star count increases:

- increase obstacle movement speed
- slightly reduce the average time between obstacles
- introduce more complex obstacle patterns
- gradually increase the probability of moving obstacles
- gradually increase the probability of multiple obstacles appearing together
- introduce more demanding patterns at higher star counts

However, maintain a fair difficulty curve.

The first few stars should be easy enough for the player to understand the mechanics.

Around 5–10 stars, the player should clearly notice that the game is getting faster.

Around 10–20 stars, the player should need significantly better reflexes.

Beyond 20 stars, the game should feel challenging and require active concentration.

5. OBSTACLE PATTERN TIERS

Create difficulty tiers:

TIER 1 — 0–4 STARS
- Simple obstacles
- Large gaps
- Mostly stationary obstacles
- Low movement speed

TIER 2 — 5–9 STARS
- More frequent obstacles
- Different lanes
- Some moving obstacles
- Smaller gaps

TIER 3 — 10–14 STARS
- Faster obstacles
- Multiple obstacle combinations
- More lane changes
- Less predictable spacing

TIER 4 — 15–19 STARS
- Fast-moving obstacles
- More complex combinations
- Narrower safe paths
- Faster spawning

TIER 5 — 20+ STARS
- Maximum difficulty
- Highly varied obstacle patterns
- Fast movement
- Complex combinations
- Very short reaction windows, but ALWAYS leave a survivable path

6. STAR COLLECTION SHOULD FEEL IMPORTANT

Make the star count directly control the difficulty.

When a star is collected:
- increase the speed
- update the difficulty level internally
- immediately apply the new speed to future obstacle movement/spawning
- preserve the existing score behavior

The player should be able to feel that collecting stars makes the game progressively harder.

Do NOT change how stars look or how they are collected unless absolutely necessary.

7. KEEP THE GAME FAIR

This is extremely important.

The difficulty should come from requiring better reactions, NOT from unavoidable random deaths.

Before spawning an obstacle combination:
- ensure there is always at least one viable lane/path
- avoid spawning obstacles directly where the astronaut currently is
- account for the astronaut's movement speed and the current game speed
- ensure the player has enough reaction time to respond

8. VISUAL FEEDBACK

Keep the current visual design exactly as it is.

Do not add new UI elements unless necessary.

If there is already a score/star counter, use the existing counter to reflect progression.

The game should communicate difficulty primarily through gameplay speed and obstacle behavior, not through a redesign.

9. PERFORMANCE

Keep the implementation lightweight and smooth.

Avoid creating hundreds of objects simultaneously.

Use efficient obstacle spawning/destruction and prevent old obstacles from accumulating off-screen.

10. MOST IMPORTANT

Do not just make the game spawn more obstacles.

Implement an actual difficulty system:

STAR COUNT → GAME SPEED → OBSTACLE SPEED → SPAWN FREQUENCY → OBSTACLE COMPLEXITY

The game should start relatively easy and progressively become faster, more varied, less predictable, and more demanding as the astronaut collects stars.

After implementing this, test the game by playing through at least 20 star collections and verify that the difficulty at 15–20 stars is clearly and substantially higher than at the beginning.

Do not change anything unrelated to gameplay difficulty.