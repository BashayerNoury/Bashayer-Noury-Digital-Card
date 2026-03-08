import { useEffect, useRef } from "react";

const SmokeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Smoke tendrils - flowing silk curves
    const tendrils: {
      x: number;
      y: number;
      speed: number;
      amplitude: number;
      frequency: number;
      phase: number;
      thickness: number;
      opacity: number;
      curve: number;
      drift: number;
    }[] = [];

    for (let i = 0; i < 6; i++) {
      tendrils.push({
        x: -200 + Math.random() * 200,
        y: h * 0.3 + Math.random() * h * 0.4,
        speed: 0.3 + Math.random() * 0.5,
        amplitude: 80 + Math.random() * 120,
        frequency: 0.002 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        thickness: 60 + Math.random() * 140,
        opacity: 0.06 + Math.random() * 0.12,
        curve: 0.5 + Math.random() * 1.5,
        drift: (Math.random() - 0.5) * 0.3,
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      for (const t of tendrils) {
        ctx.save();

        const points: { x: number; y: number }[] = [];
        const steps = 80;

        for (let i = 0; i <= steps; i++) {
          const progress = i / steps;
          const px = progress * (w + 400) - 200;
          const wave1 = Math.sin(progress * Math.PI * t.curve + t.phase + time * t.speed) * t.amplitude;
          const wave2 = Math.sin(progress * Math.PI * 2.5 + t.phase * 1.5 + time * t.speed * 0.7) * t.amplitude * 0.4;
          const wave3 = Math.sin(progress * Math.PI * 4 + time * 0.3) * t.amplitude * 0.15;
          const py = t.y + wave1 + wave2 + wave3 + Math.sin(time * 0.2) * 20 * t.drift;
          points.push({ x: px, y: py });
        }

        // Draw thick gradient stroke
        for (let layer = 0; layer < 3; layer++) {
          const layerThickness = t.thickness * (1 - layer * 0.3);
          const layerOpacity = t.opacity * (1 - layer * 0.25);

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }

          ctx.lineWidth = layerThickness;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Create gradient along the path
          const gradient = ctx.createLinearGradient(0, 0, w, 0);
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
          gradient.addColorStop(0.15, `rgba(255, 255, 255, ${layerOpacity * 0.5})`);
          gradient.addColorStop(0.4, `rgba(255, 255, 255, ${layerOpacity})`);
          gradient.addColorStop(0.6, `rgba(255, 255, 255, ${layerOpacity * 1.1})`);
          gradient.addColorStop(0.85, `rgba(255, 255, 255, ${layerOpacity * 0.5})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.strokeStyle = gradient;
          ctx.stroke();
        }

        // Bright core highlight
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineWidth = 2 + Math.random() * 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${t.opacity * 0.3})`;
        ctx.stroke();

        ctx.restore();
      }

      // Ambient glow spots
      const glows = [
        { x: w * 0.3, y: h * 0.4, r: 300, o: 0.08 },
        { x: w * 0.7, y: h * 0.5, r: 250, o: 0.06 },
        { x: w * 0.5, y: h * 0.45, r: 350, o: 0.05 },
      ];

      for (const g of glows) {
        const gx = g.x + Math.sin(time * 0.3) * 40;
        const gy = g.y + Math.cos(time * 0.25) * 30;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, g.r);
        grad.addColorStop(0, `rgba(255, 255, 255, ${g.o})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(gx - g.r, gy - g.r, g.r * 2, g.r * 2);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: "blur(30px)" }}
    />
  );
};

export default SmokeBackground;
