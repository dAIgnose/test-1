document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle Functionality with Animation
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.style.transition = 'margin-left 0.3s ease';
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '80px';
        } else {
            mainContent.style.marginLeft = '0';
        }
    });

    // Dark Mode Toggle with Smoother Transition
    let darkMode = localStorage.getItem('darkMode') === 'true';

    if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('dark-mode-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    }

    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode);

        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }

        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.style.transition = 'background-color 0.3s, color 0.3s, box-shadow 0.3s';
        });
    });

    // Navigation functionality with smooth transitions
    const navLinks = document.querySelectorAll('.navigation a');
    const sections = document.querySelectorAll('.dashboard-section');

    document.getElementById('what-if-section').classList.add('hidden');
    document.getElementById('food-section').classList.add('hidden');
    document.getElementById('medicine-section').classList.add('hidden');
    document.getElementById('environment-section').classList.add('hidden');
    document.getElementById('profile-section').classList.add('hidden');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(l => {
                l.parentElement.classList.remove('active');
            });

            this.parentElement.classList.add('active');

            sections.forEach(section => {
                if (!section.classList.contains('hidden')) {
                    section.style.animation = 'fadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        section.classList.add('hidden');
                        section.style.animation = '';
                    }, 300);
                }
            });

            const targetId = this.getAttribute('href').substring(1);
            setTimeout(() => {
                const sectionMap = {
                    'dashboard': document.querySelector('.dashboard-section'),
                    'simulations': document.getElementById('what-if-section'),
                    'food': document.getElementById('food-section'),
                    'medicine': document.getElementById('medicine-section'),
                    'environment': document.getElementById('environment-section'),
                    'profile': document.getElementById('profile-section')
                };
                if (sectionMap[targetId]) {
                    sectionMap[targetId].classList.remove('hidden');
                    sectionMap[targetId].style.animation = 'fadeIn 0.5s ease-out';
                }
            }, 300);

            if (window.innerWidth <= 768 && sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
            }
        });
    });

    // What-If Simulation Functionality
// What-If Simulation Functionality
const sleepSlider = document.getElementById('sleep');
const exerciseSlider = document.getElementById('exercise');
const stressSlider = document.getElementById('stress');

const sleepValue = document.getElementById('sleep-value');
const exerciseValue = document.getElementById('exercise-value');
const stressValue = document.getElementById('stress-value');

sleepSlider.addEventListener('input', function () {
    sleepValue.textContent = this.value + ' hrs';
    sleepValue.style.animation = 'pulse 0.5s';
    setTimeout(() => { sleepValue.style.animation = ''; }, 500);
});

exerciseSlider.addEventListener('input', function () {
    exerciseValue.textContent = this.value + ' min';
    exerciseValue.style.animation = 'pulse 0.5s';
    setTimeout(() => { exerciseValue.style.animation = ''; }, 500);
});

stressSlider.addEventListener('input', function () {
    stressValue.textContent = this.value + ' /10';
    stressValue.style.animation = 'pulse 0.5s';
    setTimeout(() => { stressValue.style.animation = ''; }, 500);
});

