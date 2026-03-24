/*var nizTelefona = [
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

for (i = 0, pom = []; i < nizTelefona.length; i++) {
  if (!pom.includes(nizTelefona[i].proizvodjac)) {
    pom.push(nizTelefona[i].proizvodjac);
    var telefon = `<option value=${nizTelefona[i].proizvodjac}>
				${nizTelefona[i].proizvodjac}
			</option>`;
    document
      .getElementById("proizvodjac")
      .insertAdjacentHTML("beforeend", telefon);
  }
}

for (i = 0; i < nizTelefona.length; i++) {
  Prikaz(nizTelefona[i]);
}

function Prikaz(el) {
  var article = `<article class="col-lg-4 col-sm-6 mb-4 justify-content-center d-flex">
        <div class="w-75">
				<img src="assets/slike/${el.slika}" alt="">
				<p class="text-muted">${el.opis} <br> Cena:<span class="text-danger">${el.cena}&euro;</p>
        </div>
					</article>
			`;

  document
    .getElementById("nizTelefona")
    .insertAdjacentHTML("beforeend", article);
}

document.getElementById("dugme").addEventListener("click", function () {
  document.getElementById("proizvodjac").value = "svi";

  document.getElementById("cena").value = 3000;
  Cena();
});

function Cena() {
  document.getElementById("nizTelefona").innerHTML = "";

  var proizvodjac = document.getElementById("proizvodjac").value;
  var cena = document.getElementById("cena").value;
  document.getElementById("gornjaCena").innerHTML = cena + "&euro;";
  var rez = nizTelefona.filter(function (el) {
    if (proizvodjac != "svi")
      return el.proizvodjac == proizvodjac && el.cena <= cena;
    else return el.cena <= cena;
  });
  for (i = 0; i < rez.length; i++) {
    Prikaz(rez[i]);
  }
}

function Proizvodjac() {
  document.getElementById("nizTelefona").innerHTML = "";

  // console.log(this.value);
  var proizvodjac = document.getElementById("proizvodjac").value;
  var cena = document.getElementById("cena").value;
  var rez = nizTelefona.filter(function (el) {
    if (proizvodjac != "svi")
      return el.proizvodjac == proizvodjac && el.cena <= cena;
    else return el.cena <= cena;
  });
  for (i = 0; i < rez.length; i++) {
    Prikaz(rez[i]);
  }
}

var range = document.getElementById("cena");
range.addEventListener("change", Cena, false);

var select = document.getElementById("proizvodjac");
select.addEventListener("change", Proizvodjac, false);
*/

let phonesData = [];
let brandsData = [];
let favoriteIds = [];

$(document).ready(function () {
    bindEvents();
    loadPhones();
    loadBrands();
});

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

function loadBrands() {
    $.ajax({
        url: "assets/data/brand.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            brandsData = data;
            populateBrands();
            renderPhones()
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function populateBrands() {
    const select = $("#brand");

    brandsData.forEach(function (brand) {
        select.append(`<option value="${brand.id}">--${brand.name}--</option>`);
    });
}

function bindEvents() {
    $("#brand").on("change", function () {
        renderPhones();
    });

    $("#searchInput").on("input", function () {
        renderPhones();
    });

    $("#sort").on("input", function () {
        renderPhones();
    });

    
}


function renderPhones(){

    const container = $("#phones");

    container.empty();

    let phones = filterPhones();
    phones=sortPhones(phones);


    phones.forEach(function(phone){

      const card = `<article class="col-lg-4 col-sm-6 mb-4 justify-content-center d-flex">
        <div class="w-75">
				<img src="${phone.img}" alt="${phone.name}">
				<p class="text-muted">${phone.name} <br> Cena:<span class="text-danger">${phone.price}&euro;</p>
        </div>
					</article>`

          container.append(card);
    });
}


function filterPhones(){
    const brand = $("#brand").val();
    const searchInput = $("#searchInput").val().trim().toLowerCase();

    return phonesData.filter(function (phone) {
        const matchesBrand = brand === "all" || Number(brand) === phone.brandId;
        const matchesSearch = phone.name.toLowerCase().includes(searchInput);
        console.log(matchesBrand);
        

        return matchesBrand && matchesSearch;
    });
}


function sortPhones(p){
    const sortValue = $("#sort").val();
    const sortedPhones = [...p];

    sortedPhones.sort(function (a, b) {
        
        if (sortValue === "price-asc") {
            return a.price - b.price;
        }

        if (sortValue === "price-desc") {
            return b.price - a.price;
        }

        if (sortValue === "name-asc") {
            return a.name.localeCompare(b.name);
        }
        if (sortValue === "name-desc") {
            return b.name.localeCompare(a.name);
        }
        

        return a.id - b.id;
    });

    return sortedPhones;
}


$("#remove").on("click",function(){
    $("#searchInput").clear();
})