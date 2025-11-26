/* Inicialitzar Google Translate */
document.addEventListener("DOMContentLoaded", function() {
  var translateScript = document.createElement("script");
  translateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(translateScript);

  var translateDiv = document.createElement("div");
  translateDiv.id = "google_translate_element";
  translateDiv.classList.add("translate-widget");
  document.body.insertBefore(translateDiv, document.body.firstChild);
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'ca',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'google_translate_element'
  );
}

document.addEventListener("keydown", function (e) {
  window._mkTux = window._mkTux || "";
  window._mkTux += e.key.toLowerCase();

  if (window._mkTux.includes("kernel")) {
    const tux = document.createElement("img");
    tux.src = "https://media.tenor.com/5IWFYb4D1WMAAAAi/swan-hack-dab.gif";
    tux.style.position = "fixed";
    tux.style.bottom = "20px";
    tux.style.left = "-200px";
    tux.style.height = "200px";
    tux.style.transition = "left 6s linear";
    document.body.appendChild(tux);
    setTimeout(() => tux.style.left = "120%");

    window._mkTux = ""; // reset
  }
});


// Detect fast scrolling properly
let scrollEvents = [];
const MAX_EVENTS = 10;     // how many scroll events to track
const SPEED_THRESHOLD = 2; // how fast they must scroll
const DIST_THRESHOLD  = 1300; // total distance required

let lastPos = window.pageYOffset;
let lastTime = Date.now();

document.addEventListener("scroll", () => {
    const now = Date.now();
    const pos = window.pageYOffset;

    // Scroll delta
    const delta = Math.abs(pos - lastPos);
    const dt = now - lastTime;

    // Store this event
    scrollEvents.push({
        delta: delta,
        dt: dt
    });

    // Keep only last 10 events
    if (scrollEvents.length > MAX_EVENTS) {
        scrollEvents.shift();
    }

    // Calculate total distance & average speed
    const totalDistance = scrollEvents.reduce((a, e) => a + e.delta, 0);
    const avgSpeed = totalDistance / scrollEvents.reduce((a, e) => a + e.dt, 0);

    // Trigger ONLY if fast & long scroll
    if (avgSpeed > SPEED_THRESHOLD && totalDistance > DIST_THRESHOLD) {
        showGollum();
        scrollEvents = []; // reset
    }

    lastPos = pos;
    lastTime = now;
});

function showGollum() {
    if (document.getElementById("gollum-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "gollum-overlay";
    overlay.innerHTML = `
        <div class="gollum-container">
            <img src="https://media.tenor.com/nTfGANr9MlAAAAAi/lord-of-the-rings-my-precious.gif" class="gollum-img">
            <div class="gollum-text">Too fast… precious!</div>
        </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add("gollum-hide");
        setTimeout(() => overlay.remove(), 800);
    }, 1600);
}
