<template>
  <div>

    <div class="el-wrapper">
      <div class="box-up">

        <div v-if="amountInCart" class="cart-info">
          <cart-icon title="в корзине" />
          <span>{{amountInCart}}</span>
        </div>

        <FavouritesToggler
          class="favourites-toggler"
          :productId="product.id"
          :favoriteStatus="product.favorite"
        />

        <img class="img" :src="image" alt="">

        <div class="img-info">
          <div class="info-inner">
            <span class="p-name">{{ product.dish }}</span>
          </div>
          <div class="p-description">{{ reducedDescription }}</div>
        </div>

      </div>

      <div class="box-down">

        <div class="h-bg">
          <div class="h-bg-inner"></div>
        </div>

        <div class="cart">
          <span class="price">{{ product.price }} &#8399;</span>
          
          <div class="add-to-cart">

            <button
              :disabled="amount < 1"
              @click="addToCart"
            >
              <span class="txt">В корзину</span>
            </button>

              <button
                class="counter"
                @click="decreaseAmount"
                :disabled="amount < 2"
              >
                <span v-show="amount > 1" class="txt">-</span>
              </button>

              <div>
                <span class="txt">{{ amount }}</span>
              </div>

              <button
                class="counter"
                @click="encreaseAmount"
              >
                <span class="txt">+</span>
              </button>
            
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import FavouritesToggler from './FavouritesToggler.vue';
import CartIcon from 'vue-material-design-icons/Cart.vue';

export default {
  name: "ProductCard",
  components: {
    FavouritesToggler,
    CartIcon
  },
  props: {
    product: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      image: require(`@/assets/images/${this.product.image}`),
      amount: 1
    }
  },
  computed: {
    reducedDescription() {
      let reduced = this.product.description.slice(0,100);
        if (reduced.length < this.product.description.length) {
        reduced += '...';
      }
      return reduced;
    },
    amountInCart() {
      return this.$store.getters.amountOfProductInCart(this.product.id);
    }
  },
  methods: {
    encreaseAmount() {
      this.amount += 1;
    },
    decreaseAmount() {
      if(this.amount > 1) this.amount -= 1;
    },
    addToCart() {
      this.$store.dispatch('addToCart', { id: this.product.id, amount: this.amount, positionSummary: this.product.price * this.amount });
      this.amount = 1;
    }
  }
}
</script>

<style scoped>
.el-wrapper {
  width: 360px;
  padding: 15px;
  margin: 15px auto;
  background-color: #fff;
}

.el-wrapper .img {
  width: 360px;
}

@media (max-width: 1000px) {
  .el-wrapper {
    width: 345px;
  }
}

@media (max-width: 600px) {
  .el-wrapper {
    width: 290px;
    margin: 30px auto;
  }
}

.el-wrapper:hover .h-bg {
  left: 0px;
}

.el-wrapper:hover .price {
  left: 20px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  color: white;
}

.el-wrapper:hover .add-to-cart {
  left: 65%;
}

.el-wrapper:hover .img {
  -o-filter: blur(7px);
  -ms-filter: blur(7px);
  filter: blur(7px);
  filter: progid:DXImageTransform.Microsoft.Blur(pixelradius='7', shadowopacity='0.0');
  opacity: 0.25;
}

.el-wrapper:hover .info-inner {
  bottom: 155px;
  background: transparent;
}

.el-wrapper:hover .info-inner .p-name {
  color: #252525;
}

.el-wrapper:hover .p-description {
  -webkit-transition-delay: 300ms;
  -o-transition-delay: 300ms;
  transition-delay: 300ms;
  bottom: 50px;
  opacity: 1;
  padding: 15px;
}

.el-wrapper .box-down {
  width: 100%;
  height: 60px;
  position: relative;
  overflow: hidden;
}

.el-wrapper .box-up {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.el-wrapper .box-up .cart-info {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 30px;
  left: 15px;
  display: flex;
  align-items: center;
  z-index: 1;
  color: white;
  background: darkorange;
  padding: 5px;
  border-radius: 50%;
}

.el-wrapper .box-up .favourites-toggler {
  position: absolute;
  top: 30px;
  right: 15px;
  z-index: 1;
}

.el-wrapper .img {
  padding: 20px 0;
  -webkit-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
}

.h-bg {
  -webkit-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  width: 660px;
  height: 100%;
  background-color: #3f96cd;
  position: absolute;
  left: -660px;
}

.h-bg .h-bg-inner {
  width: 50%;
  height: 100%;
  background-color: darkorange;
}

.info-inner {
  background: rgba(0,0,0,.35);
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 15px 0;
  -webkit-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
}

.info-inner .p-name {
  display: block;
  font-family: 'PT Sans', sans-serif;
  font-weight: 900;
  font-size: 20px;
  color: white;
}

.p-description {
  -webkit-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  position: absolute;
  width: 100%;
  bottom: -20px;
  font-family: 'PT Sans', sans-serif;
  color: #828282;
  opacity: 0;
}

.cart {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
}

.cart .price {
  -webkit-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-delay: 100ms;
  -o-transition-delay: 100ms;
  transition-delay: 100ms;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
  color: #252525;
}

.cart .add-to-cart {
  -webkit-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-delay: 100ms;
  -o-transition-delay: 100ms;
  transition-delay: 100ms;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 130%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.cart .add-to-cart .txt {
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.045em;
  text-transform: uppercase;
  white-space: nowrap;
}

.cart .add-to-cart button {
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 10px;
}

.cart .add-to-cart button:not(.counter):hover {
  background: orangered;
}
</style>