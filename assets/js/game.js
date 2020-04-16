const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const timerElement = document.getElementById("timerCount");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questioCounter = 0;
let availableQuestions = [];

var timerInterval;
var timerCount = 60;

let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "1. Strings",
        choice2: "2. Booleans",
        choice3: "3. Alerts",
        choice4: "4. Numbers",
        answer: 3
    },
    {
        question: "The condition in an if / else statement is encolsed within _________.",
        choice1: "1. quotes",
        choice2: "2. curly brackets",
        choice3: "3. parentheses",
        choice4: "4. square brackets",
        answer: 2
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choice1: "1. Commas",
        choice2: "2. Curly Brackets",
        choice3: "3. Quotes",
        choice4: "4. Parentheses",
        answer: 4
    },
    
    {
        question: "Arrays in Javascript can be used to store _______.",
        choice1: "1. Numbers and Strings",
        choice2: "2. Other arrays",
        choice3: "3. Booleans",
        choice4: "4. All of the Above",
        answer: 4
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "1. JavaScript",
        choice2: "2. Terminal / Bash",
        choice3: "3. For Loops",
        choice4: "4. Console Log",
        answer: 4
    }
];

//constants

const CORRECT_SCORE = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    timerInterval = setInterval(timer, 1000);
    availableQuestions = [...questions];
    getNewQuestions();
    };

timer = () => {
    timerCount--;
    if (timerCount === 0) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRecentScore", score);
        //go to the end of game page
        return window.location.assign("end.html");
    } else {
        timerElement.textContent = timerCount;
    }
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


