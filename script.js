
// START of code section for self-assessment/quiz //
const questions = [
    {
        question: "Who is the Creator of the DNS?",
        answers: [
            { text: "option 1", correct: false },
            { text: "option 2", correct: false},
            { text: "Paul Mockapetris", correct: true}
        ]
    },
    {
        question: "What is an IP address?",
        answers: [
            { text: "The identifier for server understandable to computers", correct: true },
            { text: "option 2", correct: false},
            { text: "option 3", correct: false}
        ]
    },
    {
        question: "What was the name of the first, functional domain name server?",
        answers: [
            { text: "option 1", correct: false },
            { text: "Jeeves", correct: true},
            { text: "option 3", correct: false}
        ]
    },
    {
        question: "What are the RFCs?",
        answers: [
            { text: "option 1", correct: false },
            { text: "Request for Comments; technical notes describing a technology, many of which describe DNS architecture and processes", correct: true},
            { text: "option 3", correct: false}
        ]
    },
    {
        question: "There are __ types of DNS architecture.",
        answers: [
            { text: "two (2); recursive and authoritative", correct: true },
            { text: "option 2", correct: false},
            { text: "option 3", correct: false}
        ]
    },
    {
        question: "Which of the following is a method of DNS encryption?",
        answers: [
            { text: "option 1", correct: false },
            { text: "option 2", correct: false},
            { text: "DoH", correct: true}  //when selected, include the open response follow up question: what does it stand for?
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = '${currentQuestionIndex + 1}. ${currentQuestion.question}';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        if (answer.correct){ 
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState(){
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === true;

    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }

    //highlights the right answer annd disable all buttons
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === true) { 
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.classList.remove("hide");
}


nextButton.addEventListener("click", ()=> {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `Your Score is ${score}`;
    nextButton.innerText = "Try Again"; //option: ask 'Try Again?' if user clicks 'no'-ending message, if user clicks 'yes'-positive message and restart
    nextButton.classList.remove("hide");
    nextButton.onclick = () => location.reload();
}

startQuiz();

// END of code section for self-assessment/quiz //
