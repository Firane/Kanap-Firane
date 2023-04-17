const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');
const headTitle = document.querySelector('title');
const imgInsertion = document.querySelector('.item__img');


let customerChoices = [];
let customerPicks = {};
let customerQuantityPicked;
let cartProductId = {
    id : productID
}
const colorsPicker = document.getElementById('colors');
let productData = [];

let panier = [];
let finalPanier = [];
class commande {
    constructor(color, quantity, id) {
      this.color = color;
      this.quantity = quantity;
      this.id = id;
    }
  }


  function match () {
    panier.find(element => element.color === customerPicks.color)
};


// Fonction qui recupere la data de l'api


async function fetchProducts() {
    await fetch('http://localhost:3000/api/products/' + productID)
    .then((res) => res.json())
    .then((data) => (productData = data));
    productDisplay();
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



function addpanier (color, quantity, id) {
    if(typeof color === 'string' && !isNaN(quantity) && typeof id === 'string') {
        let added = new commande(color, quantity, id);
        panier.push(added)
    }
}


window.addEventListener('load', fetchProducts());

colorsPicker.addEventListener('click', (e) => {
    if (e.target.value != "") {
    let colorChoice = e.target.value;
    customerPicks.color = colorChoice;
    customerPicks.id = productID;
    console.log(customerPicks);
    }
    if (e.target.value === '') {
        customerPicks.color = null;
        customerPicks.quantity = null;
        customerPicks.id = null;
        console.log(customerPicks);
    }
})


quantity.addEventListener('click', (e) => {
    if (e.target.value != 0) {
        let quantityChoice = e.target.value;
        customerPicks.quantity = Number(quantityChoice);
        customerPicks.id = productID;
        console.log(customerPicks);
        }
    if (e.target.value === 0) {
        customerPicks.color = null;
        customerPicks.quantity = null;
        customerPicks.id = null;
        console.log(customerPicks);
    }
})


// le probleme cest le stacking dans le local storage.. creer plusieurs objets via une fonction ? quon push qlqchose de diff a chaque fois au lieu de la meme variable avec valeur diff

addToCart.addEventListener('click', e => {
    if (panier.find(element => element.color === customerPicks.color) && panier.find(element => element.id === customerPicks.id)){
        // element.quantity += customerPicks.quantity
        panier.find(element => element.color === customerPicks.color).quantity += customerPicks.quantity;
    }
    else if (customerPicks.quantity === null || customerPicks.color === null || customerPicks.id === null) {
        console.log("Erreur, vous n'avez pas remplis toutes les infos nécessaires.");        
    }
    else {
        addpanier(customerPicks.color, customerPicks.quantity, customerPicks.id)
    }
    // addpanier(customerPicks.color, customerPicks.quantity, customerPicks.id)
    console.log(panier);
    // localStorage.setItem('panier', JSON.stringify(customerChoices));
    }
)
