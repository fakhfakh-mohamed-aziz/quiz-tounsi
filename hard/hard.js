const startbtn = document.getElementById("startbtn")
const submitbtn = document.getElementById("submitbtn")
const nextQuestionbtn = document.getElementById("nextQuestionbtn")
const finishbtn = document.getElementById("finishbtn")
const quitbtn = document.getElementById("quitbtn")
const mutebtn = document.getElementById("mutebtn")

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

const stars = document.getElementsByClassName("stars")
const star1 = document.getElementById("star1")
const star2 = document.getElementById("star2")
const star3 = document.getElementById("star3")
const no_star1 = document.getElementById("no_star1")
const no_star2 = document.getElementById("no_star2")
const no_star3 = document.getElementById("no_star3")

let backgroundSound = new Audio ("../sounds/background.mp3")
let almousi9arSound = new Audio ("../sounds/almousi9ar.mp3")

let star1Sound = new Audio("../sounds/star1.mp3")
let star2Sound = new Audio("../sounds/star2.mp3")
let star3Sound = new Audio("../sounds/star3.mp3")
let kickSound = new Audio("../sounds/denied.mp3")


let questionCount = 0
let currentQuestion
let score = 0
let truestreak = 0
let falsestreak = 0

let selectSound = new Audio("../sounds/select.mp3")
let clickSound = new Audio("../sounds/clicksound.mp3")
let rightSound = new Audio("../sounds/rightanswercalm.mp3")
let wrongSound = new Audio("../sounds/false.mp3")

const body = document.getElementById('body')

const muteAnimation = lottie.loadAnimation({
    container:mutebtn,
    renderer:'svg',
    loop:false,
    autoplay:false,
    initialSegment:[80,80],
    path:"../soundAnimation.json"
})

const thequestions = [
    {
        question: "Which Tunisian scientist won the Nobel Prize in Chemistry",
        options : ["Moungi Bawendi", "Semia Gharbi", "Shukri Mabkhout", "Habiba Zahi Boumdan"],
        answer:"Moungi Bawendi",
        explaination: "Moungi Bawendi won the 2023 Nobel Prize in Chemistry alongside Louis Brus and Alexei Ekimov for discovering and synthesizing quantum dots—tiny nanoparticles whose unique colors and optical properties are governed by quantum mechanics."
    },
    {
        question: "Which Tunisian artist played in the 2015 Nobel Peace Prize concert?",
        options : ["Saber Rebai", "Ghalia Ben Ali", "Emel Mathlouthi", "Lotfi Bouchnak"],
        answer:"Emel Mathlouthi",
        explaination: "Alongside artists like Kygo, Jason Derulo and Aurora, Emel Mathlouthi was present in the prestigious event and sang 'Kelmti Horra' (My word is free), considered the unofficial anthem of the Tunisian revolution and the arab spring, as she performed it directly to crowds on the Habib Bourguiba Avenue during riots."
    },
    {
        question: "Which artist never performed in Tunisia?",
        options: ["Michael Jackson", "Stromae", "One Republic", "The Beatles"],
        answer:"The Beatles",
        explaination:"Michael Jackson: El Menzah Olympic Stadium, 1996 - Stromae: International Festival of Carthage, 2014 - One Republic, International Festival of Carthage, 2013. The beatles did come to Tunisia but for a simple vacation."
    },
    {
        question: "Mohamed Gammoudi made history in 1968 by being the first tunisian gold medalist. In which discipline was that?",
        options : ["800m", "1500m", "5000m", "10000m"],
        answer:"5000m",
        explaination: "At the 1968 Summer Olympics in Mexico City, Mohamed Gammoudi won Tunisia's first-ever Olympic gold medal in the 5000 meters with a time of 14:05.0. He also claimed a bronze medal in the 10,000 meters during the same Games."
    },
    {
        question: "What is the name origin of the city of Nabeul?",
        options : ["From a Tunisian icon", "From a battle in the northern part of tunisia", "From a greek word", "From the Roman general who won a battle there"],
        answer:"From a greek word",
        explaination: "The greek word Neapolis which means the new city. The name was eventually arabized into Nabeul. It has the same name origins of cities like Napoli in Italy and Nabulus in Palestine." 
    },
    {
        question: "During the roman empire, what was the name of the tunisian peninsula?",
        options : ["Carthage", "Tunus", "Africa", "Punica"],
        answer:"Africa",
        explaination: "The Romans designated the territory of defeated Carthage as the province of 'Africa'. The entire continent was eventually named after this region." 
    },
    {
        question: "When did Carthage fall?",
        options : ["142 B.C.", "164 B.C.", "124 A.D", "1956"],
        answer:"142 B.C.",
        explaination: "The Third Punic War ended in 142 B.C. after a 3-year siege held by the general Scipio, marking the fall of the great empire of Carthage. The cities were destroyed and a large portion of the surviving population was enslaved, a sad ending to the epic battles between Carthage and Rome" 
    }
    
]

