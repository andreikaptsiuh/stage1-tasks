const html = document.documentElement
const keys = Array.from(document.querySelectorAll('.piano-key'));
const keysAudio = document.querySelectorAll('audio');
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

const buttonsContainer = document.querySelector('.btn-container')
const buttons = document.querySelectorAll('.btn')

buttonsContainer.addEventListener('click', (event) => notesLettersTransform(event.target))
window.addEventListener('keydown', (event) => {
    if(!event.repeat) playKey(event)  
});
window.addEventListener('keyup', (event) => {
    keyUp(event)
    stopAudio(event.target)
});
piano.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('piano-key')) {
      playKey(event.target);
      playAudio(event.target)
    }   
});
document.querySelector('main').addEventListener('mouseup', (event) => {    
    stopAudio(event.target)
    if(event.target.classList.contains('piano-key')) {
        keyUp(event.target);
    } 
});

function playKey(x){ 
    if(typeof x.code == 'string' && x.code === `Key${x.code[3]}`){ 
        x = keys.find(item => item.getAttribute('data-letter') == x.code[3])
    }
    if(x != undefined){
        playAudio(x)
    }
}

function playAudio(x){
    x = x.target == undefined ? x : x.target
    for(let click of keysAudio){
        x.classList.add('piano-key-active');
        if(click.getAttribute('data-note') == x.getAttribute('data-note')){
            click.currentTime = 0;
            click.play()
        }
    }
    pianoKeys.forEach((elem) =>{
        elem.addEventListener('mouseover', playAudio)
        elem.addEventListener('mouseout', keyUp)
    })
}

function keyUp(x){
    if(typeof x.code == 'string'){ 
        x = keys.find(item => item.getAttribute('data-letter') == x.code[3])
    }
    if(x != undefined){
        x = x.target == undefined ? x : x.target
        x.classList.remove('piano-key-active');
    }  
}

function stopAudio(x){
    pianoKeys.forEach((elem) =>{
        elem.removeEventListener('mouseover', playAudio)
        elem.removeEventListener('mouseout', keyUp)
    })    
}

function notesLettersTransform(x){
    buttons.forEach(item =>{
        if(item.classList.contains('btn-active')){
            item.classList.remove('btn-active')
        }
    })
    x.classList.add('btn-active')
    
    for(let item of buttons){
        if(item.classList.contains('btn-letters') && item.classList.contains('btn-active')){
            keys.forEach(elem => elem.classList.add('letter'))
        } else {keys.forEach(elem => elem.classList.remove('letter'))}
    }
}

document.querySelector('.openfullscreen').addEventListener('click', (event) => html.requestFullscreen())
document.querySelector('.fullscreen').addEventListener('click', (event) => document.webkitCancelFullScreen())
