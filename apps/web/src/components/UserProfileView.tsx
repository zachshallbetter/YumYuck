"use client";

import React from "react";
import { X, User, ShieldAlert, Award } from "lucide-react";
import { PreferenceSignal } from "@/db/schema";
import { savePreferenceSignal, deletePreferenceSignal } from "@/db/indexedDb";

interface UserProfileViewProps {
  preferenceSignals: PreferenceSignal[];
  onClose: () => void;
  onPreferencesUpdated: () => void;
  onRegenerateCatalog?: () => void;
}

interface PreferenceConfig {
  id: string;
  label: string;
  type: "protein" | "format" | "flavor" | "dietary";
  icon?: string;
}

const DIETARY_OPTIONS: PreferenceConfig[] = [
  { id: "vegetarian", label: "Vegetarian", type: "dietary", icon: "🌱" },
  { id: "vegan", label: "Vegan", type: "dietary", icon: "🟢" },
  { id: "gluten_free", label: "Gluten-Free", type: "dietary", icon: "🌾" },
  { id: "dairy_free", label: "Dairy-Free", type: "dietary", icon: "🥛" },
  { id: "soy_free", label: "Soy-Free", type: "dietary", icon: "🫘" },
  { id: "nut_free", label: "Nut-Free", type: "dietary", icon: "🥜" },
];

const PROTEIN_OPTIONS: PreferenceConfig[] = [
  { id: "seafood", label: "Seafood", type: "protein", icon: "🐟" },
  { id: "poultry", label: "Poultry", type: "protein", icon: "🍗" },
  { id: "red_meat", label: "Red Meat", type: "protein", icon: "🥩" },
  { id: "pork", label: "Pork", type: "protein", icon: "🥓" },
  { id: "shellfish", label: "Shellfish", type: "protein", icon: "🍤" },
  { id: "vegetarian_protein", label: "Vegetarian Protein", type: "protein", icon: "🥚" },
  { id: "plant_based", label: "Plant-Based", type: "protein", icon: "🌿" },
];

const FORMAT_OPTIONS: PreferenceConfig[] = [
  { id: "plate", label: "Plated", type: "format", icon: "🍽" },
  { id: "bowl", label: "Bowl", type: "format", icon: "🥣" },
  { id: "handheld", label: "Handheld", type: "format", icon: "🌮" },
  { id: "pasta", label: "Pasta", type: "format", icon: "🍝" },
  { id: "sushi", label: "Sushi", type: "format", icon: "🍣" },
  { id: "skewers", label: "Skewers", type: "format", icon: "🍢" },
  { id: "soup", label: "Soup", type: "format", icon: "🍲" },
];

const FLAVOR_OPTIONS: PreferenceConfig[] = [
  { id: "light", label: "Fresh & Light", type: "flavor", icon: "🍋" },
  { id: "garlic", label: "Garlic & Herb", type: "flavor", icon: "🧄" },
  { id: "savory", label: "Savory & Earthy", type: "flavor", icon: "🍄" },
  { id: "buttery", label: "Rich & Buttery", type: "flavor", icon: "🧈" },
  { id: "spicy", label: "Spicy", type: "flavor", icon: "🌶" },
  { id: "citrus", label: "Citrus", type: "flavor", icon: "🍊" },
  { id: "umami", label: "Umami", type: "flavor", icon: "🥢" },
];

