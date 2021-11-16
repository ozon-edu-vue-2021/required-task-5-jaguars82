import Vue from 'vue';
import Vuex from 'vuex';
import images from '@/assets/data/images.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productsInCart: {}
  },
  mutations: {
    fetchProducts(state, payload) {
      state.products = payload;
    },
    addToCart(state, payload) {
      if(state.productsInCart[payload.id] !== undefined) {
        state.productsInCart[payload.id].amount += payload.amount;
        state.productsInCart[payload.id].positionSummary += payload.positionSummary;
      } else {
        Vue.set(state.productsInCart, payload.id, { amount: payload.amount, positionSummary: payload.positionSummary });
      }
    },
    deleteFromCart(state, payload) {
      Vue.delete(state.productsInCart, payload);
    },
    encreaseInCart(state, payload) {
      const productPrice = state.products.find(product => product.id == payload).price;
      state.productsInCart[payload].amount += 1;
      state.productsInCart[payload].positionSummary += productPrice;
    },
    decreaseInCart(state, payload) {
      const productPrice = state.products.find(product => product.id == payload).price;
      state.productsInCart[payload].amount -= 1;
      state.productsInCart[payload].positionSummary -= productPrice;
    },
    toggleFavourites(state, payload) {
      const prodIndex = state.products.findIndex(product => product.id == payload.id);
      state.products[prodIndex].favorite = payload.status;
    }
  },
  actions: {
    async fetchProducts({commit, state}) {
      if(state.products.length) return;

      const response = await fetch('https://random-data-api.com/api/food/random_food?size=30');

      if (response.ok) { 
        const data = await response.json();

        data.forEach(product => {
          product.image = images[Math.floor(Math.random() * images.length)];
          product.price = Math.floor(Math.random() * (800 - 300) + 300);
          product.favorite = false;
        });
        
        commit('fetchProducts', data);
      } else {
        commit('fetchProducts', false);
      }
    },
    addToCart({commit}, payload) {
      commit('addToCart', payload);
    },
    deleteFromCart({commit}, payload) {
      commit('deleteFromCart', payload);
    },
    encreaseInCart({commit}, payload) {
      commit('encreaseInCart', payload);
    },
    decreaseInCart({commit}, payload) {
      commit('decreaseInCart', payload);
    },
    toggleFavourites({commit}, payload) {
      commit('toggleFavourites', payload);
    }
  },
  getters: {
    getProducts: (state) => (payload) => {
      if(payload) {
        return state.products.filter(product => {
          return product[payload] === true;
        })
      } else {
        return state.products;
      }
    },
    productsInCart(state) {
      const productList = [];

      Object.keys(state.productsInCart).forEach(product => {
        let productInCart = state.products.find(item => item.id == product);
        productInCart.amount = state.productsInCart[product].amount;
        productInCart.positionSummary = state.productsInCart[product].positionSummary;
        productList.push(productInCart);
      });

      return productList;
    },
    amountOfProductInCart: (state) => (payload) => {
      if(state.productsInCart[payload] !== undefined) {
        return state.productsInCart[payload].amount;
      } else {
        return 0;
      }
    },
    cartSummary(state) {
      const idies = Object.keys(state.productsInCart);
      if(!idies.length) return;

      let amount = 0;
      let summ = 0;

      idies.forEach(cartEntry => {
        amount += state.productsInCart[cartEntry].amount;
        summ += state.productsInCart[cartEntry].positionSummary;
      });

      return {totalAmount: amount, totalSumm: summ};
    }
  },
})