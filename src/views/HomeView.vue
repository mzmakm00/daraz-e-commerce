<template>
  <div>
    <div class="product-button">
      <ProductSearch @xyz="handleSearch" />
      <BaseButton
        text="Add Product"
        class="add-button"
        background="#f85606"
        color="#fff"
        @click="AddProduct"
      />
    </div>
    <div class="product-container">
      <div v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
    <Pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-change="changePage"
      :pageRange="5"
      v-if="!isLoading"
    />
  </div>
</template>

<script>
import {
  Pagination as fetchProductsWithPagination,
  searchProduct,
  getCartByuserId,
} from "@/services/API.js";
import { LocalStorageMixin, IsAuthMixin } from "../mixins/mixins.js";
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../components/ProductPagination.vue";
import ProductSearch from "../components/ProductSearch.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "AllProducts",
  components: {
    ProductCard,
    Pagination,
    ProductSearch,
    BaseButton,
  },
  mixins: [LocalStorageMixin, IsAuthMixin],

  created() {
    this.fetchProducts(this.currentPage);
    this.cartsByUserId();
  },

  data() {
    return {
      products: [],
      itemsPerPage: 12,
      currentPage: 1,
      totalProducts: 0,
      isLoading: true,
      searchQuery: "",
    };
  },
  methods: {
    AddProduct() {
      this.$router.push("/Addproduct");
    },
    /**
     * In this method First it check the is user authenticate if not it return the error;
     * if the user is authenticate then it checks the card length if its 0 then store the empty object in localStorage
     * if its length not 0 then store the carts first index data
     * @param {none}
     * @returns {void}
     */
    async cartsByUserId() {
      const userAuth = await this.IsAuthenticate();
      if (userAuth.error) {
        return;
      }
      const existCard = this.getItemFromLocalStorage("cart");
      if (!existCard) {
        try {
          const res = await getCartByuserId(this.userId());
          console.log(res);
          if (res.data.carts.length === 0) {
            this.setItemInLocalStorage("cart", {});
          } else {
            this.setItemInLocalStorage("cart", res.data.carts[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * This method fetches the product perpage wise
     * if user search anything then it will call the search API othe wise API will ca
     * @param {number} - this number means Current page number
     * @returns {void}
     */
    async fetchProducts(pageNumber) {
      console.log(pageNumber);
      this.isLoading = true;
      try {
        const skip = (pageNumber - 1) * this.itemsPerPage;
        let response;
        if (this.searchQuery) {
          response = await searchProduct(this.searchQuery);
          this.totalProducts = response.data.products.length;
        } else {
          response = await fetchProductsWithPagination(
            `limit=${this.itemsPerPage}&skip=${skip}`
          );
          this.totalProducts = response.data.total;
        }
        this.products = response.data.products;
        this.isLoading = false;
        this.setItemInLocalStorage("products", this.products);
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchProducts(pageNumber);
    },

    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.fetchProducts(this.currentPage);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage);
    },
  },
};
</script>

<style scoped>
.product-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.add-button {
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
}
.product-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  margin-top: 1rem;
}
</style>