document.getElementById('simulate-button').addEventListener('click', function () {
    const sleep = parseFloat(sleepSlider.value);
    const exercise = parseInt(exerciseSlider.value);
    const stress = parseInt(stressSlider.value);

    let results = '';

    // Sleep Analysis
    if (sleep < 5) {
        results += '<p>⚠️ <strong>Severe Sleep Deprivation:</strong> Linked to memory loss, weakened immunity, and mood disorders.</p>';
    } else if (sleep < 6) {
        results += '<p>⚠️ <strong>Reduced Cognitive Function:</strong> Sleep deprivation may lead to decreased focus and decision-making ability.</p>';
    } else if (sleep >= 6 && sleep <= 8) {
        results += '<p>✅ <strong>Balanced Sleep:</strong> Optimal for most adults. Supports memory, heart health, and hormone regulation.</p>';
    } else if (sleep > 8 && sleep <= 10) {
        results += '<p>✅ <strong>Deep Recovery:</strong> Enhanced physical and mental recovery. Monitor for daytime grogginess.</p>';
    } else {
        results += '<p>⚠️ <strong>Oversleeping:</strong> May be linked to fatigue and underlying health issues like thyroid dysfunction or depression.</p>';
    }

    // Exercise Analysis
    if (exercise < 10) {
        results += '<p>⚠️ <strong>Very Low Activity:</strong> Higher risk of chronic illness and weight gain. Aim for at least 20–30 minutes daily.</p>';
    } else if (exercise >= 10 && exercise < 30) {
        results += '<p>⚠️ <strong>Low Activity:</strong> Some health benefits but could be improved with consistent cardio or strength training.</p>';
    } else if (exercise >= 30 && exercise <= 60) {
        results += '<p>✅ <strong>Moderate Activity:</strong> Improves mood, metabolism, and cardiovascular health.</p>';
    } else if (exercise > 60 && exercise <= 90) {
        results += '<p>✅ <strong>High Activity:</strong> Excellent for endurance and fat loss. Ensure proper hydration and rest days.</p>';
    } else {
        results += '<p>⚠️ <strong>Overtraining Risk:</strong> Too much exercise may lead to injury, fatigue, and hormone disruption.</p>';
    }

    // Stress Analysis
    if (stress <= 3) {
        results += '<p>✅ <strong>Low Stress:</strong> Encourages clear thinking, restful sleep, and a strong immune system.</p>';
    } else if (stress > 3 && stress <= 6) {
        results += '<p>⚠️ <strong>Moderate Stress:</strong> Manageable but monitor for signs of anxiety or irritability. Try breathing exercises.</p>';
    } else if (stress > 6 && stress <= 8) {
        results += '<p>⚠️ <strong>High Stress:</strong> May impair digestion, immune function, and cause insomnia. Consider stress-reducing habits.</p>';
    } else {
        results += '<p>🚨 <strong>Critical Stress:</strong> Prolonged exposure to high stress can lead to burnout, anxiety, and heart issues.</p>';
    }

    // Combined Factors
    if (sleep < 6 && stress > 7) {
        results += '<p>🚨 <strong>Burnout Warning:</strong> Low sleep and high stress can lead to emotional exhaustion and health decline.</p>';
    }

    if (exercise > 45 && sleep >= 7 && stress < 5) {
        results += '<p>✅ <strong>Peak Wellness:</strong> Excellent recovery, performance, and mental health balance. Keep it up! 💪😴🧘‍♂️</p>';
    }

    if (sleep >= 7 && exercise >= 30 && stress <= 5) {
        results += '<p>🌿 <strong>Wellness Zone:</strong> You’re in a great place! Balanced inputs help reduce long-term disease risks.</p>';
    }

    const resultsContainer = document.getElementById('simulation-results-container');
    resultsContainer.innerHTML = results || '<p>✅ All parameters are within optimal ranges. Keep up the great habits!</p>';
    resultsContainer.style.animation = 'fadeIn 0.5s ease-out';
    setTimeout(() => { resultsContainer.style.animation = ''; }, 500);
    updateFoodSection(sleep, stress, exercise);

});


    // Medicine Checker Functionality with improved feedback
    document.getElementById('check-medicine').addEventListener('click', function() {
        const medicine = document.getElementById('medicine-search').value.toLowerCase().trim();
        let result = '';

        const medicineDatabase = {
            "ibuprofen": {
                safe: true,
                reason: "✅ Safe for short-term use. Do not exceed 4000mg per day to avoid liver damage."
            },"lisinopril": {
                safe: true,
                reason: "✅ Safe for short-term use. Do not exceed 4000mg per day to avoid liver damage."
            },
            "amoxicillin": {
                safe: true,
                reason: "✅ Safe for short-term use. Do not exceed 4000mg per day to avoid liver damage."
            },
            "acetaminophen": {
                safe: true,
                reason: "✅ Safe for short-term use. Do not exceed 4000mg per day to avoid liver damage."
            },
            "naproxen": {
                safe: true,
                reason: "✅ Can be used for pain relief. Avoid long-term use to reduce risk of GI bleeding."
            },
            "metformin": {
                safe: true,
                reason: "✅ Common for type 2 diabetes. Follow prescribed dosage to avoid lactic acidosis."
            },
            "simvastatin": {
                safe: true,
                reason: "✅ Lowers cholesterol. Watch for muscle pain as a side effect."
            },
            "atorvastatin": {
                safe: true,
                reason: "✅ Take in the evening. Rare side effects include liver enzyme changes."
            },
            "omeprazole": {
                safe: true,
                reason: "✅ Good for acid reflux. Long-term use may affect calcium absorption."
            },
            "ranitidine": {
                safe: false,
                reason: "⚠️ Withdrawn in many regions due to potential carcinogenic impurities."
            },
            "pantoprazole": {
                safe: true,
                reason: "✅ Safe for short-term acid suppression. Monitor magnesium levels for long-term use."
            },
            "albuterol": {
                safe: true,
                reason: "✅ Used for asthma attacks. Can cause jitteriness if overused."
            },
            "montelukast": {
                safe: true,
                reason: "✅ Long-term asthma control. Rare behavioral side effects possible."
            },
            "amitriptyline": {
                safe: false,
                reason: "⚠️ Not recommended without supervision. Can affect heart rhythm and cause drowsiness."
            },
            "sertraline": {
                safe: true,
                reason: "✅ Antidepressant. May cause nausea or insomnia initially."
            },
            "fluoxetine": {
                safe: true,
                reason: "✅ Take in the morning. Long half-life; monitor for serotonin syndrome."
            },
            "citalopram": {
                safe: true,
                reason: "✅ Monitor ECG in high doses due to risk of QT prolongation."
            },
            "escitalopram": {
                safe: true,
                reason: "✅ Fewer side effects than citalopram. Good for anxiety and depression."
            },
            "diazepam": {
                safe: false,
                reason: "⚠️ Habit-forming. Not advised for long-term use."
            },
            "lorazepam": {
                safe: false,
                reason: "⚠️ Short-term anxiety relief. Risk of dependence."
            },
            "clonazepam": {
                safe: false,
                reason: "⚠️ Effective but not safe for long-term use without close monitoring."
            },
            "zolpidem": {
                safe: false,
                reason: "⚠️ Sleep aid. Use only short-term to avoid dependence."
            },
            "trazodone": {
                safe: true,
                reason: "✅ Helpful for insomnia. Can cause morning grogginess."
            },
            "hydrochlorothiazide": {
                safe: true,
                reason: "✅ Diuretic for blood pressure. Monitor electrolytes regularly."
            },
            "furosemide": {
                safe: true,
                reason: "✅ Potent diuretic. Risk of dehydration and low potassium."
            },
            "spironolactone": {
                safe: true,
                reason: "✅ Good for heart failure. Can raise potassium levels."
            },
            "amlodipine": {
                safe: true,
                reason: "✅ Blood pressure med. Swelling in ankles is a common side effect."
            },
            "metoprolol": {
                safe: true,
                reason: "✅ Beta-blocker. May cause fatigue or slow heart rate."
            },
            "atenolol": {
                safe: true,
                reason: "✅ Similar to metoprolol. Avoid in asthma patients."
            },
            "carvedilol": {
                safe: true,
                reason: "✅ For heart failure. Take with food to reduce dizziness."
            },
            "losartan": {
                safe: true,
                reason: "✅ Good alternative to ACE inhibitors. Monitor kidney function."
            },
            "valsartan": {
                safe: true,
                reason: "✅ Similar to losartan. Watch for hypotension."
            },
            "enalapril": {
                safe: true,
                reason: "✅ ACE inhibitor. Can cause cough."
            },
            "ramipril": {
                safe: true,
                reason: "✅ May reduce heart attack risk. Watch for low BP."
            },
            "gabapentin": {
                safe: true,
                reason: "✅ Used for nerve pain. Can cause drowsiness or dizziness."
            },
            "pregabalin": {
                safe: true,
                reason: "✅ Alternative to gabapentin. Taper off slowly to avoid withdrawal."
            },
            "levothyroxine": {
                safe: true,
                reason: "✅ Thyroid replacement. Take on empty stomach in the morning."
            },
            "methimazole": {
                safe: true,
                reason: "✅ For hyperthyroidism. Can lower white cell count."
            },
            "warfarin": {
                safe: false,
                reason: "⚠️ Blood thinner. Needs frequent monitoring to avoid bleeding."
            },
            "apixaban": {
                safe: true,
                reason: "✅ Newer blood thinner. Lower risk of serious bleeding than warfarin."
            },
            "rivaroxaban": {
                safe: true,
                reason: "✅ Take with food. No routine blood monitoring needed."
            },
            "clopidogrel": {
                safe: true,
                reason: "✅ Prevents clots. Avoid if you have active bleeding."
            },
            "aspirin": {
                safe: false,
                reason: "⚠️ Can interact with blood thinners or cause stomach issues."
            },
            "diphenhydramine": {
                safe: false,
                reason: "⚠️ Sleep aid and allergy med. Can cause strong drowsiness."
            },
            "cetirizine": {
                safe: true,
                reason: "✅ Non-drowsy antihistamine. Safe for daily allergy control."
            },
            "loratadine": {
                safe: true,
                reason: "✅ Good for seasonal allergies. Take once daily."
            },
            "fexofenadine": {
                safe: true,
                reason: "✅ Least sedating allergy med. Safe for long-term use."
            },
            "pseudoephedrine": {
                safe: false,
                reason: "⚠️ Decongestant. Can raise blood pressure and cause insomnia."
            },
            "phenylephrine": {
                safe: false,
                reason: "⚠️ Less effective decongestant. May raise blood pressure."
            },
            "dextromethorphan": {
                safe: true,
                reason: "✅ Cough suppressant. Avoid combining with MAOIs."
            },
            "guaifenesin": {
                safe: true,
                reason: "✅ Thins mucus. Drink plenty of fluids."
            },
            "insulin glargine": {
                safe: true,
                reason: "✅ Long-acting insulin. Take consistently each day."
            },
            "insulin lispro": {
                safe: true,
                reason: "✅ Rapid-acting insulin. Take before meals."
            },
            "lansoprazole": {
                safe: true,
                reason: "✅ Like omeprazole. Limit long-term use."
            },
            "bupropion": {
                safe: true,
                reason: "✅ May help with smoking cessation. Can cause insomnia."
            },
            "venlafaxine": {
                safe: true,
                reason: "✅ Effective for depression/anxiety. Watch blood pressure."
            },
            "duloxetine": {
                safe: true,
                reason: "✅ Also used for chronic pain. Can cause dry mouth or nausea."
            },
            "buspirone": {
                safe: true,
                reason: "✅ Non-sedating anxiety med. Takes a few weeks to work."
            },
            "haloperidol": {
                safe: false,
                reason: "⚠️ Antipsychotic. Risk of extrapyramidal symptoms."
            },
            "risperidone": {
                safe: true,
                reason: "✅ Antipsychotic. Monitor weight and blood sugar."
            },
            "olanzapine": {
                safe: true,
                reason: "✅ Can cause significant weight gain. Monitor metabolism."
            },
            "quetiapine": {
                safe: true,
                reason: "✅ Used for bipolar and sleep. Risk of sedation and weight gain."
            },
            "lithium": {
                safe: true,
                reason: "✅ Mood stabilizer. Requires regular blood level checks."
            },
            "valproic acid": {
                safe: true,
                reason: "✅ For seizures or mood stabilization. Monitor liver function."
            },
            "phenytoin": {
                safe: true,
                reason: "✅ Seizure control. Monitor levels to avoid toxicity."
            },
            "carbamazepine": {
                safe: true,
                reason: "✅ Seizures and bipolar disorder. Watch for rash and low sodium."
            },
            "oxcarbazepine": {
                safe: true,
                reason: "✅ Similar to carbamazepine with fewer interactions."
            },
            "topiramate": {
                safe: true,
                reason: "✅ May aid in weight loss. Can cause cognitive dulling."
            },
            "lamotrigine": {
                safe: true,
                reason: "✅ Used in bipolar disorder. Rash is a rare serious side effect."
            },
            "alendronate": {
                safe: true,
                reason: "✅ Weekly osteoporosis med. Stay upright 30 minutes after taking."
            },
            "calcitriol": {
                safe: true,
                reason: "✅ Active vitamin D. Used in kidney patients."
            },
            "vitamin D": {
                safe: true,
                reason: "✅ Safe supplement. Avoid excessive dosing."
            },
            "vitamin B12": {
                safe: true,
                reason: "✅ Water soluble. Safe and helpful for nerve health."
            },
            "iron sulfate": {
                safe: true,
                reason: "✅ Used for anemia. May cause constipation or dark stools."
            },
            "folic acid": {
                safe: true,
                reason: "✅ Essential in pregnancy. Prevents neural tube defects."
            },
            "zinc": {
                safe: true,
                reason: "✅ Supports immune system. Excessive use can upset stomach."
            },
            "magnesium oxide": {
                safe: true,
                reason: "✅ Relieves constipation and prevents migraines."
            },
            "potassium chloride": {
                safe: true,
                reason: "✅ Electrolyte replacement. Take with food and water."
            },
            "melatonin": {
                safe: true,
                reason: "✅ Helps with sleep. Use occasionally to avoid dependence."
            },
            "loperamide": {
                safe: true,
                reason: "✅ Effective for diarrhea. Do not exceed 8mg per day."
            },
            "ondansetron": {
                safe: true,
                reason: "✅ For nausea. Generally safe, but may cause constipation."
            },
            "meclizine": {
                safe: true,
                reason: "✅ Used for motion sickness. Can cause drowsiness."
            },
            "cyclobenzaprine": {
                safe: true,
                reason: "✅ Muscle relaxant. Avoid alcohol due to sedation."
            },
            "baclofen": {
                safe: true,
                reason: "✅ Treats muscle spasticity. Can cause drowsiness."
            },
            "nitrofurantoin": {
                safe: true,
                reason: "✅ UTI antibiotic. Take with food."
            },
            "cephalexin": {
                safe: true,
                reason: "✅ Broad-spectrum antibiotic. Watch for allergy signs."
            }
        };
        

        if (medicine === '') {
            result = '<p>Please enter a medicine name.</p>';
        } else if (medicine in medicineDatabase) {
            const med = medicineDatabase[medicine];
            if (med.safe) {
                result = `<p class="medicine-safe">✅ <strong>${medicine.toUpperCase()} appears safe</strong>: ${med.reason}</p>`;
            } else {
                result = `<p class="medicine-unsafe">❌ <strong>${medicine.toUpperCase()} not recommended</strong>: ${med.reason}</p>`;
            }
        } else {
            result = `<p>No data found for "${medicine}". Please check the spelling or consult your doctor.</p>`;
        }

        const resultContainer = document.getElementById('medicine-result-container');
        resultContainer.innerHTML = result;
        resultContainer.style.animation = 'fadeIn 0.5s ease-out';
        setTimeout(() => { resultContainer.style.animation = ''; }, 500);
        
    });
    

    // Run Simulation Button
    document.getElementById('run-simulation').addEventListener('click', function() {
        document.querySelectorAll('.dashboard-section')[0].style.animation = 'fadeOut 0.3s ease-out forwards';

        setTimeout(() => {
            document.querySelectorAll('.dashboard-section')[0].classList.add('hidden');
            document.getElementById('what-if-section').classList.remove('hidden');
            document.getElementById('what-if-section').style.animation = 'fadeIn 0.5s ease-out';

            navLinks.forEach(l => {
                l.parentElement.classList.remove('active');
                if (l.getAttribute('href') === '#simulations') {
                    l.parentElement.classList.add('active');
                }
            });
        }, 300);
    });

    // Add notifications functionality
    document.getElementById('notifications').addEventListener('click', function() {
        const notifications = [
            'Your blood pressure is slightly elevated. Consider meditation.',
            'It\'s time for your evening medication.',
            'Your sleep pattern has improved by 15% this week!',
            'Environmental alert: AQI is rising in your area.'
        ];

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-bell"></i></div>
            <div class="toast-content">${randomNotification}</div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;

        document.body.appendChild(toast);

        const style = document.createElement('style');
        style.textContent = `
            .toast-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: var(--card-bg);
                color: var(--text-color);
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                z-index: 1000;
                max-width: 350px;
                animation: slideInRight 0.3s ease-out;
            }
            .toast-icon {
                margin-right: 10px;
                font-size: 1.5rem;
            }
            .toast-content {
                flex: 1;
            }
            .toast-close {
                background: transparent;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        toast.querySelector('.toast-close').addEventListener('click', function() {
            toast.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    });
});


// Surprise Me Button
const surpriseMeals = [
    ["🥗 Greek salad", "🍗 Grilled chicken", "🥑 Avocado toast"],
    ["🍚 Brown rice bowl", "🐟 Mackerel", "🥦 Steamed broccoli"],
    ["🍓 Yogurt with berries", "🍳 Omelette", "🍌 Banana"],
    ["🥣 Chia pudding", "🫐 Blueberries", "🌰 Walnuts"],
    ["🍠 Sweet potato mash", "🍄 Mushrooms", "🥬 Kale chips"]
];

document.getElementById('surprise-me').addEventListener('click', () => {
    const randomMeal = surpriseMeals[Math.floor(Math.random() * surpriseMeals.length)];
    document.getElementById('recommended-foods').innerHTML =
        randomMeal.map(food => `<li>${food}</li>`).join('');
});

// Food Fact Rotator
const foodFacts = [
    "🍅 Tomatoes are technically fruits!",
    "🥕 Carrots were originally purple!",
    "🍫 Dark chocolate can improve mood and memory.",
    "🍋 Lemons contain more sugar than strawberries.",
    "🍍 Pineapple contains enzymes that aid digestion.",
    "🥒 Cucumbers are 96% water – super hydrating!"
];

let factIndex = 0;
setInterval(() => {
    factIndex = (factIndex + 1) % foodFacts.length;
    document.getElementById('food-fact').textContent = foodFacts[factIndex];
}, 8000);

// Update Food Recommendations Based on Inputs
function updateFoodSection(sleep, stress, exercise) {
    const recommended = [];
    const avoid = [];

    if (sleep < 6) {
        recommended.push("🥬 Spinach (magnesium-rich)");
        recommended.push("🟤 Oats (boost serotonin)");
        avoid.push("☕ Caffeine (avoid with poor sleep)");
    }

    if (stress > 7) {
        recommended.push("🫐 Blueberries (antioxidants)");
        recommended.push("🍵 Chamomile tea (soothing)");
        avoid.push("🍬 Sugary snacks");
        avoid.push("🥤 Energy drinks");
    }

    if (exercise > 45) {
        recommended.push("🍗 Chicken breast (protein)");
        recommended.push("🍠 Sweet potato (complex carbs)");
    } else if (exercise < 15) {
        avoid.push("🧂 Salty snacks (bloat risk)");
    }

    if (sleep >= 7 && stress <= 5 && exercise >= 30) {
        recommended.push("🍳 Eggs (brain fuel)");
        recommended.push("🥑 Avocado (healthy fats)");
    }

    document.getElementById('recommended-foods').innerHTML =
        recommended.length ? recommended.map(f => `<li>${f}</li>`).join('') :
        '<li>🥗 Mixed green salad</li><li>🍎 Apple</li><li>🍚 Brown rice</li><li>🐟 Salmon</li>';

    document.getElementById('avoid-foods').innerHTML =
        avoid.length ? avoid.map(f => `<li>${f}</li>`).join('') :
        '<li>☕ Caffeine after 3pm</li><li>🍷 Alcohol</li><li>🍬 High sugar foods</li>';
}


const OPENWEATHER_API_KEY = '8e10878c1d8a2616ed1fc07e382f6873';
const AIRVISUAL_API_KEY = '8df8fa80-de93-4790-bb6b-002f2330c16c';

async function fetchEnvironmentData(lat, lon) {
    try {
        // Get Weather data (temp, humidity)
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        const weatherData = await weatherRes.json();

        // Get Air Quality data (AQI, Pollen - simulated here)
        const airRes = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${AIRVISUAL_API_KEY}`);
        const airData = await airRes.json();

        // Update UI
        document.getElementById('env-location').textContent = `${airData.data.city}, ${airData.data.country}`;
        document.getElementById('env-temp').textContent = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('env-humidity').textContent = `${weatherData.main.humidity}%`;

        const aqi = airData.data.current.pollution.aqius;
        const aqiLevel = getAQILabel(aqi);
        document.getElementById('env-aqi').textContent = `${aqi} (${aqiLevel.label})`;
        document.getElementById('env-aqi').className = `env-metric-value ${aqiLevel.class}`;

        // Pollen simulated (You can replace with real pollen data if available)
        const pollenIndex = ["Low", "Moderate", "High"][Math.floor(Math.random() * 3)];
        document.getElementById('env-pollen').textContent = pollenIndex;

        // Set recommendations
        document.getElementById('env-recommendation').innerHTML = `
            <strong>Recommendation:</strong> ${getEnvAdvice(aqi, pollenIndex)}
        `;

    } catch (error) {
        console.error("Error fetching environment data:", error);
        document.getElementById('env-location').textContent = "Error fetching data";
    }
}

