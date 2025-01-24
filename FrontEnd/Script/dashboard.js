const token = getCookie('token'); 
const isAdmin = getCookie('isAdmin');
console.log("this is isAdmin: ", isAdmin);

async function fetchAndDisplayProducts() {
  try {
    const productList = document.getElementById("productList");
    const response = await fetch("http://localhost:3001/dashboard/v1/products");
    const products = await response.json();

    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-card");
      
      productItem.innerHTML = `
        <img src="http://localhost:3001/${product.filename}" alt="${product.name}">
        <div class="product-details">
          <h3>${product.name}</h3>
          <p class="price">Price: ${product.price}</p>
          <p class="description">${product.description}</p> <!-- Added Description -->
          <div class="buttons">
            <a href="http://localhost:3001/crud/v1/details/${product._id}"><button>Details</button></a>
            <a href="http://localhost:3001/cart/v1/addToCart/${product._id}"><button>Add to Cart</button></a>
          </div>
        </div>
      `;
      
      productList.appendChild(productItem);
    });
  } catch (error) {
    console.error("Error fetching and displaying products:", error);
  }
}

fetchAndDisplayProducts();



document.addEventListener('DOMContentLoaded', async () => {
  console.log(token);
  if (!token) {
    console.log("in the if")
      document.querySelector('.logout-btn').style.display = 'none';
      document.querySelector('.add-product-btn').style.display = 'none';
  } 
  else if (isAdmin === "false") {
    console.log("in the else if");
    document.querySelector('.add-product-btn').style.display = 'none';
  }
});

function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=');
      if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

