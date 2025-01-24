async function fetchAndDisplayProducts() {
    try {
      const productList = document.getElementById("productList");
      const response = await fetch("http://localhost:3001/dashboard/v1/products");
      const products = await response.json();
  
      // Clear productList before appending new products
      productList.innerHTML = '';
  
      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-card");
  
        productItem.innerHTML = `
          <img src="http://localhost:3001/${product.filename}" alt="${product.name}" class="product-image">
          <div class="product-details">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <div class="buttons">
              <a href="http://localhost:3001/crud/v1/deletePage/${product._id}" class="btn delete-btn">Delete</a>
              <a href="http://localhost:3001/crud/v1/details/${product._id}" class="btn details-btn">Details</a>
              <a href="http://localhost:3001/crud/v1/updatePage/${product._id}" class="btn update-btn">Update</a>
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
  