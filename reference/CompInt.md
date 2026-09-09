Yumyuck should be built as both a usable dinner-decision product and a controlled CompInt experiment.

The product objective is simple:

Help a person who cannot readily state what they want recognize an acceptable meal through low-effort reactions, progressive constraint, and reversible recommendation.

The research objective is different:

Determine whether typed opportunity, projection, behavioral, measurement, and strategy data improve recommendation quality beyond ordinary preference lists and click histories.

This separation matters. A working app does not prove the theory, and a clean experiment should not make the product feel like a questionnaire. CompInt’s final synthesis explicitly treats records, behavior, interpretation, opportunity, and evidence as separate objects rather than interchangeable telemetry. Computational_Interaction_Science_Foundations.pdf

1. Product thesis

Yumyuck is not primarily a recipe browser.

It is a recognition-driven preference elicitation system.

The user is not asked to construct a meal concept from nothing. The system presents increasingly concrete projections of possible dinner space, and the user narrows that space through:

* attraction;
* hesitation;
* rejection;
* correction;
* final approval;
* post-meal outcome feedback.

The central loop is:

Meal space
    ↓
Selected projection
    ↓
Perceived options
    ↓
Yum / Maybe / Nope
    ↓
Updated preference state
    ↓
More discriminating projection
    ↓
Candidate meals
    ↓
Selection and outcome

The app should learn from decisions while preserving the distinction between:

* what the system presented;
* what was actually possible;
* what the user appeared to notice;
* what the user selected;
* what the user later reported enjoying.

2. The CompInt experiment

The first experiment should test whether a structured, opportunity-aware process reaches a satisfying meal faster and with fewer frustrating decisions than a conventional recipe-search flow.

Primary question

Does progressive recognition-based narrowing produce faster and more satisfactory dinner decisions than open-ended search or direct category selection?

Secondary questions

* Which prompt types produce the largest useful reduction in meal candidates?
* Do ingredient, mood, format, and complete-meal projections produce different response reliability?
* When does “Maybe” indicate uncertainty, conditional acceptance, weak preference, or insufficient information?
* Which response patterns predict final acceptance?
* Does post-meal feedback improve future decisions beyond pre-meal swipes?
* Does an explicit explanation improve trust and correction without increasing decision burden?

The experiment should not infer stable personality, culture, intelligence, or psychological traits from food choices. Behavior is evidence generated under an observation model, not direct access to internal cognition. Behavior_Toward_a_Scientific_Theory_of_Computational_Behavior.pdf

3. Interaction participants

The app should use interaction participant, not “agent,” as its broadest role.

Participants include:

* the person choosing food;
* an optional household partner;
* the recommendation engine;
* the generative-AI service;
* the meal catalog;
* dietary and safety policies;
* external restaurant or grocery systems.

The AI is a computational participant. It may generate prompts, explanations, substitutions, or candidate meals, but it should not control dietary safety or hard eligibility.

Hard restrictions must remain deterministic and inspectable.

4. The interaction contract

Each dinner session should instantiate an Interaction Contract.

type DinnerInteractionContract = {
  id: string
  version: string
  participants: {
    chooserUserIds: string[]
    recommendationEngineVersion: string
    aiModelVersion?: string
  }
  boundary: {
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
    startedAt: string
    endsWhen:
      | "meal-selected"
      | "session-abandoned"
      | "session-expired"
  }
  context: {
    diningMode?: "cook" | "delivery" | "restaurant"
    people?: number
    budget?: number
    maxTimeMinutes?: number
    availableEquipment?: string[]
    locationId?: string
  }
  initiatingConditions: {
    candidateMealIds: string[]
    activeRestrictions: string[]
    permanentPreferences: string[]
    temporaryPreferences: string[]
  }
  completionConditions: {
    selectedMealId?: string
    explicitNoDecision?: boolean
  }
  failureConditions: {
    noEligibleMeals: boolean
    restrictionConflict: boolean
    recommendationExhaustion: boolean
  }
}

The session boundary is important. “No asparagus today” must not silently become a permanent dislike.

5. Projection system

Every card is a projection of the same meal space.

Yumyuck will use several projection types:

Attribute projection

Examples:

* warm;
* crispy;
* comforting;
* light;
* grilled.

Ingredient projection

Examples:

* mushrooms;
* potatoes;
* salmon;
* garlic.

Category projection

Examples:

