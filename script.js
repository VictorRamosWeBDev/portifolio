/* =========================================================
   VICTOR.RAMOS DEV
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   INTRO
========================================================= */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");

let introFinished = false;

function enterPortfolio() {

    if (!intro || introFinished) return;

    introFinished = true;

    if (enterButton) {

        enterButton.disabled = true;

        enterButton.innerHTML = `
            <span class="button-icon">
                <i class="fa-solid fa-circle-notch fa-spin"></i>
            </span>

            <span>INITIALIZING...</span>
        `;
    }

    setTimeout(() => {

        intro.classList.add("leaving");

        setTimeout(() => {

            intro.remove();

            document.body.classList.remove("intro-active");

        }, 1800);

    }, 400);
}

if (enterButton) {
    enterButton.addEventListener("click", enterPortfolio);
}


/* =========================================================
   INTRO PARTICLES
========================================================= */

const introCanvas = document.getElementById("introCanvas");

if (introCanvas) {

    const ctx = introCanvas.getContext("2d");

    let introParticles = [];

    function resizeIntroCanvas() {

        introCanvas.width = window.innerWidth;
        introCanvas.height = window.innerHeight;

    }

    function createIntroParticles() {

        introParticles = [];

        const amount = Math.min(
            100,
            Math.floor(window.innerWidth / 12)
        );

        for (let i = 0; i < amount; i++) {

            introParticles.push({

                x: Math.random() * introCanvas.width,
                y: Math.random() * introCanvas.height,

                size: Math.random() * 1.4 + .3,

                speed:
                    Math.random() * .3 + .05,

                opacity:
                    Math.random() * .5 + .1

            });

        }
    }

    function drawIntroParticles() {

        ctx.clearRect(
            0,
            0,
            introCanvas.width,
            introCanvas.height
        );

        introParticles.forEach(p => {

            p.y -= p.speed;

            if (p.y < -5) {

                p.y =
                    introCanvas.height + 5;

                p.x =
                    Math.random() *
                    introCanvas.width;

            }

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0,234,255,${p.opacity})`;

            ctx.fill();

        });

        requestAnimationFrame(
            drawIntroParticles
        );
    }

    resizeIntroCanvas();
    createIntroParticles();
    drawIntroParticles();

    window.addEventListener(
        "resize",
        () => {

            resizeIntroCanvas();
            createIntroParticles();

        }
    );
}


/* =========================================================
   BACKGROUND PARTICLES
========================================================= */

const backgroundCanvas =
    document.getElementById("backgroundCanvas");

if (backgroundCanvas) {

    const ctx =
        backgroundCanvas.getContext("2d");

    let particles = [];

    function resizeBackground() {

        backgroundCanvas.width =
            window.innerWidth;

        backgroundCanvas.height =
            window.innerHeight;

    }

    function createParticles() {

        particles = [];

        const amount = Math.min(
            80,
            Math.floor(window.innerWidth / 18)
        );

        for (let i = 0; i < amount; i++) {

            particles.push({

                x:
                    Math.random() *
                    backgroundCanvas.width,

                y:
                    Math.random() *
                    backgroundCanvas.height,

                vx:
                    (Math.random() - .5) * .15,

                vy:
                    (Math.random() - .5) * .15,

                size:
                    Math.random() * 1.2 + .3,

                opacity:
                    Math.random() * .25 + .05

            });

        }
    }

    function drawBackground() {

        ctx.clearRect(
            0,
            0,
            backgroundCanvas.width,
            backgroundCanvas.height
        );

        particles.forEach(p => {

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) {
                p.x = backgroundCanvas.width;
            }

            if (p.x > backgroundCanvas.width) {
                p.x = 0;
            }

            if (p.y < 0) {
                p.y = backgroundCanvas.height;
            }

            if (p.y > backgroundCanvas.height) {
                p.y = 0;
            }

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0,234,255,${p.opacity})`;

            ctx.fill();

        });

        requestAnimationFrame(
            drawBackground
        );
    }

    resizeBackground();
    createParticles();
    drawBackground();

    window.addEventListener(
        "resize",
        () => {

            resizeBackground();
            createParticles();

        }
    );
}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
    document.getElementById("cursor");

