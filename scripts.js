(function (tag) {
    const $ = {
        smokeCanvas: document.getElementById('smoke'),
        audioSource: document.getElementById('audioSource'),
        audioButton: document.getElementById('audioButton')
    }

    const setup = () => {
        console.log('Setting up ' + tag + '...');
        setupAudio();
        setupSmoke();
        start();
    }

    const start = () => {
        console.log('Starting up ' + tag + '...');
        $.audioSource.play();
    }

    const setupAudio = () => {
        $.audioButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if ($.audioSource.paused) {
                $.audioButton.innerHTML = '🔇';
                $.audioSource.muted = true;
                $.audioSource.play();
            }
            if ($.audioSource.muted) {
                $.audioButton.innerHTML = '🔊';
                $.audioSource.muted = false;
            }
            else {
                $.audioButton.innerHTML = '🔇';
                $.audioSource.muted = true;
            }
        });
    }

    const setupSmoke = () => {
        const ctx = $.smokeCanvas.getContext('2d');
        $.smokeCanvas.height = window.innerHeight;
        $.smokeCanvas.width = window.innerWidth;

        let particles = [];
        createSmoke = (x, y) => {
            let particle = {
                x: x,
                y: y,
                size: Math.random() * 20 + 10,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * -1 - 1,
                opacity: 1,
            };
            particles.push(particle);
        }

        animateParticles = () => {
            ctx.clearRect(0, 0, $.smokeCanvas.width, $.smokeCanvas.height);
            for (let i = particles.length - 1; i >= 0; i--) {
                let p = particles[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`;
                ctx.fill();
                p.x += p.speedX;
                p.y += p.speedY;
                p.size *= 0.98;
                p.opacity -= 0.01;
                if (p.opacity <= 0 || p.size <= 0) {
                    particles.splice(i, 1);
                }
            }
        }

        animate = () => {
            requestAnimationFrame(animate);
            animateParticles();
        }

        $.smokeCanvas.addEventListener('mousemove', (e) => {
            createSmoke(e.clientX, e.clientY);
        });

        animate();
    }

    document.addEventListener('DOMContentLoaded', setup);
})('Joint Boy');