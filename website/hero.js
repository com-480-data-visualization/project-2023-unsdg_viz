var windowHeight = window.innerHeight;

window.addEventListener('scroll', function () {
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

var L1 = document.getElementById('L1');

var Lcloud = document.getElementById('Lcloud');


var L2 = document.getElementById('L2');
L2.style.top = 200 + (scrollTop / 1.2) + 'px';

var L3 = document.getElementById('L3');
L3.style.top = (130 + (scrollTop) / 1.5) + 'px';

var L4 = document.getElementById('L4');
L4.style.top = (350 + (scrollTop) / 2) + 'px';

var L5 = document.getElementById('L5');
L5.style.top = (450 + (scrollTop) / 3) + 'px';

var L6 = document.getElementById('L6');
rect = L6.getBoundingClientRect();
const bottom = rect.bottom;

var title = document.getElementById('title');

if (bottom <= windowHeight) {
    L6.style.zIndex = 0;
    title.style.zIndex = 0;
    L1.style.position = 'absolute';
    Lcloud.style.position = 'absolute';
    L2.style.top = 0;
    L3.style.top = 0;
    L4.style.top = 0;
    L5.style.top = 0;
    Lcloud.style.top = 0;
    title.style.opacity = 0;
    L6.style.opacity = 0;

}
else {
    L1.style.position = 'fixed';
    Lcloud.style.position = 'fixed';
    L2.style.top = 200 + (scrollTop / 1.2) + 'px';
    L3.style.top = (130 + (scrollTop) / 1.5) + 'px';
    L4.style.top = (350 + (scrollTop) / 2) + 'px';
    L5.style.top = (450 + (scrollTop) / 3) + 'px';
    Lcloud.style.top = (scrollTop) + 'px';
    title.style.opacity = 1;
    L6.style.opacity = 1;
    L6.style.zIndex = 6;
    title.style.zIndex = 8;
}

});