Frictionless Meal Generation Architecture

Objective

The application should provide a large and varied set of meal recommendations without making the user wait for content generation.

Generation should operate as a background content-supply system. The recommendation experience should retrieve existing, validated meals from the catalog whenever possible.

The system should:

* Generate new meal concepts asynchronously
* Detect gaps in the existing catalog
* Avoid duplicate and near-duplicate meals
* Reuse generated assets where appropriate
* Store structured meal data in a database
* Store images and other binary assets in blob storage
* Learn which generated meals actually perform well
* Maintain variety without sacrificing preference fit
* Avoid exposing generation latency to the user

The core principle is:

Generate broadly and cheaply, enrich selectively, reuse aggressively, and publish only after validation.

⸻

1. System Architecture & Boundaries

User sessions are bounded by a deterministic **Interaction Contract** (e.g., `DinnerInteractionContract`). This contract defines:
*   The participating human and computational agents (recommender, generative AI).
*   Temporal and logical session boundaries (initiating, completion, and failure conditions).
*   Active dietary restriction filters that can never be overridden by generative AI.

The background generation architecture operates as an asynchronous content-supply chain feeding into this contract:

User interactions (governed by Interaction Contract)
      ↓
Preference and demand signals (derived typed signals)
      ↓
Content gap detector
      ↓
Generation queue
      ↓
Meal concept generation
      ↓
Normalization and validation (deterministic schema & restriction checks)
      ↓
Deduplication
      ↓
Recipe expansion
      ↓
Image generation (Projections of meal space)
      ↓
Database (Postgres) and blob storage
      ↓
Recommendation inventory (used to satisfy Interaction Contracts)

The application should recommend from an existing inventory first.

Generation should usually happen before the user needs the content.

For example, when the system observes repeated interest in:

Seafood
Light
Warm
Potatoes
Mushrooms
Lemon
No tomato

It can prepare related meals in the background:

Lemon salmon with smashed potatoes
Seared cod with mushroom rice
Garlic shrimp with baby potatoes
Halibut with lemon pan sauce and green beans
Scallops with mushroom risotto

The user experiences variety, but the application is primarily retrieving previously generated and validated content.

⸻

2. Staged Generation Funnel

The system should not immediately generate a complete recipe and image for every possible meal.

A generated card or image is not mere decoration. It is a **projection** of the meal space that changes the information salience and decision opportunity of the chooser. The staged funnel must track projection versions to ensure validity of behavioral evidence.

Content should move through a staged funnel.

Stage 1: Generate Meal Concepts

Generate inexpensive structured concepts first.

{
  "name": "Lemon-seared cod with mushroom rice",
  "primaryProtein": "cod",
  "ingredients": [
    "cod",
    "rice",
    "mushrooms",
    "lemon",
    "garlic"
  ],
  "preparations": [
    "seared",
    "sauteed"
  ],
  "flavors": [
    "citrus",
    "garlic",
    "savory"
  ],
  "textures": [
    "flaky",
    "tender"
  ],
  "moods": [
    "light",
    "warm",
    "simple"
  ],
  "estimatedMinutes": 30
}

At this stage, the concept does not need:

* A full recipe
* Exact ingredient quantities
* Preparation instructions
* A generated image
* A public recommendation status

Stage 2: Score Expected Demand

Concepts should be scored before additional generation work is performed.

Demand signals include:

* The concept matches multiple users
* It fills an underserved preference combination
* Similar meals have performed well
* The ingredients are seasonally relevant
* A user recently expressed interest in the concept
* The catalog has too few recommendations for a given preference path
* The concept adds meaningful variety to an existing meal family

Stage 3: Expand Selected Concepts

Only promising concepts should be expanded.

Expansion can include:

* Ingredient quantities
* Preparation instructions
* Substitution options
* Allergen metadata
* Dietary metadata
* Nutritional estimates
* Recommendation explanations
* Search tags
* Serving information
* Equipment requirements

Stage 4: Generate Imagery

Images should be generated only after the meal has passed validation and is likely to be shown.

This prevents unnecessary image-generation cost and storage use for:

* Duplicate meals
* Weak concepts
* Invalid recipes
* Unsupported ingredient combinations
* Meals with little expected demand

⸻

3. Canonical Meals and Variants

