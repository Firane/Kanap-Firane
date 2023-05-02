const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");
const headTitle = document.querySelector("title");
const imgInsertion = document.querySelector(".item__img");
const colorsPicker = document.getElementById("colors");

let productData = [];
let panier = [];

// Fonction permettant le tri dans le tableau déclarer dans la variable "panier"
function match() {
  panier.find((element) => element.color === customerPicks.color);
}

// Fonction qui recupere la data de l'api
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products/" + productID)
    .then((res) => res.json())
    .then((data) => (productData = data));
  productDisplay();
}

// Fonction qui implementes les infos que l'on souhaite intégrer dynamiquement au code html
function productDisplay() {
  headTitle.textContent = productData.name;
  imgInsertion.innerHTML = `
    <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
    `;
  title.textContent = productData.name;
  price.textContent = productData.price;
  description.textContent = productData.description;

  colors.innerHTML += productData.colors.map(
    (color) =>
      `
    <option value="${color}">${color}</option>
    `
  );
}

// Fonction qui permet la création d'un objet a ajouter au panier, et de l'ajout de celui ci a un tableau "panier"
function addpanier(color, quantity, id) {
  if (typeof color === "string" && !isNaN(quantity) && typeof id === "string") {
    let added = { color: color, quantity: quantity, id: id };
    panier.push(added);
  }
}

// Duo de fonction qui pour la première ajoute le panier au local Storage, et qui pour la deuxieme ajoute le local storage au panier
function storingCart() {
  window.localStorage.setItem("panier", JSON.stringify(panier));
}
function getStoredCard() {
  const storage = JSON.parse(localStorage.getItem("panier"));
  if (storage !== null) {
    panier = storage;
  }
}

window.addEventListener("load", fetchProducts());

window.addEventListener("load", () => {
  getStoredCard();
});

colorsPicker.addEventListener("change", (e) => {
  addToCart.textContent = "Ajouter au panier";
  addToCart.style.border = "none";
});

quantity.addEventListener("change", (e) => {
  addToCart.textContent = "Ajouter au panier";
  addToCart.style.border = "none";
});

// Création d'une ecoute d'évenement sur le bouton ajouter au panier : Trie directement l'ajout en court et le panier actuel, renvoi un message d'erreur (dans la console) si certains champs sont vides
// Ajoute finalement la selection de l'utilisateur au panier, en local storage et dans la variable.


addToCart.addEventListener("click", (e) => {
  const item = panier.find(
    (element) => element.color === colors.value && element.id === productID
  );
  if (
    quantity.value === "0" ||
    colors.value === "" ||
    productID === undefined
  ) {
    addToCart.textContent =
      "Erreur, vous n'avez pas rempli toutes les infos nécessaires.";
    addToCart.style.border = "3px solid red";
    return;
  } else if (item) {
    item.quantity += Number(quantity.value);
  } else {
    addpanier(colorsPicker.value, Number(quantity.value), productID);
  }
  console.log(panier);
  storingCart();
});