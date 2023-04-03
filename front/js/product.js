let urlParams = new URLSearchParams(window.location.search)
let productID = urlParams.get('id');
let headTitle = document.querySelector('title')
let imgInsertion = document.querySelector('.item__img')
let productsData = [];
let productData = [];


// Fonction qui recupere la data de l'api


async function fetchProducts() {
    await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => (productsData = data));

    filterByID();
    productDisplay();
}



// Fonction qui ne retient que l'item qui nous interesse via son ID recupere via lurl
function filterByID () {
    for (let i = 0; i < productsData.length; i++) {
        if (productsData[i]._id === productID) {
            productData = productsData[i];
        }
    }
}



// Fonction qui implementes les infos que l'on souhaite intégrer dynamiquement au code html

function productDisplay () {

    headTitle.textContent = productData.name;
    imgInsertion.innerHTML = 
    `
    <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
    `;
    title.textContent = productData.name;
    price.textContent = productData.price;
    description.textContent = productData.description;
    
    colors.innerHTML += productData.colors.map((color) => 
    `
    <option value="${color}">${color}</option>
    `
    )


}

window.addEventListener('load', fetchProducts());