The catalog should distinguish between a canonical meal family and its variants.

Canonical meal:
Chicken piccata
Variants:
Chicken piccata with baby potatoes
Chicken piccata with angel hair
Light chicken piccata
Gluten-free chicken piccata
Chicken piccata with mushrooms

This allows the system to provide variety without treating every small substitution as an entirely separate meal concept.

Meal Family

type MealFamily = {
  id: string
  canonicalName: string
  primaryProteinId: string | null
  primaryPreparation: string
  primarySauceFamily: string | null
  cuisineFamily: string | null
  createdAt: string
  updatedAt: string
}

Meal Variant

type MealVariant = {
  id: string
  familyId: string
  name: string
  description: string
  ingredientIds: string[]
  sideIngredientIds: string[]
  substitutionIds: string[]
  dietaryFlags: string[]
  richnessScore: number
  healthScore: number
  imageAssetId: string | null
  status: "candidate" | "validated" | "proven" | "archived"
}

The family model improves:

* Deduplication
* Search
* Recommendation diversity
* Asset reuse
* Substitution handling
* Performance analysis
* Catalog organization

⸻

4. Structured Generation

Generated content should never enter the database as an unstructured paragraph.

Every generated concept should conform to a schema.

type GeneratedMealCandidate = {
  name: string
  description: string
  primaryProteinId: string | null
  ingredientIds: string[]
  optionalIngredientIds: string[]
  preparationTags: string[]
  flavorTags: string[]
  textureTags: string[]
  moodTags: string[]
  starchType: string | null
  vegetableIngredientIds: string[]
  sauceFamily: string | null
  temperature:
    | "hot"
    | "warm"
    | "cold"
    | "room_temperature"
  format:
    | "plate"
    | "bowl"
    | "pasta"
    | "soup"
    | "salad"
    | "handheld"
  estimatedMinutes: number
  difficulty: number
  richnessScore: number
  healthScore: number
  dietaryFlags: string[]
  allergenFlags: string[]
  substitutions: Array<{
    ingredientId: string
    substituteIngredientId: string
  }>
  protocolVersion: string
  experimentCondition: "A" | "B"
}

Generated records should pass deterministic validation and filtering before they are saved or published.

Validation should confirm:

* Every ingredient resolves to a canonical ingredient record
* Every tag exists in the approved taxonomy
* Preparation methods are compatible with the ingredients
* Dietary flags match the actual ingredients
* Allergen flags are complete
* Required ingredients are present
* Estimated preparation time is plausible
* The recipe is sufficiently different from existing content
* The concept does not contain unsupported claims
* Every generated meal passes through the deterministic eligibility and restriction filter layer before presentation, ensuring that AI-generated candidates cannot override safety constraints (such as allergy blocks).

⸻

5. Deduplication Strategy

Meal deduplication should use several layers.

Exact title matching is not sufficient.

5.1 Normalized Fingerprint

Create a stable fingerprint using the meal’s defining components.

Primary protein
+ primary preparation
+ sauce family
+ major ingredients
+ starch
+ meal format

Example:

salmon|grilled|lemon-butter|green-beans|potatoes|plate

Hash the result:

const fingerprint = sha256(normalizedComponents)

If the fingerprint already exists, the system should not create another independent meal.

It may instead:

* Attach the concept as a variant
* Merge the records
* Update the existing meal
* Discard the new candidate

5.2 Weighted Ingredient Similarity

Use a weighted Jaccard similarity calculation.

Weighted intersection
÷
Weighted union

Suggested importance weights:

Component	Weight
Primary protein	5
Primary sauce family	4
Starch	3
Main vegetable	2
Secondary vegetable	1
Garnish	0.5

This prevents garnish-level differences from making two otherwise identical meals appear unique.

5.3 Semantic Similarity

Create an embedding from a compact canonical description.

Grilled salmon plate with mashed potatoes, green beans,
lemon butter, garlic, and herbs. Light, warm, and savory.

Compare the embedding against existing meals.

Suggested initial thresholds:

Similarity	Interpretation
0.94–1.00	Probable duplicate
0.87–0.94	Likely variant
0.78–0.87	Related but potentially useful
Below 0.78	Sufficiently distinct

These thresholds should be tuned using actual catalog data.

5.4 Visual Similarity

Store a perceptual hash for every generated image.

