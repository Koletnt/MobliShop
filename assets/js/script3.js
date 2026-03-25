let phonesData = [];

$(document).ready(function () {
  loadPhones();
  $("#dugmeNavbar").on("click", function () {
    $("#navbarSupportedContent").toggle(600);
  });
});

const btn = document.getElementById("seeMoreBtn");
const content = document.getElementById("moreText");

btn.addEventListener("click", () => {
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    btn.textContent = "See more...";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    btn.textContent = "See less";
  }
});
  

  function prevSlide() {
    //alert($(window).width());
    //alert(window.innerWidth);
    //var windowWidth = $(window).width();
    var windowWidth = window.innerWidth;
    //var marginLeftPercentage = windowWidth < 1200 ? -50 : -33.33;
    if (windowWidth < 600) {
      marginLeftPercentage = -100;
    } else if (windowWidth < 900) {
      marginLeftPercentage = -50;
    } else {
      marginLeftPercentage = -33.33;
    }

    //alert(marginLeftPercentage);
    $(".slide")
      .first()
      .animate(
        {
          // marginLeft: "-33.33%",
          //marginLeft: getWindowWidth() < 1200 ? "-50%" : "-33.33%",
          marginLeft: marginLeftPercentage + "%",
          opacity: 0,
        },
        500,
        function () {
          $(this)
            .css({
              marginLeft: "",
              opacity: 1,
            })
            .appendTo(".slider-wrapper");
        }
      );
    resetInterval();
  }

  function nextSlide() {
    //var windowWidth = $(window).width();
    //var marginLeftPercentage = windowWidth < 1200 ? -50 : -33.33;
    var windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      marginLeftPercentage = -100;
    } else if (windowWidth < 900) {
      marginLeftPercentage = -50;
    } else {
      marginLeftPercentage = -33.33;
    }

    var lastSlide = $(".slide").last().clone();
    $(".slider-wrapper").prepend(lastSlide);
    $(".slide").last().remove();

    $(".slide")
      .first()
      .css({
        //marginLeft: getWindowWidth() < 1200 ? "-50%" : "-33.33%",
        marginLeft: marginLeftPercentage + "%",
        opacity: 0,
      })
      .animate(
        {
          marginLeft: "",
          opacity: 1,
        },
        500
      );

    resetInterval();
  }

  $(".next").on("click", prevSlide);
  $(".prev").on("click", nextSlide);
  var intervalId = setInterval(prevSlide, 3000); // Promena slike svakih 3 sekunde

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(prevSlide, 3000);
  }


function loadPhones() {
    $.ajax({
        url: "assets/data/phones.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            phonesData = data;
            renderPhones();
            
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function renderPhones(){

    const container = $(".slider-wrapper");

    container.empty();

    phonesData.forEach(function(phone){

      const card = `<article class="slide">
    <img class="img" src="${phone.img}" alt="${phone.name}">
    <p class="text-muted">${phone.name}<br> Cena:<span class="text-danger">${phone.price}&euro;</span></p>
  </article>
        `

          container.append(card);
    });
}