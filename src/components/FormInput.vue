<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <form class="p-4 border rounded" @submit.prevent="handleSubmit">
          <h3 class="mb-4 text-center">Login Your Account</h3>
          <div class="mb-3">
            <label for="text" class="form-label">Username : emilys</label>
            <BaseInput
              type="text"
              class="form-control"
              v-model="form.username"
              placeholder="username"
              @input="validateUsername"
            />
            <span v-if="errors.username" class="error">{{
              errors.username
            }}</span>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Password : emilyspass</label
            >
            <BaseInput
              type="password"
              class="form-control"
              v-model="form.password"
              placeholder="Password"
              @input="validatePassword"
            />
            <span v-if="errors.password" class="error">{{
              errors.password
            }}</span>
          </div>
          <BaseButton
            type="submit"
            background="#f85606"
            text="Login"
            color="white"
            class="login"
          />
          <p class="text-center mt-3">
            New ? <span class="text-primary">Register</span> Here
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import { loginUser } from "../services/API.js";
import { LocalStorageMixin } from "../mixins/mixins.js";

export default {
  name: "FormInput",
  components: {
    BaseButton,
    BaseInput,
  },
  mixins: [LocalStorageMixin],
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    /**
    * Validate the Name input field if user submit form without filled the name field set the error   
  
    * @param {none}
    * @return {none} 
    */

    validateUsername() {
      if (!this.form.username) {
        this.errors.username = "username is required";
      } else {
        this.errors.name = "";
      }
    },

    /**
    * Validate the Type input field if user submit form without select the type field set the error   
  
    * @param {none}
    * @return {none} 
    */
    validatePassword() {
      if (!this.form.password) {
        (this.errors.password = "password is required"),
          (this.errors.type = "");
      }
    },

  
    /**
     * Handles the form submission for logging in a user.
     * This method first validates the username and password fields.
     * If there are no validation errors, it attempts to log in the user
     * by calling the loginUser API. On successful login, the user data is
     * saved to local storage and the user is redirected to the home page.
     * 
     * @param {none}
     * @returns {void}
    */

   async handleSubmit() {
    // Validate the username field
    this.validateUsername();
    
    // Validate the password field
    this.validatePassword();

    // Check if there are no validation errors for username and password
    if (!this.errors.username && !this.errors.password) {
      try {
        // Attempt to log in the user with the provided username and password
        const response = await loginUser(
          this.form.username,
          this.form.password
        );

        // Save the user data to local storage on successful login
        this.setItemInLocalStorage("user", response.data);

        this.setItemInLocalStorage("isActive", true)

        // Redirect the user to the home page
        this.$router.push("/");
      } catch (error) {
        // Log the error to the console if the login attempt fails
        console.error("Login Failed", error);
      }
    }
  },}
}
</script>

<style scoped>
.login {
  width: 100%;
}
.error {
  color: red;
  font-size: 0.875em;
  margin-top: 5px;
}
</style>
