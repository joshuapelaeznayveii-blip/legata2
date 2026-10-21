const cards = document.querySelectorAll(".glass-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        if (window.innerWidth < 1024) {

            cards.forEach(c => {
                if (c !== card) c.classList.remove("active");
            });

            card.classList.toggle("active");

        }

    });

});









const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        if (mobileMenu.classList.contains("max-h-0")) {

            mobileMenu.classList.remove("max-h-0", "opacity-0");
            mobileMenu.classList.add("max-h-96", "opacity-100");

        } else {

            mobileMenu.classList.remove("max-h-96", "opacity-100");
            mobileMenu.classList.add("max-h-0", "opacity-0");

        }

    });

}




function book() {
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let people = document.getElementById("people").value;

  let reservation = {
    name,
    date,
    time,
    people
  };

  let data = JSON.parse(localStorage.getItem("reservations")) || [];
  data.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(data));

  document.getElementById("msg").innerText = "Reservation successful!";
}


// ================================
// EVENT DETAILS SLIDE ANIMATION
// ================================

const showDetailsBtn = document.getElementById("showDetails");
const hideDetailsBtn = document.getElementById("hideDetails");

const eventList = document.getElementById("eventList");
const detailsPanel = document.getElementById("detailsPanel");

showDetailsBtn.addEventListener("click", () => {

    eventList.classList.add("-translate-x-full", "opacity-0");

    detailsPanel.classList.remove("translate-x-full", "opacity-0");

});

hideDetailsBtn.addEventListener("click", () => {

    eventList.classList.remove("-translate-x-full", "opacity-0");

    detailsPanel.classList.add("translate-x-full", "opacity-0");

});



