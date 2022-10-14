<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>
      <router-link to="past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>
    </nav>
    <div @click="toogleSideBar" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ totalQuantity }})</span>
    </div>
  </header>
  <router-view :inventory="inventory"/>
  <MySidebar
    v-if="showSidebar"
    :toogle="toogleSideBar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
  />

</template>

<script>
import MySidebar from '@/components/MySidebar.vue'
import food from './food.json'

export default {
  components: {
    MySidebar
  },
  data () {
    return {
      showSidebar: false,
      inventory: food,
      cart: {}
    }
  },
  computed: {
    totalQuantity () {
      let total = 0
      Object.values(this.cart).forEach(element => {
        total += element
      })
      return total
    }
  },
  methods: {
    addToCart (name, index) {
      if (!this.cart[name]) {
        this.cart[name] = 0
      }
      this.cart[name] += this.inventory[index].quantity
      this.inventory[index].quantity = 0
      console.log(this.cart)
    },
    toogleSideBar () {
      this.showSidebar = !this.showSidebar
    },
    removeItem (name) {
      delete this.cart[name]
    }
  }
}
</script>
