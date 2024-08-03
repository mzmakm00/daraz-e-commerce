<template>
  <div class="container py-5">
    <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3">
          <div
            v-for="product in cart.products"
            :key="product.id"
            class="card-body"
          >
            <div class="row">
              <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                  <img :src="product.thumbnail" class="w-100" />
                  <a href="#!">
                    <div class="hover-overlay">
                      <div
                        class="mask"
                        style="background-color: rgba(253, 253, 253, 0.15)"
                      ></div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-6">
                <h5>{{ product.title }}</h5>
                <p>Quantity: {{ product.quantity }}</p>
                <h4 class="mb-1 me-1">${{ product.total.toFixed(2) }}</h4>
                <span class="text-danger"
                  >${{ cart.discountedTotal.toFixed(2) }}</span
                >
              </div>
            </div>
          </div>
          <div class="card-footer">
            <h5 class="text-end">Total Quantity: {{ cart.totalQuantity }}</h5>
            <h5 class="text-end">Total Products: {{ cart.totalProducts }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorageMixin, IsAuthMixin } from "../mixins/mixins.js";

export default {
  mixins: [LocalStorageMixin, IsAuthMixin],
  data() {
    return {
      cart: {
        products: [],
        discountedTotal: 0,
        totalQuantity: 0,
        totalProducts: 0,
      },
    };
  },
  async created() {
    const userAuth = await this.IsAuthenticate();
    if (userAuth.error) {
      console.log("runs");
      this.$router.push("/");
    } else {
      const storedCart = this.getItemFromLocalStorage("cart");
      if (storedCart) {
        this.cart = storedCart;
      }
    }
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: auto;
}
.card {
  margin-bottom: 1.5rem;
}
.bg-image {
  position: relative;
  overflow: hidden;
}
.bg-image img {
  transition: transform 0.3s ease;
}
.bg-image:hover img {
  transform: scale(1.1);
}
.hover-overlay .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
}
</style>
