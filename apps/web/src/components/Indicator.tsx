import React from "react";

interface IndicatorProps {
  current: number;
  total: number;
}

export default function Indicator({ current, total }: IndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-1">
      {/* Capsules progress indicator */}
      <div className="flex gap-1.5 justify-center">
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx < current;
          const isCurrent = idx === current - 1;
          
          return (
            <div
              key={idx}
              className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                isCurrent
                  ? "bg-primary-green scale-y-110 shadow-sm"
                  : isActive
                  ? "bg-primary-green opacity-60"
                  : "bg-text-muted opacity-20"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