export default function UserProfileView({
  preferenceSignals,
  onClose,
  onPreferencesUpdated,
  onRegenerateCatalog,
}: UserProfileViewProps) {
  // Get active persistent signals
  const persistentSignals = preferenceSignals.filter((s) => s.scope === "persistent");

  const getSignalState = (id: string): "yum" | "nope" | "neutral" => {
    const signal = persistentSignals.find((s) => s.target.entityId === id);
    if (!signal) return "neutral";
    return signal.sentiment === "yum" ? "yum" : "nope";
  };

  const handleChipClick = async (option: PreferenceConfig) => {
    const currentState = getSignalState(option.id);
    const existingSignal = persistentSignals.find((s) => s.target.entityId === option.id);

    if (currentState === "neutral") {
      // Transition to Yum (Preferred)
      const signal: PreferenceSignal = {
        id: `sig-persistent-${option.id}-${Math.random().toString(36).substr(2, 5)}`,
        userId: "partner-user",
        target: {
          entityType: option.type,
          entityId: option.id,
        },
        sentiment: "yum",
        strength: 1.0,
        scope: "persistent",
        source: "explicit-profile",
        confidence: 1.0,
        createdAt: new Date().toISOString(),
        evidenceIds: [],
        reversible: true,
      };
      await savePreferenceSignal(signal);
    } else if (currentState === "yum") {
      // Transition to Nope (Avoided)
      if (existingSignal) {
        await deletePreferenceSignal(existingSignal.id);
      }
      const signal: PreferenceSignal = {
        id: `sig-persistent-${option.id}-${Math.random().toString(36).substr(2, 5)}`,
        userId: "partner-user",
        target: {
          entityType: option.type,
          entityId: option.id,
        },
        sentiment: "nope",
        strength: 1.0,
        scope: "persistent",
        source: "explicit-profile",
        confidence: 1.0,
        createdAt: new Date().toISOString(),
        evidenceIds: [],
        reversible: true,
      };
      await savePreferenceSignal(signal);
    } else {
      // Transition to Neutral (Deleted)
      if (existingSignal) {
        await deletePreferenceSignal(existingSignal.id);
      }
    }

    onPreferencesUpdated();
  };

  const clearAllPreferences = async () => {
    for (const sig of persistentSignals) {
      await deletePreferenceSignal(sig.id);
    }
    onPreferencesUpdated();
  };

  const renderSection = (title: string, options: PreferenceConfig[]) => {
    return (
      <div className="flex flex-col gap-2.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
          {title}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {options.map((opt) => {
            const state = getSignalState(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => handleChipClick(opt)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all duration-200 active:scale-95 ${
                  state === "yum"
                    ? "bg-[#EFF6F2] border-[#3D6B52] text-[#3D6B52]"
                    : state === "nope"
                    ? "bg-[#FAF2F0] border-[#D36135] text-[#D36135]"
                    : "bg-white border-black/10 text-text-dark hover:border-black/20"
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
                {state === "yum" && <span className="text-[10px]">💚</span>}
                {state === "nope" && <span className="text-[10px]">🚫</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[390px] bg-[#F8F5EF] rounded-[32px] shadow-tactile-lift p-6 flex flex-col gap-6 text-text-dark font-sans overflow-y-auto max-h-[85vh] scrollbar-none relative animate-fade-in border border-black/5">
      
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-black/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary-green/10 text-primary-green">
            <User size={18} />
          </div>
          <h3 className="font-serif text-lg font-bold">Your Profile</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-text-dark"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="flex flex-col gap-6 pb-2">
        {renderSection("Dietary / Allergens (Permanent Constraints)", DIETARY_OPTIONS)}
        {renderSection("Favored Proteins", PROTEIN_OPTIONS)}
        {renderSection("Preferred Meal Formats", FORMAT_OPTIONS)}
        {renderSection("Flavor Preferences", FLAVOR_OPTIONS)}
      </div>

      {/* Footer Info & Reset Action */}
      <div className="border-t border-black/5 pt-4 flex flex-col gap-3">
        <div className="flex gap-2 items-center text-[10px] text-text-muted leading-relaxed">
          <Award size={14} className="text-primary-green flex-shrink-0" />
          <span>Persistent preferences act as the baseline recommendation profile for every dining session.</span>
        </div>
        
        {onRegenerateCatalog && (
          <button
            onClick={onRegenerateCatalog}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#3D6B52] bg-[#EFF6F2] hover:bg-[#E2EEE6] active:scale-95 transition-all border border-[#3D6B52]/10"
          >
            Regenerate Meal Catalog
          </button>
        )}

        <button
          onClick={clearAllPreferences}
          className="w-full py-2.5 rounded-xl text-xs font-semibold text-accent-red bg-accent-red/5 hover:bg-accent-red/10 active:scale-95 transition-all"
        >
          Clear All Preferences
        </button>
      </div>
    </div>
  );
}
