"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import MealCard from "./MealCard";
import { MealVariant } from "@/db/schema";

interface CardStackProps {
  meals: MealVariant[];
  currentIndex: number;
  onSwipe: (direction: "left" | "right" | "up", meal: MealVariant) => void;
  onLiftStateChange?: (isLifted: boolean) => void;
}

export default function CardStack({
  meals,
  currentIndex,
  onSwipe,
  onLiftStateChange,
}: CardStackProps) {
  // We display the top 3 cards in a stack
  const visibleMeals = meals.slice(currentIndex, currentIndex + 3);

  // Parent motion values to drive continuous stack anticipation
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Compute normalized drag distance (0 to 1) within a 150px threshold
  const dragDistance = useTransform(
    [dragX, dragY],
    ([latestX, latestY]: any[]) => {
      const distance = Math.sqrt(Math.pow(Number(latestX), 2) + Math.pow(Number(latestY), 2));
      return Math.min(1, distance / 150);
    }
  );

  // Interpolate scale and translation for the underlying cards
  const card2Scale = useTransform(dragDistance, [0, 1], [0.93, 1.0]);
  const card2TranslateY = useTransform(dragDistance, [0, 1], [24, 0]);

  const card3Scale = useTransform(dragDistance, [0, 1], [0.86, 0.93]);
  const card3TranslateY = useTransform(dragDistance, [0, 1], [48, 24]);

  if (visibleMeals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6">
        <span className="text-4xl">🍽</span>
        <h3 className="font-serif text-xl font-bold">Let's find more.</h3>
        <p className="text-xs text-text-muted">No more options in this session.</p>
      </div>
    );
  }

  return (
    <div className="relative w-[90vw] max-w-[390px] aspect-[2.9/4] flex items-center justify-center">
      {visibleMeals.map((meal, idx) => {
        // Reverse array indexing so the top card is rendered last (on top in HTML stack)
        const stackIndex = visibleMeals.length - 1 - idx;
        const targetMeal = visibleMeals[stackIndex];
        const isTopCard = stackIndex === 0;
        const isSecondCard = stackIndex === 1;
        const isThirdCard = stackIndex === 2;

        // Custom style bindings for each layer of the card stack
        let motionStyle: any = {
          zIndex: 10 - stackIndex,
        };

        if (isTopCard) {
          // Top card is fully interactive
          motionStyle = {
            ...motionStyle,
            pointerEvents: "auto",
          };
        } else if (isSecondCard) {
          // Card 2 moves dynamically with top card drag
          motionStyle = {
            ...motionStyle,
            scale: card2Scale,
            y: card2TranslateY,
            pointerEvents: "none",
          };
        } else if (isThirdCard) {
          // Card 3 moves dynamically with top card drag
          motionStyle = {
            ...motionStyle,
            scale: card3Scale,
            y: card3TranslateY,
            pointerEvents: "none",
          };
        }

        return (
          <motion.div
            key={targetMeal.id}
            style={motionStyle}
            className="absolute flex items-center justify-center w-full h-full"
          >
            <MealCard
              meal={targetMeal}
              index={currentIndex + stackIndex}
              active={isTopCard}
              onSwipe={(direction) => onSwipe(direction, targetMeal)}
              onLiftStateChange={isTopCard ? onLiftStateChange : undefined}
              dragX={isTopCard ? dragX : undefined}
              dragY={isTopCard ? dragY : undefined}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
