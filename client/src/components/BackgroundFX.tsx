// components/BackgroundFX.tsx
import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundFX() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(1200px 600px at 50% 20%, black 0%, transparent 70%)",
        }}
      />

      {/* Aurora layers */}
      <motion.div
        className="absolute -inset-[20%] blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.18), rgba(236,72,153,0.18), rgba(56,189,248,0.18), rgba(99,102,241,0.18))",
          mixBlendMode: "screen",
        }}
        animate={
          reduce
            ? undefined
            : { rotate: [0, 360], scale: [1, 1.05, 1] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 60, repeat: Infinity, ease: "linear" }
        }
      />
      <motion.div
        className="absolute -inset-[15%] blur-[110px]"
        style={{
          background:
            "radial-gradient(40% 30% at 20% 30%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(35% 25% at 80% 40%, rgba(236,72,153,0.25), transparent 60%), radial-gradient(30% 20% at 50% 80%, rgba(56,189,248,0.25), transparent 60%)",
          mixBlendMode: "screen",
        }}
        animate={reduce ? undefined : { x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
        transition={reduce ? undefined : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Film grain / Noise */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 preserveAspectRatio=%22none%22 viewBox=%220 0 100 100%22><filter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>')",
          backgroundSize: "300px 300px",
        }}
      />

      {/* Vignette for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 30%, transparent 0%, rgba(0,0,0,0.25) 70%)",
        }}
      />
    </div>
  );
}
