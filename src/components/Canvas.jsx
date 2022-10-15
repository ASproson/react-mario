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
  });

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

  const animate = () => {
    if (ctx) {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player.update();
    }
  };

  animate();

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
