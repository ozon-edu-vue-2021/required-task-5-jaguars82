<template>
  <div class="menu-wrapper">
    <div class="menu-item">
      <router-link to="/">
        <home-icon />
        <span>Главная</span>
      </router-link>
    </div>
    <div class="menu-item">
      <router-link to="/cart">
        <cart-icon />
        <span>Корзина</span>
      </router-link>
    </div>
    <div class="menu-item">
      <router-link to="/favourites">
        <heart-icon />
        <span>Избранное</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import CartIcon from 'vue-material-design-icons/CartOutline.vue';
import HeartIcon from 'vue-material-design-icons/Heart.vue';
import HomeIcon from 'vue-material-design-icons/Home.vue';

export default {
  name: "TopMenu",
  components: {
    CartIcon,
    HeartIcon,
    HomeIcon
  }
}
</script>

<style scoped>
.menu-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  padding: 0 30px;
  box-shadow: rgba(0,0,0,.5) 0 0 10px;
  z-index: 2;
}

.menu-wrapper .menu-item {
  padding: 0 5px;
}

.menu-wrapper .menu-item a {
  display: flex;
  align-items: center;
  color: #252525;
}

.menu-wrapper .menu-item:hover a,
.menu-wrapper .menu-item a.router-link-exact-active {
  color: darkorange;
}

.menu-wrapper .menu-item span {
  padding-left: 5px;
}

.menu-wrapper .menu-item:nth-child(1) {
 margin-right: auto;
}

.menu-wrapper .menu-item a {
  text-decoration: none;
}
</style>