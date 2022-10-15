import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import platformImg from "../assets/platform.png";

const Canvas = () => {
  const [ctx, setContext] = useState();
  const [canvas, setCanvas] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    setCanvas(canvasRef.current);
    if (canvas) {
      // if (canvas) required to prevent render until canvas is available
      canvas.width = 1024;
      canvas.height = 576;
      setContext(canvas.getContext("2d"));
    }
  }, [canvas]);

  const gravity = 0.5;

  // default html image class
  const image = new Image();
  image.src = platformImg;

  class Player {
    constructor() {
      this.position = {
        x: 100,
        y: 100,
      };

      this.velocity = {
        x: 0,
        y: 0,
      };

      this.width = 30;
      this.height = 30;
    }

    draw() {
      if (ctx) {
        // if (ctx) required to prevent render until ctx is available
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (canvas) {
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
          this.velocity.y += gravity;
        } else {
          this.velocity.y = 0;
        }
      }
    }
  }

  class Platform {
    constructor({ x, y, image }) {
      this.position = {
        x: x,
        y: y,
      };
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    }

    draw() {
      if (ctx) {
        // if (ctx) required to prevent render until ctx is available
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.image, this.position.x, this.position.y);
      }
    }
  }

  const player = new Player();

  const platforms = [
    new Platform({ x: 200, y: 100, image: image }),
    new Platform({ x: 500, y: 300, image: image }),
  ];

  const keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };

  let scrollOffset = 0;

  const animate = () => {
    if (ctx) {
      // if (ctx) required to prevent render until ctx is available
      requestAnimationFrame(animate);
      ctx.fillStyle = 'white'

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      platforms.forEach((platform) => {
        platform.draw();
      });

      player.update();

      if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
      } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
      } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
          scrollOffset += 5;
          platforms.forEach((platform) => {
            platform.position.x -= 5;
          });
        } else if (keys.left.pressed) {
          scrollOffset -= 5;
          platforms.forEach((platform) => {
            platform.position.x += 5;
          });
        }
        if (scrollOffset > 2000) {
          console.log("you win");
        }
      }

      // Platform collision
      platforms.forEach((platform) => {
        if (
          player.position.y + player.height <= platform.position.y &&
          player.position.y + player.height + player.velocity.y >=
            platform.position.y &&
          player.position.x + player.width >= platform.position.x &&
          player.position.x <= platform.position.x + platform.width
        ) {
          player.velocity.y = 0;
        }
      });
    }
  };

  animate();

  const handleKeyDown = ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        // "A left"
        keys.left.pressed = true;
        break;
      case 68:
        // "D right"
        keys.right.pressed = true;
        break;
      case 83:
        // "S down"
        break;
      case 87:
        // "W up"
        player.velocity.y -= 10;
        break;
    }
  };

  const handleKeyUp = ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        // "A left"
        keys.left.pressed = false;
        break;
      case 68:
        // "D right"
        keys.right.pressed = false;
        break;
      case 83:
        // "S down"
        break;
      case 87:
        // "W up"
        break;
    }
  };

  return (
    <div className="flex justify-center bg-black">
      <canvas
        ref={canvasRef}
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      ></canvas>
    </div>
  );
};

export default Canvas;
