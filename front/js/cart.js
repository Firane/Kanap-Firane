// Il va falloir recup l'id du produit et la couleur pour les modifications
// via l'onglet panier. Probablement avec un event listener qui prendrai un truc
// comme l'utilisation de element.closest() qui permettrait de mettre le doigt sur
// l'article cart__item qui a dans sa balise les infos couleur/id via data-id
// et data-color

let panier = [];
let productsData = [];
const cartItems = document.getElementById('cart__items');

// Duo de fonction qui pour la première ajoute le panier au local Storage, et qui pour la deuxieme ajoute le local storage au panier
function storingCart () {
    window.localStorage.panier = JSON.stringify(panier);
  }
  function getStoredCart () {
    panier = JSON.parse(window.localStorage.panier);
}

async function getProductData(id) {
  await fetch('http://localhost:3000/api/products/' + id)
  .then((res) => res.json())
  .then((data) => (productsData.push(data)));
}

async function test() {
  for (i = 0; i < panier.length; i++) {
  await getProductData(panier[i].id);
}}

async function cartDisplay(){
  await test();
//  CREATEELEMENT ++
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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
      `
      )
      .join('')
}


window.addEventListener('load', () => {
    getStoredCart();
    cartDisplay();
})