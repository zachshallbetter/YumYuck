import { MealVariant } from "./schema";

export function getFoodImage(id: string): string {
  const unsplashMapping: Record<string, string> = {
    "meal-1": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600", // salmon
    "meal-2": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600", // lemon garlic salmon
    "meal-3": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600", // chicken piccata
    "meal-4": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600", // chicken piccata pasta
    "meal-5": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600", // seared cod
    "meal-6": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=600", // shrimp scampi
    "meal-7": "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600", // scallops
    "meal-8": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600", // beef
    "meal-9": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600", // tofu bowl
    "meal-10": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600", // creamy mushroom pasta
    "meal-11": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=600", // chicken teriyaki
    "meal-12": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600", // quinoa salad
    "meal-13": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600", // halibut
    "meal-14": "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=600", // ribeye steak
    "meal-15": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600", // sesame tofu
    "meal-16": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600", // roasted chicken
    "meal-17": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600", // pesto pasta
    "meal-18": "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=600", // pesto chicken pasta
    "meal-19": "https://images.unsplash.com/photo-1559742811-8242895411b8?auto=format&fit=crop&q=80&w=600", // garlic shrimp
    "meal-20": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600", // Tuscan soup
    "meal-21": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600", // crispy salmon
    "meal-22": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600", // herb chicken
    "meal-23": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=600", // beef bowl
    "meal-24": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600", // beef tacos
    "meal-25": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600", // chickpea salad
    "meal-26": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600", // tomato soup
    "meal-27": "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600", // citrus scallops
    "meal-28": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600", // baked cod
    "meal-29": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600", // skewers
    "meal-30": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600"  // garlic pasta
  };
  return unsplashMapping[id] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600";
}

export const SEED_MEALS: MealVariant[] = [];
