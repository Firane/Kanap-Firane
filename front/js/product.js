let urlParams = new URLSearchParams(window.location.search)
let idNumber = urlParams.get('id');
let product = [];


async function fetchOneProduct() {
    await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => (console.log(data)));
}