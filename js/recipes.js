/* ============================================================
   What's Cooking? — Recipe Dataset
   ============================================================
   Authoritative predefined dataset of 18 recipes complying
   strictly with SRS Section 6.1 (Data Requirements).
   
   Categories: Breakfast, Lunch, Dinner, Desserts, Vegetarian
   ============================================================ */

const recipes = [
    {
        id: "r001",
        name: "Classic Fluffy Pancakes",
        image: "assets/images/pancakes.jpg",
        description: "Golden, cloud-like pancakes made from scratch with a hint of vanilla, served with warm maple syrup.",
        cookingTime: "20 minutes",
        difficulty: "Easy",
        servings: 4,
        categories: ["Breakfast", "Vegetarian"],
        ingredients: [
            { name: "flour", quantity: "2 cups" },
            { name: "baking powder", quantity: "2 tsp" },
            { name: "sugar", quantity: "2 tbsp" },
            { name: "milk", quantity: "1.5 cups" },
            { name: "eggs", quantity: "2 large" },
            { name: "butter", quantity: "3 tbsp melted" },
            { name: "vanilla extract", quantity: "1 tsp" }
        ],
        instructions: [
            "In a large mixing bowl, whisk together the flour, baking powder, sugar, and a pinch of salt.",
            "In a separate bowl, whisk together the milk, eggs, melted butter, and vanilla extract.",
            "Pour the wet mixture into the dry ingredients and stir gently until just combined. Do not overmix; small lumps are fine.",
            "Heat a lightly oiled griddle or non-stick frying pan over medium-high heat.",
            "Pour 1/4 cup of batter per pancake onto the hot griddle.",
            "Cook until bubbles burst on the surface and edges are firm, about 2-3 minutes.",
            "Flip and cook the other side until golden brown, about 1-2 minutes more. Serve warm with butter and syrup."
        ]
    },
    {
        id: "r002",
        name: "Avocado & Poached Egg Toast",
        image: "assets/images/avocado-toast.jpg",
        description: "Artisanal crusty sourdough toast layered with creamy crushed avocado, chili flakes, and a tender poached egg.",
        cookingTime: "15 minutes",
        difficulty: "Easy",
        servings: 2,
        categories: ["Breakfast", "Vegetarian"],
        ingredients: [
            { name: "sourdough bread", quantity: "2 slices" },
            { name: "avocado", quantity: "1 ripe" },
            { name: "eggs", quantity: "2 fresh" },
            { name: "lemon juice", quantity: "1 tsp" },
            { name: "olive oil", quantity: "1 tbsp" },
            { name: "red pepper flakes", quantity: "1/4 tsp" },
            { name: "salt and pepper", quantity: "to taste" }
        ],
        instructions: [
            "Toast the sourdough bread slices until golden brown and crisp.",
            "Cut the avocado in half, scoop the flesh into a small bowl, and mash with lemon juice, salt, and pepper.",
            "Bring a small pot of water to a gentle simmer with a splash of vinegar. Stir to create a vortex.",
            "Crack each egg into a ramekin, then gently slide into the swirling water. Poach for 3 minutes until whites are set but yolk is runny.",
            "Spread the seasoned mashed avocado evenly across the warm toasted sourdough slices.",
            "Using a slotted spoon, lift each poached egg and gently place on top of the avocado.",
            "Drizzle with extra virgin olive oil and sprinkle with red pepper flakes and freshly cracked black pepper."
        ]
    },
    {
        id: "r003",
        name: "Mediterranean Greek Salad",
        image: "assets/images/greek-salad.jpg",
        description: "Crisp cucumbers, juicy vine tomatoes, Kalamata olives, and creamy feta cheese tossed in an oregano vinaigrette.",
        cookingTime: "15 minutes",
        difficulty: "Easy",
        servings: 4,
        categories: ["Lunch", "Vegetarian"],
        ingredients: [
            { name: "cucumber", quantity: "1 large diced" },
            { name: "tomatoes", quantity: "3 ripe chopped" },
            { name: "red onion", quantity: "1/2 thinly sliced" },
            { name: "kalamata olives", quantity: "1/2 cup pitted" },
            { name: "feta cheese", quantity: "200g crumbled" },
            { name: "olive oil", quantity: "3 tbsp" },
            { name: "oregano", quantity: "1 tsp dried" }
        ],
        instructions: [
            "Wash and dice the cucumbers and tomatoes into bite-sized pieces.",
            "Thinly slice the red onion and place into a large wooden salad bowl.",
            "Add the diced cucumbers, tomatoes, and Kalamata olives to the bowl.",
            "Drizzle extra virgin olive oil and a dash of red wine vinegar over the vegetables.",
            "Gently toss the ingredients until well coated in the dressing.",
            "Top the salad with large crumbles of quality feta cheese.",
            "Finish with a generous dusting of dried oregano and a pinch of sea salt. Serve chilled."
        ]
    },
    {
        id: "r004",
        name: "Creamy Tuscan Garlic Chicken",
        image: "assets/images/tuscan-chicken.jpg",
        description: "Pan-seared tender chicken breasts smothered in a rich garlic, sun-dried tomato, and spinach cream sauce.",
        cookingTime: "30 minutes",
        difficulty: "Medium",
        servings: 4,
        categories: ["Dinner"],
        ingredients: [
            { name: "chicken breasts", quantity: "2 large halved horizontally" },
            { name: "olive oil", quantity: "2 tbsp" },
            { name: "garlic", quantity: "4 cloves minced" },
            { name: "heavy cream", quantity: "1 cup" },
            { name: "chicken broth", quantity: "1/2 cup" },
            { name: "sun-dried tomatoes", quantity: "1/2 cup sliced" },
            { name: "spinach", quantity: "2 cups fresh baby" },
            { name: "parmesan cheese", quantity: "1/2 cup grated" }
        ],
        instructions: [
            "Season chicken cutlets generously with salt, black pepper, and Italian seasoning on both sides.",
            "Heat olive oil in a large skillet over medium-high heat. Sear chicken 5 minutes per side until golden brown and cooked through (165°F). Transfer to a plate.",
            "In the same skillet, reduce heat to medium and add minced garlic. Sauté for 1 minute until fragrant.",
            "Pour in the chicken broth and heavy cream, deglazing the brown bits from the bottom of the pan.",
            "Stir in sun-dried tomatoes and grated parmesan cheese. Simmer for 3 minutes until sauce begins to thicken.",
            "Add baby spinach and stir gently until completely wilted into the sauce.",
            "Return cooked chicken breasts and accumulated juices to the pan. Spoon the creamy sauce over top and serve hot."
        ]
    },
    {
        id: "r005",
        name: "Classic Italian Spaghetti Carbonara",
        image: "assets/images/carbonara.jpg",
        description: "An authentic Roman pasta prepared with egg yolks, aged Pecorino Romano, savory guanciale, and cracked black pepper.",
        cookingTime: "25 minutes",
        difficulty: "Medium",
        servings: 4,
        categories: ["Dinner"],
        ingredients: [
            { name: "spaghetti", quantity: "400g" },
            { name: "pancetta or bacon", quantity: "150g diced" },
            { name: "egg yolks", quantity: "4 large" },
            { name: "eggs", quantity: "1 whole" },
            { name: "parmesan cheese", quantity: "1 cup freshly grated" },
            { name: "black pepper", quantity: "1 tbsp freshly cracked" }
        ],
        instructions: [
            "Bring a large pot of salted water to a rolling boil. Add spaghetti and cook until al dente (about 8-9 minutes).",
            "While pasta cooks, crisp the diced pancetta or bacon in a deep skillet over medium heat until golden and crispy (around 6 minutes). Remove skillet from heat.",
            "In a bowl, whisk together whole egg, egg yolks, grated cheese, and plenty of cracked black pepper until a thick paste forms.",
            "Reserve 1 cup of starchy pasta water, then drain the spaghetti.",
            "Add warm spaghetti directly into the skillet with the rendered pork fat, tossing to coat thoroughly.",
            "Allow skillet to cool slightly, then pour in the egg and cheese mixture while continuously tossing vigorously to prevent scrambling.",
            "Gradually splash in 2-4 tablespoons of hot reserved pasta water until a glossy, velvety sauce forms. Serve immediately."
        ]
    },
    {
        id: "r006",
        name: "Crispy Tofu & Vegetable Stir-Fry",
        image: "assets/images/tofu-stirfry.jpg",
        description: "Golden cubed tofu tossed with crunchy broccoli, bell peppers, and snap peas in a savory ginger-soy garlic glaze.",
        cookingTime: "25 minutes",
        difficulty: "Easy",
        servings: 3,
        categories: ["Dinner", "Lunch", "Vegetarian"],
        ingredients: [
            { name: "firm tofu", quantity: "400g pressed & cubed" },
            { name: "broccoli", quantity: "1 head cut into florets" },
            { name: "bell pepper", quantity: "1 sliced" },
            { name: "soy sauce", quantity: "3 tbsp" },
            { name: "garlic", quantity: "3 cloves minced" },
            { name: "ginger", quantity: "1 tbsp freshly grated" },
            { name: "cornstarch", quantity: "1 tbsp" },
            { name: "sesame oil", quantity: "2 tbsp" }
        ],
        instructions: [
            "Press tofu with paper towels to extract excess moisture. Cut into bite-sized cubes and dust evenly with cornstarch.",
            "Heat 1 tablespoon of sesame oil in a wok or large pan over high heat. Fry tofu cubes until crisp and golden on all sides, then set aside.",
            "Add remaining sesame oil to wok. Toss in broccoli florets and sliced bell pepper, stir-frying for 4 minutes until crisp-tender.",
            "In a small measuring cup, whisk soy sauce, minced garlic, grated ginger, and 2 tablespoons of water.",
            "Return golden tofu to the wok alongside the vegetables.",
            "Pour the ginger-soy sauce over everything and toss continuously for 1-2 minutes until sauce bubbles and glazes the stir-fry.",
            "Remove from heat and serve over steamed jasmine rice with toasted sesame seeds."
        ]
    },
    {
        id: "r007",
        name: "Warm Chocolate Lava Cakes",
        image: "assets/images/lava-cake.jpg",
        description: "Decadent individual chocolate cakes with molten, flowing centers, dusted with powdered sugar.",
        cookingTime: "25 minutes",
        difficulty: "Medium",
        servings: 4,
        categories: ["Desserts", "Vegetarian"],
        ingredients: [
            { name: "dark chocolate", quantity: "170g chopped" },
            { name: "butter", quantity: "1/2 cup unsalted" },
            { name: "powdered sugar", quantity: "1/2 cup" },
            { name: "eggs", quantity: "2 large" },
            { name: "egg yolks", quantity: "2 large" },
            { name: "flour", quantity: "6 tbsp" }
        ],
        instructions: [
            "Preheat your oven to 425°F (220°C). Butter four 6-ounce ramekins and dust lightly with cocoa powder.",
            "In a microwave-safe bowl, melt the chopped dark chocolate and butter together in 30-second increments, stirring until smooth.",
            "Whisk in the powdered sugar until completely incorporated.",
            "Add eggs and egg yolks one by one, whisking thoroughly after each addition.",
            "Gently fold in the flour using a spatula just until no dry streaks remain.",
            "Divide batter evenly among prepared ramekins. Place ramekins onto a baking sheet.",
            "Bake for 12-14 minutes until the sides are firm but centers still jiggle slightly. Cool for 1 minute, invert onto dessert plates, and dust with powdered sugar."
        ]
    },
    {
        id: "r008",
        name: "Caprese Grilled Panini Sandwich",
        image: "assets/images/caprese-panini.jpg",
        description: "Crispy golden ciabatta sandwich filled with melted fresh mozzarella, ripe tomatoes, basil pesto, and balsamic drizzle.",
        cookingTime: "15 minutes",
        difficulty: "Easy",
        servings: 2,
        categories: ["Lunch", "Vegetarian"],
        ingredients: [
            { name: "ciabatta bread", quantity: "2 rolls halved" },
            { name: "mozzarella cheese", quantity: "150g sliced" },
            { name: "tomatoes", quantity: "2 ripe sliced" },
            { name: "basil pesto", quantity: "2 tbsp" },
            { name: "olive oil", quantity: "1 tbsp" },
            { name: "balsamic glaze", quantity: "1 tbsp" }
        ],
        instructions: [
            "Slice ciabatta rolls horizontally and spread basil pesto generously across the inside surfaces.",
            "Layer fresh mozzarella slices and ripe tomato slices evenly across the bottom halves.",
            "Drizzle balsamic glaze lightly over the tomatoes, then season with a pinch of salt and black pepper.",
            "Close sandwiches and brush exterior bread crusts lightly with olive oil.",
            "Preheat a panini press or grill pan over medium heat.",
            "Press sandwiches for 4-5 minutes until bread is crunchy golden and mozzarella cheese is completely melted and gooey.",
            "Slice diagonally and serve immediately alongside mixed greens."
        ]
    },
    {
        id: "r009",
        name: "Hearty Lentil & Spinach Soup",
        image: "assets/images/lentil-soup.jpg",
        description: "Nourishing, warming brown lentil soup simmered with carrots, celery, aromatic cumin, and tender baby spinach.",
        cookingTime: "40 minutes",
        difficulty: "Easy",
        servings: 6,
        categories: ["Lunch", "Dinner", "Vegetarian"],
        ingredients: [
            { name: "brown lentils", quantity: "1.5 cups rinsed" },
            { name: "onion", quantity: "1 medium diced" },
            { name: "carrots", quantity: "2 sliced" },
            { name: "celery", quantity: "2 stalks diced" },
            { name: "garlic", quantity: "3 cloves minced" },
            { name: "vegetable broth", quantity: "6 cups" },
            { name: "cumin", quantity: "1 tsp ground" },
            { name: "spinach", quantity: "2 cups fresh" },
            { name: "lemon juice", quantity: "2 tbsp" }
        ],
        instructions: [
            "Heat 2 tablespoons of olive oil in a large soup pot over medium heat.",
            "Sauté diced onions, carrots, and celery for 5-7 minutes until vegetables begin to soften.",
            "Add minced garlic and ground cumin; cook for 1 minute until fragrant.",
            "Pour in rinsed brown lentils, vegetable broth, and a bay leaf. Bring soup to a boil.",
            "Lower heat to a simmer, cover with lid, and cook for 25-30 minutes until lentils are tender.",
            "Stir in fresh baby spinach and cook for 2 minutes until wilted.",
            "Stir in freshly squeezed lemon juice, season with salt and pepper to taste, and ladle into warm bowls."
        ]
    },
    {
        id: "r010",
        name: "Blueberry Overnight Oats",
        image: "assets/images/overnight-oats.jpg",
        description: "Creamy make-ahead rolled oats infused with chia seeds, pure maple syrup, Greek yogurt, and fresh sweet blueberries.",
        cookingTime: "10 minutes",
        difficulty: "Easy",
        servings: 1,
        categories: ["Breakfast", "Vegetarian"],
        ingredients: [
            { name: "rolled oats", quantity: "1/2 cup" },
            { name: "milk", quantity: "1/2 cup (dairy or plant)" },
            { name: "greek yogurt", quantity: "1/4 cup" },
            { name: "chia seeds", quantity: "1 tbsp" },
            { name: "maple syrup", quantity: "1 tbsp" },
            { name: "blueberries", quantity: "1/3 cup fresh" },
            { name: "cinnamon", quantity: "1/4 tsp" }
        ],
        instructions: [
            "In a clean mason jar or sealable glass container, combine rolled oats, chia seeds, and cinnamon.",
            "Add milk, Greek yogurt, and maple syrup to the jar.",
            "Stir thoroughly with a spoon to ensure all ingredients are evenly distributed.",
            "Gently fold in fresh blueberries.",
            "Seal the jar with lid and refrigerate overnight (or at least 4 hours).",
            "In the morning, stir once and enjoy cold, optionally garnished with extra blueberries or sliced almonds."
        ]
    },
    {
        id: "r011",
        name: "Baked Lemon Herb Salmon",
        image: "assets/images/lemon-salmon.jpg",
        description: "Moist, flaky wild salmon fillets baked with fresh lemon slices, crushed garlic, and aromatic rosemary butter.",
        cookingTime: "20 minutes",
        difficulty: "Easy",
        servings: 4,
        categories: ["Dinner"],
        ingredients: [
            { name: "salmon fillets", quantity: "4 center-cut" },
            { name: "lemon", quantity: "1 sliced + 1 juiced" },
            { name: "butter", quantity: "3 tbsp melted" },
            { name: "garlic", quantity: "3 cloves minced" },
            { name: "rosemary", quantity: "1 tbsp fresh chopped" },
            { name: "salt and pepper", quantity: "to taste" }
        ],
        instructions: [
            "Preheat oven to 400°F (200°C). Line a rimmed baking sheet with aluminum foil or parchment paper.",
            "Pat salmon fillets completely dry using paper towels and arrange skin-side down on the sheet.",
            "In a small bowl, whisk together melted butter, minced garlic, fresh lemon juice, chopped rosemary, salt, and black pepper.",
            "Generously brush the herb butter mixture over each salmon fillet.",
            "Place fresh lemon rounds on top of each fillet.",
            "Bake for 12-15 minutes until salmon flakes effortlessly with a fork and reaches 145°F internally.",
            "Serve warm with steamed asparagus or wild rice."
        ]
    },
    {
        id: "r012",
        name: "Fudgy Chocolate Chip Brownies",
        image: "assets/images/brownies.jpg",
        description: "Dense, chewy, ultra-fudgy homemade brownies loaded with chocolate chips and a crinkly shiny top crust.",
        cookingTime: "35 minutes",
        difficulty: "Easy",
        servings: 9,
        categories: ["Desserts", "Vegetarian"],
        ingredients: [
            { name: "butter", quantity: "1/2 cup melted" },
            { name: "sugar", quantity: "1 cup granulated" },
            { name: "eggs", quantity: "2 large" },
            { name: "cocoa powder", quantity: "1/3 cup unsweetened" },
            { name: "flour", quantity: "1/2 cup" },
            { name: "chocolate chips", quantity: "1/2 cup" },
            { name: "vanilla extract", quantity: "1 tsp" }
        ],
        instructions: [
            "Preheat oven to 350°F (175°C). Grease an 8x8-inch baking pan and line with parchment paper overhang.",
            "In a medium bowl, vigorously whisk melted butter and granulated sugar together for 1 minute.",
            "Add eggs and vanilla extract; whisk vigorously for 2 minutes until glossy and slightly pale.",
            "Sift in cocoa powder, all-purpose flour, and a pinch of salt. Gently fold using a spatula until just combined.",
            "Fold in chocolate chips.",
            "Spread batter evenly into the prepared pan. Bake for 22-25 minutes until a toothpick inserted into center comes out with moist crumbs.",
            "Allow brownies to cool completely in pan before lifting parchment and slicing into squares."
        ]
    },
    {
        id: "r013",
        name: "Loaded Breakfast Burrito",
        image: "assets/images/breakfast-burrito.jpg",
        description: "Scrambled eggs, black beans, diced bell peppers, melted cheddar cheese, and salsa wrapped in a warm flour tortilla.",
        cookingTime: "20 minutes",
        difficulty: "Easy",
        servings: 2,
        categories: ["Breakfast", "Vegetarian"],
        ingredients: [
            { name: "tortillas", quantity: "2 large flour" },
            { name: "eggs", quantity: "4 beaten" },
            { name: "black beans", quantity: "1/2 cup rinsed" },
            { name: "cheddar cheese", quantity: "1/2 cup shredded" },
            { name: "bell pepper", quantity: "1/2 diced" },
            { name: "salsa", quantity: "3 tbsp" },
            { name: "butter", quantity: "1 tbsp" }
        ],
        instructions: [
            "Melt butter in a non-stick skillet over medium heat. Sauté diced bell pepper for 3 minutes until tender.",
            "Pour in the beaten eggs and scramble gently with a spatula until soft curds form (about 2 minutes). Season with salt and pepper.",
            "Warm tortillas in a dry skillet or microwave for 15 seconds to make pliable.",
            "Layer scrambled eggs, black beans, shredded cheddar cheese, and salsa down the center of each tortilla.",
            "Fold sides of tortilla inward over filling, then roll tightly from bottom to top.",
            "Optionally, place burritos seam-side down in a hot dry skillet for 1 minute per side to toast the outer shell.",
            "Cut in half diagonally and serve with guacamole or sour cream."
        ]
    },
    {
        id: "r014",
        name: "Creamy Tomato Basil Penne",
        image: "assets/images/tomato-penne.jpg",
        description: "Penne pasta bathed in a luscious tomato-cream sauce with sweet fresh basil, garlic, and parmesan.",
        cookingTime: "20 minutes",
        difficulty: "Easy",
        servings: 4,
        categories: ["Dinner", "Lunch", "Vegetarian"],
        ingredients: [
            { name: "penne pasta", quantity: "350g" },
            { name: "crushed tomatoes", quantity: "1 can (400g)" },
            { name: "heavy cream", quantity: "1/2 cup" },
            { name: "garlic", quantity: "3 cloves minced" },
            { name: "olive oil", quantity: "2 tbsp" },
            { name: "fresh basil", quantity: "1/4 cup chopped" },
            { name: "parmesan cheese", quantity: "1/2 cup grated" }
        ],
        instructions: [
            "Cook penne in a large pot of boiling salted water according to package instructions until al dente. Reserve 1/2 cup pasta water, then drain.",
            "In a large skillet, heat olive oil over medium heat. Add minced garlic and sauté 1 minute until fragrant.",
            "Add crushed canned tomatoes, salt, black pepper, and a pinch of sugar. Simmer for 8 minutes.",
            "Lower heat and stir in heavy cream and grated parmesan cheese until silky and smooth.",
            "Toss cooked penne directly into the sauce. Add splashes of reserved pasta water if needed to loosen sauce.",
            "Fold in fresh chopped basil leaves.",
            "Serve hot, garnished with extra grated parmesan and whole basil leaves."
        ]
    },
    {
        id: "r015",
        name: "Classic Apple Crisp with Oats",
        image: "assets/images/apple-crisp.jpg",
        description: "Tender spiced cinnamon apples baked beneath a crunchy golden brown sugar, butter, and rolled oat crumble topping.",
        cookingTime: "45 minutes",
        difficulty: "Easy",
        servings: 6,
        categories: ["Desserts", "Vegetarian"],
        ingredients: [
            { name: "apples", quantity: "5 peeled and sliced" },
            { name: "cinnamon", quantity: "1.5 tsp ground" },
            { name: "rolled oats", quantity: "3/4 cup" },
            { name: "flour", quantity: "1/2 cup" },
            { name: "brown sugar", quantity: "1/2 cup packed" },
            { name: "butter", quantity: "1/3 cup cold cubed" },
            { name: "lemon juice", quantity: "1 tbsp" }
        ],
        instructions: [
            "Preheat oven to 375°F (190°C). Grease an 8-inch square baking dish.",
            "In a bowl, toss sliced apples with lemon juice, 1/2 teaspoon cinnamon, and 1 tablespoon brown sugar. Spread evenly into baking dish.",
            "In another bowl, mix rolled oats, flour, remaining brown sugar, and remaining cinnamon.",
            "Cut in cold cubed butter using a pastry cutter or fingertips until mixture forms pea-sized crumbly clumps.",
            "Scatter the oat crumble topping generously over the apples.",
            "Bake for 30-35 minutes until the topping is deep golden brown and apple juices are bubbling around the edges.",
            "Let cool for 10 minutes before serving warm with a scoop of vanilla ice cream."
        ]
    },
    {
        id: "r016",
        name: "Grilled Chicken Caesar Salad Wrap",
        image: "assets/images/chicken-wrap.jpg",
        description: "Juicy sliced grilled chicken, crisp romaine lettuce, crunchy croutons, and creamy Caesar dressing rolled in a soft wrap.",
        cookingTime: "15 minutes",
        difficulty: "Easy",
        servings: 2,
        categories: ["Lunch"],
        ingredients: [
            { name: "chicken breasts", quantity: "1 grilled & sliced" },
            { name: "tortillas", quantity: "2 large wrap tortillas" },
            { name: "romaine lettuce", quantity: "2 cups chopped" },
            { name: "caesar dressing", quantity: "3 tbsp" },
            { name: "parmesan cheese", quantity: "1/4 cup shaved" },
            { name: "croutons", quantity: "1/3 cup crushed" }
        ],
        instructions: [
            "In a mixing bowl, toss chopped romaine lettuce, shaved parmesan, crushed croutons, and Caesar dressing until evenly coated.",
            "Lay out wrap tortillas on a clean cutting board.",
            "Divide dressed Caesar salad evenly between the tortillas.",
            "Top with warm sliced grilled chicken breast.",
            "Fold in left and right sides of each tortilla, then roll up snugly from bottom to top.",
            "Slice in half diagonally and serve with extra Caesar dressing for dipping."
        ]
    },
    {
        id: "r017",
        name: "Creamy Mango Banana Smoothie",
        image: "assets/images/mango-smoothie.jpg",
        description: "Refreshing, vibrant tropical breakfast smoothie made with sweet frozen mango, ripe banana, and Greek yogurt.",
        cookingTime: "5 minutes",
        difficulty: "Easy",
        servings: 2,
        categories: ["Breakfast", "Desserts", "Vegetarian"],
        ingredients: [
            { name: "mango", quantity: "1.5 cups frozen chunks" },
            { name: "banana", quantity: "1 ripe fresh" },
            { name: "greek yogurt", quantity: "1/2 cup" },
            { name: "milk", quantity: "3/4 cup (dairy or almond)" },
            { name: "honey", quantity: "1 tbsp" }
        ],
        instructions: [
            "Place ripe banana, frozen mango chunks, Greek yogurt, milk, and honey into a high-speed blender.",
            "Secure blender lid and blend on high speed for 60-90 seconds until completely thick, creamy, and smooth.",
            "If too thick, splash in 2-3 tablespoons of extra milk and pulse briefly.",
            "Pour into chilled glasses and garnish with a fresh mint leaf or mango slice."
        ]
    },
    {
        id: "r018",
        name: "Crispy Black Bean Tacos",
        image: "assets/images/black-bean-tacos.jpg",
        description: "Crispy pan-fried corn tortillas stuffed with seasoned black beans, melted pepper jack cheese, and shredded cabbage slaw.",
        cookingTime: "20 minutes",
        difficulty: "Easy",
        servings: 3,
        categories: ["Dinner", "Lunch", "Vegetarian"],
        ingredients: [
            { name: "corn tortillas", quantity: "6 small" },
            { name: "black beans", quantity: "1 can (400g) drained & rinsed" },
            { name: "cumin", quantity: "1 tsp ground" },
            { name: "garlic", quantity: "2 cloves minced" },
            { name: "cheddar cheese", quantity: "1 cup shredded" },
            { name: "olive oil", quantity: "2 tbsp" },
            { name: "lime", quantity: "1 cut into wedges" }
        ],
        instructions: [
            "In a bowl, roughly mash drained black beans with minced garlic, ground cumin, salt, and black pepper.",
            "Brush outer sides of corn tortillas lightly with olive oil.",
            "Spread seasoned black bean mixture onto half of each tortilla, top with shredded cheese, and fold over tightly into half-moons.",
            "Heat a large skillet over medium-high heat. Place folded tacos in pan.",
            "Cook for 3 minutes per side until tortillas are golden crispy and cheese inside is melted.",
            "Transfer to a plate and serve hot with fresh lime wedges, salsa, and sour cream."
        ]
    }
];
