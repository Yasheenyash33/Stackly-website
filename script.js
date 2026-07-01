
AOS.init({
    duration: 400,
    easing: 'ease-in-out',
    once: true,
});


  // get current file name only
  const currentPage = window.location.pathname.split("/").pop();

  // ALL nav links (top + dropdown)
  const allLinks = document.querySelectorAll(
    ".nav-item, .nav-link-with-icon, .dropdown-menu a"
  );

  allLinks.forEach(link => {
    const linkPage = link.getAttribute("href")?.replace("./", "");

    if (linkPage === currentPage) {
      link.classList.add("active");

      // if dropdown item → also highlight Careers parent
      if (link.closest(".dropdown-menu")) {
        document
          .querySelector(".nav-link-with-icon")
          .classList.add("active");
      }
    }
  });


/* ===============================
 carrer drop don
================================ */


function toggleCareerDropdown(e) {
  e.stopPropagation();
  const dropdown = e.currentTarget.parentElement;
  dropdown.classList.toggle("active");
}

/* Close dropdown when clicking outside */
document.addEventListener("click", () => {
  document.querySelectorAll(".nav-dropdown").forEach(item => {
    item.classList.remove("active");
  });
});

/* ===============================
  Scroll explore 
================================ */

      window.addEventListener("scroll", function () {
        const circle = document.querySelector(".center-logo");
        if (!circle) return;

        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY / maxScroll;

        circle.style.setProperty("--fill", scrolled);
      });


/* ===============================
   PROJECTS – DIAMOND PATTERN
================================ */

        // Generate diamond patterns for projects section
    const projectSection = document.querySelector(".projects-section");

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const leftContainer = document.querySelector('.diamonds-left');
      const rightContainer = document.querySelector('.diamonds-right');

      if (!leftContainer || !rightContainer) return;

      leftContainer.innerHTML = "";
      rightContainer.innerHTML = "";

      function createDiamond(x, y, opacity) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", "6");
        rect.setAttribute("height", "6");
        rect.setAttribute("transform", `rotate(45 ${x + 3} ${y + 3})`);
        rect.setAttribute("fill", "#22D3EE");
        rect.setAttribute("fill-opacity", opacity);
        return rect;
      }

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < (10 - row * 0.8); col++) {
          const x = col * 25 + (row * 12);
          const y = 180 - (row * 20);
          const opacity = Math.max(0.1, 1 - col * 0.15 - row * 0.1);
          leftContainer.appendChild(createDiamond(x, y, opacity));
        }
      }

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < (10 - row * 0.5); col++) {
          const x = 380 - col * 25 - row * 12;
          const y = row * 20;
          const opacity = Math.max(0.1, 1 - col * 0.15 - row * 0.1);
          rightContainer.appendChild(createDiamond(x, y, opacity));
        }
      }

      projectObserver.unobserve(entry.target); // run once
    }
  });
}, { threshold: 0.3 });

if (projectSection) {
  projectObserver.observe(projectSection);
}



