Task = {icon:'',taskCompletionSequence:[]}
Icons = {
    "fa-regular fa-square-full":['true','true','true','true','false','true','true','true','true'],
    "fa-solid fa-plus":['false','true','false','true','true','true','false','true','false'], 
    "fa-solid fa-xmark":['true','false','true','false','true','false','true','false','true'],
    "fa-solid fa-grip-lines-vertical":['true','false','true','true','false','true','true','false','true'],
    "fa-solid fa-chevron-up":['false','true','false','true','false','true','false','false','false'],
    "fa-solid fa-chevron-down":['false','false','false','true','false','true','false','true','false'],
    "fa-solid fa-chevron-left":['false','true','false','true','false','false','false','true','false'],
    "fa-solid fa-chevron-right":['false','true','false','false','false','true','false','true','false'],
}
hasWon = false
let countdownInterval;

function getRandomIcon(){
    AllIcons = []
    for (const key in Icons) {
        AllIcons[AllIcons.length]=key
    }
    return AllIcons[Math.floor(Math.random()*(AllIcons.length))]
}

function CreateTask(){
    let element=document.getElementById('task')
    let icon = getRandomIcon()
    Task={icon:icon,taskCompletionSequence:Icons[icon]}
    element.children[0].setAttribute('class',icon)
   
}

function HideUi(){
    let element2 = document.getElementById('container') 
    element2.setAttribute('class','')
    setTimeout(ClearMinigame,1000)
}

function Win(){
let element=document.getElementsByClassName('btn')
element[0].setAttribute('value','true')
element[0].children[0].children[0].setAttribute('class','fa-solid fa-circle-check')
clearInterval(countdownInterval)
// wincallback
fetch('https://carve-the-shape/endGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ 
        status: true,
        reason:'success'
      })
  })
  setTimeout(HideUi,1000)
}

function ClearMinigame(){
    let elements = document.getElementsByClassName('minigame-field')
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('value','true')
    }
    let element=document.getElementsByClassName('btn')
    element[0].setAttribute('value','false')
element[0].children[0].children[0].setAttribute('class','fa-solid fa-circle-xmark')
hasWon = false  
}

function EndGame(reason){
    // EndCallback
   clearInterval(countdownInterval);
   fetch('https://carve-the-shape/endGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ 
        status: false,
        reason:reason
      })
  })
   HideUi()

}

function HasPlayerCompletedTheTask(){
    let fields = document.getElementsByClassName('minigame-field')
    for (let i = 0; i < 9; i++) {
        if (fields[i].attributes[1].value!=Task.taskCompletionSequence[i]){
            return false
        }
    }
    hasWon= true
    Win()
}


function onFieldButtonClick(element){
    let value = element.attributes[1].value
   if(!hasWon){
    if(value=='false'){
        element.setAttribute('value',true)
    }else{
        element.setAttribute('value',false)
    }
    HasPlayerCompletedTheTask()
   }

}


function startCountdown(duration) {
  

    let timer = duration;
    const countdownElement = document.getElementById('timer-value');

    countdownInterval = setInterval(function () {

        countdownElement.style.width =Math.floor((timer/duration)*100)+'%';

        if ((timer -= 10) < 0) {
            clearInterval(countdownInterval);
            EndGame('fail');
        }
    }, 10);
}

function StartMinigame(time){
    
    CreateTask()
    let element = document.getElementById('container') 
    element.setAttribute('class','show')
    startCountdown(time)
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      EndGame('close');
      clearInterval(countdownInterval);
    }
  });

window.addEventListener('message', function(event) {
    var data = event.data;

    if (data.action === 'open') {
       StartMinigame(data.duration)
    }

});


