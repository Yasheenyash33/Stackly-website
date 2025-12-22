const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
        // Start mainly in the center area
        this.x = width / 2 + (Math.random() - 0.5) * 400;
        this.y = height / 2 + (Math.random() - 0.5) * 400;
    }

    reset() {
        this.x = width / 2 + (Math.random() - 0.5) * 100;
        this.y = height / 2 + (Math.random() - 0.5) * 100;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#4ADE80' : '#22D3EE';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Reset if out of bounds or randomly to keep movement fresh
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || Math.random() < 0.001) {
            // drifting too far, maybe nudge back or reset
            if (Math.abs(this.x - width/2) > 600 || Math.abs(this.y - height/2) > 400) {
                 this.vx *= -1;
                 this.vy *= -1;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    // Increase count for denser mesh like the image
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections first
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = p1.color; // simplified coloring
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

initParticles();
animate();
