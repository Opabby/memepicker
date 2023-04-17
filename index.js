import { catsData } from '/data.js';
const emotionRadios = document.querySelector('#emotion-radios');
const getImageBtn = document.querySelector('#get-image-btn'); 
const gifsOnlyOption = document.querySelector('#gifs-only-option');
const memeModalInner = document.querySelector('#meme-modal-inner');
const memeModal = document.querySelector('#meme-modal');
const closeBtn = document.querySelector('#meme-modal-close-btn');

emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat);
closeBtn.addEventListener('click', function(){
    memeModal.style.display = 'none';
})

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')){
        const isGif = gifsOnlyOption.checked;
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        const matchingCatsArray = catsData.filter(function(cat){
            if (isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
            } else{
                return cat.emotionTags.includes(selectedEmotion);
            }
        })
        return matchingCatsArray;
    }
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();
    if(catsArray.length === 1){
        return catsArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}

function renderCat() {
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `<img
                                class="cat-img"
                                src="./images/${catObject.image}"
                                alt="${catObject.alt}"
                                >`;
    memeModal.style.display = 'flex';

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

