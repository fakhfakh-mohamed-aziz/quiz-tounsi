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
        question: "When did the television series 'Choufli Hal' first air",
        options : ["2000", "2005", "2009", "2011"],
        answer:"2005",
        explaination: "Choufli Hal (find me a solution) is the absolute pinaccle of Tunisian comedy. Aired between 2005 and 2009, the sitcom revolves around 'Sbouii', a childish but well-meaning young man whose clumsiness drives his brother 'Slimene' crazy."
    },
    {
        question: "Hannibal Barca was a vaillant general of the Carthaginian Empire, as he took reigns of the army after his dad whose name was:",
        options : ["Hasdrubal Barca", "Haspar Barca", "Hamilcar Barca", "Trick question, his father wasn't in the military"],
        answer:"Hamilcar Barca",
        explaination: "While Hannibal is remembered for his great accomplishments including the crossing of the Alps, his father Hamilcar commanded the Carthaginian land forces in Sicily from 247 BC to 241 BC, during the latter stages of the First Punic War. He kept his army intact and led a successful guerrilla war against the Romans in Sicily. Hamilcar's experience helped shaping the warrior his son became."
    },
    {
        question: "Tawhida ben Cheikh was the first modern Arab and African woman to become a",
        options : ["Minister", "Pilot", "Olympian medalist", "Doctor"],
        answer:"Doctor",
        explaination: "After recieving her degree in medicine in 1936, Tawhida ben Cheikh became the first modern Arab and African woman to become a physician. She was also a pioneer in women's medicine, in particular contraception and abortion access. She founded the Society for Social Aid, the Orphanage Welcome and Women's Welcome, as she was notorious for her civil society engagement, especially for women and children's health and education."
    },
    {
        question: "Who wrote the daring verse: 'If people, one day, will to live, Destiny must surely comply', challenging colonization and passive fatalism?",
        options : ["Mustafa Khraief", "Tahar Haddad", "Ali Douagi", "Abou El Kacem El Chebbi"],
        answer:"Abou El Kacem El Chebbi",
        explaination: "This iconic line opens the poem 'Iradat Al-Hayat' (The Will to Live), written in 1934 by Tunisian poet Abou El Kacem Chebbi as a call for freedom, because while those who criticized colonization at that time were seen as non-believers of God's fate, he dared putting Tunisia's destiny in its people's hands."
    },
    {
        question: "Who was the iconic Tunisian singer often hailed as the 'Lady of Arabic Song' in North Africa?",
        options : ["Saliha", "Oum Kalthoum", "Chafia Skhiri", "Habiba msika"],
        answer:"Saliha",
        explaination: "Also known as 'Kawkab El Sharq El Tounisia' (The Star of the East of Tunisia), Saliha was legendary for her deep, haunting voice and her core role in preserving the heritage of La Rachidia."
    },
    {
        question: "Which major milestone on October 15, 1963, marked the complete removal of the last remaining French military presence from Tunisian territory?",
        options: ["The Evacuation of Bizerte", "The Battle of Remada", "The Liberation of Sfax", "The Independence Accord"],
        answer:"The Evacuation of Bizerte",
        explaination: "After intense diplomatic pressure and the tragic 1961 Bizerte Crisis, the final French naval troops departed the strategic military base of Bizerte on October 15, 1963. Tunisia commemorates this achievement every year as 'Evacuation Day' (Eid al-Jala')."
    }
]

let questions = thequestions

body.style.backgroundImage = `url(../background/${Math.ceil(Math.random()*21)}.jpg)` //to be changed if the number of bg images changes
//bg images have to be jpg or the code would change
body.style.minHeight='100vh'

const numquestions = questions.length

const trueanswer = ["You got it!", "That's right!", "7low yesser (Very good)!",
    "Waywa (impressive)!", "Too easy?", "incredible!"]
const falseanswer = ["Maybe next time", "Noooo ;(", "Wrong!",
    "Ti le 3ad sehla hedhi (Come on)", "Li ba3dou nchalah (The next one I hope)"]

startbtn.addEventListener("click", start_quiz)
nextQuestionbtn.addEventListener("click", loadquestion)
submitbtn.addEventListener("click", verification)

let muted = false
backgroundSound.play()
mutebtn.addEventListener('click', ()=>{
    if (!muted) {
        backgroundSound.pause()
        muteAnimation.playSegments([127,180], true)
        muted = true
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
        
        let checkedOption = document.querySelector('input[name="option"]:checked')
        let selected = checkedOption.value

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

            rightSound.play()

            quiz_container.style.transform = "scale(1.1)"
            document.body.style.minHeight='100vh'
            document.body.style.transition='box-shadow 0.5s ease'
            document.body.style.boxShadow='inset 0 0 0 100vmax rgba(1, 179, 13, 0.55)'

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

            wrongSound.play()
            
            quiz_container.classList.add('shake')
            document.body.style.minHeight='100vh'
            document.body.style.transition='box-shadow 0.5s ease'
            document.body.style.boxShadow='inset 0 0 0 100vmax rgba(179, 1, 1, 0.55)'
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
        answer_result.textContent = "Flawless!"
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
        answer_result.textContent = "Incredible!"
        comment.textContent = `"The only way to not score any points in a Quizz Tounsi (c) is to know all the answers of the Quizz Tounsi (c)" 
               -Miles Morales' teacher or something`

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
        answer_result.textContent = "Not bad!"
        comment.textContent = "You have decent Tunisia knowledge."
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
        answer_result.textContent = "Well that's unfortunate"
        comment.textContent = "Bad day at the office, eh?"
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