function getAQILabel(aqi) {
    if (aqi <= 50) return { label: 'Good', class: 'safe' };
    if (aqi <= 100) return { label: 'Moderate', class: 'warning' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', class: 'warning' };
    if (aqi <= 200) return { label: 'Unhealthy', class: 'danger' };
    if (aqi <= 300) return { label: 'Very Unhealthy', class: 'danger' };
    return { label: 'Hazardous', class: 'danger' };
}

function getEnvAdvice(aqi, pollen) {
    let advice = '';
    if (aqi > 150) advice += 'Avoid outdoor activities. Use air purifiers indoors. ';
    if (aqi > 100 && pollen === 'High') advice += 'People with allergies should stay indoors. ';
    if (aqi < 100 && pollen === 'Low') advice += 'Great day to enjoy nature! ';
    if (!advice) advice = 'Conditions are fairly normal. Stay hydrated and active!';
    return advice;
}

// Use browser geolocation
function initEnvironmentSync() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            fetchEnvironmentData(position.coords.latitude, position.coords.longitude);
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('env-location').textContent = "Location access denied";
        });
    } else {
        document.getElementById('env-location').textContent = "Geolocation not supported";
    }
}


const editBtn = document.getElementById('editProfileBtn');
const modal = document.getElementById('editProfileModal');
const closeModal = document.getElementById('closeEditModal');

