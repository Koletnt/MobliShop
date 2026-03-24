$(document).ready(function () {
  $(".btn").on("click", function (e) {
    // Dobijanje unosa korisnika

    e.preventDefault();
    // Uklanjanje elemenata sa klasom "error"
    if ($(".error").length) {
      $(".error").remove();
    } else if ($(".suc").length) {
      $(".suc").remove();
    }

    // Dobijanje vrednosti input polja
    var ime = $("#ime").val();
    var prezime = $("#prezime").val();
    var mail = $("#mail").val();
    var brojTelefona = $("#brojTelefona").val();
    var naslov = $("#naslov").val();
    var poruka = $("#poruka").val();

    //Regex provere ulaza
    var imePrezimeRegex = /^[A-Z][a-z]{2,10}$/;
    if (!imePrezimeRegex.test(ime)) {
      var i =
        "<p class='text-danger error ime'>Ime mora da sadrži bar tri karaktera i da pocne velikim slovom!</p>";
      $("#ime").after(i);
    }

    if (!imePrezimeRegex.test(prezime)) {
      var i =
        "<p class='text-danger error prezime'>Prezime mora da sadrži bar tri karaktera i da pocne velikim slovom!</p>";
      $("#prezime").after(i);
    }

    //var emailRegex = /^\w{4,}@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    var emailRegex = /^\w{4,}(@gmail.com|@yahoo.com|@hotmail.com)$/;

    if (!emailRegex.test(mail)) {
      var i =
        "<p class='text-danger error mail'>Mail nije unet u pravilnom formatu:mail@gmail.com</p>";
      $("#mail").after(i);
    }

    var telefonRegex = /^(069|060|063|064|061)[\-]?\d{6,7}$/;
    if (!telefonRegex.test(brojTelefona)) {
      var i =
        "<p class='text-danger error brojTelefona'>Telefon nije unet u pravilnom formatu:060123456</p>";
      $("#brojTelefona").after(i);
    }

    var naslovRegex = /^[A-Za-z ]{5,}$/;
    if (!naslovRegex.test(naslov)) {
      var i =
        "<p class='text-danger error naslov'>Naslov mora da ima barem 5 slova</p>";
      $("#naslov").after(i);
    }

    var porukaRegex = /^.{10,}$/;
    if (!porukaRegex.test(poruka)) {
      var i =
        "<p class='text-danger error poruka'>Poruka mora da ima barem 10 slova</p>";
      $("#poruka").after(i);
    }

    if (!$(".error").length) {
      var i = `<p class='text-success suc'>Poruka je uspesno poslata!!!</p>`;
      $("#form").before(i);

      $("#ime").val("");
      $("#prezime").val("");
      $("#mail").val("");
      $("#brojTelefona").val("");
      $("#naslov").val("");
      $("#poruka").val("");
    }
  });

  $("#ime").on("input", function () {
    // Ovaj kod će se izvršiti svaki put kada korisnik unese tekst u polje

    var ime = $("#ime").val();
    var imePrezimeRegex = /^[A-Z][a-z]{2,10}$/;
    if (imePrezimeRegex.test(ime)) {
      $(".error.ime").remove();
    }
  });

  $("#prezime").on("input", function () {
    // Ovaj kod će se izvršiti svaki put kada korisnik unese tekst u polje

    var ime = $("#prezime").val();
    var imePrezimeRegex = /^[A-Z][a-z]{2,}$/;
    if (imePrezimeRegex.test(ime)) {
      $(".error.prezime").remove();
    }
  });

  $("#mail").on("input", function () {
    // Ovaj kod će se izvršiti svaki put kada korisnik unese tekst u polje
    var mail = $("#mail").val();
    var mailRegex = /^\w{4,}(@gmail.com|@yahoo.com|@hotmail.com)$/;
    if (mailRegex.test(mail)) {
      $(".error.mail").remove();
    }
  });

  $("#brojTelefona").on("input", function () {
    // Ovaj kod će se izvršiti svaki put kada korisnik unese tekst u polje
    var brojTelefona = $("#brojTelefona").val();
    var telefonRegex = /^(069|060|063|064|061)[\-]?\d{6,7}$/;
    if (telefonRegex.test(brojTelefona)) {
      $(".error.brojTelefona").remove();
    }
  });

  $("#naslov").on("input", function () {
    // Ovaj kod će se izvršiti svaki put kada korisnik unese tekst u polje
    var naslov = $("#naslov").val();
    var naslovRegex = /^[A-Za-z ]{5,}$/;
    if (naslovRegex.test(naslov)) {
      $(".error.naslov").remove();
    }
  });

  $("#poruka").on("input", function () {
    // Ovaj kod će se izvršiti svaki put kada korisnik unese tekst u polje
    var poruka = $("#poruka").val();
    var porukaRegex = /^.{10,}$/;
    if (porukaRegex.test(poruka)) {
      $(".error.poruka").remove();
    }
  });
});
