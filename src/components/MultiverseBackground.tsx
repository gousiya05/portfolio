import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
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
      const count = Math.min(Math.floor((width * height) / 4000), 250); // Increased density
      for (let i = 0; i < count; i++) {
        const layer = Math.ceil(Math.random() * 3);
        const speed = (0.5 / layer) + Math.random() * 0.8; // Increased base speed
        const baseVx = (Math.random() - 0.5) * speed;
        const baseVy = (Math.random() - 0.5) * speed;
        
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: (Math.random() * 2.5 + 0.5) / layer, // Slightly larger
          color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
          alpha: Math.random() * 0.7 + 0.3, // Brighter
          layer,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.05 + Math.random() * 0.08, // Faster twinkle
        });
      }
    };

    const initNebulas = () => {
      nebulasRef.current = [];
      const count = 8; // More nebulas
      for (let i = 0; i < count; i++) {
        nebulasRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 200 + Math.random() * 450,
          color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
          alpha: 0.03 + Math.random() * 0.05, // Slightly more visible
          vx: (Math.random() - 0.5) * 0.3, // Faster nebulas
          vy: (Math.random() - 0.5) * 0.3,
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
      if (dist > 15) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 150 + Math.random() * 100, // Bigger ripples
          alpha: 0.6,
        });
        // cap ripples
        if (ripplesRef.current.length > 15) ripplesRef.current.shift();
      }

      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 0.8 });
      if (trailRef.current.length > 40) trailRef.current.shift();

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
      const INFLUENCE_RADIUS = 200; // Larger mouse influence

      for (const p of particlesRef.current) {
        // Parallax offset based on layer
        const parallaxFactor = (4 - p.layer) * 0.015;
        const offsetX = (mouse.x - width / 2) * parallaxFactor;
        const offsetY = (mouse.y - height / 2) * parallaxFactor;

        // Mouse repulsion
        const dx = (p.x + offsetX) - mouse.x;
        const dy = (p.y + offsetY) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE_RADIUS && mouse.x > 0) {
          const force = (INFLUENCE_RADIUS - dist) / INFLUENCE_RADIUS;
          const angle = Math.atan2(dy, dx);
          // Increased repulsion force
          p.vx += Math.cos(angle) * force * 0.8;
          p.vy += Math.sin(angle) * force * 0.8;
        }

        // Return to base velocity gradually (adds dynamic elasticity)
        p.vx += (p.baseVx - p.vx) * 0.08;
        p.vy += (p.baseVy - p.vy) * 0.08;
        
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
      const MAX_DIST = 120; // Longer connection range
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          if (ps[i].layer !== ps[j].layer) continue;
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15; // Brighter lines
            ctx.strokeStyle = hexAlpha(ps[i].color, alpha);
            ctx.lineWidth = 0.8;
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

      const grad = ctx.createRadialGradient(x, y, 0, x, y, 100);
      grad.addColorStop(0, hexAlpha('#0ea5e9', 0.22));
      grad.addColorStop(0.5, hexAlpha('#a855f7', 0.1));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRipples = () => {
      ripplesRef.current = ripplesRef.current.filter(r => r.alpha > 0.01);
      for (const r of ripplesRef.current) {
        r.radius += 3.5; // Faster ripples
        r.alpha *= 0.92;

        const colorIdx = Math.floor((r.x / width) * NEON_COLORS.length) % NEON_COLORS.length;
        ctx.strokeStyle = hexAlpha(NEON_COLORS[colorIdx], r.alpha);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner slightly brighter ring
        if (r.radius > 15) {
          ctx.strokeStyle = hexAlpha(NEON_COLORS[colorIdx], r.alpha * 0.5);
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const drawScanLine = (t: number) => {
      const y = ((t * 0.4) % height); // Faster scanline
      const grad = ctx.createLinearGradient(0, y - 30, 0, y + 30);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, 'rgba(14,165,233,0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, y - 30, width, 60);
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
      drawCursorTrail();
      drawParticles();
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
