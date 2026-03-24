$(document).ready(function () {
  $("#dugmeNavbar").on("click", function (e) {
    $("#navbarSupportedContent").toggle(600);
  });

  var nizTelefona = [
    {
      proizvodjac: "Apple",
      cena: 2200,
      slika: "apple-iphone-13-pro-max.jpg",
      opis: "Apple Iphone 13 Pro Max",
    },
    {
      proizvodjac: "Apple",
      cena: 1800,
      slika: "apple-iphone-13.jpg",
      opis: "Apple Iphone 13 Pro",
    },
    {
      proizvodjac: "Apple",
      cena: 1200,
      slika: "apple-iphone-12-pro.jpg",
      opis: "Apple Iphone 12 Pro Max",
    },
    {
      proizvodjac: "Huawei",
      cena: 350,
      slika: "huawei-nova-5t.jpg",
      opis: "Huawei Nova 5t",
    },
    {
      proizvodjac: "Huawei",
      cena: 450,
      slika: "huawei-p40.jpg",
      opis: "Huawei P40",
    },
    {
      proizvodjac: "Huawei",
      cena: 700,
      slika: "huawei-p50-pro.jpg",
      opis: "Huawei P50 Pro",
    },
    {
      proizvodjac: "Realme",
      cena: 200,
      slika: "realme-9-pro-plus.jpg",
      opis: "Realme 9 Pro Plus",
    },
    {
      proizvodjac: "Realme",
      cena: 250,
      slika: "realme-c35.jpg",
      opis: "Realme C35",
    },
    {
      proizvodjac: "Realme",
      cena: 180,
      slika: "realme-gt2.jpg",
      opis: "Realme Gt2",
    },
    {
      proizvodjac: "Samsung",
      cena: 2500,
      slika: "samsung-galaxy-note20-5g-pro.jpg",
      opis: "Samsung Galaxy Note",
    },
    {
      proizvodjac: "Samsung",
      cena: 2800,
      slika: "samsung-galaxy-s20-ultra-pro.jpg",
      opis: "Samsung Galaxy S20 Ultra Pro",
    },
    {
      proizvodjac: "Samsung",
      cena: 2900,
      slika: "samsung-galaxy-z-fold2-5g.jpg",
      opis: "Samsung Galaxy Z Fold2-5g",
    },
  ];

  for (i = 0; i < nizTelefona.length; i++) {
    Prikaz(nizTelefona[i]);
  }

  function Prikaz(el) {
    var article = `<article class="slide">
    <img class="img" src="assets/slike/${el.slika}" alt="Slika telefona">
    <p class="text-muted">${el.opis}<br> Cena:<span class="text-danger">${el.cena}&euro;</span></p>
  </article>
        `;

    //$(".slide").appendTo(".slider-wrapper");
    //article.appendTo(".slider-wrapper");
    $(".slider-wrapper").append(article);
  }

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
});
