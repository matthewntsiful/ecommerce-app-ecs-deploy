// Main JavaScript file for BlakkBrotherInc Marketplace
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  setupMobileMenu();
  updateCartCount();
  
  // Add event listeners for product cards if they exist
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
});

// Mobile menu toggle
function setupMobileMenu() {
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.classList.add('mobile-menu-toggle');
  mobileMenuButton.innerHTML = '☰';
  
  const nav = document.querySelector('#main-nav .container');
  if (nav) {
    nav.prepend(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', function() {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('show');
    });
  }
}

// Update cart count in the header
function updateCartCount() {
  // This would typically fetch from localStorage or an API
  const cartItems = getCartItems();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Create or update cart count element
  let cartLink = document.querySelector('.nav-links a[href*="cart"]');
  if (cartLink) {
    if (cartCount > 0) {
      let countBadge = cartLink.querySelector('.cart-count');
      if (!countBadge) {
        countBadge = document.createElement('span');
        countBadge.classList.add('cart-count');
        cartLink.appendChild(countBadge);
      }
      countBadge.textContent = cartCount;
    }
  }
}

// Handle add to cart button click
function handleAddToCart(event) {
  event.preventDefault();
  
  // Get product details
  const productCard = event.target.closest('.product-card') || document.querySelector('.product-details');
  if (!productCard) return;
  
  const productId = getProductId();
  const productName = productCard.querySelector('h3')?.textContent || document.querySelector('.product-info h1')?.textContent;
  const productPrice = productCard.querySelector('.price')?.textContent || document.querySelector('.product-price')?.textContent;
  const quantity = document.getElementById('quantity')?.value || 1;
  
  // Add to cart
  addToCart({
    id: productId,
    name: productName,
    price: productPrice,
    quantity: parseInt(quantity),
    image: getProductImage()
  });
  
  // Show confirmation
  showNotification('Product added to cart!');
  
  // Update cart count
  updateCartCount();
}

// Get product ID from URL or data attribute
function getProductId() {
  // Try to get from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = urlParams.get('id');
  if (idFromUrl) return idFromUrl;
  
  // Fallback to a default ID
  return Math.floor(Math.random() * 1000);
}

// Get product image URL
function getProductImage() {
  const productImage = document.querySelector('.product-image img') || 
                      document.querySelector('.product-card img');
  return productImage ? productImage.src : '';
}

// Add item to cart (localStorage in this demo)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex > -1) {
    // Update quantity if product exists
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    // Add new product to cart
    cart.push(product);
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart items from localStorage
function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Add styles
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = 'var(--accent-color)';
  notification.style.color = 'var(--primary-color)';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  notification.style.zIndex = '1000';
  notification.style.transition = 'opacity 0.3s ease';
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}