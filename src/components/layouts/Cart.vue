<template>
  <div>
    <div class="wrapper" v-if="productsInCart.length">

      <div class="items-container">
      <CartItem
        v-for="product in productsInCart"
        :key="product.id"
        :product="product"
      />
      </div>

      <div class="summary-container">

        <p>Товаров в корзине</p>
        <div>
          <span>
            {{ cartSummary.totalAmount }}
          </span>
        </div>

        <p>Сумма заказа</p>
        <div>
          <span>
            {{ cartSummary.totalSumm }}  &#8399;
          </span>
        </div>

        <div class="button-holder">
          <button @click="order">Оформить заказ</button>
        </div>

      </div>
    </div>

    <EmptyPage v-else message="В корзине нет товаров" />

  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import EmptyPage from '@/components/EmptyPage.vue';

export default {
  name: "Cart",
  components: {
    CartItem,
    EmptyPage
  },
  computed: {
    productsInCart() {
      return this.$store.getters.productsInCart;
    },
    cartSummary() {
      return this.$store.getters.cartSummary;
    }
  },
  methods: {
    order() {
      const list = this.productsInCart.map(product => {
        return `- ${product.dish} x ${product.amount} = ${product.positionSummary} руб.\n`;
      });
      
      list.unshift('СПИСОК ТОВАРОВ:\n');
      list.push(`\nСУММА ЗАКАЗА: ${this.$store.getters.cartSummary.totalSumm} РУБЛЕЙ`);
      
      alert(list.join(''));
    }
  }
}
</script>

<style>
.wrapper {
  display: grid;
  grid-template-columns: 60%, 40%;
  grid-template-rows: 450px 1fr;
}

.items-container {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
}

.summary-container {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  background: white;
  text-align: center;
  margin: 15px;
  padding: 30px 15px;
  font-family: 'PT Sans', sans-serif;
}

.summary-container p {
  margin-top: 35px;
  text-transform: uppercase;
  font-weight: 300;
}

.summary-container div {
  font-size: 24px;
  font-weight: 600;
}

.summary-container .button-holder {
  margin-top: 50px;
}

.summary-container .button-holder button {
  cursor: pointer;
  background: darkorange;
  color: white;
  border: none;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
}

.summary-container .button-holder button:hover {
  background: orangered;
}
</style>