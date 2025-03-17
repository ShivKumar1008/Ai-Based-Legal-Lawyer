import { useEffect, useRef } from "react";

const JusticeLadyShader = () => {
  const canvasRef = useRef(null);
  const imageSrc ="../assets/pppp-removebg-preview.png"; // Tumhara PNG path

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      animateEffect(ctx, img);
    };
  }, []);

  const animateEffect = (ctx, img) => {
    let yPos = -img.height; // Start position of shine

    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0);

      // Create a gradient shine effect
      const gradient = ctx.createLinearGradient(0, yPos, 0, yPos + 50);
      gradient.addColorStop(0, "rgba(255, 215, 0, 0.1)"); // Light gold
      gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.8)"); // Bright center
      gradient.addColorStop(1, "rgba(255, 215, 0, 0.1)"); // Light fade

      ctx.fillStyle = gradient;
      ctx.fillRect(0, yPos, img.width, 50);

      yPos += 2; // Speed of effect
      if (yPos > img.height) yPos = -50; // Loop effect

      requestAnimationFrame(draw);
    };
    draw();
  };

  return <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />;
};

export default JusticeLadyShader;
