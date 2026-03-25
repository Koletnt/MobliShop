$(document).ready(function () {
  $(".btn").on("click", function (e) {

    e.preventDefault();
    if ($(".error").length) {
      $(".error").remove();
    } else if ($(".suc").length) {
      $(".suc").remove();
    }

    var name = $("#name").val();
    var surname = $("#surname").val();
    var mail = $("#mail").val();
    var phoneNumber = $("#phoneNumber").val();
    var title = $("#title").val();
    var message = $("#message").val();

    var nameSurnameRegex = /^[A-Z][a-z]{2,10}$/;
    if (!nameSurnameRegex.test(name)) {
      var i =
        "<p class='text-danger error name'>Ime mora da sadrži bar tri karaktera i da pocne velikim slovom!</p>";
      $("#name").after(i);
    }

    if (!nameSurnameRegex.test(surname)) {
      var i =
        "<p class='text-danger error surname'>Prezime mora da sadrži bar tri karaktera i da pocne velikim slovom!</p>";
      $("#surname").after(i);
    }

    //var emailRegex = /^\w{4,}@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    var emailRegex = /^\w{4,}(@gmail.com|@yahoo.com|@hotmail.com)$/;

    if (!emailRegex.test(mail)) {
      var i =
        "<p class='text-danger error mail'>Mail nije unet u pravilnom formatu:mail@gmail.com</p>";
      $("#mail").after(i);
    }

    var telefonRegex = /^(069|060|063|064|061)[\-]?\d{6,7}$/;
    if (!telefonRegex.test(phoneNumber)) {
      var i =
        "<p class='text-danger error phoneNumber'>Telefon nije unet u pravilnom formatu:060123456</p>";
      $("#phoneNumber").after(i);
    }

    var titleRegex = /^[A-Za-z ]{5,}$/;
    if (!titleRegex.test(title)) {
      var i =
        "<p class='text-danger error title'>Naslov mora da ima barem 5 slova</p>";
      $("#title").after(i);
    }

    var messageRegex = /^.{10,}$/;
    if (!messageRegex.test(message)) {
      var i =
        "<p class='text-danger error message'>Poruka mora da ima barem 10 slova</p>";
      $("#message").after(i);
    }

    if (!$(".error").length) {
      var i = `<p class='text-success suc'>Poruka je uspesno poslata!!!</p>`;
      $("#form").before(i);

      $("#name").val("");
      $("#surname").val("");
      $("#mail").val("");
      $("#phoneNumber").val("");
      $("#title").val("");
      $("#message").val("");
    }
  });

  $("#name").on("input", function () {

    var name = $("#name").val();
    var nameSurnameRegex = /^[A-Z][a-z]{2,10}$/;
    if (nameSurnameRegex.test(name)) {
      $(".error.name").remove();
    }
  });

  $("#surname").on("input", function () {

    var name = $("#surname").val();
    var nameSurnameRegex = /^[A-Z][a-z]{2,}$/;
    if (nameSurnameRegex.test(name)) {
      $(".error.surname").remove();
    }
  });

  $("#mail").on("input", function () {
    var mail = $("#mail").val();
    var mailRegex = /^\w{4,}(@gmail.com|@yahoo.com|@hotmail.com)$/;
    if (mailRegex.test(mail)) {
      $(".error.mail").remove();
    }
  });

  $("#phoneNumber").on("input", function () {
    var phoneNumber = $("#phoneNumber").val();
    var telefonRegex = /^(069|060|063|064|061)[\-]?\d{6,7}$/;
    if (telefonRegex.test(phoneNumber)) {
      $(".error.phoneNumber").remove();
    }
  });

  $("#title").on("input", function () {
    var title = $("#title").val();
    var titleRegex = /^[A-Za-z ]{5,}$/;
    if (titleRegex.test(title)) {
      $(".error.title").remove();
    }
  });

  $("#message").on("input", function () {
    var message = $("#message").val();
    var messageRegex = /^.{10,}$/;
    if (messageRegex.test(message)) {
      $(".error.message").remove();
    }
  });
});
