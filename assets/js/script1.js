let phonesData = [];
let brandsData = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

$(document).ready(function () {
    bindEvents();
    loadPhones();
    loadBrands();
    renderCart();
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
    $(document).on("click", ".add", function () {
    const id = Number($(this).parent().data("id"));

    cart.push({ id: id, qty: 1 });

    saveCart();
    renderPhones();
});

$(document).on("click", ".plus", function () {
    const id = Number($(this).parent().data("id"));

    const item = cart.find(p => p.id === id);
    item.qty++;

    saveCart();
    renderPhones();
});

$(document).on("click", ".minus", function () {
    const id = Number($(this).parent().data("id"));

    let item = cart.find(p => p.id === id);

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
    renderPhones();
});
$("#showFavorites").on("change", function () {
    const list = $("#favoritesList");
    list.empty();

    if (this.checked) {
        favoriteIds.forEach(id => {
            const phone = phonesData.find(p => p.id === id);

            if (phone) {
                list.append(`<li>${phone.name} - ${phone.price}€</li>`);
            }
        });
    }
});
$("#checkoutBtn").on("click", function() {
    if(cart.length === 0){
        showToast("Your cart is empty!");
    } else {
        let total = 0;
        cart.forEach(item => {
            const phone = phonesData.find(p => p.id === item.id);
            if(phone){
                total += phone.price * item.qty;
            }
        });
        showToast(`Total amount: ${total}€. Proceeding to checkout...`);
        // Here you can redirect to a checkout page or trigger payment logic

        cart = [];
        saveCart();
    }
});
    
}


function renderPhones(){

    const container = $("#phones");

    container.empty();

    let phones = filterPhones();
    phones=sortPhones(phones);


    phones.forEach(function(phone){
      const item = cart.find(p => p.id === phone.id);
      const qty = item ? item.qty : 0;

      const card = `<article class="col-lg-4 col-md-6 col-sm-12 mb-4">
  <div class="card h-100 text-center" id = "phoneimg">
    <img src="${phone.img}" class="card-img-top" alt="${phone.name}">
    <div class="card-body">
      <h5 class="card-title">${phone.name}</h5>
      <p class="card-text text-danger">${phone.price}€</p>
      <div class="cart-controls" data-id="${phone.id}">
        ${qty > 0 ? `
          <button class="minus">-</button>
          <span>${qty}</span>
          <button class="plus">+</button>
        ` : `
          <button class="add">+</button>
        `}
      </div>
    </div>
  </div>
</article>`;

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


$("#remove").on("click", function() {

    $("#brand").val("all");
    $("#searchInput").val("");
    $("#sort").val("all");

    renderPhones();
});

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart(){
    const list = $("#cartList");
    const totalEl = $("#total");

    list.empty();

    let total = 0;

    cart.forEach(item => {
        const phone = phonesData.find(p => p.id === item.id);

        if(phone){
            const sum = phone.price * item.qty;
            total += sum;

            list.append(`
                <li>
                  ${phone.name} x ${item.qty} = ${sum}€
                </li>
            `);
        }
    });

    totalEl.text(total);
}


function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000); // visible for 3 seconds
}