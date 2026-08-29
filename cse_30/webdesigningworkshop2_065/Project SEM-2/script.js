// Load the application's global state array from browser memory
let cart = JSON.parse(localStorage.getItem('watchCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartCountUI();
    setupCartActions();
});

// Setup actions for dynamic item additions/removals
function setupCartActions() {
    // 1. Add to Cart Handling
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            
            const title = card.querySelector('h4').textContent.trim();
            const priceText = card.querySelector('p[style*="font-size:20px"]').textContent.trim();
            
            // Regex parsing converts string configurations ("₹11,499") into computation-ready Integers (11499)
            const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

            const product = { title, price };
            addToCart(product);
        });
    });

    // 2. Place Order Processing
    const orderBtn = document.getElementById('place-order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Your cart is empty. Please visit our watch sections to select an item first!");
                return;
            }

            // Reduce operation tracks sum across multiple keys
            const totalCost = cart.reduce((accumulatedSum, currentItem) => {
                return accumulatedSum + (currentItem.price * currentItem.quantity);
            }, 0);

            alert(`🎉 Order Confirmed Successfully!\nTotal Bill Amount: ₹${totalCost.toLocaleString('en-IN')}\n\nThank you for shopping with DIESEL.`);
            
            clearCartEngine();
        });
    }

    // 3. Reset Engine Functionality
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to clear your current selection?")) {
                clearCartEngine();
            }
        });
    }
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.title === product.title);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('watchCart', JSON.stringify(cart));
    updateCartCountUI();
    alert(`"${product.title}" added to your shopping cart!`);
}

function clearCartEngine() {
    cart = [];
    localStorage.removeItem('watchCart');
    updateCartCountUI();
    if (document.getElementById('place-order-btn')) {
        location.reload(); 
    }
}

function updateCartCountUI() {
    const cartBadges = document.querySelectorAll('#cart-count');
    const aggregateUnits = cart.reduce((total, element) => total + element.quantity, 0);
    
    cartBadges.forEach(badge => {
        badge.textContent = aggregateUnits;
    });
}