* seafood;
* pasta;
* bowls;
* plated meals.

Combination projection

Examples:

* salmon + potatoes;
* chicken + lemon;
* steak + mushrooms.

Complete-meal projection

A specific candidate with image, components, preparation, and explanation.

Each projection should declare what it exposes and what it leaves ambiguous. Representation research shows that different forms can preserve the same target information while changing inference, salience, effort, and action opportunity. Representation_Invariance_and_Projection.pdf

A generated image is therefore not decoration. It changes the evidence available to the chooser.

For example, “mushrooms?” and a photograph of filet mignon with mushrooms are not equivalent prompts. One asks about an ingredient in isolation; the other presents mushrooms within a particular role, flavor context, portion, and visual treatment.

6. Opportunity model

For every response card, record separate opportunity dimensions.

type ResponseOpportunity = {
  promptId: string
  candidateSetBefore: string[]
  actions: {
    yum: OpportunityState
    maybe: OpportunityState
    nope: OpportunityState
    skip: OpportunityState
    undo: OpportunityState
    inspect: OpportunityState
  }
}
type OpportunityState = {
  domainValid: boolean
  permitted: boolean
  enabled: boolean
  exposed: boolean
  signaled: boolean
  reversible: boolean
}

Do not record only that the user selected “Nope.”

Record that:

* Yum, Maybe, Nope, Skip, and Undo were available;
* their labels and gestures were visible;
* the card contained a particular image and description;
* the response occurred after a specific delay;
* prior cards had changed the active candidate space.

Opportunity theory distinguishes feasibility, permission, exposure, signaling, belief, execution, success, and reversibility because each can diverge. Opportunity_Affordance_and_Action_Availability.pdf

7. Preference model

The other agent’s five-way preference distinction is correct, but it should become a typed evidence system rather than one undifferentiated profile.

type PreferenceSignal = {
  id: string
  userId: string
  target: {
    entityType:
      | "ingredient"
      | "meal"
      | "protein"
      | "preparation"
      | "texture"
      | "flavor"
      | "format"
      | "mood"
      | "temperature"
    entityId: string
  }
  sentiment: "yum" | "maybe" | "nope"
  strength: number
  scope:
    | "session"
    | "meal"
    | "day"
    | "week"
    | "persistent"
  source:
    | "explicit-profile"
    | "session-response"
    | "meal-selection"
    | "post-meal-feedback"
    | "inferred"
  confidence: number
  createdAt: string
  expiresAt?: string
  evidenceIds: string[]
  reversible: true
}

The important rule is:

A recorded response is not automatically a permanent preference.

A “Nope” can mean:

* never;
* not tonight;
* not presented this way;
* not with these ingredients;
* not enough information;
* image looks unappealing;
* recently eaten;
* currently restricted.

The system should ask for clarification only when the distinction materially changes recommendations.

For example:

Is that a general no, or just not tonight?

This should appear sparingly, not after every rejection.

8. Recommendation architecture

The first version should use deterministic candidate filtering and weighted scoring.

Stage 1: eligibility

Reject meals with:

* allergy conflicts;
* hard medical conflicts;
* explicit hard exclusions;
* unavailable required ingredients;
* incompatible dining mode;
* impossible preparation-time constraints.

Generative AI must never override this layer.

Stage 2: compatibility

Calculate independent dimensions:

Permanent preference compatibility
Current-session compatibility
Mood compatibility
Ingredient compatibility
Preparation compatibility
Texture compatibility
Context compatibility
Novelty or repetition
Historical outcome
Uncertainty

Do not immediately collapse these dimensions into one number internally.

The system may display a simplified match percentage, but the engine should preserve the complete typed profile.

type MealMatchProfile = {
  mealId: string
  eligible: boolean
  blockingConflicts: string[]
  dimensions: {
    permanentPreference: number
    currentSession: number
    mood: number
    ingredient: number
    preparation: number
    texture: number
    context: number
    historicalOutcome: number
    novelty: number
  }
  uncertainty: number
  weightedScore: number
  displayPercentage: number
  supportingSignals: string[]
  conflictingSignals: string[]
  avoidedConflicts: string[]
}

The Comparative Interaction research rejects universal single scores unless the weighting model and compensation rules are explicit. The internal result should therefore be a profile; the percentage is only a user-facing summary. Comparative_Interaction_Toward_a_Scientific_Method_for_Comparing_Computational_Interactions.pdf

9. Question-selection engine

