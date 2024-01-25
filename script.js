const statusDiv = document.getElementById('status');

const checkStatus = async () => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://projects.penguinmod.com/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
            statusDiv.textContent = 'PenguinMod Is Online!';
            document.querySelector('.lds-ripple').style.opacity = 0;

            // Show confetti when the server is online
            const count = 500,
                defaults = {
                    origin: { y: 0.7 },
                };

            function fire(particleRatio, opts) {
                confetti(
                    Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                    })
                );
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });

            fire(0.2, {
                spread: 60,
            });

            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
            });

            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
            });

            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });
        } else {
            statusDiv.textContent = 'PenguinMod is Down..';
            document.querySelector('.lds-ripple').style.opacity = 0;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            statusDiv.textContent = 'PenguinMod is Down..';
            document.querySelector('.lds-ripple').style.opacity = 0;
        } else {
            statusDiv.textContent = 'An error ocurred in our part, please wait us to fix it (probably 5 mins)';
            document.querySelector('.lds-ripple').style.opacity = 0;
        }
    }
};

window.onload = checkStatus;
