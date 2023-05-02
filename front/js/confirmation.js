const urlParams = new URLSearchParams(window.location.search);
const orderNumber = urlParams.get("orderid");

orderId.textContent = orderNumber;