# Design System Strategy: The Financial Architect

## 1. Overview & Creative North Star
The North Star for this design system is **"The Financial Architect."** In the world of fintech and payroll, "modern" shouldn't mean "minimalist to the point of being empty." Instead, we aim for a high-end editorial experience that feels authoritative, precise, and layered. 

We move beyond the standard SaaS "box-and-line" layout. This system utilizes **Intentional Asymmetry** and **Tonal Depth** to guide the eye through complex data. By breaking the rigid grid with overlapping surface elements and exaggerated typographic scales, we transform a utility tool into a premium executive dashboard. The goal is to make the user feel like they are not just "processing payroll," but "orchestrating capital."

---

## 2. Colors & Surface Philosophy
Our palette is rooted in trust and precision. We use deep monochromatic blues for stability and a vibrant emerald for momentum.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background creates a natural, sophisticated edge that feels integrated, not "caged."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
- **Base:** `surface` (#f7f9fb)
- **Primary Layout Blocks:** `surface-container-low` (#f2f4f6)
- **Floating Interactive Elements:** `surface-container-lowest` (#ffffff)
- **Information Depth:** Use `surface-container-high` (#e6e8ea) for inactive or backgrounded data modules to push them "further back."

### The "Glass & Gradient" Rule
To elevate CTAs beyond the "flat" look:
- **CTAs:** Use a subtle linear gradient from `primary` (#000000) to `primary-container` (#111c2d) at a 135° angle.
- **Overlays:** Use `surface-container-lowest` with an 80% opacity and a `20px` backdrop-blur to create a "frosted glass" effect for modals and navigation bars.

---

## 3. Typography
We use a dual-font strategy to balance character with utility.

*   **Display & Headlines (Manrope):** A modern geometric sans-serif with a high x-height. Use `display-lg` (3.5rem) for high-impact numbers (e.g., Total Payroll Spend) to create an editorial feel.
*   **Body & Labels (Inter):** The workhorse for readability. Inter’s contextual alternates make it perfect for data-heavy tables.

**Hierarchy as Identity:** 
Large, bold headlines in `on-surface` (#191c1e) communicate authority, while `label-md` in `on-surface-variant` (#45464d) provides a quiet, professional metadata layer. Never use pure black for body text; use `on-surface` to maintain a premium, softened contrast.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift without needing a shadow.
*   **Ambient Shadows:** For floating elements (Modals, Popovers), use a custom shadow: `0px 24px 48px -12px rgba(25, 28, 30, 0.08)`. The shadow color is a tinted version of `on-surface` (#191c1e) to mimic natural light.
*   **The Ghost Border Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. Total 100% opaque borders are strictly forbidden.

---

## 5. Components

### Input Fields & Data Entry
*   **Structure:** No heavy borders. Use `surface-container-highest` as the background with a `sm` (0.125rem) rounded corner. 
*   **States:** On focus, transition the background to `surface-container-lowest` and add a `2px` "Ghost Border" using `primary`.
*   **Validation:** Error states use `error` (#ba1a1a) text with a `error_container` background tint.

### Data Tables (The Core)
*   **Zero Dividers:** Forbid the use of horizontal lines. Use vertical white space (`spacing-4` / 0.9rem) between rows.
*   **Zebra Striping 2.0:** Use `surface-container-low` for every second row instead of lines.
*   **Header:** Use `label-sm` in all-caps with `0.05em` letter spacing for an architectural feel.

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `md` (0.375rem) corners.
*   **Secondary:** No fill. `outline-variant` Ghost Border at 20%.
*   **Tertiary (Emerald Growth):** Use `tertiary_fixed` (#6ffbbe) for "Approve" or "Success" actions, paired with `on_tertiary_fixed` (#002113) text.

### Interactive Chips
*   **Filter Chips:** Use `secondary_container` (#d0e1fb) with `on_secondary_container` (#54647a) text. Ensure `full` (9999px) roundedness for high contrast against rectangular cards.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use `spacing-10` (2.25rem) or `spacing-12` (2.75rem) for page margins to give data "room to breathe."
*   **Do** use `tertiary` (Emerald) exclusively for money-related growth, success, or "Final Action" buttons.
*   **Do** nest containers using the surface scale (Lowest -> Low -> Base).

### Don't
*   **Don't** use 1px solid #CCCCCC borders. If you feel you need a line, use a background color change instead.
*   **Don't** use standard "drop shadows." Only use the ambient, low-opacity shadows defined in Section 4.
*   **Don't** crowd data. If a table feels tight, increase the row height to `spacing-16` (3.5rem) before considering a smaller font.