The engine should choose the next prompt by expected decision value.

A prompt is useful when it:

* divides the candidate set;
* addresses an unresolved preference;
* reduces uncertainty;
* separates highly ranked candidates;
* introduces a concrete food after abstract prompts;
* does not repeat recently established information;
* avoids unnecessary decision burden.

A practical first formula is:

Question Value =
candidate separation
× preference uncertainty
× recommendation relevance
× presentation diversity
- repetition cost
- cognitive burden

The engine should alternate levels:

Mood
→ Protein
→ Ingredient
→ Texture
→ Meal format
→ Complete meal

It should stop asking questions when expected information gain becomes smaller than the cost of another choice.

Recommendation readiness could initially require:

* at least five non-skip responses;
* at least one concrete food response;
* no unresolved hard restriction;
* three eligible candidates with meaningful score separation;
* uncertainty below a configured threshold.

10. Generative AI’s role

AI should assist only where generation adds value.

Appropriate uses:

* generating a concrete meal from an established preference profile;
* proposing substitutions;
* writing short recommendation explanations;
* converting abstract signals into recognizable meal concepts;
* creating image prompts;
* suggesting a discriminating next question;
* expanding a sparse candidate pool.

Inappropriate uses:

* deciding whether an allergy conflict is acceptable;
* inventing dietary facts;
* silently changing preference scope;
* presenting unsupported nutrition claims;
* assigning match percentages directly;
* inferring protected or psychological characteristics;
* persisting an inferred preference without evidence.

A generated meal must be normalized into the same schema as catalog meals and passed through deterministic validation before presentation.

Preference profile
→ AI candidate generation
→ Schema validation
→ Ingredient normalization
→ Restriction filter
→ Scoring engine
→ User-facing recommendation

11. First vertical slice

The first experiment should be narrower than the full MVP.

Build:

Welcome
→ Current context
→ 8 adaptive cards
→ “What we’re learning tonight”
→ 3 recommendations
→ Meal detail
→ Select or reject
→ Post-meal outcome

Do not build Favorites, History, household administration, restaurant search, delivery, grocery lists, or a full profile editor until the decision loop works.

Card sequence

The eight cards should not be predetermined, but a representative session might be:

1. Something warm?
2. Seafood?
3. Potatoes?
4. Something light?
5. Mushrooms?
6. Grilled?
7. Plate or bowl?
8. Salmon with mashed potatoes and green beans?

The final meal preview acts as a synthesis check.

12. Evidence model

Every event should preserve the path from system state to research claim.

type YumyuckEvent = {
  id: string
  sessionId: string
  timestamp: string
  eventType:
    | "session_started"
    | "prompt_presented"
    | "prompt_inspected"
    | "response_selected"
    | "response_reversed"
    | "summary_presented"
    | "signal_removed"
    | "recommendations_presented"
    | "meal_inspected"
    | "meal_rejected"
    | "meal_selected"
    | "session_abandoned"
    | "outcome_recorded"
  promptId?: string
  mealId?: string
  response?: "yum" | "maybe" | "nope" | "skip"
  projectionVersion: string
  opportunityId?: string
  candidateSetHash: string
  preferenceStateHash: string
  metadata: Record<string, unknown>
}

The evidence chain is:

Raw event
→ verified event
→ session response
→ derived preference signal
→ recommendation profile
→ bounded interpretation

“User likes seafood” should not be inferred from one salmon swipe.

“Seafood received positive responses in this session” is supportable.

13. Measurement contract

The experiment needs a frozen Measurement Contract.

Primary product outcomes

* time to first recommendation;
* time to accepted meal;
* number of prompts;
* recommendation acceptance;
* session abandonment;
* number of reversals;
* final post-meal satisfaction.

Secondary behavioral measures

* response latency;
* skip rate;
* use of Undo;
* summary-chip corrections;
* recommendation inspection depth;
* rejection after high displayed match;
* number of “show another” requests;
* difference between pre-meal acceptance and post-meal satisfaction.

Latent constructs requiring separate measures

* believed meal suitability;
* confidence;
* perceived decision difficulty;
* perceived explanation usefulness.

These cannot be inferred directly from response time or final selection.

A metric is not the construct it is intended to represent. The final CompInt framework requires an explicit mapping from observations to measures and from measures to bounded claims. Computational_Interaction_Science_Foundations.pdf

14. Initial hypotheses

H1 — Recognition advantage

