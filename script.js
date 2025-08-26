// Confetti + Balloons + Small Interactions
(function() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const celebrateBtn = document.getElementById('celebrateBtn');

  // Create floating balloons (CSS-driven, created from JS for markup simplicity)
  const hero = document.querySelector('.hero');
  const balloonLayer = document.createElement('div');
  balloonLayer.style.position = 'fixed';
  balloonLayer.style.inset = '0';
  balloonLayer.style.pointerEvents = 'none';
  hero.appendChild(balloonLayer);
  for (let i = 0; i < 5; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    balloonLayer.appendChild(b);
  }

  // Confetti system
  const colors = ['#ff64b4', '#7d77ff', '#ffd166', '#34d399', '#7dd3fc', '#f472b6'];
  let confetti = [];
  const GRAVITY = 0.12;
  const DRAG = 0.005;

  function createConfettiBurst(x, y, count = 180) {
    for (let i = 0; i < count; i++) {
      confetti.push({
        x,
        y,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 10,
        color: colors[(Math.random() * colors.length) | 0],
        vx: (Math.random() - 0.5) * 10,
        vy: -Math.random() * 8 - 3,
        rotation: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 220 + (Math.random() * 120),
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, width, height);
    for (let i = confetti.length - 1; i >= 0; i--) {
      const p = confetti[i];
      p.vx *= 1 - DRAG;
      p.vy += GRAVITY;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;
      p.life -= 1;

      // Remove off-screen or life-ended
      if (p.y > height + 40 || p.x < -40 || p.x > width + 40 || p.life <= 0) {
        confetti.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    requestAnimationFrame(drawConfetti);
  }

  // Start rendering loop
  drawConfetti();

  // Celebrate button
  celebrateBtn.addEventListener('click', () => {
    createConfettiBurst(width * 0.5, 80);
    createConfettiBurst(width * 0.25, height * 0.35, 120);
    createConfettiBurst(width * 0.75, height * 0.35, 120);
    celebrateBtn.disabled = true;
    celebrateBtn.textContent = 'Yay! 🎉';
    setTimeout(() => { celebrateBtn.disabled = false; celebrateBtn.textContent = 'Celebrate 🎉'; }, 2000);
  });

  // Auto confetti on load
  window.addEventListener('load', () => {
    setTimeout(() => createConfettiBurst(width * 0.5, height * 0.2, 160), 500);
  });

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
})();

// Add this to your existing script.js file

// Photo flip functionality
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle flip class
            this.classList.toggle('flipped');
            
            // Add a subtle bounce effect
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Optional: Play a soft sound or add confetti when flipping
            if (this.classList.contains('flipped')) {
                // Create small confetti burst for the clicked card
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                createMiniConfetti(centerX, centerY);
            }
        });
    });
    
    // Mini confetti function for card interactions
    function createMiniConfetti(x, y) {
        const colors = ['#ff64b4', '#7d77ff', '#ffd166', '#34d399', '#7dd3fc'];
        for (let i = 0; i < 15; i++) {
            confetti.push({
                x,
                y,
                w: 3 + Math.random() * 3,
                h: 4 + Math.random() * 5,
                color: colors[(Math.random() * colors.length) | 0],
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 4 - 2,
                rotation: Math.random() * Math.PI,
                vr: (Math.random() - 0.5) * 0.2,
                life: 120 + (Math.random() * 60),
            });
        }
    }
    
    // Add hover effect for cards
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});


