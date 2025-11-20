// /pages/meal-plan.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Icons using inline SVG (Lucide-react equivalents) ---

// Breakfast Icon (Coffee/Mug)
const BreakfastIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 21v-4a2 2 0 1 1 4 0v4"/>
    <path d="M12 16h2a2 2 1 0 0 2-2V4H6v10a2 2 1 0 0 2 2h2"/>
    <path d="M16 11H6"/>
    <path d="M17 10h1"/>
  </svg>
);

// Lunch Icon (Sandwich/Fork)
const LunchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2v10"/>
    <path d="M12 21H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h9"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L19 7l-2-2 1.5-1.5z"/>
    <path d="M19 14v7"/>
  </svg>
);

// Dinner Icon (Pot/Bowl)
const DinnerIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12h8"/>
    <path d="M12 21a9 9 0 0 0 9-9v-3H3v3a9 9 0 0 0 9 9z"/>
    <path d="M2.35 12c1.7 1.7 4.15 3 6.65 3s4.95-1.3 6.65-3"/>
  </svg>
);

// Cart Icon for List
const ShoppingCartIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 12.09a2 2 0 0 0 2 1.91h7.82a2 2 0 0 0 2-1.91L23 6H6"/>
    </svg>
);

// Back Arrow Icon
const ArrowLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5"/>
        <path d="m12 19-7-7 7-7"/>
    </svg>
);

// Search Icon
const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

// External Link Icon
const ExternalLinkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6"/>
        <path d="M10 14 21 3"/>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
);


// --- Component Data ---

const MEAL_DAYS = [
    { day: "Day 1", breakfast: "Greek yogurt + berries + chia", lunch: "Grilled chicken salad", dinner: "Salmon + asparagus + avocado" },
    { day: "Day 2", breakfast: "Spinach & feta omelet", lunch: "Turkey lettuce wraps", dinner: "Beef taco bowl (no tortilla)" },
    { day: "Day 3", breakfast: "Protein smoothie", lunch: "Tuna salad bowl", dinner: "Chicken thighs + green beans" },
    { day: "Day 4", breakfast: "Eggs + turkey sausage", lunch: "Shrimp salad", dinner: "Pork chops + broccoli" },
    { day: "Day 5", breakfast: "Greek yogurt + nuts", lunch: "Chicken Caesar salad", dinner: "Steak + mushrooms + salad" },
    { day: "Day 6", breakfast: "Eggs + cottage cheese", lunch: "Egg salad lettuce wraps", dinner: "Cod + Brussels sprouts" },
    { day: "Day 7", breakfast: "Protein pancakes", lunch: "Leftover protein bowl", dinner: "Turkey meatballs + zucchini noodles" },
];

/**
 * Generates a unique, consolidated shopping list from the meal plan data.
 * @param {Array} days The meal plan array.
 * @returns {Array<string>} An array of unique ingredient names.
 */
const generateShoppingList = (days) => {
    const list = new Set();
    days.forEach(day => {
        [day.breakfast, day.lunch, day.dinner].forEach(meal => {
            if (meal) {
                const items = meal.split(/[\+\,]/)
                    .map(item => item.trim())
                    .filter(item => item.length > 0)
                    .map(item => item.replace(/\([^()]*\)/g, '').trim())
                    .filter(item => item.length > 0); 
                
                items.forEach(item => {
                    const normalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
                    list.add(normalizedItem);
                });
            }
        });
    });
    return Array.from(list).sort();
};


// --- Meal Search View Component ---

