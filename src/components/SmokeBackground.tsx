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

    // Yin-yang flowing tendrils — orbit around center in opposing S-curves
    const tendrils: {
      angleOffset: number; radiusBase: number; speed: number;
      amplitude: number; thickness: number; opacity: number;
      phaseShift: number; layers: number;
    }[] = [];

    const count = 8;
    for (let i = 0; i < count; i++) {
      tendrils.push({
        angleOffset: (i / count) * Math.PI * 2,
        radiusBase: 120 + Math.random() * 100,
        speed: 0.15 + Math.random() * 0.15,
        amplitude: 40 + Math.random() * 60,
        thickness: 50 + Math.random() * 120,
        opacity: 0.05 + Math.random() * 0.1,
        phaseShift: Math.random() * Math.PI * 2,
        layers: 3,
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.006;
      const color = getSmokeColor();
      const cx = w / 2;
      const cy = h / 2;

      for (const t of tendrils) {
        ctx.save();
        const points: { x: number; y: number }[] = [];
        const steps = 100;

        for (let i = 0; i <= steps; i++) {
          const progress = i / steps;
          const angle = t.angleOffset + progress * Math.PI * 2 + time * t.speed;

          // Yin-yang S-curve: radius modulates with a sine that creates the teardrop shape
          const yinYangCurve = Math.sin(progress * Math.PI * 2 + t.phaseShift + time * 0.3);
          const radius = t.radiusBase + yinYangCurve * t.amplitude;

          // Add organic wobble
          const wobble = Math.sin(progress * Math.PI * 6 + time * 0.5) * 15;

          const px = cx + Math.cos(angle) * (radius + wobble);
          const py = cy + Math.sin(angle) * (radius + wobble) * 0.85; // slight vertical compression
          points.push({ x: px, y: py });
        }

        for (let layer = 0; layer < t.layers; layer++) {
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

          // Radial-style gradient along the path
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, t.radiusBase + t.amplitude);
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity * 0.3})`);
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

          ctx.strokeStyle = gradient;
          ctx.stroke();
        }

        ctx.restore();
      }

      const glows = [
        { x: w * 0.3, y: h * 0.4, r: 300, o: 0.08 },
        { x: w * 0.7, y: h * 0.5, r: 250, o: 0.06 },
        { x: w * 0.5, y: h * 0.45, r: 350, o: 0.05 },
      ];

      const color2 = getSmokeColor();
      for (const g of glows) {
        const gx = g.x + Math.sin(time * 0.3) * 40;
        const gy = g.y + Math.cos(time * 0.25) * 30;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, g.r);
        grad.addColorStop(0, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${g.o})`);
        grad.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0)`);
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
