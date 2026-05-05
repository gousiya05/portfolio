import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  layer: number; // 1-3 for parallax depth
  twinkle: number;
  twinkleSpeed: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const NEON_COLORS = [
  '#0ea5e9', // cyan/brand
  '#a855f7', // purple/accent
  '#ec4899', // pink
  '#6366f1', // indigo
  '#22d3ee', // cyan bright
  '#c084fc', // light purple
];

export default function MultiverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const nebulasRef = useRef<NebulaCloud[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const frameRef = useRef(0);
  const lastMouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    // Build particles across 3 parallax layers
    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.min(Math.floor((width * height) / 8000), 180);
      for (let i = 0; i < count; i++) {
        const layer = Math.ceil(Math.random() * 3);
        const speed = 0.08 / layer;
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: (Math.random() * 1.8 + 0.4) / layer,
          color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
          alpha: Math.random() * 0.6 + 0.2,
          layer,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
        });
      }
    };

    const initNebulas = () => {
      nebulasRef.current = [];
      const count = 6;
      for (let i = 0; i < count; i++) {
        nebulasRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 200 + Math.random() * 350,
          color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
          alpha: 0.02 + Math.random() * 0.04,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    initParticles();
    initNebulas();

    const onMouseMove = (e: MouseEvent) => {
      const prev = mouseRef.current;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn ripple when mouse moves fast enough
      if (dist > 20) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 120 + Math.random() * 80,
          alpha: 0.5,
        });
        // cap ripples
        if (ripplesRef.current.length > 12) ripplesRef.current.shift();
      }

      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 0.8 });
      if (trailRef.current.length > 30) trailRef.current.shift();

      lastMouseRef.current = mouseRef.current;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', () => { resize(); initParticles(); initNebulas(); });

    const drawNebulas = () => {
      for (const n of nebulasRef.current) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -n.radius) n.x = width + n.radius;
        if (n.x > width + n.radius) n.x = -n.radius;
        if (n.y < -n.radius) n.y = height + n.radius;
        if (n.y > height + n.radius) n.y = -n.radius;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grad.addColorStop(0, hexAlpha(n.color, n.alpha * 1.5));
        grad.addColorStop(0.5, hexAlpha(n.color, n.alpha));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawParticles = () => {
      const mouse = mouseRef.current;
      const INFLUENCE_RADIUS = 160;

      for (const p of particlesRef.current) {
        // Parallax offset based on layer
        const parallaxFactor = (4 - p.layer) * 0.012;
        const offsetX = (mouse.x - width / 2) * parallaxFactor;
        const offsetY = (mouse.y - height / 2) * parallaxFactor;

        // Mouse repulsion
        const dx = (p.x + offsetX) - mouse.x;
        const dy = (p.y + offsetY) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE_RADIUS && mouse.x > 0) {
          const force = (INFLUENCE_RADIUS - dist) / INFLUENCE_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.12;
          p.vy += Math.sin(angle) * force * 0.12;
        }

        // Damping + move
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Twinkle
        p.twinkle += p.twinkleSpeed;
        const twinkleFactor = 0.5 + 0.5 * Math.sin(p.twinkle);
        const alpha = p.alpha * twinkleFactor;

        const rx = p.x + offsetX;
        const ry = p.y + offsetY;

        // Glow
        const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, p.radius * 4);
        glow.addColorStop(0, hexAlpha(p.color, alpha));
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(rx, ry, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = hexAlpha(p.color, Math.min(alpha * 1.5, 1));
        ctx.beginPath();
        ctx.arc(rx, ry, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawConnections = () => {
      const MAX_DIST = 100;
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          if (ps[i].layer !== ps[j].layer) continue;
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.strokeStyle = hexAlpha(ps[i].color, alpha);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawCursorTrail = () => {
      const trail = trailRef.current;
      if (trail.length < 2) return;

      for (let i = 1; i < trail.length; i++) {
        const alpha = (i / trail.length) * trail[i].alpha * 0.6;
        const color = NEON_COLORS[0];
        ctx.strokeStyle = hexAlpha(color, alpha);
        ctx.lineWidth = 2 * (i / trail.length);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
      }

      // Fade trail points
      for (let i = 0; i < trail.length; i++) {
        trail[i].alpha *= 0.92;
      }
      // Remove fully faded
      while (trail.length > 0 && trail[0].alpha < 0.01) trail.shift();
    };

    const drawCursorGlow = () => {
      const { x, y } = mouseRef.current;
      if (x < 0) return;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, 80);
      grad.addColorStop(0, hexAlpha('#0ea5e9', 0.18));
      grad.addColorStop(0.5, hexAlpha('#a855f7', 0.08));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 80, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRipples = () => {
      ripplesRef.current = ripplesRef.current.filter(r => r.alpha > 0.01);
      for (const r of ripplesRef.current) {
        r.radius += 2.5;
        r.alpha *= 0.94;

        const colorIdx = Math.floor((r.x / width) * NEON_COLORS.length) % NEON_COLORS.length;
        ctx.strokeStyle = hexAlpha(NEON_COLORS[colorIdx], r.alpha);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner slightly brighter ring
        if (r.radius > 10) {
          ctx.strokeStyle = hexAlpha(NEON_COLORS[colorIdx], r.alpha * 0.4);
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const drawScanLine = (t: number) => {
      const y = ((t * 0.2) % height);
      const grad = ctx.createLinearGradient(0, y - 20, 0, y + 20);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, 'rgba(14,165,233,0.025)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, y - 20, width, 40);
    };

    let lastTime = 0;
    const animate = (time: number) => {
      frameRef.current = requestAnimationFrame(animate);
      const dt = time - lastTime;
      lastTime = time;
      if (dt > 100) return; // skip big gaps (tab switching)

      // Dark space background with slight trail
      ctx.fillStyle = 'rgba(3,3,3,0.2)';
      ctx.fillRect(0, 0, width, height);

      drawNebulas();
      drawConnections();
      drawParticles();
      drawCursorTrail();
      drawCursorGlow();
      drawRipples();
      drawScanLine(time);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20"
      style={{ background: '#030303' }}
    />
  );
}

// Helper: hex color with alpha
function hexAlpha(hex: string, alpha: number): string {
  if (alpha <= 0) return 'transparent';
  const a = Math.max(0, Math.min(1, alpha));
  // parse rgb
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}
