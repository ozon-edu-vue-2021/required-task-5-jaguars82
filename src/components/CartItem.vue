<template>
  <div class="el-wrapper">
    <img class="img" :src="image" alt="">

    <div class="p-info">
      <p class="p-name">{{ product.dish }}</p>
      <div class="p-amount">
        <span>Количество: </span>
        <button
          @click="decreaseAmount"
          :disabled="amountInCart < 2"
        >
          <span>-</span>
        </button>
        <span> {{amountInCart}} </span>
        <button
          @click="encreaseAmount"
        >
          <span>+</span>
        </button>
      </div>
      <p class="p-summ">На сумму: <span>{{product.positionSummary}} &#8399;</span></p>
    </div>

    <div class="p-delete">
      <button
        @click="deleteFromCart"
      >
        <delete-icon />
        <span>Удалить</span>
      </button>
    </div>

    <FavouritesToggler :productId="product.id" :favoriteStatus="product.favorite" />
    
  </div>
</template>

<script>
import FavouritesToggler from './FavouritesToggler.vue';
import DeleteIcon from 'vue-material-design-icons/DeleteOutline.vue';

export default {
  name: "CartItem",
  components: {
    FavouritesToggler,
    DeleteIcon
  },
  props: {
    product: {
      type: Object,
      default: () => { return {} }
    },
  },
  data() {
    return {
      image: require(`@/assets/images/${this.product.image}`),
    }
  },
  computed: {
    amountInCart() {
      return this.$store.getters.amountOfProductInCart(this.product.id);
    }
  },
  methods: {
    decreaseAmount() {
      this.$store.dispatch('decreaseInCart', this.product.id);
    },
    encreaseAmount() {
      this.$store.dispatch('encreaseInCart', this.product.id);
    },
    deleteFromCart() {
      this.$store.dispatch('deleteFromCart', this.product.id);
    }
  }
}
</script>

<style scoped>
.el-wrapper {
  display: flex;
  width: 95%;
  padding: 15px;
  margin: 15px auto;
  background-color: #fff;
}

.el-wrapper .img {
  width: 100px;
}

.el-wrapper .p-info {
  font-family: 'PT Sans', sans-serif;
  padding: 0 15px;
  color: #828282;
}

.el-wrapper .p-name {
  font-weight: 900;
  font-size: 20px;
}

.el-wrapper .p-summ span,
.el-wrapper .p-amount span:nth-child(3) {
  font-weight: 600;
}

.el-wrapper .p-delete {
  align-self: flex-end;
  margin-left: auto
}

.el-wrapper .p-delete button {
  cursor: pointer;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: lightpink;
}

.el-wrapper .p-delete button:hover {
  color: darkred;
}
</style>