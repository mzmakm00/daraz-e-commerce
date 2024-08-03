<template>
  <div class="product-card">
    <img :src="product.images[0]" alt="Product Image" class="product-image" />
    <div class="overlay">
      <BaseButton
        text="View Product"
        class="view-button"
        @click="viewProduct"
      />
    </div>
    <div class="product-details">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ product.body }}</p>
      <p class="product-category">{{ product.category }}</p>
      <div class="product-rating">
        <span>Rating: </span>
        <span class="rating">{{ product.rating }}</span>
      </div>
      <div class="product-discount">
        <span>Discount: </span>
        <span class="discount">{{ product.discountPercentage }}%</span>
      </div>
      <p class="product-price">${{ product.price }}</p>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "ProductCard",
  components: {
    BaseButton,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
   methods: {
    /**
     * Navigates to the viewProduct route with the product ID as a route parameter.
     * This method uses Vue Router's push method to navigate programmatically.
     * 
     * @param {none}
     * @returns {void}
     */
    viewProduct() {
      this.$router.push({
        // Name of the route to navigate to
        name: "viewProduct",             
        
        // Route parameters, including the product ID
        params: { id: this.product.id }, 
      });
    },
},
}
</script>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: 65vh;
  width: 18vw;
  margin-left: 3rem;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: auto;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.product-details {
  text-align: center;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.product-card:hover .overlay {
  opacity: 1;
}

.product-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.product-description {
  font-size: 1em;
  margin-bottom: 10px;
  color: #666;
}

.product-category {
  font-size: 0.9em;
  margin-bottom: 10px;
  color: #888;
}

.product-rating,
.product-discount {
  font-size: 0.9em;
  margin-bottom: 10px;
  color: #333;
}

.rating,
.discount {
  font-weight: bold;
}

.product-price {
  font-size: 1.5em;
  color: #f85606;
  font-weight: bold;
}
.view-button {
  background-color: #fff;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
}

.view-button:hover {
  background-color: #f85606;
  color: #fff;
}
</style>
