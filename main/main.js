const playbtn = document.getElementById("play")
const easybtn = document.getElementById("easybtn")
//const easybtn = document.getElementById("easybtn")
//const easybtn = document.getElementById("easybtn")
//const easybtn = document.getElementById("easybtn")
const infobtn = document.getElementById("infobtn")
const returnbtn = document.getElementById("returnbtn")

let levelscontainer = document.getElementById("level_container")
let levels = document.getElementById("levels")


let informations = document.getElementById("informations")
infobtn.addEventListener("click", show_info)
returnbtn.addEventListener("click", hide_info)

levelscontainer.style.display="none"
levels.addEventListener("mouseenter", showlevels);
levels.addEventListener("mouseleave", hidelevels);

function showlevels(){
    levelscontainer.style.display="block"
    levels.style.height="120px"
}
function hidelevels(){
    levelscontainer.style.display="none"
    levels.style.height="30px"
}
function show_info(){
    levels.style.display='none'
    informations.style.display="block"
    infobtn.style.display='none'
}
function hide_info(){
    levels.style.display='block'
    informations.style.display='none'
    infobtn.style.display='block'

}