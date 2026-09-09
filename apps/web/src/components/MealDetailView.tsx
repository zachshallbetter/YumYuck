"use client";

import React, { useState } from "react";
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { MealVariant, MealMatchProfile, PreferenceSignal } from "@/db/schema";
import { getFoodImage } from "@/db/seedMeals";

interface MealDetailViewProps {
  meal: MealVariant;
  profile: MealMatchProfile;
  preferenceSignals: PreferenceSignal[];
  onBack: () => void;
  onSelect: () => void;
  onDrillDown: (meal: MealVariant, modification: string) => Promise<MealVariant | null>;
  activeAllergens: string[];
}

export default function MealDetailView({
  meal,
  profile,
  preferenceSignals,
  onBack,
  onSelect,
  onDrillDown,
  activeAllergens,
}: MealDetailViewProps) {
  const [customRequest, setCustomRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedMeal, setGeneratedMeal] = useState<MealVariant | null>(null);

  // Generate a premium dynamic explanation for why this meal is recommended
  const getExplanation = () => {
    const supports = preferenceSignals.filter(
      (s) => s.target.entityId === (meal.primaryProteinId || "vegetarian") && s.sentiment === "yum"
    );
    const conflicts = preferenceSignals.filter(
      (s) => s.target.entityId === (meal.primaryProteinId || "vegetarian") && s.sentiment === "nope"
    );

    if (supports.length > 0) {
      return `This is a strong match because you expressed positive reactions to ${supports
        .map((s) => s.target.entityId)
        .join(" and ")} earlier in this session.`;
    }
    if (conflicts.length > 0) {
      return `Recommended based on overall catalog suitability, although you hesitated on ${conflicts
        .map((s) => s.target.entityId)
        .join(" or ")}.`;
    }
    return "Recommended based on balance, novelty, and contextual cooking preferences.";
  };

  const handleDrillDown = async (presetMod?: string) => {
    const mod = presetMod || customRequest;
    if (!mod.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await onDrillDown(meal, mod);
      if (result) {
        setGeneratedMeal(result);
      } else {
        setError("Generated meal contains allergens or is invalid.");
      }
    } catch (err: any) {
      setError("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentDisplayMeal = generatedMeal || meal;

  return (
    <div className="w-full max-w-[390px] bg-white rounded-[32px] shadow-tactile-lift p-6 flex flex-col gap-6 text-text-dark font-sans overflow-y-auto max-h-[85vh] scrollbar-none relative">
      
      {/* Back button header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <button
          onClick={onBack}
          className="p-1 rounded-full hover:bg-black/5 active:scale-95 transition-all text-text-dark"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="font-serif text-lg font-bold">Meal Details</h3>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Meal Info */}
      <div className="flex flex-col gap-3">
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm relative bg-[#FAF7F0]">
          <img
            src={currentDisplayMeal.imageAssetId || getFoodImage(currentDisplayMeal.id)}
            alt={currentDisplayMeal.name}
            className="w-full h-full object-cover"
          />
          {generatedMeal && (
            <div className="absolute top-3 right-3 bg-primary-green text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Sparkles size={10} /> AI Generated
            </div>
          )}
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold leading-tight">
            {currentDisplayMeal.name}
          </h2>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            {currentDisplayMeal.description}
          </p>
        </div>
      </div>

      {/* Detail Metadata Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-[#F8F5EF] p-3 rounded-xl flex flex-col gap-0.5">
          <span className="text-[10px] uppercase font-bold text-text-muted">Estimated Time</span>
          <span className="font-semibold text-text-dark">{currentDisplayMeal.estimatedMinutes} mins</span>
        </div>
        <div className="bg-[#F8F5EF] p-3 rounded-xl flex flex-col gap-0.5">
          <span className="text-[10px] uppercase font-bold text-text-muted">Format</span>
          <span className="font-semibold text-text-dark capitalize">{currentDisplayMeal.format}</span>
        </div>
      </div>

      {/* Structured Recommendation Explanation */}
      <div className="bg-primary-green/5 border border-primary-green/10 p-4 rounded-2xl flex flex-col gap-1.5">
        <h4 className="text-xs font-bold text-primary-green uppercase tracking-wider">
          Why this matches:
        </h4>
        <p className="text-xs text-text-dark leading-relaxed">
          {getExplanation()}
        </p>
      </div>

      {/* Deterministic Allergen Safety Check (Generative AI safety warning) */}
      <div className="border border-black/5 rounded-2xl p-4 flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
          Safety Check & Allergen flags:
        </h4>
        <div className="flex flex-wrap gap-1">
          {currentDisplayMeal.allergenFlags.length === 0 ? (
            <span className="text-xs text-primary-green font-semibold flex items-center gap-1">
              <CheckCircle size={14} /> No known allergens flagged
            </span>
          ) : (
            currentDisplayMeal.allergenFlags.map((alg) => {
              const isViolating = activeAllergens.includes(alg);
              return (
                <span
                  key={alg}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isViolating
                      ? "bg-accent-red/10 text-accent-red border border-accent-red/20"
                      : "bg-[#FAF7F0] text-text-muted border border-black/5"
                  }`}
                >
                  {isViolating ? "🚫 " : ""}{alg}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* AI Drill Down Interface */}
      <div className="border-t border-black/5 pt-4 flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Sparkles className="text-accent-amber" size={16} />
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark">
            Drill down with generative AI
          </h4>
        </div>
        
        <p className="text-[11px] text-text-muted leading-relaxed">
          Modify this concept in real-time. Speed is prioritized. Every result is safety filtered.
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            {/* Elegant breathing/loading card state */}
            <div className="h-8 w-8 rounded-full border-4 border-accent-amber border-t-transparent animate-spin" />
            <span className="text-xs font-medium text-accent-amber animate-pulse">Generating your custom option...</span>
          </div>
        ) : (
          <>
            {/* Preset Drill Down suggestions */}
            <div className="flex flex-wrap gap-1.5">
              {[
                "Make it spicier",
                "Suggest a lighter variation",
                "Replace potatoes with rice",
                "Make it dairy-free",
              ].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleDrillDown(preset)}
                  className="px-2.5 py-1.5 bg-[#F8F5EF] border border-black/5 hover:border-primary-green/30 hover:bg-primary-green/5 rounded-xl text-[11px] font-medium transition-all"
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={customRequest}
                onChange={(e) => setCustomRequest(e.target.value)}
                placeholder="Or enter custom modification..."
                className="flex-1 px-3 py-2 text-xs border border-black/10 rounded-xl focus:outline-none focus:border-primary-green bg-cream text-text-dark"
              />
              <button
                onClick={() => handleDrillDown()}
                className="px-4 py-2 bg-primary-green text-white font-sans text-xs font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all"
              >
                Go
              </button>
            </div>
          </>
        )}

        {error && (
          <div className="flex items-center gap-1.5 text-accent-red bg-accent-red/5 p-3 rounded-xl border border-accent-red/10 mt-1">
            <AlertCircle size={14} />
            <span className="text-[11px] font-medium leading-relaxed">{error}</span>
          </div>
        )}
      </div>

      {/* Select this meal button */}
      <button
        onClick={onSelect}
        className="w-full py-3 bg-primary-green text-white font-sans text-sm font-semibold rounded-2xl hover:opacity-90 active:scale-95 transition-all mt-2 shadow-sm"
      >
        Select this meal
      </button>
    </div>
  );
}
