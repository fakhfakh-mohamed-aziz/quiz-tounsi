const playbtn = document.getElementById("play")
const easybtn = document.getElementById("easybtn")
const mediumbtn = document.getElementById("mediumbtn")
const hardbtn = document.getElementById("hardbtn")
const impossiblebtn = document.getElementById("impossiblebtn")
const infobtn = document.getElementById("infobtn")
const returnbtn = document.getElementById("returnbtn")
const levelbtns = document.getElementsByClassName("levelbtns")
const mutebtn = document.getElementById("mutebtn")

easybtn.style.display='none'
mediumbtn.style.display='none'
hardbtn.style.display='none'
impossiblebtn.style.display='none'

let levelscontainer = document.getElementById("level_container")
let levels = document.getElementById("levels")
let droplevels = false

let backgroundSound = new Audio('../sounds/menu.mp3')
backgroundSound.play()
let levelSound = new Audio('../sounds/select.MP3');
[easybtn,mediumbtn,hardbtn,impossiblebtn].forEach(btn =>{
    btn.addEventListener('mouseenter', ()=>{levelSound.play()})
})

const muteAnimation = lottie.loadAnimation({
    container:mutebtn,
    renderer:'svg',
    loop:false,
    autoplay:false,
    initialSegment:[80,80],
    path:"../soundAnimation.json"
})

let muted = false
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

let informations = document.getElementById("informations")
let logo = document.getElementById('logo')
infobtn.addEventListener("click", show_info)
returnbtn.addEventListener("click", hide_info)

levels.addEventListener("mouseenter", showlevels);
levels.addEventListener("mouseleave", ()=>{
    droplevels=false
    setTimeout(() => {
        hidelevels()
    }, 200);
});


function showlevels(){

    levels.style.height='400px'
    levels.style.width='250px'

    droplevels=true
    
    infobtn.classList.add('slideOut')

    setTimeout(() => {
        infobtn.classList.remove('slideOut')
        infobtn.style.display='none'

        if (droplevels) {

            easybtn.style.display='block'
            easybtn.classList.add('slideIn')

            setTimeout(() => {
                if (droplevels) {

                    mediumbtn.style.display='block'
                    mediumbtn.classList.add('slideIn')

                    setTimeout(() => {
                        if (droplevels) {
                            
                            hardbtn.style.display='block'
                            hardbtn.classList.add('slideIn')

                            setTimeout(() => {
                                if (droplevels) {
                                    
                                    impossiblebtn.style.display='block'
                                    impossiblebtn.classList.add('slideIn')

                                } else {return}
                            }, 200);

                        } else {return}
                    }, 200);

                } else {return}
            }, 200);

        } else {return} 
    }, 200);
    
}

function hidelevels(){

    let currentlevelsloaded = [];
    [easybtn,mediumbtn,hardbtn,impossiblebtn].forEach(btn => {
        if (btn.style.display === 'block'){currentlevelsloaded.push(btn)}
    });

    currentlevelsloaded.reverse()

    let totalAnimationTime = 200 * currentlevelsloaded.length

    currentlevelsloaded.forEach(btn =>{

        let currentIndex = currentlevelsloaded.indexOf(btn)
        let timeBeforeAnimation = 200 * currentIndex

        setTimeout(() => {
            
            if (currentIndex===0){

                btn.classList.add('slideOut')

            }

            else{

                currentlevelsloaded[(currentIndex-1)].style.display='none'
                currentlevelsloaded[(currentIndex-1)].classList.remove('slideOut')
                btn.classList.add('slideOut')

            }

        }, timeBeforeAnimation);
    })

    setTimeout(() => {

        if(currentlevelsloaded.length!==0){
            currentlevelsloaded.at(-1).style.display='none'
            currentlevelsloaded.at(-1).classList.remove('slideOut') 
        }
    
        infobtn.classList.add('slideIn')
        infobtn.style.display='block'
        levels.style.height='60px'
        levels.style.width='160px'

        setTimeout(() => {
            infobtn.classList.remove('slideIn')
            currentlevelsloaded = []
            
        }, 200);

    }, (totalAnimationTime));


}





function show_info(){

    levels.style.height='0px'

    infobtn.classList.add('slideOut')

    setTimeout(() => {
        infobtn.classList.remove('slideOut')
        infobtn.style.display='none'
        playbtn.classList.add('slideOut')
    }, 200);
    
    setTimeout(() => {
        playbtn.classList.remove('slideOut')
        playbtn.style.display='none'
        informations.style.display="block"
        informations.classList.add('slideIn')
    }, 400);
    
    
}

function hide_info(){
    levels.style.height='60px'
    informations.style.display='none'
    infobtn.style.display='block'
    playbtn.style.display='block'
}