Visual similarity checks can detect:

* Identical images stored twice
* Slightly modified duplicates
* Cropped versions of an existing image
* Reused images attached to unrelated meals
* Near-identical generations

An image embedding can also be stored for broader visual similarity analysis.

⸻

6. Asset Reuse

Images should be stored independently from meals. Because they are visual projections of the meal space, they must store projection versions to establish the precise stimulus context of any user response.

type Asset = {
  id: string
  type:
    | "meal"
    | "ingredient"
    | "mood"
    | "preparation"
    | "format"
    | "restaurant_type"
  blobUrl: string
  thumbnailUrl: string | null
  prompt: string
  promptVersion: string
  projectionVersion: string
  generationModel: string
  perceptualHash: string | null
  embedding: number[] | null
  visualSignature: string
  width: number
  height: number
  status:
    | "generating"
    | "available"
    | "rejected"
    | "archived"
  createdAt: string
}

A meal variant should be allowed to reuse an existing image when the visual difference is minor.

For example:

Grilled salmon with mashed potatoes
Grilled salmon with garlic mashed potatoes
Grilled salmon with herb mashed potatoes

These variants may not require separate images.

A reusable visual signature might be:

salmon|grilled|potatoes|green-vegetable|lemon|plate

A new image should be generated only when the visible composition materially changes.

Examples of material changes include:

* A different primary protein
* A different meal format
* A visibly different sauce
* A different primary side
* A different cooking method
* A dramatically different plating style

⸻

7. Storage Responsibilities & Ledger Separation

Product telemetry (used for operational and UI diagnostics) must be strictly separated from the append-only research evidence ledger.

Postgres (App & Preference State)

Store structured and queryable records in Postgres:

* Users
* Households
* PreferenceSignals (typed: scope, source, confidence, evidence, reversibility)
* Dinner sessions (governed by Interaction Contracts)
* Meal families
* Meal variants
* Ingredients
* Meal ingredients
* Tags
* Generation jobs
* Asset metadata
* Deduplication fingerprints
* Embeddings
* Demand clusters

Postgres (Append-Only Research Event Ledger)

Store raw, immutable interaction events to preserve the complete verification lineage:

* `sessionId`
* `timestamp`
* `eventType`
* `promptId` (projected stimulus)
* `projectionVersion`
* `opportunityId` (referencing available, signaled, and enabled actions)
* `candidateSetHash` (active meal space hash before response)
* `preferenceStateHash` (active preference state hash before response)
* `response` ("yum" | "maybe" | "nope" | "skip" | "undo" | "inspect")
* `experimentCondition` ("A" or "B")
* `protocolVersion`

Blob Storage

Store binary assets in object or blob storage:

* Full-resolution meal images
* Thumbnails (optimized for speed over size)
* Ingredient images
* Preparation icons
* Mood cards
* Meal-format icons
* Source generation files
* Alternate crops
* Cached transformed images

Do not store image binaries directly in Postgres.

⸻

8. Generation Job Model

Every generation task should be represented as a durable job, stamped with experimental context.

type GenerationJob = {
  id: string
  jobType:
    | "meal_concepts"
    | "meal_expansion"
    | "meal_image"
    | "ingredient_image"
    | "retag"
    | "deduplicate"
    | "performance_review"
  status:
    | "queued"
    | "running"
    | "validating"
    | "completed"
    | "failed"
    | "rejected"
  input: Record<string, unknown>
  output: Record<string, unknown> | null
  dedupeKey: string
  priority: number
  attempts: number
  error: string | null
  createdAt: string
  startedAt: string | null
  completedAt: string | null
  candidateSetHash?: string       // Hash of active candidates when triggered
  preferenceStateHash?: string    // Hash of active preference state when triggered
  protocolVersion: string
  experimentCondition: "A" | "B"
}

Every job should have a deterministic dedupeKey.

Example:

meal-image:{mealVariantId}:{visualSignature}:{promptVersion}:{projectionVersion}

Before starting a new generation job, the system should check for:

* An active job with the same key
* A completed job with the same key
* An existing usable asset
* A recently failed job that should not yet be retried

⸻

9. Durable Generation Workflow

A complete generation workflow can follow these steps:

1. Detect a catalog gap
2. Generate 20 structured meal concepts
3. Normalize ingredient and taxonomy references
4. Validate required fields
5. Compare normalized fingerprints
6. Compare ingredient similarity
7. Compare semantic embeddings
8. Reject duplicates
9. Group related concepts into meal families
10. Score probable demand
11. Expand the top five concepts
12. Validate recipes and dietary metadata
13. Generate images for the top two concepts
14. Check visual similarity
15. Upload approved assets to blob storage
16. Publish approved meal records
17. Record generation cost and performance metadata

Each step should be independently retryable.

A failed image-generation step should not require restarting concept generation, deduplication, or recipe expansion.

The workflow should support:

* Pause and resume
* Automatic retries
* Idempotent execution
* Step-level failure recovery
* Status inspection
* Structured logs
* Manual reprocessing
* Cancellation
* Priority changes

⸻

10. Generation Triggers

The system should support three main generation triggers.

10.1 Scheduled Catalog Expansion

Run background jobs periodically to:

* Generate concepts for underserved preference combinations
* Add seasonal meals
* Expand popular meal families
* Refresh outdated imagery
* Improve weak descriptions
* Add substitutions
* Archive poor-performing content
* Rebalance the recommendation inventory

10.2 Demand-Triggered Generation

When the existing inventory is too thin, create a background generation request.

Example:

Current preference cluster:
light + shellfish + potatoes + no tomato
Strong available matches:
2
Required minimum:
8
Generation gap:
6

The current user should still receive existing recommendations immediately.

New content should improve later sessions rather than blocking the current one.

10.3 Editorial Generation

Administrators should be able to request targeted catalog expansion.

Examples:

Create 30 light summer chicken meals
Create 20 air-fryer dinners
Create seafood meals without tomato or dairy
Create 15-minute meals using pantry ingredients
Create restaurant-friendly meals for date night

Editorial jobs should use the same validation, deduplication, and publication workflow as automated jobs.

⸻

11. Demand Clusters

The system should monitor which combinations users repeatedly request.

type DemandCluster = {
  id: string
  signalSignature: string
  requestCount: number
  successfulSelectionCount: number
  availableMealCount: number
  targetMealCount: number
  generationPriority: number
  lastRequestedAt: string
  lastGeneratedAt: string | null
}

Example signal signature:

light|warm|seafood|potatoes|no-tomato

Suggested inventory targets:

Minimum options per active cluster: 12
Preferred options per active cluster: 30
Maximum close variants per meal family: 5
Minimum strong options per recommendation session: 3

The system does not need to pre-generate every theoretical combination.

It should prioritize combinations that actual users request.

⸻

12. Recommendation Diversity & Score Separation

Variety should be intentionally selected rather than randomly injected.

A recommendation set should generally contain:

1. Strongest match
2. Familiar variation
3. Safe wildcard

Diversity Constraints

Apply rules such as:

No more than two meals with the same protein
No more than one meal from the same family
No repeated primary preparation
No repeated sauce family
No meal shown in the last three sessions unless favorited
No three recommendations with the same starch

Multi-Dimensional Score Profiles

Do not immediately collapse score dimensions into one scalar. The engine preserves the complete typed profile (`MealMatchProfile`) internally containing:
*   `permanentPreference`
*   `currentSession`
*   `mood`
*   `ingredient`
*   `preparation`
*   `texture`
*   `context`
*   `historicalOutcome`
*   `novelty`

The final match percentage presented to the user is only a simplified visual projection of these independent underlying dimensions.

Diversity-Aware Ranking

Final recommendation score =
  preference score
+ context score
+ historical satisfaction
+ controlled novelty bonus
- similarity to already selected recommendations
- recent exposure penalty
- meal-family repetition penalty

Novelty should never outweigh strong preference conflicts.

⸻

13. Novelty and Risk

Novelty and risk should be modeled separately.

A meal can feel new without containing risky ingredients or unfamiliar flavor profiles.

Example:

Familiar:
Grilled salmon with potatoes and green beans
Fresh variation:
Blackened cod with mushroom rice and zucchini
Wildcard:
Citrus scallops with warm cabbage and crispy potatoes

Recommendations can be labeled internally as:

Familiar
Fresh variation
Wildcard

The application can learn each user’s preferred novelty level.

