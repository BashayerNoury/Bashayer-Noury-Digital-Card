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

    const getSmokeColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark
        ? { r: 255, g: 255, b: 255 }
        : { r: 100, g: 20, b: 40 };
    };

    // Silk ribbons — half at top, half at bottom
    const ribbons: {
      yBase: number; speed: number; amplitude: number;
      phase: number; thickness: number; opacity: number;
      curve: number; drift: number; zone: "top" | "bottom";
    }[] = [];

    for (let i = 0; i < 8; i++) {
      const zone = i < 4 ? "top" : "bottom";
      const yBase = zone === "top"
        ? h * (0.02 + Math.random() * 0.18)
        : h * (0.80 + Math.random() * 0.18);

      ribbons.push({
        yBase,
        speed: 0.15 + Math.random() * 0.35,
        amplitude: 30 + Math.random() * 60,
        phase: Math.random() * Math.PI * 2,
        thickness: 40 + Math.random() * 100,
        opacity: 0.08 + Math.random() * 0.14,
        curve: 0.8 + Math.random() * 1.5,
        drift: (Math.random() - 0.5) * 0.4,
        zone,
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.006;
      const color = getSmokeColor();

      for (const r of ribbons) {
        ctx.save();
        const points: { x: number; y: number }[] = [];
        const steps = 100;

        for (let i = 0; i <= steps; i++) {
          const progress = i / steps;
          const px = progress * (w + 300) - 150;

          // Silk-like smooth S-curves
          const wave1 = Math.sin(progress * Math.PI * r.curve + r.phase + time * r.speed) * r.amplitude;
          const wave2 = Math.sin(progress * Math.PI * 2 + r.phase * 0.7 + time * r.speed * 0.6) * r.amplitude * 0.35;
          const wave3 = Math.cos(progress * Math.PI * 3 + time * 0.2) * r.amplitude * 0.12;

          // Vertical fade — ribbons drift slightly toward center
          const centerPull = r.zone === "top"
            ? Math.sin(progress * Math.PI) * 30
            : -Math.sin(progress * Math.PI) * 30;

          const py = r.yBase + wave1 + wave2 + wave3 + centerPull + Math.sin(time * 0.15) * 15 * r.drift;
          points.push({ x: px, y: py });
        }

        // Draw multiple soft layers for silk effect
        for (let layer = 0; layer < 3; layer++) {
          const layerThickness = r.thickness * (1 - layer * 0.3);
          const layerOpacity = r.opacity * (1 - layer * 0.2);

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

          const gradient = ctx.createLinearGradient(0, 0, w, 0);
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
          gradient.addColorStop(0.1, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity * 0.4})`);
          gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity})`);
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity * 1.2})`);
          gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity})`);
          gradient.addColorStop(0.9, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity * 0.4})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

          ctx.strokeStyle = gradient;
          ctx.stroke();
        }

        // Thin bright core line for silk highlight
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${r.opacity * 0.5})`;
        ctx.stroke();
        ctx.restore();
      }

      // Soft glow pools at top and bottom
      const glows = [
        { x: w * 0.3, y: h * 0.05, r: 350, o: 0.06 },
        { x: w * 0.7, y: h * 0.08, r: 280, o: 0.05 },
        { x: w * 0.5, y: h * 0.92, r: 350, o: 0.06 },
        { x: w * 0.25, y: h * 0.95, r: 280, o: 0.05 },
        { x: w * 0.75, y: h * 0.9, r: 300, o: 0.04 },
      ];

      for (const g of glows) {
        const gx = g.x + Math.sin(time * 0.25) * 30;
        const gy = g.y + Math.cos(time * 0.2) * 15;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, g.r);
        grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${g.o})`);
        grad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
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
      style={{ filter: "blur(4px)" }}
    />
  );
};

export default SmokeBackground;
