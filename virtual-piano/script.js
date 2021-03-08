const html = document.documentElement
const keys = Array.from(document.querySelectorAll('.piano-key'));
const keysAudio = document.querySelectorAll('audio');
const piano = document.querySelector('.piano')

const buttonsContainer = document.querySelector('.btn-container')
const buttons = document.querySelectorAll('.btn')

window.addEventListener('keydown', (event) => playAudioAndKey(event));
window.addEventListener('keyup', (event) => keyUp(event));
piano.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('piano-key')) {
      playAudioAndKey(event.target);
    }   
});
piano.addEventListener('mouseup' && 'mouseout', (event) => {
    if(event.target.classList.contains('piano-key')) {
        keyUp(event.target);
    } 
});

function playAudioAndKey(x){  
    if(typeof x.code == 'string'){ 
        x = keys.find(item => item.getAttribute('data-letter') == x.code[3])
    }
    if(x != undefined){
        for(let click of keysAudio){
            if(click.getAttribute('data-note') == x.getAttribute('data-note')){
                click.currentTime = 0;
                click.play()
            }
        }
        x.classList.add('piano-key-active');
    }
}

function keyUp(x){
    if(typeof x.code == 'string'){ 
        x = keys.find(item => item.getAttribute('data-letter') == x.code[3])
    }
    if(x != undefined){
        x.classList.remove('piano-key-active');
    }  
}

buttonsContainer.addEventListener('click', (event) => notesLettersTransform(event.target))

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
