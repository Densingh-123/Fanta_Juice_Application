import React, { useState, useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef(null);
  const layerCount = 3; // 3 layers for parallax
  const speeds = [0.05, 0.1, 0.2]; // Slower speeds for distant stars
  const baseStarCount = 50; // Base count of stars per layer
  let shootingStar = null;

  let stars = [];

  // Generate a random gray color for stars
  const getRandomGrayColor = () => {
    const grayValue = Math.floor(Math.random() * 256);
    return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
  };

  // Resize the canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
  };

  // Create the starfield
  const createStars = () => {
    stars = [];
    const canvas = canvasRef.current;
    const scalingFactor = Math.max(canvas.width, canvas.height) / 1000; // Scale star count
    for (let i = 0; i < layerCount; i++) {
      const starCount = Math.floor(baseStarCount * scalingFactor * (i + 1));
      for (let j = 0; j < starCount; j++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (i + 1) + 0.5, // Larger stars for closer layers
          speed: speeds[i],
          opacity: Math.random(),
          baseOpacity: Math.random() * 0.5 + 0.5, // Base opacity for twinkling
          layer: i, // Track which layer the star belongs to
        });
      }
    }
  };

  // Update star positions and simulate twinkling
  const updateStars = () => {
    stars.forEach((star) => {
      star.y -= star.speed; // All stars move upward
      star.opacity = star.baseOpacity + Math.sin(Date.now() * 0.001 * star.speed) * 0.3; // Smooth twinkle

      // Reset star position when it goes off-screen
      if (star.y < 0) {
        star.y = canvasRef.current.height;
        star.x = Math.random() * canvasRef.current.width;
      }
    });
  };

  // Draw the stars
  const drawStars = (ctx) => {
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add a dark radial blur gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 8, // Start small for a blur effect
      canvas.width / 2,
      canvas.height / 2,
      canvas.width // Expand to the edges
    );
    gradient.addColorStop(0, "gray"); // Deep dark blue at the center
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)"); // Black at the edges
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars with parallax effect
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });
  };

  // Initialize a shooting star
  const createShootingStar = () => {
    const startX = Math.random() * canvasRef.current.width;
    const startY = Math.random() * canvasRef.current.height;
    const angle = Math.random() * Math.PI * 2; // Random direction
    const length = Math.random() * 300 + 100; // Random trail length
    const speed = Math.random() * 4 + 2;

    shootingStar = {
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      opacity: 1,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
    };

    // Schedule the next shooting star (20–40 seconds for rare appearance)
    const nextAppearance = Math.random() * 20000 + 20000;
    setTimeout(createShootingStar, nextAppearance);
  };

  // Update shooting star position
  const updateShootingStar = () => {
    if (!shootingStar) return;

    shootingStar.x += shootingStar.dx;
    shootingStar.y += shootingStar.dy;
    shootingStar.opacity -= 0.01;

    if (
      shootingStar.opacity <= 0 ||
      shootingStar.x < 0 ||
      shootingStar.x > canvasRef.current.width ||
      shootingStar.y < 0 ||
      shootingStar.y > canvasRef.current.height
    ) {
      shootingStar = null; // Remove shooting star
    }
  };

  // Draw the shooting star
  const drawShootingStar = (ctx) => {
    if (!shootingStar) return;

    const gradient = ctx.createLinearGradient(
      shootingStar.x,
      shootingStar.y,
      shootingStar.x - shootingStar.dx * shootingStar.length,
      shootingStar.y - shootingStar.dy * shootingStar.length
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - shootingStar.dx * shootingStar.length,
      shootingStar.y - shootingStar.dy * shootingStar.length
    );
    ctx.stroke();
    ctx.closePath();
  };

  // Animation loop
  const animate = () => {
    const ctx = canvasRef.current.getContext("2d");
    updateStars();
    updateShootingStar();
    drawStars(ctx);
    drawShootingStar(ctx);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas();
    createStars();
    setTimeout(createShootingStar, Math.random() * 20000 + 20000); // Rare shooting stars
    animate();

    // Handle resizing
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />;
};

export default Starfield;
