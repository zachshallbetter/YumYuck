"use client";

import React, { useState, useEffect } from "react";
import { MealVariant, PreferenceSignal, MealMatchProfile } from "@/db/schema";

interface SummarySheetProps {
  recommendations: { meal: MealVariant; profile: MealMatchProfile }[];
  preferenceSignals: PreferenceSignal[];
  onRemovePreference: (signalId: string) => void;
  onSelectMeal: (meal: MealVariant) => void;
  onOutcomeSubmitted: (meal: MealVariant, outcome: "loved" | "fine" | "never_again") => void;
  onReset: () => void;
  forcedSelectedMeal?: MealVariant;
}

export default function SummarySheet({
  recommendations,
  preferenceSignals,
  onRemovePreference,
  onSelectMeal,
  onOutcomeSubmitted,
  onReset,
  forcedSelectedMeal,
}: SummarySheetProps) {
  const [selectedMeal, setSelectedMeal] = useState<MealVariant | null>(null);
  const [outcomeLogged, setOutcomeLogged] = useState(false);

  useEffect(() => {
    if (forcedSelectedMeal) {
      setSelectedMeal(forcedSelectedMeal);
    }
  }, [forcedSelectedMeal]);

  const handleSelectMeal = (meal: MealVariant) => {
    setSelectedMeal(meal);
    onSelectMeal(meal);
  };

  const handleOutcome = (outcome: "loved" | "fine" | "never_again") => {
    if (selectedMeal) {
      onOutcomeSubmitted(selectedMeal, outcome);
      setOutcomeLogged(true);
    }
  };

  return (
    <div className="w-full max-w-[390px] bg-white rounded-[32px] shadow-tactile-rest p-6 flex flex-col gap-6 text-text-dark font-sans overflow-y-auto max-h-[85vh] scrollbar-thin">
      
      {/* Upper header */}
      <div className="text-center">
        <span className="text-3xl">🌿</span>
        <h2 className="font-serif text-2xl font-bold mt-2">We've got it.</h2>
        <p className="text-xs text-text-muted mt-1">Top picks based on what you told us.</p>
      </div>

      {!selectedMeal ? (
        <>
          {/* Recommendations Wallet Stack */}
          <div className="flex flex-col gap-3">
            {recommendations.map(({ meal, profile }) => (
              <div
                key={meal.id}
                onClick={() => handleSelectMeal(meal)}
                className="group relative flex items-center justify-between p-4 bg-cream rounded-2xl cursor-pointer hover:bg-primary-green/5 transition-all shadow-sm border border-black/5"
              >
                <div className="flex flex-col gap-1 pr-4">
                  <h3 className="font-serif text-base font-bold leading-tight">
                    {meal.name}
                  </h3>
                  <p className="text-[10px] text-text-muted leading-relaxed line-clamp-2">
                    {meal.description}
                  </p>
                </div>
                
                {/* Match percentage pill */}
                <div className="flex flex-col items-end justify-center min-w-[54px]">
                  <span className="text-[11px] font-bold text-primary-green bg-primary-green/10 px-2 py-0.5 rounded-full">
                    {profile.displayPercentage}%
                  </span>
                  <span className="text-[9px] text-text-muted mt-0.5">match</span>
                </div>
              </div>
            ))}
          </div>

          {/* Preference Learning Ledger Tracker */}
          <div className="flex flex-col gap-3 pt-2 border-t border-black/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              What we learned tonight:
            </h4>
            {preferenceSignals.length === 0 ? (
              <p className="text-xs text-text-muted italic">No temporary signals recorded.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {preferenceSignals.map((sig) => (
                  <div
                    key={sig.id}
                    onClick={() => onRemovePreference(sig.id)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-accent-amber/20 hover:border-accent-red/40 hover:bg-accent-red/5 rounded-full text-xs cursor-pointer transition-all"
                  >
                    <span className="font-semibold text-accent-amber">
                      {sig.sentiment === "yum" ? "💚" : sig.sentiment === "nope" ? "❌" : "🤔"}
                    </span>
                    <span className="capitalize">{sig.target.entityId}</span>
                    <span className="text-[9px] text-text-muted ml-0.5 group-hover:text-accent-red">✕</span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[10px] text-text-muted leading-relaxed">
              * Click any tag to reverse or correct our derived preference signals.
            </p>
          </div>

          <button
            onClick={onReset}
            className="w-full py-3 bg-primary-green text-white font-sans text-sm font-semibold rounded-2xl hover:opacity-90 active:scale-95 transition-all mt-2"
          >
            Start over
          </button>
        </>
      ) : (
        /* Post-Meal Outcome Feedback Section */
        <div className="flex flex-col gap-6 py-4 text-center">
          {!outcomeLogged ? (
            <>
              <h3 className="font-serif text-lg font-bold">How was {selectedMeal.name}?</h3>
              <p className="text-xs text-text-muted">
                Your post-meal feedback updates outcome performance signals separately from pre-meal swiping behavior.
              </p>
              
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleOutcome("loved")}
                  className="w-full py-3 border border-black/10 rounded-2xl text-sm font-semibold hover:bg-primary-green/5 transition-all"
                >
                  Loved it!
                </button>
                <button
                  onClick={() => handleOutcome("fine")}
                  className="w-full py-3 border border-black/10 rounded-2xl text-sm font-semibold hover:bg-primary-green/5 transition-all"
                >
                  It was fine.
                </button>
                <button
                  onClick={() => handleOutcome("never_again")}
                  className="w-full py-3 border border-black/10 rounded-2xl text-sm font-semibold hover:bg-accent-red/5 hover:text-accent-red hover:border-accent-red/20 transition-all"
                >
                  Not again.
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4 animate-fade-in">
              <span className="text-4xl">💚</span>
              <h3 className="font-serif text-lg font-bold">Feedback Recorded.</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Thank you! This outcome signal will be stored in our database separately to score and improve future recommendation calibrations.
              </p>
              <button
                onClick={onReset}
                className="w-full py-3 bg-primary-green text-white font-sans text-sm font-semibold rounded-2xl hover:opacity-90 active:scale-95 transition-all mt-4"
              >
                Find another dinner
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
