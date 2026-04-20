import React, { useRef, useEffect, useCallback, type RefObject } from 'react';

export interface MouseSparkConfig {
  color?: string;
  scale?: number;
  opacity?: number;
  speed?: number;
  maxTrail?: number;
  enableTrail?: boolean;
}

export interface MouseSparkProps extends MouseSparkConfig {
  className?: string;
  style?: React.CSSProperties;
  containerRef?: RefObject<HTMLDivElement | null>;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rs: number;
  s: number;
  a: number;
  f: number;
}

interface Wave {
  x: number;
  y: number;
  life: number;
  max: number;
  r: number;
  ring: {
    ang: number;
    segs: Array<{ off: number; len: number }>;
    life: number;
    maxLife: number;
    rs: number;
  };
}

interface Trail {
  x: number;
  y: number;
  life: number;
}

const defaultProps: Required<MouseSparkConfig> = {
  color: '45,175,255',
  scale: 1.5,
  opacity: 1.0,
  speed: 1.0,
  maxTrail: 16,
  enableTrail: false,
};

export function useMouseSpark(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  config: MouseSparkConfig = {}
) {
  const configRef = useRef({ ...defaultProps, ...config });
  const sparkPoolRef = useRef<Spark[]>([]);
  const wavePoolRef = useRef<Wave[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const trailRef = useRef<Trail[]>([]);
  const isDownRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef(performance.now());

  useEffect(() => {
    configRef.current = { ...defaultProps, ...config };
  }, [config]);

  const alpha = useCallback((value: number) => {
    return Math.max(0, Math.min(1, value * configRef.current.opacity));
  }, []);

  const boom = useCallback((x: number, y: number) => {
    const { scale } = configRef.current;
    const wavePool = wavePoolRef.current;
    const waves = wavesRef.current;
    const sparkPool = sparkPoolRef.current;
    const sparks = sparksRef.current;

    let wave: Wave;
    if (wavePool.length > 0) {
      wave = wavePool.pop()!;
      wave.x = x;
      wave.y = y;
      wave.life = 0;
      wave.max = 18;
      wave.r = 0;
      wave.ring.ang = Math.random() * Math.PI * 2;
      wave.ring.life = 0;
    } else {
      wave = {
        x,
        y,
        life: 0,
        max: 18,
        r: 0,
        ring: {
          ang: Math.random() * Math.PI * 2,
          segs: [
            { off: -0.25 * Math.PI, len: 1.15 * Math.PI },
            { off: 0.0 * Math.PI, len: 1.15 * Math.PI },
            { off: 0.25 * Math.PI, len: 1.15 * Math.PI },
          ],
          life: 0,
          maxLife: 30,
          rs: 0.08,
        },
      };
    }
    waves.push(wave);

    const particleCount = 4;
    const speedAdjust = scale / 1.5;

    for (let i = 0; i < particleCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = (4.8 + Math.random() * 2) * speedAdjust;

      let spark: Spark;
      if (sparkPool.length > 0) {
        spark = sparkPool.pop()!;
        spark.x = x;
        spark.y = y;
        spark.vx = Math.cos(a) * speed;
        spark.vy = Math.sin(a) * speed;
        spark.rot = Math.random() * Math.PI * 2;
        spark.rs = (Math.random() - 0.5) * 0.28;
        spark.s = (4 + Math.random() * 3) * scale;
        spark.a = 1;
        spark.f = 0.9;
      } else {
        spark = {
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          rot: Math.random() * Math.PI * 2,
          rs: (Math.random() - 0.5) * 0.28,
          s: (4 + Math.random() * 3) * scale,
          a: 1,
          f: 0.9,
        };
      }
      sparks.push(spark);
    }
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, [canvasRef]);

  const loop = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const baseFrameMs = 1000 / 60;
      const maxDeltaMs = 100;
      const deltaMs = Math.min(now - lastFrameTimeRef.current, maxDeltaMs);
      lastFrameTimeRef.current = now;
      const frameScale = (deltaMs / baseFrameMs) * configRef.current.speed;

      const waves = wavesRef.current;
      const sparks = sparksRef.current;
      const trail = trailRef.current;
      const { color, scale, enableTrail } = configRef.current;

      if (waves.length > 0 || sparks.length > 0 || trail.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        for (let i = trail.length - 1; i >= 0; i--) {
          const t = trail[i];
          if (enableTrail) {
            t.life -= 0.085 * frameScale;
          } else {
            t.life -= (isDownRef.current ? 0.085 : 0.18) * frameScale;
          }
          if (t.life <= 0) trail.splice(i, 1);
        }

        if (trail.length > 1) {
          ctx.lineWidth = 5.0;
          ctx.shadowColor = `rgba(${color}, 0.6)`;
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          const lastIdx = trail.length - 1;
          for (let i = 0; i < lastIdx; i++) {
            const alphaStart = i / lastIdx;
            const alphaEnd = (i + 1) / lastIdx;
            const a0 = trail[i];
            const a1 = trail[i + 1];

            const segGrad = ctx.createLinearGradient(a0.x, a0.y, a1.x, a1.y);
            segGrad.addColorStop(0, `rgba(${color}, ${alphaStart})`);
            segGrad.addColorStop(1, `rgba(${color}, ${alphaEnd})`);

            ctx.beginPath();
            ctx.moveTo(a0.x, a0.y);
            ctx.lineTo(a1.x, a1.y);
            ctx.strokeStyle = segGrad;
            ctx.stroke();
          }

          ctx.shadowColor = 'transparent';
        }

        for (let i = waves.length - 1; i >= 0; i--) {
          const w = waves[i];
          w.life += frameScale;
          const progress = w.life / w.max;
          const ease = 1 - Math.pow(1 - Math.min(progress, 1), 3);
          w.r = 26 * scale * ease;
          const alphaVal = Math.max(0, 1 - progress);

          if (alphaVal > 0) {
            ctx.beginPath();
            ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color},${alpha(alphaVal)})`;
            ctx.fill();
          }

          const r = w.ring;
          r.life += frameScale;
          const rProg = Math.min(r.life / r.maxLife, 1);
          r.ang -= r.rs * frameScale;
          r.segs.forEach((seg) => {
            const shrink = Math.max(0, 1 - rProg);
            const len = seg.len * shrink;
            const start = r.ang + seg.off;
            ctx.beginPath();
            ctx.arc(w.x, w.y, w.r + 3 * scale, start, start + len);
            ctx.lineWidth = 3.7;
            ctx.strokeStyle = `rgba(245,248,252,${alpha(1 - rProg)})`;
            ctx.stroke();
          });

          if (progress >= 1 && rProg >= 1) {
            wavePoolRef.current.push(waves[i]);
            waves.splice(i, 1);
          }
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx * frameScale;
          s.y += s.vy * frameScale;
          s.vx *= Math.pow(s.f, frameScale);
          s.vy *= Math.pow(s.f, frameScale);
          s.rot += s.rs * frameScale;
          s.a -= 0.032 * frameScale;

          if (s.a <= 0) {
            sparkPoolRef.current.push(sparks[i]);
            sparks.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rot);
          ctx.beginPath();
          ctx.moveTo(0, -s.s);
          ctx.lineTo(s.s * 0.6, s.s * 0.6);
          ctx.lineTo(-s.s * 0.6, s.s * 0.6);
          ctx.fillStyle = `rgba(255,255,255,${alpha(s.a)})`;
          ctx.fill();
          ctx.restore();
        }

        ctx.globalCompositeOperation = 'source-over';
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    },
    [canvasRef, alpha]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      isDownRef.current = true;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      boom(e.clientX, e.clientY);
    },
    [boom]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { scale, enableTrail, maxTrail } = configRef.current;
      if (!isDownRef.current && !enableTrail) return;

      const p = { x: e.clientX, y: e.clientY };
      if (!lastPosRef.current) lastPosRef.current = p;

      const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
        Math.hypot(a.x - b.x, a.y - b.y);

      if (lastPosRef.current && dist(p, lastPosRef.current) > 2) {
        trailRef.current.push({ x: p.x, y: p.y, life: 1 });
        lastPosRef.current = p;
        if (trailRef.current.length > maxTrail) trailRef.current.shift();

        if (Math.random() < 0.3) {
          const a = Math.random() * Math.PI * 2;
          const speedAdjust = scale / 1.5;
          sparksRef.current.push({
            x: p.x + Math.cos(a) * 10 * scale,
            y: p.y + Math.sin(a) * 10 * scale,
            vx: Math.cos(a) * 1.3 * speedAdjust,
            vy: Math.sin(a) * 1.3 * speedAdjust,
            rot: Math.random() * Math.PI * 2,
            rs: 0.16,
            s: 9 * scale,
            a: 0.7,
            f: 0.95,
          });
        }
      }
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    isDownRef.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef, resize, loop, handleMouseDown, handleMouseMove, handleMouseUp]);

  return { boom };
}

export const MouseSparkReact: React.FC<MouseSparkProps> = ({
  className,
  style,
  containerRef,
  ...config
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMouseSpark(canvasRef, config);

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MouseSparkReact;