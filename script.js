
// START of code section for self-assessment/quiz //
const questions = [
    {
        question: "Who is the creator of the DNS?",
        answers: [
            { text: "Dr. Jon Postel", correct: false }, //Dr. Postel supervised Mockapetris during the develpment/designing of the DNS
            { text: "Tim Berners-Lee 2", correct: false}, //creator of the WWW
            { text: "Paul Mockapetris", correct: true}
        ]
    },
    {
        question: "What is an IP address?",
        answers: [
            { text: "The identifier for a device connected to the network that is understandable to computers", correct: true },
            { text: "A CPU register that holds the memory address that is currently being read from", correct: false}, //this is a Memory Address Register
            { text: "The exact memory address contained directly within a computer instruction", correct: false}  //this is a Direct Address
        ]
    },
    {
        question: "What was the name of the first, functional domain name server?",
        answers: [
            { text: "GNU Name System (GNS)", correct: false }, //an alternative name system
            { text: "Jeeves", correct: true},
            { text: "Ethereum Name Service (ENS)", correct: false} //an alternative name system that uses 'smart contracts' and 'Unstoppable Domains'
        ]
    },
    {
        question: "What are the RFCs?",
        answers: [
            { text: "The developing documents for the DNS", correct: false }, //many RFCs were written while developing the DNS, but RFCs are not used only to describe the DNS
            { text: "Technical notes describing a technology, many of which describe DNS architecture and processes", correct: true},
            { text: "A business document used by organizations to announce a project and request proposals from subcontractors", correct: false} //this is an RFP, request for proposal
        ]
    },
    {
        question: "There are __ types of DNS servers.",
        answers: [
            { text: "two (2); recursive and authoritative", correct: true },
            { text: "three (3); Apache, Nginx, and LiteSpeed", correct: false}, //these are types of web servers
            { text: "two (2); Oracle and MySql", correct: false} //these are types of database servers
        ]
    },
    {
        question: "Which of the following is a method of DNS encryption?",
        answers: [
            { text: "Symmetric Encryption", correct: false }, //this is a general type of encryption, not a specific method
            { text: "Hashing", correct: false}, //hashing has a different application and protects data integrity, not confidentiality
            { text: "DoH", correct: true}  //when selected, include the open response follow up question: what does it stand for?
        ],
        subQuestion: {
            prompt: "What does DoH stand for?",
            acceptedAnswers: ["Domain Name System over HTTPS", "DNS over HTTPS", "Domain Name System over HTTP", "DNS over HTTP"],
            explanation: "DoH is DNS over HTTPS. DNS lookups are wrapped in HTTPS connection and hidden by blending into normal, encrypted web traffic."
        }
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//converts all input to lowercase and trims/removes spaces
function normalize(text){
    return text.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();  
}

let currentQuestionIndex = 0;
let score = 0;

//initial start to quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

//displays the questions
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

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

function showSubQuestion(subQuestion) {
    const box = document.createElement("div");
    box.id = "subquestion";

    const label = document.createElement("label");
    label.htmlFor = "subquestion-input";
    label.innerText = subQuestion.prompt;

    const input = document.createElement("input");
    input.type = "text";
    input.id = "subquestion-input";
    input.autocomplete = "off";

    const submit = document.createElement("button");
    submit.innerText = "Submit";

    const feedback = document.createElement("p");

    function checkResponse() {
        const userResponse = normalize(input.value);
        if (!userResponse) return;

        const accept = subQuestion.acceptedAnswers.includes(userResponse);
        feedback.innerText = accept
            ? `Correct! ${subQuestion.explanation}`
            : `Not quite. ${subQuestion.explanation}`;
        
            input.disabled=true;
            submit.disabled=true;
            nextButton.classList.remove("hide");
    }

    submit.addEventListener("click", checkResponse);
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") checkResponse();
    });
    box.append(label, input, submit, feedback);
    document.getElementById("quiz").appendChild(box);
    input.focus();
}

function resetState(){
    nextButton.classList.add("hide");

    // (for following 2 lines)  added to clear subQuestion between questions
    const oldResponse = document.getElementById("subQuestion");
    if (oldResponse) oldResponse.remove();

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }

    //highlights the right answer annd disable all buttons
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") { 
            button.classList.add("correct");
        }
        button.disabled === "true";
    });

    //nextButton.classList.remove("hide");
    const subQuestion = questions[currentQuestionIndex].subQuestion;
    if (isCorrect && subQuestion) {
        showSubQuestion(subQuestion); //the "Next" button appears when the response is submitted
    }
    else {
        nextButton.classList.remove("hide");
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) showQuestion();
        else showScore();
    }
    else {
        startQuiz(); //restart quiz
    }
})

function showScore() {
    resetState();
    questionElement.innerText = `Your Score is ${score}`;
    nextButton.innerText = "Try Again"; //option: ask 'Try Again?' if user clicks 'no'-ending message, if user clicks 'yes'-positive message and restart
    nextButton.classList.remove("hide");
    nextButton.onclick = () => location.reload();
}

startQuiz();

// END of code section for self-assessment/quiz //
