let app = Vue.createApp({
    data() {
        return {
            showSidebar: false,
            inventory: [],
            cart: {}

        }
    },
    computed: {
        totalQuantity() {
            var total = 0;
            Object.values(this.cart).forEach(element => {
                total += element
            })
            return total
        }
    },
    methods: {
        addToCart(name, index) {

            if (!this.cart[name]) {
                this.cart[name] = 0
            }
            this.cart[name] += this.inventory[index].quantity
            this.inventory[index].quantity = 0
            console.log(this.cart)
        },
        toogleSideBar() {
            this.showSidebar = !this.showSidebar
        },
        removeItem(name) {
            delete this.cart[name]
        }
    },
    async mounted() {
        const res = await fetch('./food.json')
        const data = await res.json()

        this.inventory = data;
    }

})

app.component('sidebar', {
    props: ['toogle', 'cart', 'inventory', 'remove'],
    methods: {
        getPrice(name) {
            const product = this.inventory.find(p => p.name === name)
            return product.price.USD
        },
        calculateTotal() {

            var total = 0

            //const names = Object.keys(this.cart)
            //Object.values(this.cart).forEach( (element,index) => {
            //  total += element * this.getPrice(names[index])
            //})  

            Object.entries(this.cart).forEach((element) => {
                total += element[1] * this.getPrice(element[0])
            })

            return total.toFixed(2)
        }
    },
    template: `
    <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Cart
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="toogle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th><span class="sr-only">Product Image</span></th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quantity, key, i) in cart" :key="i">
              <td><i class="icofont-carrot icofont-3x"></i></td>
              <td>{{key}}</td>
              <td>\${{getPrice(key)}}</td>
              <td class="center">{{quantity}}</td>
              <td>\${{getPrice(key)*quantity}}</td>
              <td class="center">
                <button @click="remove(key)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>
        <div class="spread">
          <span><strong>Total:</strong> \${{calculateTotal()}}</span>
          <button class="btn btn-light">Checkout</button>
        </div>
      </div>
    </div>
  </aside>        
    `
})


app.mount('#app')