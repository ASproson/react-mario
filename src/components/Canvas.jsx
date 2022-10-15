import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Canvas = () => {
  const [ctx, setContext] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    setContext(canvas.getContext("2d"));
  });

  class Player {
    constructor() {
      this.position = {
        x: 100,
        y: 100,
      };
      this.width = 100;
      this.height = 100;
    }

    draw() {
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  const player = new Player();
  player.draw();

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
