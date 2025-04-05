const words = [
    {
        word: "perseverance",
        meaning: "끈기, 인내",
        examples: [
            "Perseverance is the key to success.",
            "His perseverance helped him overcome obstacles.",
            "With perseverance, she achieved her goals.",
            "Great accomplishments require patience and perseverance.",
            "He showed perseverance despite repeated failures."
        ]
    },
    {
        word: "gratitude",
        meaning: "감사, 고마움",
        examples: [
            "She expressed her gratitude with a warm smile.",
            "Gratitude makes life more meaningful.",
            "He wrote a letter of gratitude to his teacher.",
            "Feeling gratitude can improve your happiness.",
            "Expressing gratitude strengthens relationships."
        ]
    },
    {
        word: "resilient",
        meaning: "회복력 있는, 탄력적인",
        examples: [
            "He remained resilient despite many challenges.",
            "Resilient people bounce back from adversity.",
            "Her resilient attitude inspired many.",
            "A resilient mindset helps in tough times.",
            "Children are naturally resilient and adaptable."
        ]
    },
    {
        word: "curiosity",
        meaning: "호기심",
        examples: [
            "Curiosity leads to great discoveries.",
            "A child's curiosity knows no bounds.",
            "He asked questions with genuine curiosity.",
            "Curiosity is the first step to learning.",
            "She read books to satisfy her curiosity."
        ]
    },
    {
        word: "compassion",
        meaning: "연민, 동정심",
        examples: [
            "Compassion makes the world a better place.",
            "She showed compassion to those in need.",
            "A leader must have compassion and wisdom.",
            "Compassion is essential in difficult times.",
            "Helping others with compassion brings joy."
        ]
    }
];

function getDailyWord() {
    const today = new Date();
    const index = today.getDate() % words.length;
    return words[index];
}

document.addEventListener("DOMContentLoaded", () => {
    const dailyWord = getDailyWord();
    document.getElementById("daily-word").textContent = dailyWord.word;
    document.getElementById("daily-meaning").textContent = dailyWord.meaning;
    const exampleList = document.getElementById("example-list");
    exampleList.innerHTML = "";
    dailyWord.examples.forEach(sentence => {
        const li = document.createElement("li");
        li.innerHTML = sentence.replace(
            new RegExp(dailyWord.word, "gi"),
            `<span class="highlight">${dailyWord.word}</span>`
        );
        exampleList.appendChild(li);
    });
});
