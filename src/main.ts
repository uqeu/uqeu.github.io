import './style.scss';

let curX : number = 0;
let curY : number = 0;
let tgX : number = 0;
let tgY : number = 0;

document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame( () => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;

    });

    move();
});

const observer =  new IntersectionObserver(entries => {
    entries.forEach(entry => {
            console.log(entry);
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }   else {
                entry.target.classList.remove('show');
            }
    }
    );
});

const hiddenElement = document.querySelectorAll('.hidden');
hiddenElement.forEach((e1) => observer.observe(e1));

