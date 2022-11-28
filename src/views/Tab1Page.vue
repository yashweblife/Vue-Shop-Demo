<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Products</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list class="products">
        <ProductCardVue v-for="item in frontPageList" :key="item.id" :info="item" @click='navigateTo(item.id)' />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import ProductCardVue from '@/components/ProductCardVue.vue';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, ProductCardVue },
  data() {
    return ({ counter: 0, frontPageList: [], opneCatagory: "All Products" })
  },
  setup() {
    const router = useRoute()
    return ({ router })
  },
  methods: {
    getData() {
      fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((data: string[]) => {
          data.forEach((val: string) => {
            const final = val
            this.catagories.push(final)
          })
        })
      fetch('https://dummyjson.com/products?limit=30')
        .then(res => res.json())
        .then((data: any) => {
          const final = data.products.map((val: any) => val)
          console.log(final)
          this.frontPageList = final
        })
    },
    navigateTo(data: any) {
      this.$router.push(`/product/${data}`)
    }
  },
  mounted() {
    this.getData()
  }
});
</script>


<style scoped>
.products {
  padding: 3em;
  padding-top: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 3em;
}

@media screen and (max-width:800px) {
  ion-list {
    display: none;
  }

  .products {
    padding: 3em;
    padding-top: 1em;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 3em;
  }
}

h1 {
  padding: 1em;
  text-align: center;
}
</style>
