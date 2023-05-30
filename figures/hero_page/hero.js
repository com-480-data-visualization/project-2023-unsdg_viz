var windowHeight = window.innerHeight;

window.addEventListener('scroll', function () {
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
console.log(scrollTop)
var L1 = document.getElementById('L1');
L1.style.top = (scrollTop) + 'px';

var Lcloud = document.getElementById('Lcloud');
Lcloud.style.top = (scrollTop) + 'px';

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

var content = document.getElementById('content');
// console.log('heihgt', L1.offsetHeight, L6.offsetHeight)

if (bottom <= windowHeight) {
    console.log('change')
    L1.style.top = 0;
    L2.style.top = 0;
    L3.style.top = 0;
    L4.style.top = 0;
    L5.style.top = 0;
    Lcloud.style.top = 0;
    title.style.opacity = 0;
    L6.style.opacity = 0;

}
else {
    L1.style.top = (scrollTop) + 'px';
    L2.style.top = 200 + (scrollTop / 1.2) + 'px';
    L3.style.top = (130 + (scrollTop) / 1.5) + 'px';
    L4.style.top = (350 + (scrollTop) / 2) + 'px';
    L5.style.top = (450 + (scrollTop) / 3) + 'px';
    Lcloud.style.top = (scrollTop) + 'px';
    title.style.opacity = windowHeight;
    L6.style.opacity = 1;
}

});