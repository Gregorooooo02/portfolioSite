svgPong = function () {
    let field = document.getElementById('field');

    if (field == null) {
        alert("!!!Could not find SVG graphic file!!!");
        return;
    }

    (function() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    })();

    // Initial paddle
    function wrapPaddle(name) {
        let e = document.getElementById(name)
        let r = {}

        r.width = e.width.baseVal.value
        r.height = e.height.baseVal.value

        function update() {
            r.right = r.x + r.width
            r.left = r.x
            r.top = r.y
            r.bottom = r.y + r.height
        }

        Object.defineProperty(r, "x", {
            get: function () {return e.x.baseVal.value},
            set: function (val) {e.x.baseVal.value = val; update();}
        })
        Object.defineProperty(r, "y", {
            get: function () {return e.y.baseVal.value},
            set: function (val) {e.y.baseVal.value = val; update();}
        })
        Object.defineProperty(r, "cx", {
            get: function () {return r.x + r.width / 2;},
            set: function (val) {r.x = val - r.width / 2;}
        })
        Object.defineProperty(r, "cy", {
            get: function () {return r.y + r.height / 2;},
            set: function (val) {r.y = val - r.height / 2;}
        })

        update();

        return r;
    }

    // Create objects for paddles
    let player = wrapPaddle('paddleLeft')
    let computer = wrapPaddle('paddleRight')

    // Creating a ball and it's methods
    let ball = function () {
        let e = document.getElementById('ball')

        let r = {}
        r.dx = 0
        r.dy = 0

        function update() {
            r.right = r.cx + r.r;
            r.left = r.cx - r.r;
            r.top = r.cy - r.r;
            r.bottom = r.cy + r.r;
        }

        Object.defineProperty(r, "cx", {
            get: function () {return e.cx.baseVal.value},
            set: function (val) {e.cx.baseVal.value = val; update();}
        })
        Object.defineProperty(r, "cy", {
            get: function () {return e.cy.baseVal.value},
            set: function (val) {e.cy.baseVal.value = val; update();}
        })
        Object.defineProperty(r, "r", {
            get: function () {return e.r.baseVal.value},
            set: function (val) {e.r.baseVal.value = val; update();}
        })

        update();

        return r;
    }();

    // Player's and Computer's score
    let playerScore = document.getElementById('playerScore')
    let computerScore = document.getElementById('computerScore')

    let box = field.viewBox.baseVal;

    // Initial ball state vector init
    let startX = box.width / 2;
    let startY = box.height / 2;

    let clock = function () {
        let last = Date.now();

        return {
            'reset': function () {
                let now = Date.now();
                let result = now - last;
                last = now;

                return result;
            }
        }
    }()

    let animationSpeed = 0.1;   // Pixel per ms
    let computerSpeed = 4;      // Difficulty of the computer

    let scorePlayer = 0;        // Player score (Int type)
    let scoreComputer = 0;      // Computer score (Int type)

    let inputY = 0;             // Input in Y axis for moving the player

    let verticalCenter = box.height / 2;
    let deflectFactor = 0.1;

    /** Collider function, makes ball bounce of smt.
     *
     * @param what From what should the ball bounce off
     */
    function collideBallWith(what) {
        if (ball.bottom < what.top || ball.top > what.bottom) {
            // There's no collision
            return;
        }

        let voff = ball.cy - what.cy

        if (ball.dx < 0) {

            // Collide with right border
            if (ball.left <= what.right && ball.right > what.left) {
                // Collision
                ball.cx += what.right - ball.left;
                ball.dx *= -1;
                ball.dy += voff * deflectFactor;
            }
        }
        else {
            // Collide with left border
            if (ball.right >= what.left && ball.left < what.right) {
                // Collision
                ball.cx -= ball.right - what.left;
                ball.dx *= -1;
                ball.dy += voff * deflectFactor;
            }
        }
    }

    /** Creates a bound for the paddle.
     *
     * @param paddle Which paddle should have bounds
     */
    function boundPaddle(paddle) {
        if (paddle.bottom > box.height) {
            paddle.y = box.height - paddle.height
        }
        else if (paddle.top < 0) {
            paddle.y = 0
        }
    }

    /** Makes score system work fine ;)
     *
     */
    function scored() {
        ball.dx = 0;
        ball.dy = 0;

        ball.cx = startX;
        ball.cy = startY;

        setTimeout(function () {
            if (Math.random() > 0.5)
                ball.dx = 5;
            else
                ball.dx = -5;

            ball.dy = 5 - Math.random() * 10
        }, 3000);

        if (scorePlayer === 5) {
            alert("YOU WON");
            document.location.reload();
        }

        if (scoreComputer === 5) {
            alert("GAME OVER");
            document.location.reload();
        }
    }

    // Setup
    scored();

    /** Init animations for the game
     *
     */
    let animate = function () {
        let suspense = field.suspendRedraw(6000);

        let animationFactor = clock.reset() * animationSpeed

        ball.cx += ball.dx * animationFactor;
        ball.cy += ball.dy * animationFactor;

        // Player movement
        player.cy = inputY;

        // Test player as computer
        // let offset1;
        // let motivation1;
        //
        // if (ball.dx < 0) {
        //    offset1 = ball.cy - player.cy
        //    motivation1 = Math.min(1, Math.pow(Math.abs(offset1) / (player.height / 4), 2))
        // } else {
        //    offset1 = verticalCenter - player.cy
        //    motivation1 = Math.abs(offset1) > verticalCenter / 4 ? 0.5 : 0
        // }
        //
        // if (offset1 > 0) {
        //    player.cy += computerSpeed * animationFactor * motivation1
        // }
        // else {
        //    player.cy -= computerSpeed * animationFactor * motivation1
        // }
        // end of definition
        boundPaddle(player)

        // Computer AI
        let offset;
        let motivation;

        if (ball.dx > 0) {
            offset = ball.cy - computer.cy
            motivation = Math.min(1, Math.pow(Math.abs(offset) / (computer.height / 4), 2))
        } else {
            offset = verticalCenter - computer.cy
            motivation = Math.abs(offset) > verticalCenter / 4 ? 0.5 : 0
        }

        if (offset > 0) {
            computer.cy += computerSpeed * animationFactor * motivation
        }
        else {
            computer.cy -= computerSpeed * animationFactor * motivation
        }
        boundPaddle(computer)

        // Paddle bounds
        collideBallWith(player)
        collideBallWith(computer)

        // Wall bounding and scoring
        if (ball.right >= box.width) {
            ball.cx -= ball.right - box.width;
            ball.dx *= -1;

            // Score
            scorePlayer += 1;
            playerScore.textContent = scorePlayer;
            scored()
        }
        else if (ball.left <= 0) {
            ball.cx -= ball.left;
            ball.dx *= -1;

            //Score
            scoreComputer += 1;
            computerScore.textContent = scoreComputer;
            scored()
        }

        // Collision with field bounds
        if (ball.top <= 0) {
            ball.cy -= ball.top;
            ball.dy *= -1;
        }
        else if (ball.bottom >= box.height) {
            ball.cy -= ball.bottom - box.height;
            ball.dy *= -1;
        }

        field.unsuspendRedraw(suspense);
        requestAnimationFrame(animate);
    }

    let matrix = field.getScreenCTM().inverse();

    // Controls for the player
    field.addEventListener("mousemove", function (event) {
        event.preventDefault()

        let p = field.createSVGPoint()
        p.x = event.clientX
        p.y = event.clientY
        let inSVG = p.matrixTransform(matrix)

        inputY = inSVG.y
    })

    // Start animation
    requestAnimationFrame(animate)
}