/* =========================
   CHANGE SCENE
========================= */

function showScene(number) {

    const scenes =
        document.querySelectorAll(".scene");


    scenes.forEach(function(scene) {

        scene.classList.remove("active");

    });


    const nextScene =
        document.getElementById(
            "scene" + number
        );


    nextScene.classList.add("active");


    if (number === 6) {

        startHeart();

    }

}


/* =========================
   LETTER
========================= */

function openLetter() {

    const envelope =
        document.getElementById(
            "envelope"
        );


    envelope.classList.toggle(
        "open"
    );

}


/* =========================
   MUSIC VINYL
========================= */

const music =
    document.getElementById(
        "music"
    );

const vinyl =
    document.getElementById(
        "vinyl"
    );


if (music) {

    music.addEventListener(
        "play",
        function() {

            vinyl.classList.add(
                "playing"
            );

        }
    );


    music.addEventListener(
        "pause",
        function() {

            vinyl.classList.remove(
                "playing"
            );

        }
    );

}


/* =========================
   HEART
========================= */

const canvas =
    document.getElementById(
        "heartCanvas"
    );

const ctx =
    canvas.getContext("2d");


let particles = [];

let heartStarted = false;


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* Heart equation */

function heartPoint(t, scale) {

    const x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );


    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);


    return {

        x:
            canvas.width / 2
            + x * scale,

        y:
            canvas.height / 2
            - y * scale

    };

}


/* Start */

function startHeart() {

    if (heartStarted) {
        return;
    }

    heartStarted = true;


    const scale =
        Math.min(
            canvas.width,
            canvas.height
        ) / 45;


    for (
        let i = 0;
        i < 900;
        i++
    ) {

        const target =
            heartPoint(
                Math.random()
                * Math.PI
                * 2,

                scale
            );


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            Math.max(
                canvas.width,
                canvas.height
            );


        particles.push({

            x:
                canvas.width / 2
                +
                Math.cos(angle)
                * distance,

            y:
                canvas.height / 2
                +
                Math.sin(angle)
                * distance,

            targetX:
                target.x,

            targetY:
                target.y,

            size:
                Math.random() * 2 + 1,

            delay:
                Math.random() * .5

        });

    }


    animateHeart();

}


/* Animation */

function animateHeart() {

    const start =
        performance.now();


    const duration = 2500;


    function draw(now) {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        let progress =
            (now - start)
            / duration;


        if (progress < 0)
            progress = 0;


        if (progress > 1)
            progress = 1;


        particles.forEach(
            function(particle) {

                let p =
                    (
                        progress
                        -
                        particle.delay
                    )
                    /
                    (
                        1
                        -
                        particle.delay
                    );


                if (p < 0)
                    p = 0;


                if (p > 1)
                    p = 1;


                const smooth =
                    p * p *
                    (3 - 2 * p);


                const x =
                    particle.x
                    +
                    (
                        particle.targetX
                        -
                        particle.x
                    )
                    * smooth;


                const y =
                    particle.y
                    +
                    (
                        particle.targetY
                        -
                        particle.y
                    )
                    * smooth;


                ctx.beginPath();


                ctx.arc(
                    x,
                    y,
                    particle.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    Math.random() > .5
                    ? "#ff719f"
                    : "#ffb1c8";


                ctx.shadowColor =
                    "#ff3f82";

                ctx.shadowBlur = 12;


                ctx.fill();

            }
        );


        if (progress < 1) {

            requestAnimationFrame(
                draw
            );

        }

        else {

            document
                .getElementById(
                    "finalText"
                )
                .classList.add(
                    "show"
                );

        }

    }


    requestAnimationFrame(draw);

}