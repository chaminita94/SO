/* ========================================================= */
/* INICIALITZACIÓ                                             */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Mermaid diagrams
    initMermaid();

    // Create scroll progress bar
    createScrollProgressBar();

    // Create back to top button
    createBackToTopButton();

    // Initialize scroll animations
    initScrollAnimations();

    // Create reading time badge
    createReadingTime();

    // Initialize confetti on reaching end
    initEndConfetti();

    // Initialize image lightbox
    initLightbox();

    // Initialize copy feedback
    initCopyFeedback();
});

/* ========================================================= */
/* MERMAID DIAGRAMS                                           */
/* ========================================================= */

function initMermaid() {
    if (typeof mermaid !== 'undefined') {
        const isDarkMode = document.body.getAttribute('data-md-color-scheme') === 'slate';
        mermaid.initialize({
            startOnLoad: true,
            theme: isDarkMode ? 'dark' : 'default',
            securityLevel: 'loose',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });
    }
}

/* ========================================================= */
/* READING TIME CALCULATOR                                    */
/* ========================================================= */

function createReadingTime() {
    const content = document.querySelector(".md-content__inner");
    if (!content) return;

    const text = content.textContent || "";
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    const badge = document.createElement("div");
    badge.id = "reading-time";
    badge.textContent = `${readingTime} min de lectura`;

    const firstHeading = content.querySelector("h1");
    if (firstHeading && firstHeading.nextSibling) {
        firstHeading.parentNode.insertBefore(badge, firstHeading.nextSibling);
    }
}

/* ========================================================= */
/* CONFETTI ON PAGE END                                       */
/* ========================================================= */

let confettiTriggered = false;

function initEndConfetti() {
    window.addEventListener("scroll", function () {
        if (confettiTriggered) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (scrollPercent > 95) {
            confettiTriggered = true;
            launchConfetti();
        }
    });
}

function launchConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#2ecc71', '#3498db', '#e74c3c', '#f1c40f'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.top = "-10px";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

/* ========================================================= */
/* SCROLL PROGRESS BAR                                        */
/* ========================================================= */

function createScrollProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", updateScrollProgress);
}

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        progressBar.style.width = scrollPercent + "%";
    }
}

/* ========================================================= */
/* BACK TO TOP BUTTON                                         */
/* ========================================================= */

function createBackToTopButton() {
    const button = document.createElement("button");
    button.id = "back-to-top";
    button.innerHTML = "↑";
    button.title = "Tornar a dalt";
    document.body.appendChild(button);

    // Show/hide button on scroll
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }
    });

    // Scroll to top on click
    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ========================================================= */
/* SCROLL ANIMATIONS                                          */
/* ========================================================= */

function initScrollAnimations() {
    // Add animation class to main content elements
    const content = document.querySelector(".md-content__inner");
    if (content) {
        const headings = content.querySelectorAll("h2, h3");
        const images = content.querySelectorAll("img");
        const tables = content.querySelectorAll("table");
        const codeBlocks = content.querySelectorAll("pre");

        [...headings, ...images, ...tables, ...codeBlocks].forEach(el => {
            el.classList.add("animate-on-scroll");
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".animate-on-scroll").forEach(el => {
        observer.observe(el);
    });
}

/* ========================================================= */
/* EASTER EGG: TUX (escriu "kernel")                          */
/* ========================================================= */

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
        tux.style.zIndex = "9998";
        document.body.appendChild(tux);
        setTimeout(() => tux.style.left = "120%");
        setTimeout(() => tux.remove(), 7000);
        window._mkTux = "";
    }
});

/* ========================================================= */
/* IMAGE LIGHTBOX                                             */
/* ========================================================= */

function initLightbox() {
    // Create lightbox overlay
    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";

    const closeBtn = document.createElement("span");
    closeBtn.id = "lightbox-close";
    closeBtn.innerHTML = "×";

    const lightboxImg = document.createElement("img");
    lightboxImg.id = "lightbox-img";

    overlay.appendChild(closeBtn);
    overlay.appendChild(lightboxImg);
    document.body.appendChild(overlay);

    // Add click handlers to content images
    const contentImages = document.querySelectorAll(".md-content img");
    contentImages.forEach(img => {
        img.addEventListener("click", function (e) {
            e.preventDefault();
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Close on overlay click
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target === closeBtn) {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && overlay.classList.contains("active")) {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

/* ========================================================= */
/* COPY CODE FEEDBACK                                         */
/* ========================================================= */

function initCopyFeedback() {
    // Create toast element
    const toast = document.createElement("div");
    toast.id = "copy-toast";
    toast.innerHTML = "✓ Codi copiat!";
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 10000;
    `;
    document.body.appendChild(toast);

    // Listen for clipboard events
    document.addEventListener("click", function (e) {
        if (e.target.closest(".md-clipboard")) {
            showToast();
        }
    });

    function showToast() {
        toast.style.opacity = "1";
        toast.style.visibility = "visible";
        toast.style.transform = "translateX(-50%) translateY(0)";

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.visibility = "hidden";
            toast.style.transform = "translateX(-50%) translateY(20px)";
        }, 2000);
    }
}

/* ========================================================= */
/* SMOOTH ANCHOR SCROLLING                                    */
/* ========================================================= */

document.addEventListener("click", function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        const targetId = anchor.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            history.pushState(null, null, "#" + targetId);
        }
    }
});
