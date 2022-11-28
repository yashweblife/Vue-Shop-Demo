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
          <ion-label>{{ item.replace("-"," ") }}</ion-label>
        </ion-chip>
      </ion-list>
      <h1>{{opneCatagory}}</h1>
      <ion-list class="products">
        <div class="card" v-for="item in frontPageList" :key="item.id">
          <div class="header">
            <div class="image">
              <img :src="item.images[0]" alt="">
            </div>
          </div>
          <div class="content">
            <p>{{ item.price }}</p>
            <h1>
              {{ item.title }}
            </h1>
          </div>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonChip, IonLabel } from '@ionic/vue';

export default defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonChip, IonLabel },
  data() {
    return ({ catagories: [], counter: 0, frontPageList: [], opneCatagory:"All" })
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
    }
  },
  mounted() {
    this.getData()
  }
});
</script>


<style scoped>
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;

}
h1{
}
.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.6);
  border-radius: 2em;
  width: 300px;
  aspect-ratio: 1/1;
}

.card>.header {
  width: 100%;
}

.card h1 {
  text-align: right;
  font-size: 1em;
}

.image {
  width: 100%;
  border-radius: 2em;
  overflow: hidden;
}

.image>img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.card p::before {
  content: "$";
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
}
</style>