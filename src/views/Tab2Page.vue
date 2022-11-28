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
      list:[]
    })
  },
  methods:{
    lookUp(event:any){
      const q = event.target.value
      fetch('https://dummyjson.com/products/search?q='+q)
      .then(res => res.json())
      .then((val:any)=>{this.list=val.products});
    },
    navigateTo(val:string|number){
      this.$router.push(val)
    }
  }
});
</script>
