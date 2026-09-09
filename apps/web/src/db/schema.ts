import { z } from "zod";

export const OpportunityStateSchema = z.object({
  domainValid: z.boolean(),
  permitted: z.boolean(),
  enabled: z.boolean(),
  exposed: z.boolean(),
  signaled: z.boolean(),
  reversible: z.boolean(),
});
export type OpportunityState = z.infer<typeof OpportunityStateSchema>;

export const ResponseOpportunitySchema = z.object({
  promptId: z.string(),
  candidateSetBefore: z.array(z.string()),
  actions: z.object({
    yum: OpportunityStateSchema,
    maybe: OpportunityStateSchema,
    nope: OpportunityStateSchema,
    skip: OpportunityStateSchema,
    undo: OpportunityStateSchema,
    inspect: OpportunityStateSchema,
  }),
});
export type ResponseOpportunity = z.infer<typeof ResponseOpportunitySchema>;

export const DinnerInteractionContractSchema = z.object({
  id: z.string(),
  version: z.string(),
  participants: z.object({
    chooserUserIds: z.array(z.string()),
    recommendationEngineVersion: z.string(),
    aiModelVersion: z.string().optional(),
  }),
  boundary: z.object({
    mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
    startedAt: z.string(),
    endsWhen: z.enum(["meal-selected", "session-abandoned", "session-expired"]),
  }),
  context: z.object({
    diningMode: z.enum(["cook", "delivery", "restaurant"]).optional(),
    people: z.number().optional(),
    budget: z.number().optional(),
    maxTimeMinutes: z.number().optional(),
    availableEquipment: z.array(z.string()).optional(),
    locationId: z.string().optional(),
  }),
  initiatingConditions: z.object({
    candidateMealIds: z.array(z.string()),
    activeRestrictions: z.array(z.string()),
    permanentPreferences: z.array(z.string()),
    temporaryPreferences: z.array(z.string()),
  }),
  completionConditions: z.object({
    selectedMealId: z.string().optional(),
    explicitNoDecision: z.boolean().optional(),
  }),
  failureConditions: z.object({
    noEligibleMeals: z.boolean(),
    restrictionConflict: z.boolean(),
    recommendationExhaustion: z.boolean(),
  }),
});
export type DinnerInteractionContract = z.infer<typeof DinnerInteractionContractSchema>;

export const PreferenceSignalSchema = z.object({
  id: z.string(),
  userId: z.string(),
  target: z.object({
    entityType: z.enum([
      "ingredient",
      "meal",
      "protein",
      "preparation",
      "texture",
      "flavor",
      "format",
      "mood",
      "temperature",
      "dietary",
    ]),
    entityId: z.string(),
  }),
  sentiment: z.enum(["yum", "maybe", "nope"]),
  strength: z.number(),
  scope: z.enum(["session", "meal", "day", "week", "persistent"]),
  source: z.enum([
    "explicit-profile",
    "session-response",
    "meal-selection",
    "post-meal-feedback",
    "inferred",
  ]),
  confidence: z.number(),
  createdAt: z.string(),
  expiresAt: z.string().optional(),
  evidenceIds: z.array(z.string()),
  reversible: z.literal(true),
});
export type PreferenceSignal = z.infer<typeof PreferenceSignalSchema>;

export const MealMatchProfileSchema = z.object({
  mealId: z.string(),
  eligible: z.boolean(),
  blockingConflicts: z.array(z.string()),
  dimensions: z.object({
    permanentPreference: z.number(),
    currentSession: z.number(),
    mood: z.number(),
    ingredient: z.number(),
    preparation: z.number(),
    texture: z.number(),
    context: z.number(),
    historicalOutcome: z.number(),
    novelty: z.number(),
  }),
  uncertainty: z.number(),
  weightedScore: z.number(),
  displayPercentage: z.number(),
  supportingSignals: z.array(z.string()),
  conflictingSignals: z.array(z.string()),
  avoidedConflicts: z.array(z.string()),
});
export type MealMatchProfile = z.infer<typeof MealMatchProfileSchema>;

export const YumyuckEventSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  timestamp: z.string(),
  eventType: z.enum([
    "session_started",
    "prompt_presented",
    "prompt_inspected",
    "response_selected",
    "response_reversed",
    "summary_presented",
    "signal_removed",
    "recommendations_presented",
    "meal_inspected",
    "meal_rejected",
    "meal_selected",
    "session_abandoned",
    "outcome_recorded",
  ]),
  promptId: z.string().optional(),
  mealId: z.string().optional(),
  response: z.enum(["yum", "maybe", "nope", "skip"]).optional(),
  projectionVersion: z.string(),
  opportunityId: z.string().optional(),
  candidateSetHash: z.string(),
  preferenceStateHash: z.string(),
  metadata: z.record(z.string(), z.unknown()),
  experimentCondition: z.enum(["A", "B"]),
  protocolVersion: z.string(),
});
export type YumyuckEvent = z.infer<typeof YumyuckEventSchema>;

export const MealVariantSchema = z.object({
  id: z.string(),
  familyId: z.string(),
  name: z.string(),
  description: z.string(),
  primaryProteinId: z.string().nullable(),
  ingredientIds: z.array(z.string()),
  sideIngredientIds: z.array(z.string()),
  substitutionIds: z.array(z.string()),
  dietaryFlags: z.array(z.string()),
  allergenFlags: z.array(z.string()),
  richnessScore: z.number(),
  healthScore: z.number(),
  imageAssetId: z.string().nullable(),
  status: z.enum(["candidate", "validated", "proven", "archived"]),
  temperature: z.enum(["hot", "warm", "cold", "room_temperature"]),
  format: z.enum(["plate", "bowl", "pasta", "soup", "salad", "handheld"]),
  estimatedMinutes: z.number(),
  difficulty: z.number(),
  experienceTags: z.array(z.string()),
});
export type MealVariant = z.infer<typeof MealVariantSchema>;
