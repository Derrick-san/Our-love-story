
(() => {
  "use strict";

  // Create the effects container automatically
  let ambience = document.getElementById("ambience");

  if (!ambience) {
    ambience = document.createElement("div");
    ambience.id = "ambience";
    document.body.appendChild(ambience);
  }

  Object.assign(ambience.style, {
    position: "fixed",
    inset: "0",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: "9999"
  });

  const loveEmojis = [
    "💜", "❤️", "💕", "💖",
    "💗", "🤍", "💘", "💝", "✨"
  ];

  const colors = [
    "#ff4d9d",
    "#ffd166",
    "#b794ff",
    "#7cecff",
    "#ffffff",
    "#ff85c8"
  ];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // LOVE EMOJI BURSTS
  function createLoveBurst() {
    if (document.hidden) return;

    const centerX = random(8, 92);
    const centerY = random(10, 85);
    const amount = Math.floor(random(3, 7));

    for (let i = 0; i < amount; i++) {
      const emoji = document.createElement("span");

      emoji.textContent =
        loveEmojis[
          Math.floor(Math.random() * loveEmojis.length)
        ];

      Object.assign(emoji.style, {
        position: "absolute",
        left: centerX + "vw",
        top: centerY + "vh",
        fontSize: random(18, 32) + "px",
        lineHeight: "1",
        opacity: "0",
        transform: "translate(-50%, -50%) scale(0.3)",
        filter: "drop-shadow(0 0 8px #ff9de2)",
        willChange: "transform, opacity"
      });

      ambience.appendChild(emoji);

      const angle = random(0, Math.PI * 2);
      const distance = random(35, 110);

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      if (emoji.animate) {
        const animation = emoji.animate(
          [
            {
              transform:
                "translate(-50%, -50%) scale(0.3)",
              opacity: 0
            },
            {
              transform:
                "translate(-50%, -50%) scale(1.2)",
              opacity: 1,
              offset: 0.25
            },
            {
              transform:
                `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.7)`,
              opacity: 0
            }
          ],
          {
            duration: random(900, 1500),
            easing: "ease-out",
            fill: "forwards"
          }
        );

        animation.onfinish = () => emoji.remove();
      } else {
        setTimeout(() => emoji.remove(), 1500);
      }
    }
  }

  // RANDOM LOVE EMOJI TIMING
  function scheduleLoveBurst() {
    createLoveBurst();

    setTimeout(
      scheduleLoveBurst,
      random(500, 1400)
    );
  }

  // FIREWORKS
  function createFirework() {
    if (document.hidden) return;

    const x = random(10, 90);
    const y = random(10, 60);
    const particles = 30;

    for (let i = 0; i < particles; i++) {
      const spark = document.createElement("span");

      const color =
        colors[Math.floor(Math.random() * colors.length)];

      const angle =
        (Math.PI * 2 * i) / particles;

      const distance = random(40, 100);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      Object.assign(spark.style, {
        position: "absolute",
        left: x + "vw",
        top: y + "vh",
        width: random(3, 6) + "px",
        height: random(3, 6) + "px",
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 10px 2px ${color}`,
        pointerEvents: "none",
        willChange: "transform, opacity"
      });

      ambience.appendChild(spark);

      if (spark.animate) {
        const animation = spark.animate(
          [
            {
              transform: "translate(0, 0) scale(1)",
              opacity: 1
            },
            {
              transform:
                `translate(${dx}px, ${dy}px) scale(0.2)`,
              opacity: 0
            }
          ],
          {
            duration: random(900, 1400),
            easing: "ease-out",
            fill: "forwards"
          }
        );

        animation.onfinish = () => spark.remove();
      } else {
        setTimeout(() => spark.remove(), 1400);
      }
    }
  }

  // FADE-IN EFFECTS FOR PAGE SECTIONS
  function setupRevealAnimations() {
    const elements = document.querySelectorAll(
      ".reveal, .video-card, .photo-card"
    );

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      elements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      elements.forEach((element) => {
        element.classList.add("visible");
      });
    }
  }

  // START EVERYTHING
  function startEffects() {
    setupRevealAnimations();

    // Start the first bursts quickly
    setTimeout(createLoveBurst, 300);
    setTimeout(createFirework, 600);
    setTimeout(createLoveBurst, 1000);
    setTimeout(createFirework, 1400);

    // Continue with random love bursts
    setTimeout(scheduleLoveBurst, 1800);

    // Repeat fireworks
    setInterval(createFirework, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startEffects
    );
  } else {
    startEffects();
  }
  
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicToggle");

if (music && musicButton) {
  music.volume = 0.4;

  musicButton.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        musicButton.textContent = "⏸ Pause Our Song";
      } else {
        music.pause();
        musicButton.textContent = "🎵 Play Our Song";
      }
    } catch (error) {
      musicButton.textContent = "Tap to Play Our Song";
      console.error("Music could not play:", error);
    }
  });

  music.addEventListener("ended", () => {
    musicButton.textContent = "🎵 Play Our Song";
  });
}

})();
