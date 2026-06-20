const playbtn = document.getElementById("play")
const easybtn = document.getElementById("easybtn")
let levelscontainer = document.getElementById("level_container")
let levels = document.getElementById("levels")


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