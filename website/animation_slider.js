const pauseIcon = 'resources/pause-cropped.svg';
const playIcon = 'resources/play.svg';

let currentIcon;
let btn;
let btnImg;
let txt;
let slider;
let startYear;
let endYear;
export let currentYear;
let running;
let interval;
let callback;

function switchIcon() {
    currentIcon = currentIcon === playIcon ? pauseIcon : playIcon;
    btnImg.src = currentIcon;
}

function toggleAnimation() {
    if (running) {
        clearInterval(interval);
        running = false;
    } else {
        running = true;
        interval = setInterval(() => {
            if (currentYear <= endYear) {
               callback(currentYear);
               txt.text('Year ' + currentYear);
               slider.value = currentYear;
               currentYear++;
            } else {
               clearInterval(interval);
               running = false;
               switchIcon();
            }
         }, 1000);
    }
}

export const setupAnimationSlider = function(button, buttonImage, text, animSlider,
        firstYear, lastYear, animCallback) {

    currentIcon = playIcon;
    startYear = firstYear;
    endYear = lastYear;
    currentYear = startYear;
    callback = animCallback;
    running = false;

    btn = button;
    btnImg = buttonImage;
    btnImg.src = currentIcon;
    btn.onclick = function() {
        switchIcon();
        toggleAnimation();
    }

    txt = text;
    txt.text('Year ' + currentYear)

    slider = animSlider;
    slider.value = currentYear;
    slider.oninput = function() {
        currentYear = this.value;
        text.text('Year ' + currentYear);
        callback(currentYear);
    }
}
