const startbtn = document.getElementById("startbtn")
const restartbtn = document.getElementById("restartbtn")
const submitbtn = document.getElementById("submitbtn")

const quiz_container = document.getElementById("quiz_container")
const options_container = document.getElementById("options_container")
const question = document.getElementById("question")
const quiz_form = document.getElementById("quiz_form")

let score = 0

const questions = [
    {
        question: "",
        option : "",
        answer:""
    }
]

startbtn.addEventListener("click", start_quiz)
restartbtn.addEventListener("click", restart_quiz)




function start_quiz(){
    startbtn.style.display="none"
    submitbtn.style.display="block"

}

function restart_quiz(){
    restartbtn.style.display="none"
    submitbtn.style.display="block"
}

function loadquestion(){
    question.textContent = question[0][0]  //0 loula lezem tetbaddel

}