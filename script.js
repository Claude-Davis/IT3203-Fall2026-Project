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
const nextButton = document.getElementById("next0")
