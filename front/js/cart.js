// Il va falloir recup l'id du produit et la couleur pour les modifications
// via l'onglet panier. Probablement avec un event listener qui prendrai un truc
// comme l'utilisation de element.closest() qui permettrait de mettre le doigt sur
// l'article cart__item qui a dans sa balise les infos couleur/id via data-id
// et data-color

let panier = [];
let productsData = [];
let panierPrice = 0;
let panierTotalQuantity = 0;
const cartItems = document.getElementById("cart__items");
const divcart__price = document.querySelector(".cart__price");
let itemQuantityButtons = document.querySelectorAll("input.itemQuantity");

// Duo de fonction qui pour la première ajoute le panier au local Storage, et qui pour la deuxieme ajoute le local storage au panier
function storingCart() {
  window.localStorage.panier = JSON.stringify(panier);
}
function getStoredCart() {
  panier = JSON.parse(window.localStorage.panier);
}
// Fonction qui calcule et affiche la totalité du nombre d'article ainsi que la somme total des produits figurants dans le panier
function total() {
  panierPrice = 0;
  panierTotalQuantity = 0;
  for (i = 0; i < panier.length; i++) {
    panierPrice += productsData[i].price * panier[i].quantity;
    panierTotalQuantity += panier[i].quantity;
  }
  totalPrice.textContent = panierPrice;
  totalQuantity.textContent = panierTotalQuantity;
  if (panierTotalQuantity <= 1) {
    divcart__price.innerHTML = `<p>Total <span id="totalQuantity">${panierTotalQuantity}</span> article : <span id="totalPrice">${panierPrice}</span> €</p>`;
  }
}

// Requête a pour obtenir la data
async function getProductData(id) {
  await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => productsData.push(data));
}

// Boucle afin de pouvoir recuperer vis a vis de l'api la data eauivalente aux elements de mon panier
async function getCartDatas() {
  for (i = 0; i < panier.length; i++) {
    await getProductData(panier[i].id);
  }
}

// On recupère un tableau contenant tous les boutons liés a la modification de la quantité d'item.
function getitemQuantityButtons() {
  return document.querySelectorAll("input.itemQuantity");
}

// On recupère un tableau contenant tous les boutons liés a la supression d'item.
function getDeleteItemButtons() {
  return document.querySelectorAll("p.deleteItem");
}

// Création d'une fonction permettant les modifications d'affichages et de stockage du contenu du panier correspondant
// avec les interactions, liées a la quantité, de l'utilisateur
function addListenersMultipleElementsQuantity() {
  getitemQuantityButtons().forEach((element) => {
    element.addEventListener("change", (e) => {
      const item = element.closest("article");
      const para = element.previousElementSibling;
      const itemInfo = [item.dataset.color, item.dataset.id];
      const found = panier.find(
        (element) => element.color === itemInfo[0] && element.id === itemInfo[1]
      );
      found.quantity = Number(e.target.value);
      window.localStorage.setItem("panier", JSON.stringify(panier));
      para.textContent = `Qté : ${found.quantity}`;
      total();
      //La prochaine étape c'est recupération de l'id et color via le dataset, et faire correspondre nos actions avec la variable panier ainsi que le local storage.
    });
  });
}

// Création d'une fonction permettant les modifications d'affichages et de stockage du contenu du panier correspondant
// avec les interactions, liées a la supression, de l'utilisateur
function addListenersMultipleElementsDelete() {
  getDeleteItemButtons().forEach((element) => {
    element.addEventListener("click", (e) => {
      const item = element.closest("article");
      const itemInfo = [item.dataset.color, item.dataset.id];
      const found = panier.find(
        (element) => element.color === itemInfo[0] && element.id === itemInfo[1]
      );
      panier = panier.filter((item) => item !== found);
      window.localStorage.setItem("panier", JSON.stringify(panier));
      total();
      item.remove();
      if (panier.length === 0) {
        cartDisplay();
      }
    });
  });
}

// Fonction permettant l'affichage de toutes les "articles" du panier de l'utilisateur
async function cartDisplay() {
  await getCartDatas();
  total();
  if (panier.length === 0) {
    cartItems.innerHTML = `
      <p style="text-align: center">Vous n'avez aucun article dans votre panier.<br>
      N'hésitez pas à consulter <a href="./index.html">nos articles</a> et à faire votre choix.</p>
    `;
  } else {
    cartItems.innerHTML = panier
      .map(
        (cartItem, index) => `
      <article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
              <div class="cart__item__img">
                <img src="${productsData[index].imageUrl}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${productsData[index].name}</h2>
                  <p>${cartItem.color}</p>
                  <p>${productsData[index].price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${cartItem.quantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
      `
      )
      .join("");

    addListenersMultipleElementsQuantity();
    addListenersMultipleElementsDelete();
  }
}

window.addEventListener("load", () => {
  getStoredCart();
  cartDisplay();
});