Users will reach a meal decision faster with adaptive Yum/Maybe/Nope prompts than with open-ended search.

H2 — Concrete-projection advantage

Responses to complete meals and ingredient combinations will predict final meal acceptance better than responses to isolated abstract attributes.

H3 — Typed-signal advantage

A model that distinguishes session, persistent, contextual, and outcome-derived signals will predict post-meal satisfaction better than a model using a single preference score.

H4 — Opportunity-profile advantage

A recommendation model using exposure, signaling, reversibility, and candidate availability will explain rejection and correction behavior better than action logs alone.

H5 — Outcome-feedback advantage

Post-meal feedback will improve future recommendation ranking more than an equivalent number of pre-meal swipes.

H6 — Explanation correction effect

Short recommendation explanations will increase useful corrections and reduce unexplained rejection, but may not increase acceptance directly.

Each hypothesis should specify the exposure, outcome, controls, analysis, and falsification condition before testing.

15. Product comparison conditions

For the initial study, compare two experiences:

Condition A — Open selection

The user browses categories or searches manually.

Condition B — Adaptive recognition

The user responds to one projected stimulus at a time.

Hold constant:

* meal catalog;
* restrictions;
* images;
* final candidate eligibility;
* meal detail content;
* device class;
* approximate task goal.

The comparison must pass target, boundary, opportunity, observation, measurement, correspondence, and ethics gates before product conclusions are made. Comparative_Interaction_Toward_a_Scientific_Method_for_Comparing_Computational_Interactions.pdf

16. Technical architecture

Because this is a mobile web app, the first implementation should be simpler than the proposed React Native stack.

apps/
  web/
  admin/
packages/
  meal-schema/
  meal-catalog/
  preference-model/
  recommendation-engine/
  question-engine/
  experiment-protocol/
  event-schema/
  design-system/
  ai-adapter/

Recommended first stack:

* Next.js or Vite React;
* TypeScript;
* PostgreSQL/Supabase;
* Zod for runtime schemas;
* Drizzle or Prisma;
* object storage for generated assets;
* PostHog for product analytics;
* a separate append-only research event ledger;
* Sentry for operational errors.

Do not mix product analytics with research evidence. Product analytics may be sampled, transformed, or mutable. The research ledger should preserve protocol version, prompt version, projection version, candidate state, and event provenance.

17. Visual system

The supplied mockup is a strong starting projection:

* warm cream background;
* dark forest green;
* editorial serif headlines;
* large food imagery;
* one primary decision at a time;
* green, yellow, and coral response controls;
* low-density copy;
* visible but non-pressuring progress;
* card-based movement.

The first screen should remain simpler than the mockup:

Let’s figure it out.
A few quick reactions and we’ll find something that sounds right.

Primary action: Start

Secondary actions can be delayed until the user has history:

* Use recent preferences
* Surprise me

The central tab should be Decide, but the vertical slice does not initially need persistent tab navigation. A focused full-screen session will better preserve the episode boundary and reduce accidental exits.

18. Immediate build order

1. Define the normalized meal and ingredient schemas.
2. Create 30 carefully tagged meals, not 100 weakly tagged meals.
3. Define restriction and temporary-preference handling.
4. Build the deterministic scoring engine.
5. Build the adaptive question selector.
6. Define the event and contract schemas.
7. Build the eight-card interaction.
8. Build summary correction.
9. Build the three-candidate recommendation view.
10. Build meal selection and post-meal feedback.
11. Add AI candidate generation behind deterministic validation.
12. Run the first controlled comparison.

19. Definition of done

The first Yumyuck experiment is ready when:

* the user can reach three recommendations in under two minutes;
* no free-text answer is required;
* every prompt records its projection and available response opportunities;
* hard restrictions cannot be overridden by AI;
* temporary signals expire correctly;
* every inferred preference has traceable evidence;
* the user can reverse a response or learned signal;
* recommendation explanations name supporting and conflicting evidence;
* post-meal feedback updates future ranking separately from pre-meal preference;
* the adaptive flow can be compared against an open-selection baseline;
* the complete episode can be replayed from an append-only event record.

The critical product insight remains valid:

The hard part is not the swipe gesture. It is maintaining a trustworthy relationship between the meal space, the projection shown, the choices available, the evidence collected, and the recommendation produced.

That is precisely where Yumyuck becomes a meaningful CompInt experiment rather than another recipe application.