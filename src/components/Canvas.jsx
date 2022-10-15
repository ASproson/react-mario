import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Canvas = () => {
  const [ctx, setContext] = useState();
  const [canvas, setCanvas] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    setCanvas(canvasRef.current);
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setContext(canvas.getContext("2d"));
    }
  }, [canvas]);

  const gravity = 0.5;

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

  const player = new Player();
  const keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };

  const animate = () => {
    if (ctx) {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player.update();
      if (keys.right.pressed) {
        player.velocity.x = 5;
      } else if (keys.left.pressed) {
        player.velocity.x = -5;
      } else {
        player.velocity.x = 0;
      }
    }
  };

  animate();

  // player.velocity.y -= 10;

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
    <div>
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