const cursorRing =
    document.getElementById("cursorRing");

if (
    cursor &&
    cursorRing &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener(
        "mousemove",
        e => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;

        }
    );

    function animateCursor() {

        ringX +=
            (mouseX - ringX) * .15;

        ringY +=
            (mouseY - ringY) * .15;

        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();

    const hoverElements =
        document.querySelectorAll(
            `
            a,
            button,
            .tech-card,
            .process-card,
            .stat-card,
            .browser-window,
            .volt-browser,
            .option,
            .extras label,
            .project-link,
            .volt-product
            `
        );

    hoverElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        }
    );
}


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const mainNav =
    document.getElementById("mainNav");

if (mobileMenu && mainNav) {

    mobileMenu.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle(
                "mobile-open"
            );

            const icon =
                mobileMenu.querySelector("i");

            if (
                mainNav.classList.contains(
                    "mobile-open"
                )
            ) {

                icon.className =
                    "fa-solid fa-xmark";

            } else {

                icon.className =
                    "fa-solid fa-bars";

            }

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                    const icon =
                        mobileMenu.querySelector("i");

                    icon.className =
                        "fa-solid fa-bars";

                }
            );

        });
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );

revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   PARALLAX HERO
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");

if (
    heroVisual &&
    window.matchMedia("(pointer: fine)").matches
) {

    document.addEventListener(
        "mousemove",
        e => {

            const x =
                e.clientX /
                window.innerWidth - .5;

            const y =
                e.clientY /
                window.innerHeight - .5;

            heroVisual.style.transform =
                `translate(${x * 12}px, ${y * 12}px)`;

        }
    );

}


/* =========================================================
   PROJECT VISUAL INTERACTION
========================================================= */

/*
   Pequena interação para os projetos.

   Quando o usuário passa o mouse pelo mockup,
   adicionamos uma classe para permitir que o CSS
   faça efeitos de destaque.
*/

const projectVisuals =
    document.querySelectorAll(
        ".browser-window, .volt-browser"
    );

projectVisuals.forEach(
    visual => {

        visual.addEventListener(
            "mouseenter",
            () => {

                visual.classList.add(
                    "project-hover"
                );

            }
        );

        visual.addEventListener(
            "mouseleave",
            () => {

                visual.classList.remove(
                    "project-hover"
                );

            }
        );

    }
);


/* =========================================================
   VOLT SNEAKERS
========================================================= */

const voltProject =
    document.querySelector(
        ".volt-project"
    );

if (voltProject) {

    const voltBrowser =
        voltProject.querySelector(
            ".volt-browser"
        );

    if (voltBrowser) {

        let voltX = 0;
        let voltY = 0;

        voltBrowser.addEventListener(
            "mousemove",
            e => {

                if (
                    window.innerWidth <= 760
                ) {
                    return;
                }

                const rect =
                    voltBrowser.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) /
                    rect.width;

                const y =
                    (e.clientY - rect.top) /
                    rect.height;

                voltX =
                    (x - .5) * 8;

                voltY =
                    (y - .5) * -8;

                voltBrowser.style.setProperty(
                    "--volt-x",
                    `${voltX}px`
                );

                voltBrowser.style.setProperty(
                    "--volt-y",
                    `${voltY}px`
                );

            }
        );

        voltBrowser.addEventListener(
            "mouseleave",
            () => {

                voltBrowser.style.setProperty(
                    "--volt-x",
                    "0px"
                );

                voltBrowser.style.setProperty(
                    "--volt-y",
                    "0px"
                );

            }
        );

    }


    /*
       Animação dos cards de produto
       dentro do mockup VOLT.
    */

    const voltProducts =
        voltProject.querySelectorAll(
            ".volt-product"
        );

    voltProducts.forEach(
        (product, index) => {

            product.style.setProperty(
                "--product-delay",
                `${index * 100}ms`
            );

        }
    );

}