editBtn.addEventListener('click', () => {
    document.getElementById('editName').value = document.getElementById('displayName').textContent;
    document.getElementById('editAge').value = document.getElementById('displayAge').textContent;
    document.getElementById('editHeight').value = document.getElementById('displayHeight').textContent;
    document.getElementById('editWeight').value = document.getElementById('displayWeight').textContent;
    document.getElementById('editBlood').value = document.getElementById('displayBlood').textContent;
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('saveProfile').addEventListener('click', () => {
    const name = document.getElementById('editName').value;
    const age = parseInt(document.getElementById('editAge').value);
    const height = parseInt(document.getElementById('editHeight').value);
    const weight = parseInt(document.getElementById('editWeight').value);
    const blood = document.getElementById('editBlood').value;

    // Update display
    document.getElementById('displayName').textContent = name;
    document.getElementById('displayAge').textContent = age;
    document.getElementById('displayHeight').textContent = height;
    document.getElementById('displayWeight').textContent = weight;
    document.getElementById('displayBlood').textContent = blood;

    // Calculate BMI
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    document.getElementById('displayBMI').textContent = bmi;

    // Health tip logic
    let tags = '';
    if (bmi >= 25) {
        tags += '⚖️ Consider managing weight<br>';
    } else if (bmi < 18.5) {
        tags += '🍽️ Nutritional support may help<br>';
    } else {
        tags += '💪 Great shape!<br>';
    }
    if (age > 40) {
        tags += '🩺 Yearly checkups recommended';
    } else {
        tags += '🏃 Stay Active';
    }

    document.getElementById('healthTags').innerHTML = tags;

    modal.classList.add('hidden');
    pulseMetric(document.getElementById('profileDisplay'));
});

// Animate value for live feel
function animateValue(el, start, end, suffix = '', duration = 1000) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// Pulse animation on update
function pulseMetric(el) {
    el.classList.add('pulse');
    setTimeout(() => el.classList.remove('pulse'), 1000);
}

// Generate smart tip based on values
function generateSmartTip() {
    const fatigueText = document.querySelectorAll('.metric-card')[2].querySelector('.metric-value').textContent;
    const aqiText = document.querySelectorAll('.metric-card')[3].querySelector('.metric-value').textContent;

    let tip = '💡 Stay hydrated and take screen breaks regularly.';

    if (fatigueText.includes('↑') && aqiText.toLowerCase().includes('high')) {
        tip = '⚠️ You’re mentally fatigued and air quality is bad — prefer indoor relaxation today.';
    } else if (fatigueText.includes('↑')) {
        tip = '🧠 Mental fatigue detected — take a short break and breathe deeply.';
    } else if (aqiText.toLowerCase().includes('high')) {
        tip = '😷 Poor air quality outside — use a mask and keep indoor air clean.';
    }

    document.getElementById('smart-tip').innerHTML = `<div class="health-tip-box">${tip}</div>`;
}

// Modal logic for info popup
document.querySelectorAll('.metric-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.metric-title').textContent;
        const value = card.querySelector('.metric-value').textContent;

        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = getMetricDetails(title, value);

        document.getElementById('metric-info-modal').classList.remove('hidden');
    });
});

