let productsData = [];
let productsContainer = document.getElementById("items");

// fonction qui récupère toute la data depuis l'API
async function fetchProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (productsData = data));

  productsDisplay();
}

// Fonction qui génère l'article html pour chaque produits
function productsDisplay() {
  productsContainer.innerHTML = productsData
    .map(
      (product) =>
        `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
        </a>
        `
    )
    .join("");
}

window.addEventListener("load", fetchProducts);
