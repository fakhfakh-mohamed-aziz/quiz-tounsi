const startbtn = document.getElementById("startbtn")
const restartbtn = document.getElementById("restartbtn")
const submitbtn = document.getElementById("submitbtn")
const nextQuestionbtn = document.getElementById("nextQuestionbtn")
const finishbtn = document.getElementById("finishbtn")

const quiz_container = document.getElementById("quiz_container")
const options_container = document.getElementById("options_container")
const question = document.getElementById("question")
const quiz_form = document.getElementById("quiz_form")

const answer_result = document.getElementById("answer_result")
const score_update = document.getElementById("score_update")
const comment = document.getElementById("comment")
const explainationParagraph = document.getElementById("explainationParagraph")

const star1 = document.getElementById("star1")
const star2 = document.getElementById("star2")
const star3 = document.getElementById("star3")
const no_star1 = document.getElementById("no_star1")
const no_star2 = document.getElementById("no_star2")
const no_star3 = document.getElementById("no_star3")


let questionCount = 0
let currentQuestion
let score = 0
let truestreak = 0
let falsestreak = 0

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

const numquestions = questions.length

const trueanswer = ["You got it!", "That's right!", "7low yesser (Very good)!",
    "Waywa (impressive)!", "Too easy?", "incredible!"]
const falseanswer = ["Maybe next time", "Noooo ;(", "Wrong!",
    "Ti le 3ad sehla hedhi (Come on)", "..."]

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
    
    question.textContent = ""
    options_container.innerHTML = ""
    answer_result.textContent = ""
    score_update.textContent = ``
    comment.textContent = ""
    explainationParagraph.textContent = ""

    if (questions.length !== 0){
      
        submitbtn.style.display="block"


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

}

function verification(){
    const selected = document.querySelector('input[name="option"]:checked').value
    submitbtn.style.display='none'
    if (questions.length !== 0){
        nextQuestionbtn.style.display='block'
    }
    else {
        finishbtn.style.display='block'
        finishbtn.addEventListener("click", finishquiz)
    }
    

    if (selected === currentQuestion.answer){
        score++
        truestreak++
        falsestreak = 0

        if (truestreak===3){
            answer_result.textContent = "three in a row!"
        }
        else if (truestreak>3){
            answer_result.textContent = "You are on fire!"
        }
        else {
            answer_result.textContent = trueanswer[Math.floor(Math.random()*trueanswer.length)]
        }
        if (questionCount===1){
            score_update.textContent = "Good start!"
        }
        else{
            score_update.textContent = `Your score is now : ${score} out of ${questionCount}`
        }
        
        // make comments
        explainationParagraph.textContent = currentQuestion.explaination
    }
    else{
        truestreak = 0
        falsestreak++

        if (score===0 & questionCount ===3 ){
            answer_result.textContent = "Still no right answer?"
        }
        else if (falsestreak===3){
            answer_result.textContent = "Come on you can do better"
        }
        else if (falsestreak===4){
            answer_result.textContent = "This the worst streak ever"
        }
        else if (falsestreak>4){
            answer_result.textContent = "I was wrong, this is the worst streak ever"
        }
        else{
            answer_result.textContent = falseanswer[Math.floor(Math.random()*falseanswer.length)]
        }
        
        if (questionCount===1){
            score_update.textContent = "good start!"
        }
        else{
            score_update.textContent = `Your score is still : ${score} out of ${questionCount}`
        }
        //make comments
        explainationParagraph.textContent = currentQuestion.explaination
    }

}

function finishquiz (){
    question.textContent = ""
    finishbtn.style.display = "none"
    question.textContent = ""
    options_container.innerHTML = ""
    answer_result.textContent = ""
    score_update.textContent = ``
    comment.textContent = ""
    explainationParagraph.textContent = ""

    if (score === numquestions){
        answer_result.textContent = "Flawless!"
        comment.textContent = "Your answers were impeccable! You deserve 3 stars!"
        star1.style.display = "block"
        star2.style.display = "block"
        star3.style.display = "block"
    }
    else if (score === 0){
        answer_result.textContent = "Incredible!"
        comment.textContent = `"The only way to not score any points in a Quizz Tounsi (c) is to know all the answers of the Quizz Tounsi (c)" 
               -Miles Morales' teacher or something`
        no_star1.style.display = "block"
        no_star2.style.display = "block"
        no_star3.style.display = "block"
    }
    else if (score/numquestions > 0.5){
        answer_result.textContent = "Not bad!"
        comment.textContent = "Don't wanna sound like your mom, but why didn't you get a full mark?"
        star1.style.display = "block"
        star2.style.display = "block"
        no_star3.style.display = "block"
    }
    else{
        answer_result.textContent = "Well that's unfortunate"
        comment.textContent = "Bad day at the office, eh?"
        star1.style.display = "block"
        no_star2.style.display = "block"
        no_star3.style.display = "block"
    }
}