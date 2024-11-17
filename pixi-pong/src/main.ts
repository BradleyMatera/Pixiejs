import { Application, Graphics } from 'pixi.js';

// Create the PixiJS application without initial options
const app = new Application();

// Initialize the application with specified options
app.init({
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
}).then(() => {
  // Add the canvas to the DOM after initialization
  document.body.appendChild(app.canvas);

  // Paddle class
  class Paddle extends Graphics {
    constructor(x: number, y: number) {
      super();
      this.beginFill(0xffffff);
      this.drawRect(0, 0, 10, 100);
      this.endFill();
      this.x = x;
      this.y = y;
      app.stage.addChild(this);
    }
  }

  // Ball class
  class Ball extends Graphics {
    vx: number;
    vy: number;

    constructor(x: number, y: number) {
      super();
      this.beginFill(0xffffff);
      this.drawCircle(0, 0, 10);
      this.endFill();
      this.x = x;
      this.y = y;
      this.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
      this.vy = 5 * (Math.random() > 0.5 ? 1 : -1);
      app.stage.addChild(this);
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off top and bottom
      if (this.y <= 0 || this.y >= app.renderer.screen.height - this.height) {
        this.vy = -this.vy;
      }
    }

    reset() {
      this.x = app.renderer.screen.width / 2;
      this.y = app.renderer.screen.height / 2;
      this.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
      this.vy = 5 * (Math.random() > 0.5 ? 1 : -1);
    }
  }

  // Create paddles
  const leftPaddle = new Paddle(50, app.renderer.screen.height / 2 - 50);
  const rightPaddle = new Paddle(app.renderer.screen.width - 60, app.renderer.screen.height / 2 - 50);

  // Create ball
  const ball = new Ball(app.renderer.screen.width / 2, app.renderer.screen.height / 2);

  // Input keys using a Set
  const keys = new Set<string>();

  window.addEventListener('keydown', (e) => {
    keys.add(e.key);
  });

  window.addEventListener('keyup', (e) => {
    keys.delete(e.key);
  });

  // Game loop
  app.ticker.add(() => {
    // Move paddles
    if (keys.has('w') && leftPaddle.y > 0) {
      leftPaddle.y -= 5;
    }
    if (keys.has('s') && leftPaddle.y < app.renderer.screen.height - leftPaddle.height) {
      leftPaddle.y += 5;
    }
    if (keys.has('ArrowUp') && rightPaddle.y > 0) {
      rightPaddle.y -= 5;
    }
    if (keys.has('ArrowDown') && rightPaddle.y < app.renderer.screen.height - rightPaddle.height) {
      rightPaddle.y += 5;
    }

    // Move ball
    ball.move();

    // Check for paddle collision
    if (hitTestRectangle(ball, leftPaddle) || hitTestRectangle(ball, rightPaddle)) {
      ball.vx = -ball.vx;
    }

    // Check for scoring
    if (ball.x <= 0 || ball.x >= app.renderer.screen.width - ball.width) {
      ball.reset();
    }
  });

  // Hit test function
  function hitTestRectangle(r1: Graphics, r2: Graphics): boolean {
    const r1Bounds = r1.getBounds();
    const r2Bounds = r2.getBounds();

    return (
      r1Bounds.x + r1Bounds.width > r2Bounds.x &&
      r1Bounds.x < r2Bounds.x + r2Bounds.width &&
      r1Bounds.y + r1Bounds.height > r2Bounds.y &&
      r1Bounds.y < r2Bounds.y + r2Bounds.height
    );
  }

// Create borders
const borderThickness = 20;
const borders = [
  { graphic: new Graphics(), hit: false }, // Top
  { graphic: new Graphics(), hit: false }, // Bottom
  { graphic: new Graphics(), hit: false }, // Left
  { graphic: new Graphics(), hit: false }, // Right
];

// Add borders to the stage
borders.forEach((border, index) => {
  border.graphic.beginFill([0xff0000, 0x00ff00, 0x0000ff, 0xffff00][index]); // Assign different colors
  if (index === 0) border.graphic.drawRect(0, 0, app.renderer.screen.width, borderThickness); // Top
  if (index === 1) border.graphic.drawRect(0, app.renderer.screen.height - borderThickness, app.renderer.screen.width, borderThickness); // Bottom
  if (index === 2) border.graphic.drawRect(0, 0, borderThickness, app.renderer.screen.height); // Left
  if (index === 3) border.graphic.drawRect(app.renderer.screen.width - borderThickness, 0, borderThickness, app.renderer.screen.height); // Right
  border.graphic.endFill();
  app.stage.addChild(border.graphic);
});

// Track which borders are hit
const hitBorders = new Set();

// Check for border collisions and update the hit state
function checkBorderCollision(ball) {
  if (ball.y - 10 <= borderThickness && !hitBorders.has(0)) {
    ball.vy = -ball.vy;
    hitBorders.add(0);
    borders[0].graphic.tint = 0x888888; // Dim the color to indicate a hit
  }
  if (ball.y + 10 >= app.renderer.screen.height - borderThickness && !hitBorders.has(1)) {
    ball.vy = -ball.vy;
    hitBorders.add(1);
    borders[1].graphic.tint = 0x888888; // Dim the color to indicate a hit
  }
  if (ball.x - 10 <= borderThickness && !hitBorders.has(2)) {
    ball.vx = -ball.vx;
    hitBorders.add(2);
    borders[2].graphic.tint = 0x888888; // Dim the color to indicate a hit
  }
  if (ball.x + 10 >= app.renderer.screen.width - borderThickness && !hitBorders.has(3)) {
    ball.vx = -ball.vx;
    hitBorders.add(3);
    borders[3].graphic.tint = 0x888888; // Dim the color to indicate a hit
  }

  // End game if all borders are hit
  if (hitBorders.size === 4) {
    app.ticker.stop();
    alert('All borders have been hit! Game Over.');
  }
}

// Update game loop to include border collision detection
app.ticker.add(() => {
  // Move ball
  ball.move();

  // Check for border collisions
  checkBorderCollision(ball);
});

});