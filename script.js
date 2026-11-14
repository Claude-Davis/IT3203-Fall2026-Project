
// START of code section for self-assessment/quiz //
const questions = [  //array that stores all questions
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
        question: "Which of the following are commands that can be used to look up a domain's IP address?",
        type: "multi",
        answers: [
            { text: "dig", correct: true},
            { text: "mkdir", correct: false},
            { text: "nslookup", correct: true},
            { text: "git", correct: false},
            { text: "ls", correct: false}
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
        question: "There are __ types of DNS servers, ___.",
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
        openResponse: {
            prompt: "What does DoH stand for?",
            acceptedAnswers: ["domain name system over https", "dns over https", "domain name system over http", "dns over http"],
            explanation: "DoH is DNS over HTTPS. DNS lookups are wrapped in HTTPS connection and hidden by blending into normal, encrypted web traffic."
        }
    }
];

const questionElement = document.getElementById("question"); //variable is assigned the tag with id=question on the html doc (<h3>)
const answerButtons = document.getElementById("answer-buttons"); //variable is assigned answer-buttons id in html doc ("btn-grid" div class)
const nextButton = document.getElementById("next-btn");  //variable assigned next-btn id (<button> tag in "hide" class)

//normalize() converts all text input to lowercase and trims/removes spaces
function normalize(text){
    return text.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();  
}
//toggleAnswer() highlights/removes highlight for responses that are clicked/selected
function toggleAnswer(e) {
    e.target.classList.toggle("selected");
}
//hasPhrase() searches input for inclusion of a particular phrase
function hasPhrase(input, phrase) {  
    return `${normalize(input)}`.includes(`${normalize(phrase)}`);
}

let currentQuestionIndex = 0; //initiates variable that will track what question the user is on 
let score = 0;  //initiates variable to track score (increases only for correct answers)

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
    let currentQuestion = questions[currentQuestionIndex];  //the current question is stored to currentQuestion variable
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;  //replaces content in html of id="question" with the current question and its answers

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");  //each answer option is made clickable and stored to button variable
        button.innerText = answer.text;  //each button is given the specified text
        if (answer.correct){ //if the answer is correct,a data-correct attribute is set 
            button.dataset.correct = answer.correct;
        }
        //identifies the question type and determines to use toggleAnswer() for multiselect questions and selectAnswer() for others
        button.addEventListener("click", currentQuestion.type==="multi" ? toggleAnswer : selectAnswer);  
        answerButtons.appendChild(button);
    });
    if (currentQuestion.type==="multi") showMultiSubmit();
}

function showOpenResponse(openResponse) {  //displays the subquestion
    const openRespoBox = document.createElement("div");
    openRespoBox.id = "openresponse";

    const label = document.createElement("label");
    label.htmlFor = "openresponse-input";
    label.innerText = openResponse.prompt;

    const input = document.createElement("input");
    input.type = "text";
    input.id = "openresponse-input";
    input.autocomplete = "off";

    const submit = document.createElement("button");
    submit.innerText = "Submit";
    submit.id = "openresponse-submit";

    //initializes ffedback variable to be used to provide the explanation of the correct answer
    const feedback = document.createElement("p"); 

    // this function checks the user input
    function checkResponse() {  
        const userResponse = normalize(input.value);
        if (!userResponse) return;

        const accept = openResponse.acceptedAnswers.some(b => hasPhrase(userResponse, b)); //checks that the user input includes the correct answer
        feedback.innerText = accept
            ? `Correct! ${openResponse.explanation}`  //displays if the response is right
            : `Not quite. ${openResponse.explanation}`;  //displays if the response iwrong/the sought for phrase is undetected
        
            input.disabled=true;  //option to provide input is removed
            submit.disabled=true;  //the submit button is no longer visible or clickable
            nextButton.classList.remove("hide");
    }

    submit.addEventListener("click", checkResponse);  //clicking the submit button triggers the checkResponse() function

    //enables chexkResponse() to be triggered by cliking the "Enter" key
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") checkResponse();
    });


    openRespoBox.append(label, input, submit, feedback);  //a box contains the label, button, input, feedback to easily remove all elements as needed
    document.getElementById("quiz").appendChild(openRespoBox);  //the box is added to the "quiz" class in the html doc
    input.focus();
}

function showMultiSubmit() {//shows the submit button for questions with multi-select answer functions
    const submit = document.createElement("button"); //submit button created for multi-select questions
    submit.id = "multi-submit";
    submit.innerText = "Submit";
    submit.addEventListener("click", checkMulti);  //enables clicking the submit button
    document.getElementById("quiz").appendChild(submit);  //button is added to "quiz" class in html doc

    function checkMulti() { //checks questions w/ multi-select
        const buttons = Array.from(answerButtons.children);
        if (!buttons.some(b => b.classList.contains("selected"))) return;  //no answers are chosen yet
        let allRight = true;  //initiates allRight variable to check if user selects all/only correct answers
        buttons.forEach(button => {
            const picked = button.classList.contains("selected");
            const correct = button.dataset.correct === "true";

            if (picked !== correct) allRight = false; //if a correct option is missed or a wrong option is chosen

            if (correct) button.classList.add("correct");
            else if (picked) button.classList.add("incorrect");

            button.disabled = true;  //button no longer visible or clickable
        });

        if (allRight) score++;  //if the multiselect question is answered correctly, the score is increased by 1 point
        document.getElementById("multi-submit").remove();
        nextButton.classList.remove("hide");
    }
}

function resetState(){
    nextButton.classList.add("hide");

    // (for following 2 lines)  added to clear subQuestion (box: input, question, and explanation) between questions
    const oldResponse = document.getElementById("openresponse");
    if (oldResponse) oldResponse.remove();

    // (for following 2 lines)  clears the submit button for multiselect questions
    const oldSubmit = document.getElementById("multi-submit");
    if (oldSubmit) oldSubmit.remove();

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

    //nextButton.classList.remove("hide");//

    const openResponse = questions[currentQuestionIndex].openResponse;  //the current question's openResponse property, if applicable, is stored to openResponse variable
    if (isCorrect && openResponse) {  //verifies if the uuser selected the correct answer and the question has an openResponse property
        showOpenResponse(openResponse);   //calls the showOpenResponse() function
    }
    else {
        nextButton.classList.remove("hide");  //if either condition is not met, the next button is displayed instead
    }
}

//determines when to show the next button vs the score 
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

//displays user's score
function showScore() {
    resetState();
    questionElement.innerText = `Your Score is ${score}/${questions.length}`;
    nextButton.innerText = "Try Again"; //the text of the next button is changed to say "Try Again"
            //feature option: ask 'Try Again?' if user clicks 'no'-ending message, if user clicks 'yes'-positive message and restart
    nextButton.classList.remove("hide");  //next button, now "try again", is displayed 
    nextButton.onclick = () => location.reload();  //reloads the page if the "Try Again" button is clicked
}

startQuiz();

// END of code section for self-assessment/quiz //
