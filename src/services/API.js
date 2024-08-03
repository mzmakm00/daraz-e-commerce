import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getAllProducts = () => {
  return API.get("/products");
};

export const getProductById = (id) => {
  return API.get(`products/${id}`);
};

export const searchProduct = (query) => {
  return API.get(`products/search?q=${query}`)
}

export const Pagination = ( query) => {
  return API.get(`products?${query}`)
}

// export const createPost = (data, headers) => {
//   return API.post("/posts", data, { headers: header });
// };



// Auth APi

export const loginUser = (username , password) => {
  return API.post('auth/login', {
    username,
    password,
    expiresInMins : 1,
  })
}

export const getAuthenticatedUser = (token) => {
  return API.get('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`, 
    }, 
  });
};

  
export const refreshAuth = (body) => {
  return API.post('/auth/refresh', body)
}


// Cart

export const getCartByuserId = (id) => {
  return API.get(`/carts/user/${id}`)
}

export const AddnewCart = (body) => {
  return API.post('/carts/add', body)
}

export const UpdateCart = (id ,body) => {
  return API.put(`/carts/${id}`, body)
}

