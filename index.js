import { catsData } from '/data.js';
const emotionRadios = document.querySelector('#emotion-radios');
const getImageBtn = document.querySelector('#get-image-btn'); 

emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener('click', getMatchingCatsArray);

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')){
        const checkedRadio = document.querySelector('input[type="radio"]:checked').value;
    }
}

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio');
    for (let radio of radios){
        radio.classList.remove('highlight');
    }
    e.target.parentElement.classList.add('highlight');
}

function getEmotionsArray(cats){
    const emotionsArray = [];
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats){
    let radioItems = "";
    const emotions = getEmotionsArray(cats);
    for (let emotion of emotions){
        radioItems += `<div class="radio">
                            <label for=${emotion}>${emotion}</label>
                            <input class="radio"
                                type="radio" 
                                id="${emotion}" 
                                value="${emotion}" 
                                name="chosen-emotion">
                        </div>`;
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);

