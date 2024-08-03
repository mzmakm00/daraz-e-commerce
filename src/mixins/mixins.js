import { getItemFromLocalStorage, setItemInLocalStorage } from "../utils/LocalStorage";
import { getAuthenticatedUser, refreshAuth } from "../services/API.js"

export const LocalStorageMixin = {
  methods: {
    getItemFromLocalStorage,
    setItemInLocalStorage,
  },
};

export const IsAuthMixin = {
  methods: {
    async IsAuthenticate() {
      try {
        const user = this.getItemFromLocalStorage("user");
        const token = user ? user.token : null;
        const res = await getAuthenticatedUser(token);
        this.setItemInLocalStorage("isActive", true)
        return res;
      } catch (error) {
        const active = this.getItemFromLocalStorage("isActive");
        if (active) {
          this.refreshSession()
          return {}
        }
        else {
          localStorage.removeItem("user")
          return { error: error.message };
        }
      }
    },
    async refreshSession() {
      let user = this.getItemFromLocalStorage('user');
      let refreshToken = user.refreshToken;
      let body = {
        refreshToken: refreshToken,
        expiresInMins: 1,
      }
      const res = await refreshAuth(body);
      console.log(res.data)
      user.refreshToken = res.data.refreshToken;
      user.token = res.data.token;

      this.setItemInLocalStorage("user", user);
    },
    userId() {
      const getUser = this.getItemFromLocalStorage("user");
      const userId = getUser.id;
      return userId
    }
  },

}