/* =========================================================
   BUDGET CALCULATOR
========================================================= */

const budgetForm =
    document.getElementById("budgetForm");

const totalPrice =
    document.getElementById("totalPrice");

function calculateBudget() {

    if (
        !budgetForm ||
        !totalPrice
    ) {
        return;
    }

    const selectedProject =
        budgetForm.querySelector(
            'input[name="project"]:checked'
        );

    let total = 0;

    if (selectedProject) {

        total += Number(
            selectedProject.dataset.price || 0
        );

    }

    const extras =
        budgetForm.querySelectorAll(
            'input[type="checkbox"][data-price]'
        );

    extras.forEach(
        extra => {

            if (extra.checked) {

                total += Number(
                    extra.dataset.price || 0
                );

            }

        }
    );

    totalPrice.textContent =
        total >= 2500 &&
        selectedProject?.value === "custom"

            ? `R$ ${total.toLocaleString("pt-BR")}+`

            : `R$ ${total.toLocaleString("pt-BR")}`;

}


if (budgetForm) {

    budgetForm.addEventListener(
        "change",
        calculateBudget
    );

    calculateBudget();

}


/* =========================================================
   WHATSAPP
========================================================= */

const whatsappButton =
    document.getElementById(
        "whatsappButton"
    );

if (whatsappButton) {

    whatsappButton.addEventListener(
        "click",
        () => {

            const selectedProject =
                document.querySelector(
                    'input[name="project"]:checked'
                );

            const projectName =
                selectedProject
                    ?.parentElement
                    ?.querySelector(
                        ".option-box span"
                    )
                    ?.textContent
                    ?.trim() ||
                "Projeto";

            const total =
                document.getElementById(
                    "totalPrice"
                )?.textContent || "";

            const message =
                `Olá, Victor! Vi seu portfólio e gostaria de conversar sobre um projeto.%0A%0A` +
                `Projeto: ${projectName}%0A` +
                `Estimativa inicial: ${total}%0A%0A` +
                `Gostaria de saber mais detalhes.`;

            const phone =
                "5567999094900";

            window.open(
                `https://wa.me/${phone}?text=${message}`,
                "_blank"
            );

        }
    );

}


/* =========================================================
   TERMINAL
========================================================= */

const terminal =
    document.getElementById(
        "terminal"
    );

const terminalOpen =
    document.getElementById(
        "terminalOpen"
    );

const terminalClose =
    document.getElementById(
        "terminalClose"
    );

const terminalInput =
    document.getElementById(
        "terminalInput"
    );

const terminalOutput =
    document.getElementById(
        "terminalOutput"
    );


function openTerminal() {

    if (!terminal) return;

    terminal.classList.add(
        "active"
    );

    setTimeout(
        () => {

            terminalInput?.focus();

        },
        300
    );

}


function closeTerminal() {

    terminal?.classList.remove(
        "active"
    );

}


if (terminalOpen) {

    terminalOpen.addEventListener(
        "click",
        openTerminal
    );

}


if (terminalClose) {

    terminalClose.addEventListener(
        "click",
        closeTerminal
    );

}


if (terminal) {

    terminal.addEventListener(
        "click",
        e => {

            if (
                e.target === terminal
            ) {

                closeTerminal();

            }

        }
    );

}


function terminalWrite(
    text,
    className = ""
) {

    if (!terminalOutput) return;

    const line =
        document.createElement(
            "div"
        );

    if (className) {

        line.className =
            className;

    }

    line.innerHTML =
        text;

    terminalOutput.appendChild(
        line
    );

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;

}


