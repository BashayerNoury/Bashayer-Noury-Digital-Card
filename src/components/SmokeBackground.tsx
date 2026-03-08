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

    // More dramatic, concentrated tendrils like the reference
    const tendrils: {
      x: number; y: number; speed: number; amplitude: number;
      frequency: number; phase: number; thickness: number;
      opacity: number; curve: number; drift: number;
    }[] = [];

    for (let i = 0; i < 8; i++) {
      tendrils.push({
        x: w * 0.2 + Math.random() * w * 0.3,
        y: h * 0.1 + Math.random() * h * 0.8,
        speed: 0.2 + Math.random() * 0.4,
        amplitude: 120 + Math.random() * 200,
        frequency: 0.002 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        thickness: 80 + Math.random() * 200,
        opacity: 0.1 + Math.random() * 0.18,
        curve: 0.8 + Math.random() * 2,
        drift: (Math.random() - 0.5) * 0.5,
      });
    }

    let time = 0;

    const getSmokeColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark
        ? { r: 255, g: 255, b: 255 }
        : { r: 100, g: 20, b: 40 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.006;
      const color = getSmokeColor();

      for (const t of tendrils) {
        ctx.save();
        const points: { x: number; y: number }[] = [];
        const steps = 100;

        for (let i = 0; i <= steps; i++) {
          const progress = i / steps;
          // Vertical sweep - smoke flows from top to bottom through center
          const px = t.x + Math.sin(progress * Math.PI * t.curve + t.phase + time * t.speed) * t.amplitude
            + Math.sin(progress * Math.PI * 3 + time * 0.4) * t.amplitude * 0.3;
          const py = progress * (h + 200) - 100;
          points.push({ x: px + Math.sin(time * 0.15 + progress * 2) * 30 * t.drift, y: py });
        }

        for (let layer = 0; layer < 4; layer++) {
          const layerThickness = t.thickness * (1 - layer * 0.25);
          const layerOpacity = t.opacity * (1 - layer * 0.2);

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

          const gradient = ctx.createLinearGradient(0, 0, 0, h);
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
          gradient.addColorStop(0.2, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity * 0.6})`);
          gradient.addColorStop(0.45, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity})`);
          gradient.addColorStop(0.55, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity * 1.2})`);
          gradient.addColorStop(0.8, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity * 0.6})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

          ctx.strokeStyle = gradient;
          ctx.stroke();
        }

        // Thin bright core line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineWidth = 1.5 + Math.random() * 1.5;
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${t.opacity * 0.5})`;
        ctx.stroke();
        ctx.restore();
      }

      // Concentrated central glow
      const glows = [
        { x: w * 0.4, y: h * 0.3, r: 400, o: 0.12 },
        { x: w * 0.5, y: h * 0.5, r: 350, o: 0.1 },
        { x: w * 0.35, y: h * 0.6, r: 300, o: 0.08 },
        { x: w * 0.55, y: h * 0.35, r: 280, o: 0.07 },
      ];

      for (const g of glows) {
        const gx = g.x + Math.sin(time * 0.25) * 50;
        const gy = g.y + Math.cos(time * 0.2) * 40;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, g.r);
        grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${g.o})`);
        grad.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${g.o * 0.4})`);
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
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ filter: "blur(25px)" }}
      />
      {/* Dark overlay so text remains readable */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-background/40" />
    </>
  );
};

export default SmokeBackground;