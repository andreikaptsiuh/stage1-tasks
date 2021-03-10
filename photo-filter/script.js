const html = document.documentElement
const filters = document.querySelector('.filters')
const buttonsContainer = document.querySelector('.btn-container')

filters.addEventListener('input', (event) => filterOn(event.target));

function filterOn(x){
    const suffix = x.dataset.sizing
    document.documentElement.style.setProperty(`--${x.name}`, x.value + suffix)

    x.nextElementSibling.value = x.value
}

buttonsContainer.addEventListener('click', (event) => button(event.target))

function button(x){
    if(x.classList.contains('btn-reset')){
        const inputsFilter = filters.querySelectorAll('input')
        inputsFilter.forEach((elem) => {
            elem.value = elem.getAttribute('value')
            filterOn(elem)
        })
    }
}

document.querySelector('.openfullscreen').addEventListener('click', (event) => html.requestFullscreen())
document.querySelector('.fullscreen').addEventListener('click', (event) => document.webkitCancelFullScreen())
