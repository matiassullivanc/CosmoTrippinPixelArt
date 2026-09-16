Build the complete “Cosmo Trippin” browser game from scratch, using the attached design proposal image as the primary visual and interaction reference.

IMPORTANT:
Do not reuse or preserve any previous implementation. Start the project from zero.

The attached reference is the visual source of truth. Recreate its overall composition, visual hierarchy, layout, typography, colors, pixel-art aesthetic, UI structure, game screen, navigation, and interaction model as closely as possible.

GAME CONCEPT

Cosmo Trippin is a fast-paced arcade space game.

The player controls a small astronaut travelling forward through a three-lane space highway.

The player must:
- Move between the left, center, and right lanes.
- Dodge asteroids, UFOs, and black holes.
- Collect yellow stars.
- Survive as long as possible.
- Earn points by collecting stars.
- Gradually increase the game speed and difficulty.

The core gameplay loop is:

MOVE → DODGE → COLLECT → SCORE → FASTER

SITE STRUCTURE

Create exactly three navigable pages/views with the same persistent navigation:

1. HOME / START
2. GAME
3. HOW TO PLAY

The navigation should clearly allow the user to move between all three pages.

HOME / START PAGE

Recreate the Home composition from the reference.

Include:
- Large “COSMO TRIPPIN” pixel-art title.
- Subtitle: “DODGE • COLLECT • SURVIVE”
- Short game description.
- “WHO IT’S FOR” section.
- “WHY” section.
- Large “START GAME” button.
- Best score display.
- Astronaut artwork.
- Space background and decorative planets/stars.
- Persistent navigation with HOME, GAME and HOW TO PLAY.

The START GAME button must actually navigate to the Game page and begin/reset a playable game session.

GAME PAGE

Recreate the central gameplay composition from the reference.

The gameplay area must contain:
- A dark space background with pixel-art stars.
- A perspective three-lane track.
- Three visually distinct lanes using the reference palette:
  pink/magenta, yellow, and cyan/teal.
- A player astronaut positioned near the bottom of the track.
- Asteroids as hazards.
- UFOs as hazards.
- Black holes as hazards.
- Yellow collectible stars.
- Score HUD.
- Three lives represented visually.
- Best score HUD.
- Left and right movement controls.
- Clear visual feedback when the player collects an item or collides with a hazard.
- Increasing game speed over time.

GAMEPLAY FUNCTIONALITY

Implement real playable game logic.

The astronaut must be able to switch between exactly three lanes.

Desktop:
- Support keyboard controls using Left Arrow / Right Arrow.
- Also support A / D.
- Keyboard controls must work reliably.

Mobile:
- Provide large visible touch buttons for moving left and right.
- Touch controls must work on phones and tablets.
- Do not rely on keyboard controls on mobile.

The player cannot move outside the three available lanes.

Hazards and collectibles should move toward the player to create the feeling of forward motion.

Collision detection must work between:
- Player and asteroid
- Player and UFO
- Player and black hole
- Player and star

When the player hits a hazard:
- Remove one life.
- Provide clear visual feedback.
- Do not communicate the result through colour alone.
- Include an explicit visual/textual indication such as “HIT!”, “LIFE LOST”, or an equivalent non-colour cue.

When the player collects a star:
- Increase the score by 100.
- Provide clear visual feedback.
- Include a textual or iconic indication of the successful collection.

When all three lives are lost:
- Stop gameplay.
- Show a clear GAME OVER state.
- Display the final score.
- Display the best score.
- Provide a clearly labeled “PLAY AGAIN” / “RESTART” action.
- Do not communicate GAME OVER only through colour.

BEST SCORE

Persist the best score using localStorage so that it remains available after refreshing the page.

GAME DIFFICULTY

The game should gradually become faster and harder during play.

Increase the movement/spawn speed progressively over time.

The increasing difficulty should be noticeable but still playable.

HOW TO PLAY PAGE

Recreate the How To Play composition from the reference.

Clearly explain:
- MOVE LEFT / RIGHT
- DODGE HAZARDS
- COLLECT STARS
- SURVIVE
- The three-lane movement system.
- The keyboard controls.
- The mobile touch controls.
- The scoring system.
- The fact that the game becomes faster.

Show visual representations/icons for:
- Astronaut
- Asteroid
- UFO
- Black hole
- Star
- Left/right controls

Include a clear “PLAY NOW” button that navigates to the Game page.

VISUAL DESIGN

The attached proposal is the primary visual reference.

Match its visual language closely:
- Retro pixel-art arcade aesthetic.
- Strong 8-bit / 16-bit inspired appearance.
- Dark deep-space background.
- Bright neon magenta/pink.
- Bright yellow.
- Cyan/teal.
- White/off-white highlights.
- Pixelated borders.
- Pixel-style UI panels.
- Chunky pixel typography.
- High contrast.
- Stars, planets, UFOs, black holes and asteroids as decorative/game elements.
- Avoid generic modern SaaS UI.
- Avoid soft gradients and smooth corporate illustrations.
- Avoid realistic 3D graphics.
- Avoid replacing the pixel-art aesthetic with generic vector illustrations.

Use the reference composition and proportions as closely as possible while adapting them responsively.

RESPONSIVE DESIGN

The entire experience must be responsive and work properly on both desktop and mobile.

Desktop:
- Preserve the large arcade composition and three-lane gameplay area.
- Make efficient use of wide screens.
- Keep controls and HUD clearly visible.

Mobile:
- Adapt the layout to narrow portrait screens.
- Keep the three lanes fully visible and playable.
- Keep the astronaut and hazards appropriately scaled.
- Keep the HUD readable.
- Make left/right touch controls large enough to tap comfortably.
- Prevent horizontal scrolling.
- Do not simply shrink the desktop layout until it becomes unusable.
- Reflow UI sections when necessary while preserving the visual hierarchy of the reference.
- Navigation must remain usable on small screens.
- The game must remain playable with touch only.

ACCESSIBILITY AND INTERACTION

All interactive controls must have clear focus states.

Keyboard users must be able to identify which interactive element currently has focus.

Buttons and controls must have meaningful accessible labels.

Do not rely on colour alone to communicate:
- collisions
- success
- game over
- selected states
- focus
- score/life changes

Use text, icons, shapes, borders, animation, or other explicit visual feedback in addition to colour.

IMPLEMENTATION

Build a functional browser game rather than a static mockup.

Keep the implementation simple and self-contained.

Do not add:
- multiplayer
- login/authentication
- databases
- 3D engines
- physics engines
- unnecessary external services
- unnecessary dependencies

Prioritize a clean, understandable implementation and reliable gameplay.

The final result should feel like the interactive version of the attached Cosmo Trippin design proposal, not a generic arcade game.