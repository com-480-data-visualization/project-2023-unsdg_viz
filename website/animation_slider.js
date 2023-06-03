/* ### CONST VALUES ### */

// paths to icons
const pauseIcon = 'resources/pause-cropped.svg';
const playIcon = 'resources/play.svg';


/* ### VARIABLES ### */

let currentIcon;
let btn;
let btnImg;
let txt;
let slider;
let startYear;
let endYear;
let running;
let interval;
let callback;

// give access to current animation value
export let currentYear;


/* ### ELEMENT INIT ### */
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

    // register callback on button
    btn.onclick = function() {
        switchIcon();
        toggleAnimation();
    }

    txt = text;
    txt.text('Year ' + currentYear)

    // set initial values for slider
    slider = animSlider;
    slider.value = currentYear;
    slider.oninput = function() {
        currentYear = this.value;
        text.text('Year ' + currentYear);
        callback(currentYear);
    }
}


/* ### CALLBACKS ### */

/* switch between pause and play icons */
function switchIcon() {
    currentIcon = currentIcon === playIcon ? pauseIcon : playIcon;
    btnImg.src = currentIcon;
}

/* start or stop animation */
function toggleAnimation() {

    if (running) {
        // if running, stop it
        clearInterval(interval);
        running = false;
    } else {
        // else start it
        running = true;
        interval = setInterval(() => {
            if (currentYear <= endYear) {
                // if end year not reached, use callback with new value
               callback(currentYear);
               txt.text('Year ' + currentYear);
               slider.value = currentYear;
               // update current value
               currentYear++;
            } else {
                // else stop the animation
               clearInterval(interval);
               running = false;
               switchIcon();
            }
         }, 1000);
    }
}
