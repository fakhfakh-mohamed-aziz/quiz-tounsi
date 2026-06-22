const startbtn = document.getElementById("startbtn")
const restartbtn = document.getElementById("restartbtn")
const submitbtn = document.getElementById("submitbtn")
const nextQuestionbtn = document.getElementById("nextQuestionbtn")

const quiz_container = document.getElementById("quiz_container")
const options_container = document.getElementById("options_container")
const question = document.getElementById("question")
const quiz_form = document.getElementById("quiz_form")

const answer_result = document.getElementById("answer_result")
const score_update = document.getElementById("score_update")
const comment = document.getElementById("comment")
const explainationParagraph = document.getElementById("explainationParagraph")

let questionCount = 0
let currentQuestion
let score = 0

const questions = [
    {
        question: "Tunis is the capital of Tunisia. Sfax is:",
        options : ["the most visited place in tunisia", "The capital of the south", "The furthest city from Tunis", "Has the most islamic culture heritage"],
        answer:"The capital of the south",
        explaination: "Eventhough it is not really in the south, it is called the capital of the south for its " //to complete
    },
    {
        question: "1+1=:",
        options : ["1", "3", "yes", "1789"],
        answer:"yes",
        explaination: "PiewPiew " //to complete
    },
    {
        question: "2+2=:",
        options : ["15", "3", "yes", "1789"],
        answer:"yes",
        explaination: "PiewPiew " //to complete
    }
]

const trueanswer = ["You got it!", "That's right!", "7low yesser (Very good)!", "Waywa (impressive)!", "Too easy?"]
const falseanswer = ["Maybe next time", "Noooo ;(", "Wrong!", "Ti le 3ad sehla hedhi (next time)", "..."]

startbtn.addEventListener("click", start_quiz)
restartbtn.addEventListener("click", restart_quiz)
nextQuestionbtn.addEventListener("click", loadquestion)



function start_quiz(){
    startbtn.style.display="none"
    submitbtn.style.display="block"
    nextQuestionbtn.style.display='none'
    setTimeout(() =>{
        loadquestion() // condition to be added
        quiz_container.style.display="block"
    }, 1000)
}

function restart_quiz(){
    restartbtn.style.display="none"
    submitbtn.style.display="block"
    nextQuestionbtn.style.display='none'

}

function loadquestion(){
    nextQuestionbtn.style.display='none'
    submitbtn.style.display="block"

    options_container.innerHTML = ""
    answer_result.textContent = ""
    score_update.textContent = ``
    comment.textContent = ""
    explainationParagraph.textContent = ""

    questionCount++
    let currentQuestionIndex = Math.floor(Math.random()*questions.length)
    currentQuestion = questions[currentQuestionIndex]
    question.textContent = currentQuestion.question

    currentQuestion.options.forEach((option, index) => {
        const option_div = document.createElement('div')
        option_div.innerHTML = `
            <input type="radio" id="option_${index}" value="${option}" name="option"\>
            <label>${option}</label> 
        `
        options_container.appendChild(option_div)
    })
    submitbtn.addEventListener("click", verification)

    questions.splice(currentQuestionIndex, 1)
}

function verification(){
    const selected = document.querySelector('input[name="option"]:checked').value
    submitbtn.style.display='none'
    nextQuestionbtn.style.display='block'

    if (selected === currentQuestion.answer){
        score++
        answer_result.textContent = trueanswer[Math.floor(Math.random()*trueanswer.length)]
        score_update.textContent = `Your score is now : ${score} out of ${questionCount}`
        // make comments
        explainationParagraph.textContent = currentQuestion.explaination
    }
    else{
        answer_result.textContent = falseanswer[Math.floor(Math.random()*trueanswer.length)]
        score_update.textContent = `Your score is still : ${score} out of ${questionCount}`
        //make comments
        explainationParagraph.textContent = currentQuestion.explaination
    }

}