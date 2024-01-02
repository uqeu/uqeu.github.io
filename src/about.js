const track = document.getElementById("image-track");
const secondaryTrack = document.getElementById("secondary-image-track");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  secondaryTrack.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
  secondaryTrack.dataset.mouseDownAt = "0";  
  secondaryTrack.dataset.prevPercentage = secondaryTrack.dataset.percentage;
};

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0" && secondaryTrack.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 600, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 600, fill: "forwards" });
  }
  
  const secondaryMouseDelta = parseFloat(secondaryTrack.dataset.mouseDownAt) - e.clientX;
  
  const secondaryPercentage = (secondaryMouseDelta / maxDelta) * -100,
        secondaryNextPercentageUnconstrained = parseFloat(secondaryTrack.dataset.prevPercentage) + secondaryPercentage,
        secondaryNextPercentage = Math.max(Math.min(secondaryNextPercentageUnconstrained, 0), -100);
  
  secondaryTrack.dataset.percentage = secondaryNextPercentage;
  
  secondaryTrack.animate({
    transform: `translate(${secondaryNextPercentage}%, -50%)`
  }, { duration: 600, fill: "forwards" });
  
  for(const image of secondaryTrack.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + secondaryNextPercentage}% center`
    }, { duration: 600, fill: "forwards" });
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

particlesJS("particles-js", {
  particles: {
    number: {
      value: 24,
      density: { enable: true, value_area: 1657.2100474277727 }
    },
    color: { value: "#575454" },
    shape: {
      type: "circle",
      stroke: { width: 3, color: "#000000" },
      polygon: { nb_sides: 6 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 4.008530152163807,
      random: true,
      anim: {
        enable: true,
        speed: 2.4362316369040355,
        size_min: 1.6241544246026904,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: false, mode: "remove" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);