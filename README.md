# What's Cooking? — Modern Recipe Discovery & Food Editorial 🌿

A modern, minimal, frontend-only recipe discovery web application and culinary publication designed to help home cooks find wholesome meals, search recipes by name or ingredient, explore food categories, and save their favorite recipes.

Built strictly with **HTML5**, **CSS3**, and **Vanilla JavaScript** (no external frameworks, libraries, or backend server).

---

## 🎨 Visual Identity & Design System

The design reflects an **editorial culinary publication** (warm, grounded, and distraction-free):

| Token | Hex | Role |
|---|---|---|
| **Background** | `#FAF9F6` | Warm Alabaster canvas — eliminates screen glare |
| **Primary** | `#657A50` | Olive Sage — primary buttons, active filters, step numbers |
| **Dark Text** | `#252820` | Charcoal-Earth — high-legibility headings and body text |
| **Secondary Background** | `#F0F0E8` | Muted Khaki — hero section, search backdrop, cards |
| **Accent** | `#D99B62` | Toasted Amber — active heart toggles, highlight badges |
| **Card Surface** | `#FFFFFF` | Crisp White — recipe card elevation & modal surface |

### Typography
- **Headings & Display:** `Playfair Display` (Serif) — editorial poise, warmth, and culinary heritage.
- **Body & Measurements:** `Inter` / System Sans-Serif — clear legibility for ingredients, quantities, and steps.

---

## 🌟 Key Features

1. **Responsive Editorial Navigation**
   - Sticky header with brand wordmark, active section indicator, and accessible mobile drawer menu.
2. **Warm Editorial Hero Section**
   - Subtle radial glow, headline, subtitle, and dual action buttons navigating directly to recipe discovery or the ingredient pantry.
3. **Curated Editor's Table (Featured)**
   - Curated highlight grid showcasing seasonal favorites directly on the homepage.
4. **All Recipes Catalog**
   - Responsive multi-column grid (3 columns desktop, 2 columns tablet, 1 column mobile).
   - Recipe cards featuring 4:3 photography, title, description, category tags, cooking time, difficulty badge, and floating blur-glass favorite heart toggles.
5. **Dual-Mode Recipe Search**
   - Real-time client-side search filtering on `input`.
   - **Search by Name** and **Search by Ingredient** mode toggle tabs.
   - Clear (`×`) button when search input contains text.
   - User-friendly empty state when no recipes match.
6. **Multi-Ingredient Pantry Finder**
   - Enter multiple ingredients on hand (`chicken`, `tomato`, `garlic`, etc.).
   - Removable chip tags with single-click removal.
   - Case-insensitive duplicate prevention.
   - Matches dishes using any entered ingredients and sorts by best match count (e.g., *"Matches 3 of 3 ingredients"*).
7. **Organized Recipe Collections (Categories)**
   - Filter by **Breakfast**, **Lunch**, **Dinner**, **Desserts**, **Vegetarian**, and **All Dishes**.
   - Active state styling on pill buttons.
8. **Recipe Details Modal Sheet**
   - Opens when clicking any recipe card.
   - Displays 16:9 hero image, title, categories, cooking time, difficulty, serving count, ingredient list with quantities, and ordered step-by-step cooking instructions.
   - Synchronized favorite toggle button inside the modal.
   - Accessible: closes with close button, overlay click, or `Escape` key, with background scroll lock.
9. **Personal Kitchen Box (Favorites)**
   - Save and remove recipes with a single click on heart icons across all views.
   - Persistent across browser reloads and sessions using browser `localStorage` (`whatsCooking_favorites`).
   - Dedicated **Saved Recipes** page with empty-state guidance and a *"Browse Recipes"* prompt.
10. **Graceful Error Handling & Fallbacks**
    - Fallback emoji placeholders if image files are unavailable.
    - Safe `JSON.parse` with try/catch to protect against missing or corrupted `localStorage`.
    - `<noscript>` fallback for environments where JavaScript is disabled.

---

## 📁 Project Structure

```
whats-cooking/
├── index.html              # Main semantic HTML5 document (Single-Page Application)
├── css/
│   └── style.css           # Complete CSS3 stylesheet with design tokens & responsive media queries
├── js/
│   ├── recipes.js          # Predefined dataset of 18 recipes (Breakfast, Lunch, Dinner, Desserts, Vegetarian)
│   └── script.js           # Core application logic, routing, DOM manipulation, and LocalStorage
├── assets/
│   ├── images/             # Recipe images directory
│   └── icons/              # Static icon assets
└── README.md               # Project documentation
```

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari).
2. No build tools, package managers, or server installations required.

---

## 💾 LocalStorage Specification

- **Storage Key:** `whatsCooking_favorites`
- **Value Format:** JSON-encoded array of recipe IDs, e.g. `["r001", "r004", "r011"]`
- **Behavior:** Syncs synchronously across recipe cards, the detail modal, and the saved recipes view.

---

## 📱 Responsive Breakpoints

- **Mobile:** `< 768px` (single-column cards, hamburger drawer menu)
- **Tablet:** `768px - 1023px` (two-column card grid, inline navigation)
- **Desktop:** `≥ 1024px` (three-column card grid)
- **Large Desktop:** `≥ 1440px` (four-column featured grid)

---

## 📄 License & Attribution

Developed for the **What's Cooking?** university software engineering project.
