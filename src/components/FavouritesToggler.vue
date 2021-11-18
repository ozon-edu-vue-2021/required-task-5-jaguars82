<template>
  <div>
    <button
      class="toggle-button"
      @click="toggleFavourites"
    >
      <heart-icon v-if="favoriteStatus" />
      <heart-outline-icon v-else />
    </button>
  </div>
</template>

<script>
import HeartIcon from 'vue-material-design-icons/Heart.vue';
import HeartOutlineIcon from 'vue-material-design-icons/HeartOutline.vue';

export default {
  name: "FavouritesToggler",
  components: {
    HeartIcon,
    HeartOutlineIcon
  },
  props: {
    productId: {
      type: Number
    },
    favoriteStatus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleFavourites() {
      const productData = {
        id: this.productId,
        status: this.favoriteStatus
      };
      this.$store.dispatch('toggleFavourites', productData);
    }
  }
}
</script>

<style scoped>
.toggle-button {
  border: none;
  background: transparent;
  color: darkorange;
}

.toggle-button:hover {
  color: orangered;
  cursor: pointer;
}
</style>