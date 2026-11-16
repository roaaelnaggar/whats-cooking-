/* ============================================================
   What's Cooking? — Main Application Script
   ============================================================
   Organization:
     1. State Management
     2. LocalStorage Persistence (Favorites)
     3. DOM Element Caching
     4. Recipe Card Renderer
     5. Recipe Details Modal
     6. Navigation & View Routing
     7. Recipe Search (By Name & By Ingredient)
     8. Category Filters
     9. Ingredient Finder (Multi-Ingredient Matching)
     10. Favorites Page & Synchronized Toggling
     11. Initialization
   ============================================================ */

(() => {
    'use strict';

    /* ============================================================
       1. STATE MANAGEMENT
       ============================================================ */
    const STORAGE_KEY = 'whatsCooking_favorites';

    const state = {
        currentSection: 'home',
        searchQuery: '',
        searchMode: 'name', // 'name' | 'ingredient'
        selectedCategory: 'all',
        finderIngredients: [],
        favorites: [] // Array of recipe ID strings
    };

    // Recipe emoji mappings for aesthetic visual badges and fallback placeholders
    const recipeEmojis = {
        r001: '🥞', r002: '🥑', r003: '🥗', r004: '🍗',
        r005: '🍝', r006: '🍲', r007: '🌋', r008: '🥪',
        r009: '🥣', r010: '🫐', r011: '🐟', r012: '🍫',
        r013: '🌯', r014: '🍅', r015: '🥧', r016: '🌯',
        r017: '🥭', r018: '🌮'
    };

    /* ============================================================
       2. LOCALSTORAGE PERSISTENCE (Favorites)
       ============================================================ */

    /**
     * Read saved favorites from LocalStorage safely (SRS EH-01, EH-02).
     * @returns {string[]} Array of recipe IDs
     */
    function loadFavorites() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return [];
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                return parsed.filter(id => typeof id === 'string');
            }
            return [];
        } catch (err) {
            console.warn('LocalStorage unavailable or corrupted. Resetting favorites.', err);
            return [];
        }
    }

    /**
     * Save favorites to LocalStorage safely (SRS FR-07, VR-07-2).
     * @param {string[]} favList 
     */
    function saveFavorites(favList) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favList));
        } catch (err) {
            console.warn('Failed to write favorites to LocalStorage.', err);
        }
    }

    /**
     * Check if a recipe is currently favorited.
     * @param {string} recipeId 
     * @returns {boolean}
     */
    function isFavorited(recipeId) {
        return state.favorites.includes(recipeId);
    }

    /**
     * Toggle a recipe's favorite status and update all views synchronously.
     * @param {string} recipeId 
     */
    function toggleFavorite(recipeId) {
        if (!recipeId) return;

        const index = state.favorites.indexOf(recipeId);
        if (index > -1) {
            state.favorites.splice(index, 1);
        } else {
            state.favorites.push(recipeId);
        }

        saveFavorites(state.favorites);

        // Update all heart toggles in DOM with this recipe ID
        updateFavoriteButtons(recipeId);

        // If Favorites view is active, refresh it
        if (state.currentSection === 'favorites') {
            renderFavoritesSection();
        }
    }

    /**
     * Sync heart button visual states across card and modal instances.
     * @param {string} recipeId 
     */
    function updateFavoriteButtons(recipeId) {
        const favorited = isFavorited(recipeId);
        const buttons = document.querySelectorAll(`[data-fav-id="${recipeId}"]`);

        buttons.forEach(btn => {
            const isModalBtn = btn.classList.contains('modal__favorite');
            const activeClass = isModalBtn ? 'modal__favorite--active' : 'recipe-card__favorite--active';
            const label = favorited ? 'Remove from favorites' : 'Add to favorites';

            if (favorited) {
                btn.classList.add(activeClass);
            } else {
                btn.classList.remove(activeClass);
            }
            btn.setAttribute('aria-label', label);
        });
    }

    /* ============================================================
       3. DOM ELEMENT CACHING
       ============================================================ */
    const elements = {
        // Navigation
        navToggle: document.getElementById('nav-toggle'),
        navMenu: document.getElementById('nav-menu'),
        navBackdrop: document.getElementById('nav-backdrop'),
        sections: document.querySelectorAll('.section'),

        // Grids & Sections
        featuredGrid: document.getElementById('featured-grid'),
        recipesGrid: document.getElementById('recipes-grid'),
        recipesEmpty: document.getElementById('recipes-empty'),

        // Search
        searchInput: document.getElementById('search-input'),
        searchClear: document.getElementById('search-clear'),
        searchModes: document.querySelectorAll('.search__mode'),

        // Categories
        categoryFilterBtns: document.querySelectorAll('.category-filters__btn'),
        categoriesGrid: document.getElementById('categories-grid'),
        categoriesEmpty: document.getElementById('categories-empty'),

        // Ingredient Finder
        finderInput: document.getElementById('finder-input'),
        finderAdd: document.getElementById('finder-add'),
        finderChips: document.getElementById('finder-chips'),
        finderGrid: document.getElementById('finder-grid'),
        finderEmpty: document.getElementById('finder-empty'),
        finderNoMatch: document.getElementById('finder-no-match'),

        // Favorites
        favoritesGrid: document.getElementById('favorites-grid'),
        favoritesEmpty: document.getElementById('favorites-empty'),

        // Modal
        modal: document.getElementById('recipe-modal'),
        modalOverlay: document.getElementById('modal-overlay'),
        modalClose: document.getElementById('modal-close'),
        modalBody: document.getElementById('modal-body')
    };

    // Keep track of the element that had focus before the modal opened (WCAG 2.4.3)
    let lastFocusedElement = null;

    /* ============================================================
       4. RECIPE CARD RENDERER (FR-02)
       ============================================================ */

    /**
     * Create an interactive recipe card element.
     * @param {Object} recipe - Recipe data object
     * @param {Object} [options] - Optional configurations (e.g., matchText)
     * @returns {HTMLElement}
     */
    function createRecipeCard(recipe, options = {}) {
        const card = document.createElement('article');
        card.className = 'recipe-card';
        card.setAttribute('data-recipe-id', recipe.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View details for ${recipe.name}`);

        const favorited = isFavorited(recipe.id);
        const emoji = recipeEmojis[recipe.id] || '🍲';
        const difficultyClass = `recipe-card__difficulty--${recipe.difficulty.toLowerCase()}`;

        // Optional match badge for Ingredient Finder
        const matchBadgeHtml = options.matchText
            ? `<div class="recipe-card__match"><span>✓</span> ${options.matchText}</div>`
            : '';

        // Category pills
        const categoryPillsHtml = recipe.categories
            .map(cat => `<span class="recipe-card__category-tag">${cat}</span>`)
            .join('');

        card.innerHTML = `
            <div class="recipe-card__image-wrapper">
                <div class="recipe-card__image-placeholder" aria-hidden="true">${emoji}</div>
                <img
                    class="recipe-card__image"
                    src="${recipe.image}"
                    alt="${recipe.name}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >
                <button
                    class="recipe-card__favorite ${favorited ? 'recipe-card__favorite--active' : ''}"
                    data-fav-id="${recipe.id}"
                    aria-label="${favorited ? 'Remove from favorites' : 'Add to favorites'}"
                    type="button"
                >
                    <svg class="recipe-card__favorite-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="recipe-card__body">
                <div class="recipe-card__categories">
                    ${categoryPillsHtml}
                </div>
                <h3 class="recipe-card__name">${recipe.name}</h3>
                <p class="recipe-card__description">${recipe.description}</p>
                ${matchBadgeHtml}
                <div class="recipe-card__meta">
                    <span class="recipe-card__meta-item">
                        <svg class="recipe-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${recipe.cookingTime}
                    </span>
                    <span class="recipe-card__difficulty ${difficultyClass}">
                        ${recipe.difficulty}
                    </span>
                </div>
            </div>
        `;

        // Card click handler: open modal, unless favorite button was clicked (VR-02-4)
        card.addEventListener('click', (e) => {
            const favBtn = e.target.closest('[data-fav-id]');
            if (favBtn) {
                e.stopPropagation();
                toggleFavorite(recipe.id);
                return;
            }
            openRecipeModal(recipe.id);
        });

        // Keyboard navigation (Enter key opens modal)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const favBtn = e.target.closest('[data-fav-id]');
                if (!favBtn) {
                    openRecipeModal(recipe.id);
                }
            }
        });

        return card;
    }

    /**
     * Render a list of recipes into a target container.
     * @param {Array} list - Array of recipe objects
     * @param {HTMLElement} container - Target container element
     * @param {Object} [options]
     */
    function renderRecipeList(list, container, options = {}) {
        if (!container) return;
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();

        list.forEach(recipe => {
            const card = createRecipeCard(recipe, options);
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    /* ============================================================
       5. RECIPE DETAILS MODAL (FR-06)
       ============================================================ */

    /**
     * Open and populate the recipe detail modal.
     * @param {string} recipeId 
     */
    function openRecipeModal(recipeId) {
        if (typeof recipes === 'undefined' || !Array.isArray(recipes)) return;
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe || !elements.modal || !elements.modalBody) return;

        // Remember triggering element to restore focus on close (WCAG 2.4.3)
        lastFocusedElement = document.activeElement;

        const favorited = isFavorited(recipe.id);
        const emoji = recipeEmojis[recipe.id] || '🍲';
        const difficultyClass = `recipe-card__difficulty--${recipe.difficulty.toLowerCase()}`;

        // Build Ingredients HTML
        const ingredientsHtml = recipe.ingredients
            .map(ing => `
                <li class="modal__ingredient">
                    <span class="modal__ingredient-qty">${ing.quantity}</span>
                    <span class="modal__ingredient-name">${ing.name}</span>
                </li>
            `).join('');

        // Build Instructions HTML
        const instructionsHtml = recipe.instructions
            .map((step, idx) => `
                <li class="modal__step">
                    <span class="modal__step-number">${idx + 1}</span>
                    <p class="modal__step-text">${step}</p>
                </li>
            `).join('');

        // Build Category Badges
        const categoriesHtml = recipe.categories
            .map(cat => `<span class="recipe-card__category-tag">${cat}</span>`)
            .join(' ');

        elements.modalBody.innerHTML = `
            <div class="modal__image-wrapper">
                <div class="recipe-card__image-placeholder" aria-hidden="true">${emoji}</div>
                <img
                    class="modal__image"
                    src="${recipe.image}"
                    alt="${recipe.name}"
                    onerror="this.style.display='none'"
                >
            </div>
            <div class="modal__content">
                <div class="modal__header">
                    <div>
                        <div class="recipe-card__categories" style="margin-bottom: 8px;">
                            ${categoriesHtml}
                        </div>
                        <h2 class="modal__title" id="modal-title">${recipe.name}</h2>
                    </div>
                    <button
                        class="modal__favorite ${favorited ? 'modal__favorite--active' : ''}"
                        data-fav-id="${recipe.id}"
                        aria-label="${favorited ? 'Remove from favorites' : 'Add to favorites'}"
                        type="button"
                    >
                        <svg class="modal__favorite-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>

                <div class="modal__meta">
                    <div class="modal__meta-item">
                        <span class="modal__meta-icon" aria-hidden="true">⏱️</span>
                        <span><strong class="modal__meta-label">Time:</strong> ${recipe.cookingTime}</span>
                    </div>
                    <div class="modal__meta-item">
                        <span class="modal__meta-icon" aria-hidden="true">🍽️</span>
                        <span><strong class="modal__meta-label">Servings:</strong> ${recipe.servings}</span>
                    </div>
                    <div class="modal__meta-item">
                        <span class="modal__meta-icon" aria-hidden="true">📊</span>
                        <span><strong class="modal__meta-label">Difficulty:</strong> <span class="recipe-card__difficulty ${difficultyClass}">${recipe.difficulty}</span></span>
                    </div>
                </div>

                <p class="recipe-card__description" style="-webkit-line-clamp: unset; margin-bottom: 24px; font-size: 1rem;">
                    ${recipe.description}
                </p>

                <div class="modal__section">
                    <h3 class="modal__section-title">Ingredients</h3>
                    <ul class="modal__ingredients">
                        ${ingredientsHtml}
                    </ul>
                </div>

                <div class="modal__section">
                    <h3 class="modal__section-title">Step-by-Step Instructions</h3>
                    <ol class="modal__instructions">
                        ${instructionsHtml}
                    </ol>
                </div>
            </div>
        `;

        // Wire favorite toggle inside modal
        const modalFavBtn = elements.modalBody.querySelector('.modal__favorite');
        if (modalFavBtn) {
            modalFavBtn.addEventListener('click', () => {
                toggleFavorite(recipe.id);
            });
        }

        // Show modal and lock background scroll
        elements.modal.classList.add('open');
        elements.modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Trap focus to close button
        elements.modalClose?.focus();
    }

    /**
     * Close the recipe details modal.
     */
    function closeRecipeModal() {
        if (!elements.modal) return;
        elements.modal.classList.remove('open');
        elements.modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        // Restore focus to triggering card (WCAG 2.4.3)
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    /* ============================================================
       6. NAVIGATION & VIEW ROUTING (FR-08)
       ============================================================ */

    /**
     * Switch visible section and handle state transitions.
     * @param {string} targetSectionId 
     */
    function navigateToSection(targetSectionId) {
        if (!targetSectionId) return;

        // Hide all sections, show target
        elements.sections.forEach(section => {
            if (section.id === targetSectionId) {
                section.classList.add('section--active');
            } else {
                section.classList.remove('section--active');
            }
        });

        // Update nav links active styling
        document.querySelectorAll('.nav__link').forEach(link => {
            if (link.getAttribute('data-section') === targetSectionId) {
                link.classList.add('nav__link--active');
            } else {
                link.classList.remove('nav__link--active');
            }
        });

        // Update internal state
        state.currentSection = targetSectionId;

        // Context-specific re-renders when navigating
        if (targetSectionId === 'favorites') {
            renderFavoritesSection();
        } else if (targetSectionId === 'categories') {
            applyCategoryFilter(state.selectedCategory);
        } else if (targetSectionId === 'recipes') {
            applyRecipeSearch();
        }

        // Close mobile nav menu if open
        closeMobileNav();

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMobileNav() {
        if (!elements.navToggle || !elements.navMenu) return;
        const isOpen = elements.navMenu.classList.contains('open');
        if (isOpen) {
            closeMobileNav();
        } else {
            elements.navMenu.classList.add('open');
            elements.navBackdrop?.classList.add('active');
            elements.navToggle.classList.add('active');
            elements.navToggle.setAttribute('aria-expanded', 'true');
        }
    }

    function closeMobileNav() {
        if (!elements.navMenu || !elements.navToggle) return;
        elements.navMenu.classList.remove('open');
        elements.navBackdrop?.classList.remove('active');
        elements.navToggle.classList.remove('active');
        elements.navToggle.setAttribute('aria-expanded', 'false');
    }

    /* ============================================================
       7. RECIPE SEARCH (FR-03)
       ============================================================ */

    /**
     * Filter recipes in real-time by Name or Ingredient.
     */
    function applyRecipeSearch() {
        if (typeof recipes === 'undefined' || !elements.recipesGrid) return;

        const query = state.searchQuery.trim().toLowerCase();

        // If query is empty, render all recipes
        if (!query) {
            renderRecipeList(recipes, elements.recipesGrid);
            elements.recipesEmpty?.classList.add('hidden');
            if (elements.searchClear) {
                elements.searchClear.classList.add('hidden');
            }
            return;
        }

        // Show clear button when input has text
        if (elements.searchClear) {
            elements.searchClear.classList.remove('hidden');
        }

        // Filter based on active search mode
        const filtered = recipes.filter(recipe => {
            if (state.searchMode === 'name') {
                return recipe.name.toLowerCase().includes(query);
            } else {
                // Ingredient search: match against any ingredient's name (VR-03-5)
                return recipe.ingredients.some(ing =>
                    ing.name.toLowerCase().includes(query)
                );
            }
        });

        renderRecipeList(filtered, elements.recipesGrid);

        // Toggle empty state
        if (filtered.length === 0) {
            elements.recipesEmpty?.classList.remove('hidden');
        } else {
            elements.recipesEmpty?.classList.add('hidden');
        }
    }

    /* ============================================================
       8. CATEGORY FILTERS (FR-05)
       ============================================================ */

    /**
     * Filter recipes by chosen category.
     * @param {string} category 
     */
    function applyCategoryFilter(category) {
        state.selectedCategory = category;

        // Update active styling on category buttons
        elements.categoryFilterBtns.forEach(btn => {
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('category-filters__btn--active');
            } else {
                btn.classList.remove('category-filters__btn--active');
            }
        });

        if (typeof recipes === 'undefined' || !elements.categoriesGrid) return;

        let filtered = recipes;
        if (category && category !== 'all') {
            filtered = recipes.filter(r => r.categories.includes(category));
        }

        renderRecipeList(filtered, elements.categoriesGrid);

        if (filtered.length === 0) {
            elements.categoriesEmpty?.classList.remove('hidden');
        } else {
            elements.categoriesEmpty?.classList.add('hidden');
        }
    }

    /* ============================================================
       9. INGREDIENT FINDER (FR-04)
       ============================================================ */

    /**
     * Add an ingredient chip to the finder.
     * @param {string} rawIngredient 
     */
    function addFinderIngredient(rawIngredient) {
        if (!rawIngredient) return;

        // Support comma-separated input (e.g. "chicken, garlic, tomato")
        const parts = rawIngredient.split(',');
        let addedAny = false;

        parts.forEach(part => {
            const cleaned = part.trim().toLowerCase();
            // Reject empty or duplicates (case-insensitive) (VR-04-1, VR-04-2)
            if (cleaned && !state.finderIngredients.includes(cleaned)) {
                state.finderIngredients.push(cleaned);
                addedAny = true;
            }
        });

        if (addedAny) {
            renderFinderChips();
            updateFinderResults();
        }

        if (elements.finderInput) {
            elements.finderInput.value = '';
            elements.finderInput.focus();
        }
    }

    /**
     * Remove an ingredient chip by index.
     * @param {number} index 
     */
    function removeFinderIngredient(index) {
        state.finderIngredients.splice(index, 1);
        renderFinderChips();
        updateFinderResults();
    }

    /**
     * Render the active ingredient chips.
     */
    function renderFinderChips() {
        if (!elements.finderChips) return;
        elements.finderChips.innerHTML = '';

        state.finderIngredients.forEach((ingredient, index) => {
            const chip = document.createElement('span');
            chip.className = 'finder__chip';
            chip.innerHTML = `
                <span>${ingredient}</span>
                <button
                    class="finder__chip-remove"
                    aria-label="Remove ${ingredient}"
                    type="button"
                    data-chip-index="${index}"
                >×</button>
            `;
            elements.finderChips.appendChild(chip);
        });
    }

    /**
     * Calculate ingredient matches and render sorted results.
     */
    function updateFinderResults() {
        if (typeof recipes === 'undefined' || !elements.finderGrid) return;

        // If no ingredients entered: show prompt empty state
        if (state.finderIngredients.length === 0) {
            elements.finderGrid.innerHTML = '';
            elements.finderEmpty?.classList.remove('hidden');
            elements.finderNoMatch?.classList.add('hidden');
            return;
        }

        elements.finderEmpty?.classList.add('hidden');

        // Score each recipe by match count
        const scored = [];
        const totalEntered = state.finderIngredients.length;

        recipes.forEach(recipe => {
            let matchCount = 0;

            state.finderIngredients.forEach(userIng => {
                const hasMatch = recipe.ingredients.some(recipeIng => {
                    const ingName = recipeIng.name.toLowerCase();
                    return ingName.includes(userIng) || userIng.includes(ingName);
                });
                if (hasMatch) {
                    matchCount++;
                }
            });

            // Match if at least one ingredient matches (FR-04, VR-04-4)
            if (matchCount > 0) {
                scored.push({
                    recipe,
                    matchCount,
                    matchText: `Matches ${matchCount} of ${totalEntered} ingredient${totalEntered > 1 ? 's' : ''}`
                });
            }
        });

        // Sort descending by match count (stable sort) (VR-04-5)
        scored.sort((a, b) => b.matchCount - a.matchCount);

        // Render matching cards or no-match empty state
        if (scored.length === 0) {
            elements.finderGrid.innerHTML = '';
            elements.finderNoMatch?.classList.remove('hidden');
        } else {
            elements.finderNoMatch?.classList.add('hidden');
            elements.finderGrid.innerHTML = '';

            const fragment = document.createDocumentFragment();
            scored.forEach(item => {
                const card = createRecipeCard(item.recipe, { matchText: item.matchText });
                fragment.appendChild(card);
            });
            elements.finderGrid.appendChild(fragment);
        }
    }

    /* ============================================================
       10. FAVORITES PAGE (FR-07)
       ============================================================ */

    /**
     * Render the Favorites section based on current LocalStorage favorites.
     */
    function renderFavoritesSection() {
        if (typeof recipes === 'undefined' || !elements.favoritesGrid) return;

        const favoritedRecipes = recipes.filter(r => state.favorites.includes(r.id));

        if (favoritedRecipes.length === 0) {
            elements.favoritesGrid.innerHTML = '';
            elements.favoritesEmpty?.classList.remove('hidden');
        } else {
            elements.favoritesEmpty?.classList.add('hidden');
            renderRecipeList(favoritedRecipes, elements.favoritesGrid);
        }
    }

    /* ============================================================
       11. EVENT LISTENERS SETUP
       ============================================================ */

    function setupEventListeners() {
        // Navigation toggle
        elements.navToggle?.addEventListener('click', toggleMobileNav);

        // Backdrop click closes mobile nav
        elements.navBackdrop?.addEventListener('click', closeMobileNav);

        // Click outside closes mobile nav (VR-08-4)
        document.addEventListener('click', (e) => {
            if (elements.navMenu?.classList.contains('open')) {
                const clickedMenu = e.target.closest('#nav-menu');
                const clickedToggle = e.target.closest('#nav-toggle');
                if (!clickedMenu && !clickedToggle) {
                    closeMobileNav();
                }
            }
        });

        // Delegate clicks for section navigation buttons & links
        document.addEventListener('click', (e) => {
            const navTarget = e.target.closest('[data-section]');
            if (navTarget) {
                e.preventDefault();
                const sectionId = navTarget.getAttribute('data-section');
                navigateToSection(sectionId);
            }
        });

        // Close mobile nav and modal on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (elements.modal?.classList.contains('open')) {
                    closeRecipeModal();
                    return;
                }
                if (elements.navMenu?.classList.contains('open')) {
                    closeMobileNav();
                    return;
                }
            }
        });

        // Modal focus trap for accessibility (Tab key navigation)
        elements.modal?.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = elements.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });

        // Modal overlay and close button
        elements.modalClose?.addEventListener('click', closeRecipeModal);
        elements.modalOverlay?.addEventListener('click', closeRecipeModal);

        // Search inputs
        elements.searchInput?.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            applyRecipeSearch();
        });

        // Clear search on Escape when search input is focused
        elements.searchInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                elements.searchInput.value = '';
                state.searchQuery = '';
                applyRecipeSearch();
            }
        });

        elements.searchClear?.addEventListener('click', () => {
            if (elements.searchInput) {
                elements.searchInput.value = '';
                state.searchQuery = '';
                applyRecipeSearch();
                elements.searchInput.focus();
            }
        });

        // Empty state reset button
        const searchResetBtn = document.getElementById('search-reset-btn');
        searchResetBtn?.addEventListener('click', () => {
            if (elements.searchInput) {
                elements.searchInput.value = '';
                state.searchQuery = '';
                applyRecipeSearch();
                elements.searchInput.focus();
            }
        });

        // Search mode tabs (Name vs Ingredient)
        elements.searchModes?.forEach(modeBtn => {
            modeBtn.addEventListener('click', () => {
                elements.searchModes.forEach(b => {
                    b.classList.remove('search__mode--active');
                    b.setAttribute('aria-selected', 'false');
                });
                modeBtn.classList.add('search__mode--active');
                modeBtn.setAttribute('aria-selected', 'true');

                state.searchMode = modeBtn.getAttribute('data-mode') || 'name';
                applyRecipeSearch();
            });
        });

        // Category filter buttons — supports deselection toggle (SRS FR-05 item 5, TC-29)
        elements.categoryFilterBtns?.forEach(catBtn => {
            catBtn.addEventListener('click', () => {
                const category = catBtn.getAttribute('data-category') || 'all';
                if (state.selectedCategory === category && category !== 'all') {
                    applyCategoryFilter('all');
                } else {
                    applyCategoryFilter(category);
                }
            });
        });

        // Category empty state reset button
        const categoryResetBtn = document.getElementById('category-reset-btn');
        categoryResetBtn?.addEventListener('click', () => {
            applyCategoryFilter('all');
        });

        // Ingredient Finder: Add button & Enter key
        elements.finderAdd?.addEventListener('click', () => {
            if (elements.finderInput) {
                addFinderIngredient(elements.finderInput.value);
            }
        });

        elements.finderInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addFinderIngredient(elements.finderInput.value);
            }
        });

        // Ingredient Finder: Chip remove delegation
        elements.finderChips?.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.finder__chip-remove');
            if (removeBtn) {
                const idx = parseInt(removeBtn.getAttribute('data-chip-index'), 10);
                if (!isNaN(idx)) {
                    removeFinderIngredient(idx);
                }
            }
        });
    }

    /* ============================================================
       INITIALIZATION
       ============================================================ */
    function init() {
        // 1. Load favorites from LocalStorage
        state.favorites = loadFavorites();

        // 2. Setup event listeners
        setupEventListeners();

        // 3. Render initial sections if recipe dataset is available
        if (typeof recipes !== 'undefined' && Array.isArray(recipes)) {
            // Featured recipes on Home section (first 4 hand-picked recipes)
            if (elements.featuredGrid) {
                const featured = [recipes[0], recipes[3], recipes[6], recipes[10]];
                renderRecipeList(featured, elements.featuredGrid);
            }

            // All recipes grid
            if (elements.recipesGrid) {
                renderRecipeList(recipes, elements.recipesGrid);
            }

            // Categories grid (initial 'all')
            if (elements.categoriesGrid) {
                renderRecipeList(recipes, elements.categoriesGrid);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