type NoveltyProfile = {
  userId: string
  preferredNoveltyScore: number
  wildcardAcceptanceRate: number
  familiarSelectionRate: number
  lastUpdatedAt: string
}

⸻

14. Content Statuses

Generated content should move through controlled statuses.

Candidate

Machine-generated and not yet trusted.

Candidate content:

* Has passed schema validation
* Has not completed all verification
* Should not normally be shown to users

Validated

The content has passed:

* Ingredient normalization
* Taxonomy validation
* Allergen derivation
* Dietary checks
* Recipe plausibility checks
* Deduplication
* Image validation, when applicable

Validated content may be shown experimentally.

Proven

The meal has produced positive user outcomes.

Signals may include:

* Strong Yum response rate
* Strong selection rate
* Successful completion
* Positive post-meal feedback
* Repeat selection
* Low rejection rate

Archived

The meal is no longer eligible for ordinary recommendation.

Reasons may include:

* Poor performance
* Incorrect metadata
* Seasonal irrelevance
* Duplicate consolidation
* Outdated imagery
* Editorial removal

⸻

15. Inventory Composition

Once enough performance data exists, recommendation inventory can use this mix:

70% proven content
20% validated content
10% exploratory content

For an early catalog without meaningful performance history:

70% editorially seeded content
20% validated generated content
10% exploratory generated content

This keeps the system useful while allowing controlled learning.

⸻

16. Research Feedback & Opportunity Tracking

Rather than tracking aggregate lifecycle metrics alone, user responses are captured within specific **Opportunity States** to measure how choices correspond to action availability.

Opportunity State Recording

For every generated card or recommendation shown, the research event ledger records the available response opportunities:

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

The system must log the exact latency between projection display and action execution.

Lifecycle Stages Tracked

*   Generated
*   Validated
*   Published
*   Shown (with associated Projection Version and Opportunity Contract)
*   Yum / Maybe / Nope / Skip (recorded with active candidate pool hashes)
*   Reversed (Undo actions)
*   Inspected (detailed view)
*   Selected (completion condition met)
*   Outcome recorded (loved it / fine / not again - updating outcome signals separately)

Poorly performing content can be:

* Retagged
* Rewritten
* Re-imaged
* Moved to another meal family
* Demoted
* Archived
* Consolidated with a stronger duplicate

The catalog should not grow indefinitely without pruning.

⸻

17. Deterministic Dietary and Allergy Handling

The language model should not be the source of truth for dietary or allergen safety.

Every meal should resolve its ingredients against canonical ingredient records.

type Ingredient = {
  id: string
  name: string
  category: string
  allergenFlags: string[]
  dietaryFlags: string[]
  containsIngredientIds: string[]
  mayContainIngredientIds: string[]
  flavorTags: string[]
  textureTags: string[]
  preparationTags: string[]
}

Dietary classifications should be derived from the actual ingredient graph.

For example, the system should not accept a generated claim that a dish is soy-free without checking:

* Soy sauce
* Tofu
* Miso
* Edamame
* Teriyaki sauce
* Processed marinades
* Packaged broths
* Substitutions
* Hidden compound ingredients

Generated prose can explain a classification, but it should not determine it.

⸻

18. Image Generation Strategy

Generated images should follow consistent visual rules.

Meal Image Prompt Template

High-quality editorial food photography of [MEAL], plated against a warm
off-white or softly neutral background. Soft natural daylight, slight
three-quarter overhead angle, realistic texture, restrained styling,
minimal garnish, warm neutral palette, clean mobile-app asset, centered
composition, consistent scale, no text, no decorative clutter.

Ingredient Prompt Template

High-quality photorealistic image of [INGREDIENT], isolated on a clean
warm-white background. Soft natural shadow, slight three-quarter angle,
realistic color and texture, centered composition, consistent scale,
premium mobile-app asset, no text, no border, no decorative props.

Category Icon Prompt Template

Friendly premium food icon representing [CATEGORY], realistic illustrated
style, soft natural texture, centered inside a subtle circular cream
backdrop, warm off-white background, gentle shadow, simple silhouette,
consistent three-quarter angle, mobile app UI asset, no text, no border.

Store the following with every generated asset:

Prompt
Prompt version
Model
Model version
Seed, when available
Generation date
Visual signature
Perceptual hash
Approval status
Associated meal or category

⸻

