var curX = 0;
var curY = 0;
var tgX = 0;
var tgY = 0;
document.addEventListener('DOMContentLoaded', function () {
    var interBubble = document.querySelector('.interactive');
    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = "translate(".concat(Math.round(curX), "px, ").concat(Math.round(curY), "px)");
        requestAnimationFrame(function () {
            move();
        });
    }
    window.addEventListener('mousemove', function (event) {
        tgX = event.clientX;
        tgY = event.clientY;
    });
    move();
});
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            entry.target.classList.remove('show');
        }
    });
});
var hiddenElement = document.querySelectorAll('.hidden');
hiddenElement.forEach(function (e1) { return observer.observe(e1); });