function getMetricDetails(title, value) {
    switch (title) {
        case 'Heart Rate':
            return `<p>💓 Current Rate: <strong>${value}</strong></p>
                    <p>Normal resting range: 60-100 bpm</p>
                    <p>Tip: Try deep breathing to regulate your heart rhythm.</p>`;
        case 'Glucose':
            return `<p>🩸 Glucose Level: <strong>${value}</strong></p>
                    <p>Maintain steady energy by choosing complex carbs over sugar.</p>`;
        case 'Prediction':
            return `<p>🧠 Status: <strong>${value}</strong></p>
                    <p>Mental fatigue can be reduced by taking short breaks and minimizing screen time.</p>`;
        case 'AQI':
            return `<p>🌫️ Air Quality: <strong>${value}</strong></p>
                    <p>Limit outdoor activities and use an air purifier indoors.</p>`;
        default:
            return `<p>No additional data available.</p>`;
    }
}

// Close modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('metric-info-modal').classList.add('hidden');
});

// Simulate dynamic updates (example only, replace with real API later)
function simulateUpdates() {
    const heartEl = document.querySelectorAll('.metric-card')[0].querySelector('.metric-value');
    animateValue(heartEl, 74, 79, ' bpm');
    pulseMetric(heartEl);

    const fatigueEl = document.querySelectorAll('.metric-card')[2].querySelector('.metric-value');
    fatigueEl.textContent = 'Mental fatigue ↑';
    pulseMetric(fatigueEl);

    generateSmartTip();
}

// Run once at load
simulateUpdates();

// Optional: Rerun every 10 seconds to mimic live updates
// setInterval(simulateUpdates, 10000);
