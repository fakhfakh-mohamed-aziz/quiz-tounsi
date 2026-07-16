const startbtn = document.getElementById("startbtn")
const restartbtn = document.getElementById("restartbtn")
const submitbtn = document.getElementById("submitbtn")
const nextQuestionbtn = document.getElementById("nextQuestionbtn")
const finishbtn = document.getElementById("finishbtn")

const logo = document.getElementById("logo")
const nav = document.getElementById("nav")
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

const body = document.getElementById('body')

const questions = [
    {
        question: "Tunis is the capital of Tunisia. Sfax is:",
        options : ["the most visited place in tunisia", "The capital of the south", "The furthest city from Tunis", "Has the most amazigh culture heritage"],
        answer:"The capital of the south",
        explaination: "Eventhough it is not really in the south, it is called the capital of the south for its " //to complete
    },
    {
        question: "Which movies/series have scenes filmed in Tunisia?",
        options : ["Star Wars", "Fast and Furious", "Alladin", "Harry Potter"],
        answer:"Star Wars",
        explaination: "Some Star Wars scenes have been filmed in the south regions of Tunisia. Fun fact : The planet Tatooine gets its name from the governorate of Tataouine!"
    },
    {
        question: "The Arab Spring started in Tunisia, but on which date did the Tunisian ex-President Zine El Abidine Ben Ali flee the country?",
        options : ["14 January 2011", "11 January 2014", "He didn't actually flee, he was judged and sent to prison", "He didn't actually flee, he was killed by protestors"],
        answer:"14 January 2011",
        explaination: "On the evening of the 14th of January 2014, former president Zine El Abidine Ben Ali went to Saudi Arabia thinking he will stay untill the riots ended, but they never did, and Tunisia formed its own governement."
    },
    {
        question: "What are Zambra and Zambretta?",
        options : ["Two islands off the coast of Nabeul", "Two characters of a mythical story in Tunisian culture", "A saying to express how much two people get along", "A traditionnal dish"],
        answer:"Two islands off the coast of Nabeul",
        explaination: "Two little islands containing each a national park off the Cap Bon peninsula in Nabeul"
    },
    {
        question: "What is the name origin of the city of Nabeul?",
        options : ["From a Tunisian icon", "From a battle in the northern part of tunisia", "From a greek word", "From the Roman general who won a battle there"],
        answer:"From a greek word",
        explaination: "The greek word Neapolis which means the new city. The name was eventually arabized into Nabeul. It has the same name origins of cities like Napoli in Italy and Nabulus in Palestine." 
    },
    {
        question: "What is the Northenmost point in the African continent?",
        options : ["Cap Shleka", "Cap Angela", "Cap Sghaier", "Cap Hrouss"],
        answer:"Cap Angela",
        explaination: "Cap Angela is indeed the northernmost point in africa at 37° above the equator. Oh and the others are made up names lol."
    },
    {
        question: "What city is the most tied to islammic culture?",
        options : ["Soussa", "Kairouan", "Sidi Bou Zid", "Kef"],
        answer:"Kairouan",
        explaination: "" //to complete
    },
    {
        question: "What town is one of the most visited in tunisia?",
        options : ["Sidi Bou Zid", "Sidi Bou Said", "Sidi Ali El Makki", "Sidi Mansour (ya baba)"],
        answer:"Sidi Bou Said",
        explaination: "Known for its cobbled streets and blue-and-white houses, Sidi Bou Said is a charming town on a promontory overlooking the Mediterranean. -Wikipedia"
    },
    {
        question: "Where is located the city of Jendouba?",
        options : ["In the North-west", "In the South-west", "In the North-east", "In the South-east"],
        answer:"In the North-west",
        explaination: "Its known as one of the coldest places in Tunisia, with towns like Ain Drahem, one of the rare places in Tunisia where it occasionally snows"
    }
    
]

body.style.backgroundImage = `url(../background/${Math.ceil(Math.random()*17)}.jpg)` //to be changed if the number of bg images changes
//bg images have to be jpg or the code would change
body.style.minHeight='100vh'

const numquestions = questions.length

const trueanswer = ["You got it!", "That's right!", "7low yesser (Very good)!",
    "Waywa (impressive)!", "Too easy?", "incredible!"]
const falseanswer = ["Maybe next time", "Noooo ;(", "Wrong!",
    "Ti le 3ad sehla hedhi (Come on)", "Li ba3dou nchalah (The next one I hope)"]

startbtn.addEventListener("click", start_quiz)
restartbtn.addEventListener("click", restart_quiz)
nextQuestionbtn.addEventListener("click", loadquestion)
submitbtn.addEventListener("click", verification)



function start_quiz(){
    startbtn.style.display="none"
    submitbtn.style.display="block"
    nextQuestionbtn.style.display='none'
    quiz_container.style.backdropFilter='blur(5px)'

    logo.style.width='240px'
    logo.style.height='135px'
    logo.style.marginLeft='5%'

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

    body.style.backgroundImage = `url(../background/${Math.ceil(Math.random()*17)}.jpg)` //to be changed if the number of bg images changes

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

        questions.splice(currentQuestionIndex, 1)  
    }

}

function verification(){
    if (!document.querySelector('input[name="option"]:checked')){
        alert("Please select an option")
    }
    else{
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

            document.querySelector('input[name="option"]:checked').parentElement.style.color = '#8DB600'
        }
        else{
            truestreak = 0
            falsestreak++
            
            quiz_container.classList.add('shake')
            document.body.style.minHeight='100vh'
            document.body.style.transition='box-shadow 0.5s ease',
            document.body.style.boxShadow='inset 0 0 0 100vmax rgba(179, 1, 1, 0.55)'
            setTimeout(() => {
                quiz_container.classList.remove('shake'),
                document.body.style.boxShadow='' // to change with the actual backgroung color
            },500)

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

            document.querySelector('input[name="option"]:checked').parentElement.style.color = '#f73333'
            document.getElementById('option_'+currentQuestion.options.indexOf(currentQuestion.answer)).parentElement.style.color = '#8DB600'

        }

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