<template>
  <div class="container py-5">
    <div
      v-if="showAlert"
      :class="[
        'alert',
        `alert-${alertType}`,
        'alert-dismissible',
        'fade',
        'show',
        'position-fixed',
        'top-0',
        'end-0',
        'm-3',
      ]"
      role="alert"
      style="z-index: 1050"
    >
      {{ alertMessage }}
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="showAlert = false"
      ></button>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3" v-if="!loading">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                  <img :src="product.images[0]" class="w-100" />
                  <div class="hover-overlay">
                    <div
                      class="mask"
                      style="background-color: rgba(253, 253, 253, 0.15)"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-6">
                <h5>{{ product.title }}</h5>
                <div class="d-flex flex-row">
                  <span class="text-muted">Rating : {{ product.rating }}</span>
                </div>
                <div class="mt-1 mb-0 text-muted small">
                  <span>100% cotton</span>
                  <span class="text-primary"> • </span>
                  <span>Light weight</span>
                  <span class="text-primary"> • </span>
                  <span>Best finish<br /></span>
                </div>
                <div class="mb-2 text-muted small">
                  <span>Unique design</span>
                  <span class="text-primary"> • </span>
                  <span>For men</span>
                  <span class="text-primary"> • </span>
                  <span>Casual<br /></span>
                </div>
                <p class="mb-4 mb-md-0">
                  {{ product.description }}
                </p>
              </div>
              <div
                class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start"
              >
                <div class="d-flex flex-row align-items-center mb-1">
                  <h4 class="mb-1 me-1">${{ product.price }}</h4>
                  <span class="text-danger"
                    >{{ product.discountPercentage }}%</span
                  >
                </div>
                <h6 class="text-success">{{ product.shippingInformation }}</h6>
                <div class="d-flex flex-column mt-4">
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-primary btn-sm"
                    type="button"
                    :disabled="isAddingToCart"
                    v-on:click="AddtoCart"
                  >
                    <span v-if="!isAddingToCart">Add to Cart</span>
                    <div
                      v-if="isAddingToCart"
                      class="spinner-border"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </button>
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-outline-primary btn-sm mt-2"
                    type="button"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductById, AddnewCart, UpdateCart } from "../services/API.js";
import { LocalStorageMixin, IsAuthMixin } from "../mixins/mixins.js";

export default {
  name: "ProductView",
  mixins: [LocalStorageMixin, IsAuthMixin],
  data() {
    return {
      product: {},
      loading: true,
      isAddingToCart: false,
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  methods: {
    async AddtoCart() {
      this.isAddingToCart = true;
      const userAuth = await this.IsAuthenticate();
      console.log(userAuth);

      if (!userAuth.error) {
        let cart = this.getItemFromLocalStorage("cart");
        if (Object.keys(cart).length === 0) {
          let body = {
            userId: this.userId(),
            products: [
              {
                id: this.$route.params.id,
                quantity: 4,
              },
            ],
          };
          const res = await AddnewCart(body);
          this.setItemInLocalStorage("cart", res.data);
          this.alertMessage = "Cart Created successfully";
          this.alertType = "success";
        } else {
          let body = {
            merge: true,
            products: [
              {
                id: this.$route.params.id,
                quantity: 1,
              },
            ],
          };
          const response = await UpdateCart(1, body);
          this.setItemInLocalStorage("cart", response.data);
          this.alertMessage = "Cart Created successfully";
          this.alertType = "success";
        }
      } else {
        this.alertMessage =
          "Your are not Authorized ! Please logged in your account";
        this.alertType = "danger";
      }
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
      this.isAddingToCart = false;
    },
  },
  async created() {
    const productID = this.$route.params.id;
    try {
      const response = await getProductById(productID);
      this.product = response.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
}
</style>
