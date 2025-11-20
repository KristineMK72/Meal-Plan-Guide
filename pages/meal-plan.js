import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Icons using inline SVG (Lucide-react equivalents) ---

const BreakfastIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21v-4a2 2 0 1 1 4 0v4"/><path d="M12 16h2a2 2 1 0 0 2-2V4H6v10a2 2 1 0 0 2 2h2"/><path d="M16 11H6"/><path d="M17 10h1"/></svg>);
const LunchIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2v10"/><path d="M12 21H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h9"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L19 7l-2-2 1.5-1.5z"/><path d="M19 14v7"/></svg>);
const DinnerIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h8"/><path d="M12 21a9 9 0 0 0 9-9v-3H3v3a9 9 0 0 0 9 9z"/><path d="M2.35 12c1.7 1.7 4.15 3 6.65 3s4.95-1.3 6.65-3"/></svg>);
const ShoppingCartIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 12.09a2 2 0 0 0 2 1.91h7.82a2 2 0 0 0 2-1.91L23 6H6"/></svg>);
const ArrowLeftIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>);
const SearchIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const ExternalLinkIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>);
const ChefHatIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 15V8a4 4 0 0 0-4-4 4 4 0 0 0-4 4v7"/><path d="M7 15h10"/><path d="M12 21v-4"/></svg>);
const PrinterIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>);


// --- Component Data & Utilities ---

const MEAL_DAYS = [
    { day: "Day 1", breakfast: "Greek yogurt + berries + chia", lunch: "Grilled chicken salad", dinner: "Salmon + asparagus + avocado" },
    { day: "Day 2", breakfast: "Spinach & feta omelet", lunch: "Turkey lettuce wraps", dinner: "Beef taco bowl (no tortilla)" },
    { day: "Day 3", breakfast: "Protein smoothie", lunch: "Tuna salad bowl", dinner: "Chicken thighs + green beans" },
    { day: "Day 4", breakfast: "Eggs + turkey sausage", lunch: "Shrimp salad", dinner: "Pork chops + broccoli" },
    { day: "Day 5", breakfast: "Greek yogurt + nuts", lunch: "Chicken Caesar salad", dinner: "Steak + mushrooms + salad" },
    { day: "Day 6", breakfast: "Eggs + cottage cheese", lunch: "Egg salad lettuce wraps", dinner: "Cod + Brussels sprouts" },
    { day: "Day 7", breakfast: "Protein pancakes", lunch: "Leftover protein bowl", dinner: "Turkey meatballs + zucchini noodles" },
];

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
    return Array.from(list); 
};

// Schema for the structured recipe details response
const RECIPE_DETAILS_SCHEMA = {
    type: "OBJECT",
    properties: {
        "title": { "type": "STRING", description: "The exact title of the recipe." },
        "url": { "type": "STRING", description: "The direct URL link to the recipe." },
        "cookTime": { "type": "STRING", description: "The total estimated preparation and cook time." },
        "ingredients": { 
            "type": "ARRAY", 
            "items": { "type": "STRING" },
            "description": "A simplified list of 5-10 key ingredients for the recipe, including quantities if available."
        }
    },
    "required": ["title", "url", "ingredients"]
};

// Utility to robustly extract and parse JSON from AI text output
function extractAndParseJson(text) {
    // 1. Regex to find JSON block, handling optional 'json' code fence (```json)
    const jsonMatch = text.match(/```json\s*(\{[\s\S]*?\})\s*```|(\{[\s\S]*?\})/);
    if (!jsonMatch) {
        throw new Error("AI response did not contain a valid JSON object.");
    }
    
    // Get the captured JSON string (it's either group 1 or group 2)
    const jsonString = jsonMatch[1] || jsonMatch[2];
    
    // 2. Parse the extracted string
    return JSON.parse(jsonString);
}


// --- Meal Search View Component ---

