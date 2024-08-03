<template>
  <nav>
    <div class="container">
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
        style="z-index: 300"
      >
        {{ alertMessage }}
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="showAlert = false"
        ></button>
      </div>
      <div class="Daraz">
        <router-link :to="{ name: 'home' }">
          <img
            src="https://icms-image.slatic.net/images/ims-web/e650d6ca-1841-4646-b0e9-4ddbf2beb731.png"
            alt="DarazImg"
          />
        </router-link>
      </div>
      <div class="nav-login">
        <div v-if="!isLoggedIn" class="nav-login">
          <i class="uil uil-user" style="font-size: larger"></i>
          <div class="LoginButton">
            <router-link
              :to="{ name: 'user/login' }"
              style="color: white; text-decoration: none; font-size: larger"
              >Login</router-link
            >
          </div>
        </div>
        <div v-else class="user-menu">
          <div
            class="user-name"
            @mouseover="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <span style="color: white; font-size: larger">{{ userName }}</span>
            <div v-if="showDropdown" class="dropdown-menu">
              <button>My Orders</button>
              <button>Shipping</button>
              <button @click="logout">Logout</button>
            </div>
          </div>
        </div>
        <div class="shoppingcart">
          <router-link
            :to="{ name: 'cartProduct' }"
            style="color: white; text-decoration: none; font-size: larger"
          >
            <i class="uil uil-shopping-cart"></i>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { LocalStorageMixin } from "@/mixins/mixins.js";
export default {
  mixins: [LocalStorageMixin],
  data() {
    return {
      isLoggedIn: false,
      userName: "",
      showDropdown: false,
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const user = this.getItemFromLocalStorage("user");
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.username;
        this.alertMessage = "Logged In Successfully";
        this.alertType = "success";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000); // Hide alert after 3 seconds
      }
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("isActive");
      this.isLoggedIn = false;
      this.userName = "";
      this.alertMessage = "Logged out";
      this.alertType = "success";
      this.showAlert = true;
      this.$router.push("/");
      setTimeout(() => {
        this.showAlert = false;
      }, 3000); // Hide alert after 3 seconds,
    },
  },
};
</script>

<style scoped>
body {
  margin: 0px;
  padding: 0px;
}

nav {
  background-color: #f85606;
  width: 100%;
  height: 10vh;
}

.Daraz img {
  width: 8vw;
  height: 6vh;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.7rem;
  padding-left: 5rem;
  width: 85%;
  margin-left: 3rem;
}

.nav-login {
  color: white;
  display: flex;
  align-items: center;
}

a {
  margin-left: 0.5rem;
}

.LoginButton {
  color: white;
  text-decoration: none;
}

.shoppingcart {
  margin-left: 2rem;
  margin-top: -0.3rem;
}

.uil-shopping-cart {
  font-size: 1.5em;
}

.user-menu {
  position: relative;
}

.user-name {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: none;
}

.dropdown-menu button {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dropdown-menu button:hover {
  background-color: #f5f5f5;
}

.user-name:hover .dropdown-menu {
  display: block;
}
</style>
