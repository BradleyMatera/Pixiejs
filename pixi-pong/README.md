# PixiJS Pong Game

## Overview

This project is a simple Pong game built using the PixiJS library. It features two paddles, a ball, and four borders that interact dynamically. The ball bounces off the borders, changes direction when it collides with the paddles, and resets upon scoring. Additionally, the game includes collision detection with all four borders, stopping the game and displaying an alert when all borders have been hit.

## Features

- **Dynamic Gameplay**:
  - Two paddles controlled via keyboard input (`W`/`S` for the left paddle, `ArrowUp`/`ArrowDown` for the right paddle).
  - A ball that moves dynamically across the screen and interacts with paddles and borders.
- **Borders**:
  - Four borders around the screen, each with a unique color.
  - Collision detection for each border.
  - Borders dim when hit to provide visual feedback.
- **Game End**:
  - The game stops and alerts the user when the ball has hit all four borders.
- **Score Tracking**:
  - Keeps track of scores for both players and updates the display in real time.
- **Interactive Net**:
  - A visual divider in the middle of the screen to enhance gameplay aesthetics.

## How to Play

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-repo/pixi-pong.git
   cd pixi-pong

	2.	Install dependencies:

npm install


	3.	Run the application:

npm start


	4.	Open the game in your browser at http://localhost:1234.
	5.	Controls:
	•	Left Paddle:
	•	W: Move up
	•	S: Move down
	•	Right Paddle:
	•	ArrowUp: Move up
	•	ArrowDown: Move down
	6.	Play the game by bouncing the ball between the paddles and hitting the borders.

Dependencies

	•	PixiJS - A 2D rendering library for creating rich interactive graphics.

Code Highlights

Ball Movement and Collision

The ball moves dynamically, and its direction changes upon collision with the paddles or borders:

ball.move();
if (hitTestRectangle(ball, leftPaddle) || hitTestRectangle(ball, rightPaddle)) {
  ball.vx = -ball.vx;
}

Border Collision Detection

Each border detects when it has been hit, changes its color, and stops the game when all borders are hit:

checkBorderCollision(ball);
if (hitBorders.size === 4) {
  app.ticker.stop();
  alert('All borders have been hit! Game Over.');
}

Score Tracking

Scores for both players are updated dynamically:

if (ball.x <= 0) {
  rightScore++;
  updateScores();
  ball.reset();
}

Future Enhancements

	•	Add sound effects for paddle and border collisions.
	•	Implement a difficulty mode with increased ball speed.
	•	Introduce power-ups for gameplay variation.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Enjoy playing Pong and exploring PixiJS!