const MealSearchView = ({ handleBackToPlan, setExtraIngredients, handlePrintView }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [initialSummary, setInitialSummary] = useState(null); 
    const [suggestedTitle, setSuggestedTitle] = useState(null); 
    const [finalRecipeDetails, setFinalRecipeDetails] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);

    // Utility function for API call with exponential backoff
    const callApiWithBackoff = useCallback(async (payload, isStructured = false) => {
        const apiKey = ""
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        
        const headers = { 'Content-Type': 'application/json' };
        if (isStructured) {
            payload.generationConfig = {
                responseMimeType: "application/json",
                responseSchema: RECIPE_DETAILS_SCHEMA
            };
        }

        let response;
        let retries = 0;
        const MAX_RETRIES = 5;

        while (retries < MAX_RETRIES) {
            try {
                const delay = Math.pow(2, retries) * 1000;
                if (retries > 0) await new Promise(res => setTimeout(res, delay));

                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload)
                });

                if (response.status !== 429) break; 

            } catch (e) {
                console.error("Fetch attempt failed:", e);
                if (retries === MAX_RETRIES - 1) throw new Error("API request failed after multiple retries.");
            }
            retries++;
        }
        if (!response) throw new Error("Failed to get response from API.");
        return response.json();
    }, []);

    // --- STEP 2: Find Specific Recipe and JSON Ingredients ---
    const findEpicuriousRecipe = useCallback(async () => {
        if (!suggestedTitle) return;

        setLoading(true);
        setLoadingMessage(`Great idea! Now searching the web for the full recipe for "${suggestedTitle}"...`);
        setError(null);
        setSuccessMessage(null);

        const epicuriousQuery = `Find the complete, high-quality recipe for "${suggestedTitle}" from a major recipe site like Epicurious, Bon Appétit, or Allrecipes.`;
        
        const payload = {
            contents: [{ parts: [{ text: epicuriousQuery }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: { parts: [{ text: "You are a professional recipe search engine. Your task is ONLY to find one specific, high-quality recipe that matches the request and output the details in the requested JSON structure. DO NOT include any conversational text, markdown outside the JSON block, or explanations. Only the raw JSON object is acceptable." }] },
        };

        try {
            const result = await callApiWithBackoff(payload, true);
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const jsonText = candidate.content.parts[0].text;
                const details = extractAndParseJson(jsonText); // Use robust parsing
                
                if (details.url && details.title && details.ingredients) {
                     setFinalRecipeDetails(details);
                } else {
                     setError("I found the details, but the AI response was incomplete (missing URL, title, or ingredients). Please try again.");
                }

            } else {
                setError(`I couldn't find a specific recipe link for "${suggestedTitle}". The AI may not have found a suitable source.`);
            }
        } catch (e) {
            setError(`Recipe Finder Error: ${e.message}`);
            console.error("Epicurious Search Error:", e);
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    }, [suggestedTitle, callApiWithBackoff]);


    // --- STEP 1: Idea Generation / URL Analysis ---
    const fetchMealIdea = useCallback(async (query) => {
        if (!query) return;

        setLoading(true);
        setLoadingMessage('Searching the web for a creative meal idea...');
        setError(null);
        setSuccessMessage(null);
        setInitialSummary(null);
        setSuggestedTitle(null);
        setFinalRecipeDetails(null);

        const isUrl = query.startsWith('http://') || query.startsWith('https://') || query.includes('.com') || query.includes('.net');
        
        let systemPrompt;
        let userQuery;

        if (isUrl) {
            systemPrompt = "You are an expert recipe analyzer. Find the recipe content at the provided URL. Extract the exact Recipe Title (as the first line), a brief 2-3 sentence summary, the estimated prep/cook time, and list the key ingredients. Present this information clearly with titles for each section.";
            userQuery = `Analyze the recipe found at this address: ${query}`;
        } else {
            systemPrompt = "You are a friendly meal planning assistant. Search the internet for a healthy recipe idea matching the user's request. Provide the Recipe Title (as the first line of your response) and a brief description of the meal (1-2 sentences), including the key ingredients and cooking style. Format the output as a friendly, concise response.";
            userQuery = `Find a recipe idea for: ${query}`;
        }

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };

        try {
            const result = await callApiWithBackoff(payload, false);
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const text = candidate.content.parts[0].text;
                
                // Extract title: Assume the first non-empty line is the title.
                const firstLine = text.trim().split('\n')[0].trim();
                const title = firstLine.length > 0 ? firstLine : 'Suggested Meal';

                setInitialSummary(text);
                setSuggestedTitle(title);
            } else {
                setError("I couldn't generate a meal idea for that query. Please try a different request.");
            }
        } catch (e) {
            setError(`Idea Search Error: ${e.message}`);
            console.error("Idea Search Error:", e);
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    }, [callApiWithBackoff]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Clear all previous results/errors before starting a new search
        setError(null);
        setSuccessMessage(null);
        setInitialSummary(null);
        setSuggestedTitle(null);
        setFinalRecipeDetails(null);
        fetchMealIdea(searchQuery);
    };
    
    const addIngredientsToAppList = () => {
        if (!finalRecipeDetails || !finalRecipeDetails.ingredients) return;

        const ingredients = finalRecipeDetails.ingredients;
        const uniqueNewItems = ingredients
            .filter(item => item && item.trim())
            .map(item => item.trim().charAt(0).toUpperCase() + item.trim().slice(1));
            
        setExtraIngredients(prev => {
            const existingSet = new Set(prev);
            uniqueNewItems.forEach(item => existingSet.add(item));
            return Array.from(existingSet);
        });
        
        setSuccessMessage(`${uniqueNewItems.length} ingredients from "${finalRecipeDetails.title}" have been added to your Shopping List!`);
        setTimeout(() => setSuccessMessage(null), 5000); // Clear success message after 5 seconds
    };

    const handleRecipePrint = () => {
        handlePrintView(finalRecipeDetails);
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
                <span>AI Meal Finder</span>
            </h1>

            <p className="text-gray-600 mb-6">
                Ask the AI for a meal idea or paste a recipe URL for a summary.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex space-x-2 mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search query or paste recipe URL here..."
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

            {/* AI Status Banners */}
            {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4 font-medium">{error}</div>}
            {successMessage && <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg mb-4 font-medium">{successMessage}</div>}
            
            {loading && (
                <div className="text-center p-10 space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-gray-600 font-medium">{loadingMessage}</p>
                </div>
            )}


            {/* Step 2 Trigger Button */}
            {initialSummary && !finalRecipeDetails && !loading && suggestedTitle && (
                <div className="text-center my-6">
                    <div className="mb-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-lg">
                        <h3 className="text-lg font-bold text-orange-700 mb-2">AI Suggested Idea:</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{initialSummary}</p>
                    </div>

                    <button
                        onClick={findEpicuriousRecipe}
                        className="flex items-center justify-center mx-auto space-x-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition duration-200 transform hover:scale-105"
                    >
                        <ChefHatIcon className="w-6 h-6" />
                        <span>Find Full Recipe for "{suggestedTitle}"</span>
                    </button>
                </div>
            )}
            
            {/* Final Recipe Details (Step 2 Result) */}
            {finalRecipeDetails && (
                <div className="space-y-4 p-2 border-2 border-teal-500 rounded-xl shadow-lg bg-teal-50">
                    <h2 className="text-2xl font-extrabold text-teal-800">
                        <a href={finalRecipeDetails.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                            {finalRecipeDetails.title} <ExternalLinkIcon className="w-5 h-5 ml-2 align-middle"/>
                        </a>
                    </h2>
                    <p className="text-sm font-medium text-gray-700">
                        Total Time: <span className="font-semibold text-gray-900">{finalRecipeDetails.cookTime || 'N/A'}</span>
                    </p>
                    
                    <div className="my-4 p-3 bg-white rounded-lg shadow-inner">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Key Ingredients:</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                            {finalRecipeDetails.ingredients.map((ing, index) => (
                                <li key={index} className="text-gray-700 flex items-center">
                                    <span className="text-teal-600 mr-2">•</span>{ing}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <button
                            onClick={addIngredientsToAppList}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-teal-500 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
                        >
                            <ShoppingCartIcon className="w-5 h-5" />
                            <span>Add Ingredients to List</span>
                        </button>
                        <button
                            onClick={handleRecipePrint}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
                        >
                            <PrinterIcon className="w-5 h-5" />
                            <span>Print Recipe & List</span>
                        </button>
                    </div>
                </div>
            )}
            
            {!loading && !initialSummary && !error && !finalRecipeDetails && (
                <p className="text-center text-gray-500 p-10 border border-dashed rounded-lg">
                    Start by searching for your next culinary adventure!
                </p>
            )}
        </div>
    );
};


// --- Print View Component ---

const PrintView = ({ handleBackToPlan, recipeDetails, combinedList }) => (
    <div className="p-4 sm:p-8 bg-white min-h-screen">
        <button
            onClick={handleBackToPlan}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-8 transition duration-150 print:hidden"
        >
            <ArrowLeftIcon className="w-5 h-5"/>
            <span>Back to Planner</span>
        </button>

        <div className="text-center mb-6 print:hidden">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Print Ready Summary</h1>
            <p className="text-gray-600 mb-4">Use your browser's print function (<code className='font-mono'>Ctrl/Cmd + P</code>) now.</p>
            <button
                onClick={() => window.print()}
                className="flex items-center justify-center mx-auto space-x-2 px-6 py-3 bg-gray-700 hover:bg-black text-white font-semibold rounded-xl shadow-md transition duration-200"
            >
                <PrinterIcon className="w-5 h-5" />
                <span>Open Print Dialog</span>
            </button>
        </div>

        {/* Recipe Section */}
        {recipeDetails && (
            <div className="mb-10 p-6 border-b-4 border-pink-500">
                <h2 className="text-2xl font-extrabold text-pink-700 mb-4 flex items-center">
                    <ChefHatIcon className="w-6 h-6 mr-2"/> {recipeDetails.title}
                </h2>
                <p className="text-sm font-medium text-gray-600 mb-2">
                    URL: <a href={recipeDetails.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 break-words">{recipeDetails.url}</a>
                </p>
                <p className="text-sm font-medium text-gray-600 mb-4">
                    Total Time: <span className="font-semibold text-gray-800">{recipeDetails.cookTime || 'N/A'}</span>
                </p>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                    {recipeDetails.ingredients.map((ing, index) => (
                        <li key={index} className="text-gray-700">{ing}</li>
                    ))}
                </ul>
            </div>
        )}

        {/* Shopping List Section */}
        <div className="p-6 border-b-4 border-teal-500">
            <h2 className="text-2xl font-extrabold text-teal-700 mb-4 flex items-center">
                <ShoppingCartIcon className="w-6 h-6 mr-2"/> Combined Shopping List
            </h2>
            <p className="text-gray-600 mb-4">Includes ingredients from the full 7-day plan and the new recipe.</p>

            <ul className="list-disc list-inside space-y-1 ml-4 columns-2 sm:columns-3">
                {combinedList.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                ))}
            </ul>
        </div>
    </div>
);


// --- Main App Component ---

export default function MealPlan() {
    // view state: 'plan', 'list', 'search', 'print'
    const [view, setView] = useState('plan'); 
    const [extraIngredients, setExtraIngredients] = useState([]); 
    const [recipeDetailsToPrint, setRecipeDetailsToPrint] = useState(null);

    // Combine fixed meal plan ingredients with extra ingredients
    const generatedList = useMemo(() => {
        const baseList = generateShoppingList(MEAL_DAYS); 
        const combinedSet = new Set([...baseList, ...extraIngredients]);
        return Array.from(combinedSet).sort();
    }, [extraIngredients]); 

    const handleViewList = () => setView('list');
    const handleViewSearch = () => setView('search');
    const handleBackToPlan = () => setView('plan');
    const handlePrintView = (details) => {
        setRecipeDetailsToPrint(details);
        setView('print');
    };


    // --- Sub-components (MealPlanView and ShoppingListView are largely unchanged) ---

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MEAL_DAYS.map((d, index) => (<MealCard key={index} dayData={d} />))}
            </div>
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
                    <span>AI Meal Finder</span>
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
                Total unique ingredients: <span className="font-bold text-teal-600">{generatedList.length}</span> (includes added recipes).
            </p>

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
                {view === 'search' && <MealSearchView 
                    handleBackToPlan={handleBackToPlan} 
                    setExtraIngredients={setExtraIngredients}
                    handlePrintView={handlePrintView}
                />}
                {view === 'print' && <PrintView 
                    handleBackToPlan={handleBackToPlan}
                    recipeDetails={recipeDetailsToPrint}
                    combinedList={generatedList}
                />}
            </div>
        </main>
    );
}

