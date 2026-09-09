"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MealVariant } from "@/db/schema";
import { getFoodImage } from "@/db/seedMeals";

interface MealCardProps {
  meal: MealVariant;
  index: number;
  active: boolean;
  onSwipe: (direction: "left" | "right" | "up") => void;
  onLiftStateChange?: (isLifted: boolean) => void;
  dragX?: any;
  dragY?: any;
}

export default function MealCard({
  meal,
  index,
  active,
  onSwipe,
  onLiftStateChange,
  dragX,
  dragY,
}: MealCardProps) {
  const [isLifted, setIsLifted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const liftTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Motion values for tracking drag position (from parent or instantiated locally)
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);
  const x = dragX || localX;
  const y = dragY || localY;

  // Transformations for rotation and scale based on drag position
  const rotate = useTransform(x, [-200, 200], [-8, 8]);
  const scale = useTransform(x, [-200, 200], [0.98, 0.98]);

  // Translucent badge opacities
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);
  const yumOpacity = useTransform(x, [20, 120], [0, 1]);
  const maybeOpacity = useTransform(y, [-120, -20], [1, 0]);

  // Full-card color overlay tints
  const nopeOverlayOpacity = useTransform(x, [0, -150], [0, 0.3]);
  const yumOverlayOpacity = useTransform(x, [0, 150], [0, 0.3]);
  const maybeOverlayOpacity = useTransform(y, [0, -150], [0, 0.3]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (liftTimeoutRef.current) clearTimeout(liftTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!active) return;
    setIsPressed(true);
    
    // Start 300ms timer for the "Lift" interaction
    liftTimeoutRef.current = setTimeout(() => {
      setIsLifted(true);
      if (onLiftStateChange) onLiftStateChange(true);
      
      // Soft haptic vibration if supported
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([15]);
      }
    }, 300);
  };

  const handlePointerUp = () => {
    clearLiftTimeout();
    setIsPressed(false);
    setIsLifted(false);
    if (onLiftStateChange) onLiftStateChange(false);
  };

  const clearLiftTimeout = () => {
    if (liftTimeoutRef.current) {
      clearTimeout(liftTimeoutRef.current);
      liftTimeoutRef.current = null;
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    clearLiftTimeout();
    setIsPressed(false);
    setIsLifted(false);
    if (onLiftStateChange) onLiftStateChange(false);

    const swipeThreshold = 120;
    const { offset } = info;

    if (offset.x > swipeThreshold) {
      onSwipe("right");
    } else if (offset.x < -swipeThreshold) {
      onSwipe("left");
    } else if (offset.y < -swipeThreshold) {
      onSwipe("up");
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale: isLifted ? 1.02 : isPressed ? 0.99 : 1.0,
        zIndex: active ? 10 : 1,
      }}
      drag={active}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      onDragStart={clearLiftTimeout} // cancel lift if dragging starts
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`absolute w-full h-full bg-white rounded-[32px] overflow-hidden select-none touch-none bg-transition ${
        isLifted ? "shadow-tactile-lift" : "shadow-tactile-rest"
      } ${!active ? "pointer-events-none opacity-40" : ""}`}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <img
        src={meal.imageAssetId || getFoodImage(meal.id)}
        alt={meal.name}
        className="w-full h-full object-cover pointer-events-none"
        style={{
          filter: isLifted ? "brightness(1.05) contrast(1.02)" : "none",
          transition: "filter 0.3s ease",
        }}
      />

      {/* Full-card color overlay tints */}
      <motion.div
        style={{ opacity: nopeOverlayOpacity }}
        className="absolute inset-0 bg-[#FAF2F0] mix-blend-multiply pointer-events-none"
      />
      <motion.div
        style={{ opacity: yumOverlayOpacity }}
        className="absolute inset-0 bg-[#EFF6F2] mix-blend-multiply pointer-events-none"
      />
      <motion.div
        style={{ opacity: maybeOverlayOpacity }}
        className="absolute inset-0 bg-[#FAF7F0] mix-blend-multiply pointer-events-none"
      />

      {/* Dark editorial overlay for text contrast - only visible on active card */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`} />

      {/* Bottom text overlay - only visible on active card */}
      <div className={`absolute bottom-6 left-6 right-6 text-white pointer-events-none transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}>
        <h2 className="text-2xl font-serif font-bold leading-tight mb-1">
          {meal.name}
        </h2>
        <p className="text-[11px] font-sans font-medium tracking-wide uppercase opacity-85">
          {meal.experienceTags ? meal.experienceTags.join(" • ") : meal.ingredientIds.slice(0, 3).join(" • ")}
        </p>
      </div>

      {/* NOPE Reaction Stamp */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#D36135] text-[#D36135] font-sans font-bold text-3xl uppercase px-6 py-3 rounded-2xl rotate-[12deg] bg-white/95 shadow-sm pointer-events-none tracking-widest"
      >
        ❌ Nope
      </motion.div>

      {/* YUM Reaction Stamp */}
      <motion.div
        style={{ opacity: yumOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#3D6B52] text-[#3D6B52] font-sans font-bold text-3xl uppercase px-6 py-3 rounded-2xl rotate-[-12deg] bg-white/95 shadow-sm pointer-events-none tracking-widest"
      >
        💚 Yum
      </motion.div>

      {/* MAYBE Reaction Stamp */}
      <motion.div
        style={{ opacity: maybeOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#E29B35] text-[#E29B35] font-sans font-bold text-3xl uppercase px-6 py-3 rounded-2xl bg-white/95 shadow-sm pointer-events-none tracking-widest"
      >
        🤔 Maybe
      </motion.div>
    </motion.div>
  );
}