19. Caching and Retrieval

The application should cache frequently used content at several levels.

API Cache

Cache:

* Popular meals
* Common preference clusters
* Ingredient metadata
* Tag definitions
* Recommendation-ready records

Image CDN

Serve meal and ingredient images through a CDN with:

* Automatic resizing
* Format negotiation
* Thumbnail generation
* Device-appropriate resolution
* Long-lived cache headers
* Stable asset URLs

Recommendation Cache

Cache recommendation results using a key such as:

user:{userId}
+ session-context:{contextHash}
+ preference-signature:{signalHash}
+ catalog-version:{version}

Recommendation caches should be invalidated when:

* The user submits a new response
* A hard restriction changes
* The available catalog changes materially
* A temporary preference expires
* The meal is selected or rejected

⸻

20. Suggested Database Tables

users
households
household_members
ingredients
ingredient_components
ingredient_tags
meal_families
meal_variants
meal_ingredients
meal_tags
meal_substitutions
assets
asset_links
preferences
preference_events
dinner_sessions
session_responses
recommendation_runs
recommendation_impressions
meal_outcomes
generation_jobs
generation_job_steps
generation_costs
meal_fingerprints
meal_embeddings
asset_embeddings
demand_clusters
catalog_gap_events
taxonomy_terms
taxonomy_versions

⸻

21. Suggested Repository Structure (Mobile Web Target)

apps/
  web/          # Mobile web application (Next.js or Vite React)
  admin/        # Catalog management dashboard
  api/          # Asynchronous backend API and LLM adapters
packages/
  recommendation-engine/
  generation-engine/
  deduplication/
  preference-model/
  meal-schema/
  ingredient-schema/
  taxonomy/
  asset-management/
  validation/
  database/
  research-ledger/   # Separate append-only event ledger library
  shared-types/
workflows/
  generate-meal-concepts/
  expand-meal/
  generate-meal-image/
  detect-catalog-gaps/
  deduplicate-catalog/
  review-content-performance/
services/
  image-generation/
  embeddings/
  blob-storage/
  meal-import/

⸻

22. Initial Vertical Slice & Controlled Experiment

The initial vertical slice represents the narrow **8-card CompInt Experiment** to validate the preference loop and observation models before expanding the product features.

The initial seed catalog target is reduced from 100 to **30 carefully tagged meals** to guarantee high-fidelity metadata.

Staged Funnel Slice:
Catalog gap detected
→ Generate 10 structured concepts
→ Normalize ingredients and tags
→ Validate candidates with deterministic safety filters
→ Deduplicate against the 30-meal catalog
→ Save five candidates
→ Expand two meals
→ Generate one image (optimized for generation speed over image resolution)
→ Upload the asset
→ Publish one validated meal variant

Controlled Experiment Loop Structure:
1. Welcome Screen
2. Current Context Input (declaring Interaction Contract boundary)
3. 8 Adaptive Cards (Yum/Maybe/Nope prompts tracking Opportunity Profiles and response latency)
4. "What We're Learning Tonight" (Summary Chip Correction View for reversing signals)
5. 3 Recommendations (Multi-dimensional compatibility profiles shown as match percentages)
6. Meal Detail Inspection
7. Select or Reject Choice
8. Post-Meal Outcome Feedback (updating separate outcome signals)

⸻

23. MVP Acceptance Criteria

The background-generation system is successful when:

* Users never wait for meal generation during normal recommendation sessions
* Every generation job is idempotent
* Duplicate jobs do not create duplicate content
* Every meal uses canonical ingredient records
* Every published meal passes deterministic dietary validation
* Near-duplicate meals are grouped as variants or rejected
* Images can be reused across visually similar variants
* Failed workflow steps can retry independently
* Generated assets are stored in blob storage
* Structured content is stored in Postgres
* Recommendation sets remain varied
* Poor-performing content can be automatically demoted or archived
* Generation cost can be measured per published meal
* The catalog improves based on actual user outcomes

⸻

24. Core Product Principle

The user should experience the application as immediate, varied, and continually improving.

The infrastructure underneath should behave differently:

Retrieve first
Generate in the background
Validate before publishing
Reuse before regenerating
Measure before expanding
Archive what does not work

The result is a growing meal catalog that feels dynamic without forcing the application to regenerate every answer in real time.