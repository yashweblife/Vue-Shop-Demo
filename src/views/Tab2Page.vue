<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-searchbar :debounce="1000" @ion-change="lookUp($event)"></ion-searchbar>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-chip v-for="item in catagories" :key="item" @click="getCatagory(item)">
          <ion-label>{{ item.replace("-"," ").toUpperCase()  }}</ion-label>
        </ion-chip>
      </ion-list>
      <ion-list>
        <ion-item v-for="item in list" :key="item.id" @click="navigateTo('/product/'+item.id)">
        {{item.title}}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonItem, IonList } from '@ionic/vue';
import { list } from 'ionicons/icons';
import { useRoute } from 'vue-router';
import router from '@/router';

export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSearchbar },
  setup() {
    const router = useRoute()
    return({router})
  },
  data(){
    return({
      list:[], catagories: []
    })
  },
  methods:{
    lookUp(event:any){
      const q = event.target.value
      fetch('https://dummyjson.com/products/search?q='+q)
      .then(res => res.json())
      .then((val:any)=>{this.list=val.products});
    },
    getCatagory(catagory: string) {
      fetch(`https://dummyjson.com/products/category/${catagory}`)
        .then(res => res.json())
        .then((data:any)=>{
          this.opneCatagory = catagory.replace("-"," ").toUpperCase()
          const final = data.products.map((val: any) => val)
          this.list = final
        });
    },
    navigateTo(val:string|number){
      this.$router.push(val)
    }
  },
  created(){
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((data: string[]) => {
          data.forEach((val: string) => {
            const final = val
            this.catagories.push(final)
          })
        })
  }
});
</script>