const MealSearchView = ({ handleBackToPlan }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMealIdea = useCallback(async (query) => {
        if (!query) return;

        setLoading(true);
        setSearchResults(null);
        setSources([]);
        setError(null);

        const systemPrompt = "You are a friendly meal planning assistant. Search the internet for a healthy recipe idea matching the user's request. Provide a simple recipe title and a brief description of the meal (1-2 sentences), including the key ingredients and cooking style. Format the output as a friendly, concise response.";
        const userQuery = `Find a recipe idea for: ${query}`;
        const apiKey = ""
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };

        let response;
        let retries = 0;
        const MAX_RETRIES = 5;

        while (retries < MAX_RETRIES) {
            try {
                const delay = Math.pow(2, retries) * 1000;
                if (retries > 0) await new Promise(res => setTimeout(res, delay));

                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.status !== 429) break; // Not a rate limit error, break retry loop

            } catch (e) {
                console.error("Fetch attempt failed:", e);
                if (retries === MAX_RETRIES - 1) {
                    setError("API request failed after multiple retries. Check console for details.");
                    setLoading(false);
                    return;
                }
            }
            retries++;
        }

        try {
            const result = await response.json();
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const text = candidate.content.parts[0].text;
                
                // Extract grounding sources
                let extractedSources = [];
                const groundingMetadata = candidate.groundingMetadata;
                if (groundingMetadata && groundingMetadata.groundingAttributions) {
                    extractedSources = groundingMetadata.groundingAttributions
                        .map(attribution => ({
                            uri: attribution.web?.uri,
                            title: attribution.web?.title,
                        }))
                        .filter(source => source.uri && source.title); 
                }

                setSearchResults(text);
                setSources(extractedSources);

            } else {
                setError("No meal idea could be generated for that query. Please try a different request.");
            }
        } catch (e) {
            console.error("Error processing response:", e);
            setError("An error occurred while processing the meal idea.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMealIdea(searchQuery);
    };

    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl">
            <button
                onClick={handleBackToPlan}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition duration-150"
            >
                <ArrowLeftIcon className="w-5 h-5"/>
                <span>Back to Meal Plan</span>
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 border-b-2 border-orange-500 pb-3 mb-6 flex items-center space-x-3">
                <SearchIcon className="w-7 h-7 text-orange-500" />
                <span>Internet Meal Idea Finder</span>
            </h1>

            <p className="text-gray-600 mb-6">
                Search for a new recipe idea (e.g., "Keto chicken casserole" or "vegan quick lunch").
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex space-x-2 mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a recipe idea..."
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? (
                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <SearchIcon className="w-5 h-5" />
                    )}
                    <span>Search</span>
                </button>
            </form>

            {/* Results Area */}
            <div className="min-h-[200px] p-4 bg-orange-50/50 rounded-lg border border-dashed border-orange-200">
                {error && <p className="text-red-500 font-medium">{error}</p>}
                
                {searchResults && (
                    <div className="space-y-4">
                        <p className="text-lg text-gray-800 font-semibold">{searchResults}</p>
                        
                        {sources.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-orange-300">
                                <p className="text-sm font-medium text-gray-600 mb-2">Sources:</p>
                                <ul className="space-y-1">
                                    {sources.map((source, index) => (
                                        <li key={index} className="text-xs">
                                            <a 
                                                href={source.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="flex items-center text-blue-600 hover:text-blue-800 underline transition duration-150 break-words"
                                            >
                                                <ExternalLinkIcon className="w-3 h-3 mr-1 flex-shrink-0"/>
                                                {source.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                
                {!loading && !searchResults && !error && (
                    <p className="text-center text-gray-500 p-10">
                        Enter a search query above to find a new meal idea!
                    </p>
                )}
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function MealPlan() {
    // State to toggle between 'plan', 'list' view, and 'search' view
    const [view, setView] = useState('plan'); 
    
    const generatedList = useMemo(() => generateShoppingList(MEAL_DAYS), []);

    const handleViewList = () => setView('list');
    const handleViewSearch = () => setView('search');
    const handleBackToPlan = () => setView('plan');


    // --- Sub-components for structure ---

    const MealCard = ({ dayData }) => (
        <div className="p-4 sm:p-6 rounded-xl bg-white shadow-md border-l-4 border-blue-600 transition duration-300 hover:shadow-xl hover:border-blue-700">
            <h2 className="text-xl font-bold text-blue-600 mb-4">{dayData.day}</h2>

            <div className="space-y-3">
                <MealItem icon={BreakfastIcon} title="Breakfast" meal={dayData.breakfast} />
                <MealItem icon={LunchIcon} title="Lunch" meal={dayData.lunch} />
                <MealItem icon={DinnerIcon} title="Dinner" meal={dayData.dinner} />
            </div>
        </div>
    );

    const MealItem = ({ icon: Icon, title, meal }) => (
        <div className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
            <Icon className="w-5 h-5 mt-1 text-gray-700 flex-shrink-0" />
            <p className="text-gray-800">
                <strong className="font-semibold text-gray-900">{title}:</strong> {meal}
            </p>
        </div>
    );

    const MealPlanView = () => (
        <>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center p-4 rounded-xl bg-blue-600 shadow-2xl mb-8">
                7-Day High-Protein, Low-Carb Meal Plan
            </h1>

            {/* Meal Plan Days Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MEAL_DAYS.map((d, index) => (
                    <MealCard key={index} dayData={d} />
                ))}
            </div>

            {/* Feature Buttons: Shopping List and Search */}
            <div className="text-center mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={handleViewList}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl shadow-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
                >
                    <ShoppingCartIcon className="w-6 h-6" />
                    <span>View Shopping List</span>
                </button>
                <button
                    onClick={handleViewSearch}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                    <SearchIcon className="w-6 h-6" />
                    <span>Search for New Ideas</span>
                </button>
            </div>
        </>
    );

    const ShoppingListView = () => (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl">
            <button
                onClick={handleBackToPlan}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition duration-150"
            >
                <ArrowLeftIcon className="w-5 h-5"/>
                <span>Back to Meal Plan</span>
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 border-b-2 border-teal-500 pb-3 mb-6">
                🛒 Weekly Shopping List
            </h1>

            <p className="text-gray-600 mb-6">
                This list was automatically generated from your 7-Day Meal Plan, combining all unique ingredients.
            </p>

            {/* List Display */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {generatedList.map((item, index) => (
                    <li 
                        key={index} 
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg shadow-sm text-gray-800 transition duration-100 hover:bg-teal-100/50"
                    >
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );


    return (
        <main className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center">
            <div className="w-full max-w-4xl">
                {view === 'plan' && <MealPlanView />}
                {view === 'list' && <ShoppingListView />}
                {view === 'search' && <MealSearchView handleBackToPlan={handleBackToPlan} />}
            </div>
        </main>
    );
}


