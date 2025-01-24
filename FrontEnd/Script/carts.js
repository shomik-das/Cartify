const fetchData = async () => {
    try {
        const token = getCookie('token');
        console.log("Token from cookie in frontend: ", token);

        const response = await fetch('http://localhost:3001/cart/v1/getAllCartProducts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();

        if (data.loggedIn === false) {
            createCartPage([]);
        } else {
            createCartPage(data);
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

function getCookie(name) {
    console.log(document.cookie);
    const cookieArr = document.cookie.split(";");
    //isadmin=true
    //token="jwt";
    //["isadmin=true","token="jwt]
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("="); //["isadmin","true"];   "    token    "
        if ("token" === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
         }
    }
    return null;
}

fetchData();

function createCartPage(data) {
    const cartItemsBody = document.getElementById('cart-items-body');
    const totalItemsDisplay = document.getElementById('total-items');
    const summaryItems = document.getElementById('summary-items');
    const summaryPrice = document.getElementById('summary-price');

    let totalItems = 0;
    let totalPrice = 0;
    data.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.product.price * item.quantity;

        row.innerHTML = `
            <td>
                <div class="item-details">
                    <img src="http://localhost:3001/${item.product.filename}" alt="${item.product.name}" style="width: 50px; height: 50px;">
                    <span>${item.product.name}</span>
                </div>
            </td>
            <td>$${item.product.price}</td>
            <td>
                <button class="quantity-btn" data-product-id="${item.product._id}" onclick="updateQuantity('${item.product._id}', false)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-product-id="${item.product._id}" onclick="updateQuantity('${item.product._id}', true)">+</button>
            </td>
            <td>$${itemTotal}</td>
            <td><button class="remove-btn" data-product-id="${item.product._id}" onclick="removeItem('${item.product._id}')">Remove</button></td>
        `;
        cartItemsBody.appendChild(row);

        totalItems += item.quantity;
        totalPrice += itemTotal;
    });

    totalItemsDisplay.textContent = totalItems;
    summaryItems.textContent = totalItems;
    summaryPrice.textContent = totalPrice.toFixed(2);
}

async function updateQuantity(productId, isIncrement) {
    try {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:3001/cart/v1/update/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ increment: isIncrement })
        });

        const data = await response.json();
        if (data.success) {
            // Refresh the cart page
            fetchData(); 
        } else {
            console.error("Failed to update quantity:", data.message);
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
    }
}

async function removeItem(productId) {
    try {
        const token = getCookie('token');
        const response = await fetch(`http://localhost:3001/cart/v1/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.success) {
            // Refresh the cart page
            fetchData(); 
        } else {
            console.error("Failed to remove item:", data.message);
        }
    } catch (error) {
        console.error("Error removing item:", error);
    }
}
