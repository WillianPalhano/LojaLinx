
$(document).ready(function () {
    var nextPage
    makeRequest("https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1");
});

function moreProducts(){
    makeRequest(nextPage)
};

function makeRequest(url){
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", url, true);
    oReq.send();
}

function reqListener () {
    element = document.getElementById("products")
    res = JSON.parse(this.responseText)
    products = res.products
    nextPage = "https://" + res.nextPage
    products.forEach(product => {
        newProduct = document.createElement("div")
        newProduct.innerHTML = 
        "<img src=http:"+ product.image +" alt="+ product.name +">" +
        "<div>" + 
            "<h2>" + product.name + "</h2>" +  
            "<p>" + product.description +"</p>" +
            "<div class='price'>" +
                "<h3>De: R$ "+ moneyFormat(product.oldPrice) +"</h3>" +
                "<h4>Por: R$ "+ moneyFormat(product.price) +"</h4>" +
                "<h3>ou "+ product.installments.count +"x de R$ "+ moneyFormat(product.installments.value) +"</h3>" +
            "</div>" +
            "<button class='buy  button'>Comprar</button>" +
        "</div>";
        element.appendChild(newProduct)
    });
};

function moneyFormat(num) {
    return num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function validateForm() {
    if (document.getElementById("cpf").value.length != 11){
        alert("CPF inválido.")
    } else {
        alert("Formulário enviado.")
    }
}