/* ===============================
   VIDEO PLAYER
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const playBtn = document.getElementById('play-btn');
  const closeBtn = document.getElementById('close-video-btn');
  const overlay = document.getElementById('video-overlay');
  const video = document.getElementById('project-video');

  if (!playBtn || !overlay || !video) return;

  playBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    video.currentTime = 0;
    video.play();
  });

  const closeVideo = () => {
    overlay.classList.remove('active');
    video.pause();
  };

  closeBtn?.addEventListener('click', closeVideo);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeVideo();
    }
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeVideo();
  });

});


/* ===============================
   FLOATING ICONS
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(".expertise-section");
  const icons = document.querySelectorAll(".float-icon");
  let played = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !played) {
        played = true;

        // SPREAD
        icons.forEach((icon, i) => {
          setTimeout(() => {
            icon.classList.add("spread");
          }, i * 100);
        });

        // FLOAT
        setTimeout(() => {
          icons.forEach(icon => icon.classList.add("float"));
        }, 1500);
      }
    });
  }, {
    root: null,
    threshold: 0.2   // SMALL threshold → reliable
  });

  observer.observe(section);

});




/* ===============================
   STATS COUNTER
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const stats = document.querySelectorAll('.stat-number');

  function animateStats() {
    stats.forEach(stat => {
      const target = +stat.dataset.target;
      const suffix = stat.dataset.suffix || '';
      let current = 0;

      const update = () => {
        current += target / 120;
        if (current < target) {
          stat.textContent = Math.ceil(current) + suffix;
          requestAnimationFrame(update);
        } else {
          stat.textContent = target + suffix;
        }
      };

      update();
    });
  }

  const expertise = document.getElementById('expertise');
  if (!expertise) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateStats();
    });
  }, { threshold: 0.5 });

  observer.observe(expertise);

});


/* ===============================
   SERVICES SECTION
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll('.service-item');
  const title = document.querySelector('.details-title');
  const text = document.querySelector('.details-text');

  if (!items.length) return;

  let index = 1;

  function activate(i) {
    items.forEach(el => el.classList.remove('active'));
    items[i].classList.add('active');
    title.textContent = items[i].dataset.title;
    text.textContent = items[i].dataset.desc;
  }

  activate(index);

  setInterval(() => {
    index = (index + 1) % items.length;
    activate(index);
  }, 3000);

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      index = i;
      activate(i);
    });
  });

});




/* ===============================
   CIRCLE SCROLL FILL
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const circles = document.querySelectorAll(".center-logo");
  if (!circles.length) return;

  window.addEventListener("scroll", () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(window.scrollY / max, 0), 1);

    circles.forEach(circle => {
      circle.style.setProperty("--fill", progress);
    });
  });

});




//cards update function//

let index = 0;
let isScrolling = false;
const cards = document.querySelectorAll(".showcase-card");

function updateCards() {
  cards.forEach((card, i) => {
    card.className = "showcase-card";

    const diff = i - index;

    if (diff === 0) {
      card.classList.add("visible");
    } 
    else if (diff === 1) {
      card.classList.add("visible", "below");
    } 
    else if (diff === 2) {
      card.classList.add("visible", "below-2");
    }
  });
}

// initial
updateCards();

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.cursor = "pointer";
  });

  card.addEventListener("mouseleave", () => {
    card.style.cursor = "default";
  });

  card.addEventListener(
    "wheel",
    (e) => {

      // 🔴 LAST CARD + SCROLL DOWN → NORMAL PAGE SCROLL
      if (e.deltaY > 0 && index === cards.length - 1) {
        return; // ❌ preventDefault illa
      }

      // 🔴 FIRST CARD + SCROLL UP → NORMAL PAGE SCROLL
      if (e.deltaY < 0 && index === 0) {
        return;
      }

      e.preventDefault(); // ✅ cards mode

      if (isScrolling) return;
      isScrolling = true;

      card.style.cursor = "grabbing";

      if (e.deltaY > 0 && index < cards.length - 1) {
        index++;
      } else if (e.deltaY < 0 && index > 0) {
        index--;
      }

      updateCards();

      setTimeout(() => {
        isScrolling = false;
        card.style.cursor = "pointer";
      }, 600);
    },
    { passive: false }
  );
});


   // Partners Section - Card Stacking Animation //

 const partnersSection = document.querySelector('.partners-section');

if (partnersSection) {
  const partnerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // section screen-la varumbodhu
          partnersSection.classList.add('scrolled');
        } else {
          // section screen-la irundhu veliya pogumbodhu
          partnersSection.classList.remove('scrolled');
        }
      });
    },
    {
      threshold: 0.50   // 30% visible aana trigger
    }
  );

  partnerObserver.observe(partnersSection);
}

 // carrers Section - Card Stacking Animation //

const contactSection = document.querySelector("#contact");
const image = document.querySelector(".image");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      image.classList.add("animate");
    } else {
      image.classList.remove("animate"); // veliya pona remove
    }
  });
}, { threshold: 0.5 });

observer.observe(contactSection);


// menu bar/////


  const menuBtn = document.getElementById("menuBtn");
  const mobileAside = document.getElementById("mobileAside");
  const closeBtn = document.getElementById("closeBtn");

  menuBtn.addEventListener("click", () => {
    mobileAside.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    mobileAside.classList.remove("active");
  });

  function toggleCareerDropdown(e) {
    e.stopPropagation();
    e.target.closest(".nav-dropdown").classList.toggle("active");
  }















document.addEventListener('DOMContentLoaded', () => {

  const section = document.querySelector('.pinned-expertise');
  const pinCards = document.querySelectorAll('.pin-card');

  if (!section || pinCards.length === 0) {
    console.error('Pinned section or cards not found');
    return;
  }

  const TOTAL_CARDS = pinCards.length;

  function updateCards() {
    if (window.innerWidth <= 1024) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = section.offsetHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    let progress = -rect.top / maxScroll;
    progress = Math.min(Math.max(progress, 0), 0.999);

    const activeIndex = Math.floor(progress * TOTAL_CARDS);

    pinCards.forEach((card, i) => {
      card.classList.toggle('active', i === activeIndex);
      card.classList.toggle('prev', i < activeIndex);
    });
  }

  // Init
  updateCards();

  window.addEventListener('scroll', updateCards);
  window.addEventListener('resize', updateCards);

});
