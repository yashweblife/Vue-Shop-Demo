<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Products</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-chip v-for="item in catagories" :key="item" @click="getCatagory(item)">
          <ion-label>{{ item.replace("-"," ").toUpperCase()  }}</ion-label>
        </ion-chip>
      </ion-list>
      <h1>{{opneCatagory}}</h1>
      <ion-list class="products">
        <ProductCardVue  v-for="item in frontPageList" :key="item.id" :info="item" @click='navigateTo(item.id)'/>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonChip, IonLabel } from '@ionic/vue';
import ProductCardVue from '@/components/ProductCardVue.vue'
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonChip, IonLabel, ProductCardVue },
  data() {
    return ({ catagories: [], counter: 0, frontPageList: [], opneCatagory:"All" })
  },
  setup(){
    const router = useRoute()
    return({router})
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
      fetch('https://dummyjson.com/products?limit=10')
        .then(res => res.json())
        .then((data: any) => {
          const final = data.products.map((val: any) => val)
          console.log(final)
          this.frontPageList = final
        })
    },
    getCatagory(catagory: string) {
      fetch(`https://dummyjson.com/products/category/${catagory}`)
        .then(res => res.json())
        .then((data:any)=>{
          this.opneCatagory = catagory.replace("-"," ").toUpperCase()
          const final = data.products.map((val: any) => val)
          console.log(final)
          this.frontPageList = final
        });
    },
    navigateTo(data:any){
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
  padding:3em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
}
h1{
  padding:3em;
}
</style>
