
AOS.init({
    duration: 400,
    easing: 'ease-in-out',
    once: true,
});



  function goBack() {
    window.history.back();
  }





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




/*cards in what we do*/

  const elements = document.querySelectorAll(".reveal");

  const scrollWatcher = new IntersectionObserver(
    (items) => {
      items.forEach((item) => {
        const position = Array.from(elements).indexOf(item.target);

        if (item.isIntersecting) {
          setTimeout(() => {
            item.target.classList.add("active");
          }, position * 500); // 500ms stagger
        } else {
          item.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  elements.forEach(el => scrollWatcher.observe(el));



/* ===============================
  early carrer program drop don
================================ */


function toggleMenu(el) {
  const item = el.parentElement;

  // close other dropdowns
  document.querySelectorAll(".menu-item").forEach(i => {
    if (i !== item) i.classList.remove("active");
  });

  // toggle current
  item.classList.toggle("active");
}

/* close when clicking outside */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-item")) {
    document.querySelectorAll(".menu-item").forEach(i => {
      i.classList.remove("active");
    });
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
  Cards slider
================================ */





/* ===============================
  Apporach section
================================ */


const boxes = document.querySelectorAll(".approach-box");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");   
    } else {
      entry.target.classList.remove("show"); 
    }
  });
}, { threshold: 0.5 });

boxes.forEach(box => observer.observe(box));


/* ===============================
  Apporach section
================================ */


  
function clearFilters() {
  document.querySelectorAll('.filters input[type="checkbox"]').forEach(cb => cb.checked = false);
}

/* ===============================
defined section
================================ */


  const items = document.querySelectorAll(".defined-us");

  items.forEach(item => {
    item.querySelector("h3").addEventListener("click", () => {
      items.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

/* ===============================
  Menu section
================================ */




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
