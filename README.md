# weather-idle-game
This is a browser-based idle clicker-style game in which the player defends a city from dangerous weather-related natural disasters.

## Features
- Auto-saving/loading with local storage
- Multiple difficulty levels
- Idle coin generation
- Simple gameplay loop

## How to play
To play the game, visit [the GitHub Pages link](https://cloudsterwx.github.io/weather-idle-game/).

Alternatively, to run the game locally, you can clone the repository by running this command:
```
git clone https://github.com/cloudsterwx/weather-idle-game
```
Then, open the index.html file in a browser.
```
open index.html
```

Within the game itself, there are two main forms of "currency": coins and defense units. The gameplay loop is overall quite simple:
- Press the "Generate Coins" button to generate coins.
- Use these coins to buy defenses in the form of items, which add a specified amount of defense units. The price of such items increases exponentially with purchases.
- On a cycle, storms of different types will reduce your defenses. This cycle repeats in increments of 30s on easy difficulty, 25s on medium difficulty, 20s on hard difficulty, and 15s on challenge difficulty. The first wave is always 30 seconds long. **If your defense unit count drops below 0, you lose, a "Game Over" screen appears, and you must start over.**
- If you survive a storm cycle, your coins per click are increased. Additionally, you begin to receive some amount of idle coins every second (unless paused).
- At any time, you can pause the game by clicking any option in the main menu.

Some more things:
- The difficulty can be adjusted in the in-game "Options" menu after starting the game.
- The game autosaves to local storage every 1s, with no manual saving.
- To restore progress from an autosave, press "Load From Save" on the start screen. "Start New Game" overwrites any previous save data.
- Clearing cookies & site data may result in save data being lost.
To win, the user must purchase the final shop item, which costs 10 million coins.

## Other notes
- Because this project uses JavaScript, your browser must both support JavaScript and have JavaScript enabled. By extension, your browser should be adequately modern & up-to-date.
- There is expansion potential in this game, including possible rebirth and more graphical features.