function executeCommand(command) {

    const cmd =
        command
            .trim()
            .toLowerCase();

    if (!cmd) return;


    terminalWrite(
        `visitor@vr:~$ ${command}`,
        "command"
    );


    switch (cmd) {

        case "help":

            terminalWrite(
                "available commands:"
            );

            terminalWrite(
                "about — sobre o desenvolvedor"
            );

            terminalWrite(
                "projects — projetos em destaque"
            );

            terminalWrite(
                "skills — tecnologias"
            );

            terminalWrite(
                "contact — contato"
            );

            terminalWrite(
                "clear — limpar terminal"
            );

            break;


        case "about":

            terminalWrite(
                "Victor.Ramos Dev — Front-End Developer.",
                "success"
            );

            terminalWrite(
                "Criando experiências digitais modernas."
            );

            break;


        case "projects":

            terminalWrite(
                "01 — Albano Trader",
                "success"
            );

            terminalWrite(
                "https://albanotrader.com.br"
            );

            terminalWrite(
                "02 — VOLT Sneakers",
                "success"
            );

            terminalWrite(
                "https://volt-sneakers.onrender.com"
            );

            terminalWrite(
                "GitHub: https://github.com/VictorRamosWeBDev/volt-sneakers.git"
            );

            break;


        case "albano":

            terminalWrite(
                "PROJECT 001 — ALBANO TRADER",
                "success"
            );

            terminalWrite(
                "https://albanotrader.com.br"
            );

            break;


        case "volt":

            terminalWrite(
                "PROJECT 002 — VOLT SNEAKERS",
                "success"
            );

            terminalWrite(
                "E-commerce concept / Interactive Front-End"
            );

            terminalWrite(
                "https://volt-sneakers.onrender.com"
            );

            break;


        case "skills":

            terminalWrite(
                "HTML5 / CSS3 / JavaScript / Responsive / Git / Deploy",
                "success"
            );

            break;


        case "contact":

            terminalWrite(
                "Status: AVAILABLE",
                "success"
            );

            terminalWrite(
                "Use a seção de contato para solicitar um orçamento."
            );

            break;


        case "clear":

            terminalOutput.innerHTML = "";

            break;


        case "whoami":

            terminalWrite(
                "visitor",
                "success"
            );

            break;


        case "sudo":

            terminalWrite(
                "Nice try. 😎"
            );

            break;


        default:

            terminalWrite(
                `command not found: ${command}`,
                "error"
            );

            terminalWrite(
                "Digite 'help' para ver os comandos disponíveis."
            );

    }

}


if (terminalInput) {

    terminalInput.addEventListener(
        "keydown",
        e => {

            if (
                e.key !== "Enter"
            ) {
                return;
            }

            const command =
                terminalInput.value;

            terminalInput.value = "";

            executeCommand(
                command
            );

        }
    );

}


/* =========================================================
   ESC FECHA TERMINAL
========================================================= */

document.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Escape"
        ) {

            closeTerminal();

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a"
    );

const navObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    navLinks.forEach(
                        link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }
            );

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );

sections.forEach(
    section => {

        navObserver.observe(
            section
        );

    }
);


/* =========================================================
   SMOOTH PROJECT LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            e => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   EXTERNAL PROJECT LINKS
========================================================= */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    `%cOpening project: ${link.href}`,
                    "color:#00eaff;"
                );

            }
        );

    });


/* =========================================================
   PROJECT COUNTER
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".featured-project, .volt-project"
    );

if (projectCards.length) {

    console.log(
        `%c${projectCards.length} project(s) loaded.`,
        "color:#20e59a;font-weight:bold;"
    );

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cVictor.Ramos Dev",
    "color:#00eaff;font-size:20px;font-weight:bold;"
);

console.log(
    "%cPortfolio system initialized.",
    "color:#20e59a;"
);

console.log(
    "%cProjects: Albano Trader + VOLT Sneakers",
    "color:#ff2d8d;font-weight:bold;"
);