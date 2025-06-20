// API service for handling data requests
const API_URL = 'https://api.blakkbrotherinc.com';

// Product API calls
async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

// Cart API calls
async function getCart() {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [] };
  }
}

async function addToCart(productId, quantity = 1) {
  try {
    const response = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ productId, quantity })
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false };
  }
}

// Export API functions
export {
  getProducts,
  getProductById,
  getCart,
  addToCart
};