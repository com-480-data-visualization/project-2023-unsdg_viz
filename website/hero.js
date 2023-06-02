document.addEventListener("DOMContentLoaded", function () {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
    var windowHeight = window.innerHeight;
    var L1 = document.getElementById('L1');
    var L2 = document.getElementById('L2');
    var L3 = document.getElementById('L3');
    var L4 = document.getElementById('L4');
    var L5 = document.getElementById('L5');
    var L6 = document.getElementById('L6');
    var title = document.getElementById('title');
    var L7 = document.getElementById('L7');

    const rect = L6.getBoundingClientRect();
    const bottom = rect.bottom;

    L7.style.top = (bottom-10) + 'px';

    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log('scroll', scrollTop)
    });

    window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    L2.style.top = 200 + (scrollTop / 1.2) + 'px';
    L3.style.top = (130 + (scrollTop) / 1.5) + 'px';
    L4.style.top = (350 + (scrollTop) / 2) + 'px';
    L5.style.top = (450 + (scrollTop) / 3) + 'px';
    
    var rect_7 = L7.getBoundingClientRect();
    var bottom_7 = rect_7.bottom;
    console.log('check', bottom_7, windowHeight)

    if (bottom_7 <= windowHeight) {
        console.log('now')
        title.style.opacity = 0;
        L1.style.position = 'absolute';
        L2.style.top = 0;
        L3.style.top = 0;
        L4.style.top = 0;
        L5.style.top = 0;
        
        setTimeout(() => {
            title.style.zIndex = '0';
        }, 1000);
        }
    else {
        L1.style.position = 'fixed';
        L2.style.top = 200 + (scrollTop / 1.2) + 'px';
        L3.style.top = (130 + (scrollTop) / 1.5) + 'px';
        L4.style.top = (350 + (scrollTop) / 2) + 'px';
        L5.style.top = (450 + (scrollTop) / 3) + 'px';
        Lcloud.style.top = (scrollTop) + 'px';
        title.style.opacity = 1;
        title.style.zIndex = 8;
    }

    // var rect_7 = L7.getBoundingClientRect();
    // var bottom_7 = rect_7.bottom;
    

    });
});