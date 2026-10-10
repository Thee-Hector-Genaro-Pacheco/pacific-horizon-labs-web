"use client";

import { type ReactNode } from "react";

export type PerspectiveViewportProps = {
  children: ReactNode;
  tiltAngleX?: number;
  tiltAngleY?: number;
  depthScale?: number;
  perspectivePx?: number;
  className?: string;
};

/**
 * Reusable perspective viewport container.
 *
 * Applies hardware-accelerated 3D transform perspective for visual stages,
 * mockups, and device representations without requiring Three.js or WebGL.
 */
export function PerspectiveViewport({
  children,
  tiltAngleX = 0,
  tiltAngleY = 0,
  depthScale = 1,
  perspectivePx = 1200,
  className = "",
}: PerspectiveViewportProps) {
  return (
    <div
      style={{
        perspective: `${perspectivePx}px`,
      }}
      className={`relative w-full ${className}`}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tiltAngleX}deg) rotateY(${tiltAngleY}deg) scale(${depthScale})`,
          transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="relative size-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