let questions = thequestions

body.style.backgroundImage = `url(../background/${Math.ceil(Math.random()*17)}.jpg)` //to be changed if the number of bg images changes
//bg images have to be jpg or the code would change
body.style.minHeight='100vh'

const numquestions = questions.length

const trueanswer = ["You got it!", "That's right!", "7low yesser (Very good)!",
    "Waywa (impressive)!", "Too easy?", "incredible!", "Not too hard for you huh?"]
const falseanswer = ["Maybe next time", "Noooo ;(", "Wrong!",
    "Ti le 3ad sehla hedhi (Come on)", "Li ba3dou nchalah (The next one I hope)",
     "That's why it's a hard level", "Can't complain if you chose a hard level!",
    "Good guess"]

startbtn.addEventListener("click", start_quiz)
nextQuestionbtn.addEventListener("click", loadquestion)
submitbtn.addEventListener("click", verification)

let muted = false
backgroundSound.play()
mutebtn.addEventListener('click', ()=>{
    if (!muted) {
        backgroundSound.pause()
        muteAnimation.playSegments([127,180], true)
        muted=true
    } else {
        backgroundSound.play()
        muteAnimation.playSegments([0,90],true)
        muted=false
    }
})


function start_quiz(){
    if (questions.length===0) {
        questions = [...thequestions]
    }

    clickSound.play()

    star1.style.display='none'
    star2.style.display='none'
    star3.style.display='none'
    no_star1.style.display='none'
    no_star2.style.display='none'
    no_star3.style.display='none'
    
    quiz_container.offsetHeight

    startbtn.style.display="none"
    quitbtn.style.display="none"
    quitbtn.style.marginLeft = "15%"
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

function loadquestion(){
    nextQuestionbtn.style.display='none'
    
    question.textContent = ""
    options_container.innerHTML = ""
    answer_result.textContent = ""
    score_update.textContent = ``
    comment.textContent = ""
    explainationParagraph.textContent = ""

    body.style.backgroundImage = `url(../background/${Math.ceil(Math.random()*21)}.jpg)` //to be changed if the number of bg images changes

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

            quiz_container.style.transform = "scale(1.1)"
            document.body.style.minHeight='100vh'
            document.body.style.transition='box-shadow 0.5s ease'
            document.body.style.boxShadow='inset 0 0 0 100vmax rgba(1, 179, 13, 0.55)'

            rightSound.play()

            setTimeout(() => {
                document.body.style.boxShadow=''
                quiz_container.style.transform='scale(1)'
            },500)

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
            document.body.style.transition='box-shadow 0.5s ease'
            document.body.style.boxShadow='inset 0 0 0 100vmax rgba(179, 1, 1, 0.55)'

            wrongSound.play()

            setTimeout(() => {
                quiz_container.classList.remove('shake')
                document.body.style.boxShadow=''
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
    finishbtn.style.display = "none"
    quitbtn.style.display = "block"
    quitbtn.style.marginLeft = "15%"

    quiz_container.style.marginRight = '5%'

    question.textContent = ""
    options_container.innerHTML = ""
    answer_result.textContent = ""
    score_update.textContent = ``
    comment.textContent = ""
    explainationParagraph.textContent = ""

    if (score === numquestions){
        answer_result.textContent = "We have right here a Tunisian expert! I think you're ready for the imposible level..."
        comment.textContent = "Your answers were impeccable! You deserve 3 stars!"

        star1.style.display = "block"
        no_star2.style.display = "block"
        no_star3.style.display = "block"
        star1.classList.add("rotating")
        star1Sound.play()

        setTimeout(() => {
            no_star2.style.display = "none"
            star2.style.display = "block"
            star2.classList.add("rotating")
            star2Sound.play()
        }, 1000);

        setTimeout(() => {
            no_star3.style.display = "none"
            star3.style.display = "block"
            star3.classList.add("rotating")
            star3Sound.play()
        }, 2000);

        setTimeout(() => {
            star1.classList.remove("rotating")
            star2.classList.remove("rotating")
            star3.classList.remove("rotating")
        }, 4000)

    }

    else if (score === 0){
        answer_result.textContent = "Well... Is it that hard?"
        comment.textContent = `I know it is hard but not a single answer?`

        no_star1.style.display = "block"
        no_star2.style.display = "block"
        no_star3.style.display = "block"

        no_star1.classList.add("starshake")
        no_star2.classList.add("starshake")
        no_star3.classList.add("starshake")
        kickSound.play()

        setTimeout(() => {
            no_star1.classList.remove("starshake")
            no_star2.classList.remove("starshake")
            no_star3.classList.remove("starshake")
        }, 500);

    }

    else if (score/numquestions > 0.5){
        answer_result.textContent = "You deserve a Tunisian citizenship!"
        comment.textContent = "Brilliant! "
        star1.style.display = "block"
        no_star2.style.display = "block"
        no_star3.style.display = "block"

        star1.classList.add("rotating")
        star1Sound.play()

        setTimeout(() => {
            no_star2.style.display = "none"
            star2.style.display = "block"
            star2Sound.play()
            star2.classList.add("rotating")
        }, 1000);

        setTimeout(() => {
            no_star3.classList.add('starshake')
            kickSound.play()
            star1.classList.remove("rotating")
        }, 3000);

        setTimeout(() => {
            star2.classList.remove("rotating")
            no_star3.classList.remove("starshake")
        }, 3500);

    }

    else{
        answer_result.textContent = "Yeah fair enough it is called hard after all."
        comment.textContent = "At least now you have a rich tunisian knowledge!"
        star1.style.display = "block"
        no_star2.style.display = "block"
        no_star3.style.display = "block"

        star1.classList.add("rotating")
        star1Sound.play()

        setTimeout(() => {
            no_star2.classList.add('starshake')
            no_star3.classList.add('starshake')
            kickSound.play()
        }, 2000);

        setTimeout(() => {
            star1.classList.remove("rotating")
            no_star2.classList.remove("starshake")
            no_star3.classList.remove("starshake")
        }, 2500);


    }

    [star1, star2, star3].forEach((star) =>{
        star.addEventListener("mouseenter", () => {
            if (star.classList.contains("rotating")) {
                return
            }
            star.classList.add("rotating")
            setTimeout(() => {
                star.classList.remove("rotating")
            }, 2000);
        })
    })

    [no_star1, no_star2, no_star3].forEach((nostar) =>{
        nostar.addEventListener("mouseenter", () => {
            if (nostar.classList.contains("starshake")) {
                return
            }
            nostar.classList.add("starshake")
            setTimeout(() => {
                nostar.classList.remove("starshake")
            }, 500);
        })
    })   //doesn't work yet but no pb ig

}