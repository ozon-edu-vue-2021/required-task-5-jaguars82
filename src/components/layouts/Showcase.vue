<template>
  <div>
    
    <div class="products-wrapper" v-if="products.length">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <EmptyPage v-else message="Нет соответствующих запросу товаров" />

  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import EmptyPage from '@/components/EmptyPage.vue';

export default {
  name: "Showcase",
  components: { 
    ProductCard,
    EmptyPage
  },
  props: {
    filter: {
      type: String,
      default: ""
    }
  },
  computed: {
    products() {
      return this.$store.getters.getProducts(this.filter);
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchProducts');
  }
}
</script>

<style>
.products-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
</style>