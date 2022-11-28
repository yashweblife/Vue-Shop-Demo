<template>
    <ion-page>
        <ion-header>
            <h1>{{ info.title }}</h1>
        </ion-header>
        <ion-content>
            <div class="product-info">
                <div class="images">
                    <div class="image">
                        <ion-button @click="imageBackward">
                            <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                        <img :src="info.images[viewImage]" alt="not">
                        <ion-button @click="imageForward">
                            <ion-icon :icon="chevronForwardOutline"></ion-icon>
                        </ion-button>
                    </div>
                </div>
                <div class="info">
                    <p>{{info.brand}}</p>
                    <h1>{{info.title}}</h1>
                    
                    <h3 v-if="acceptDiscount" class="mark">${{info.price}}</h3>
                    <h3 v-if="!acceptDiscount">${{info.price}}</h3>
                    <p>
                        <span>
                            <input @input="applyDiscount()" type="checkbox" name="discount">
                            <label for="">Apply{{info.discountPercentage}}% off</label>
                        </span>
                    </p>

                    <nav>
                        <ion-button>Buy for ${{acceptDiscount ? Math.round(info.price-(info.discountPercentage/info.price)*100) : info.price}}</ion-button>
                        <ion-button>Add to Cart</ion-button>
                    </nav>
                    <p>{{info.description}}</p>
                    <p>{{Math.round((info.rating/5)*100)}}% Positive Reviews</p>
                    <p>Category: {{info.category}}</p>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import {
    IonPage, IonHeader, IonContent, IonIcon, IonButton
} from '@ionic/vue'
export default defineComponent({
    name: "ProductPage",
    components: {
        IonPage, IonHeader, IonContent, IonIcon, IonButton
    },
    data() {
        return {
            info: { title: "", images: [],brand:"",description:"",rating:0,category:"", price:0, discountPercentage:0}, viewImage:0,acceptDiscount:false
        }
    },
    methods:{
        imageForward(){
            if(this.viewImage >= this.info.images.length-1) return
            this.viewImage+=1
        },
        imageBackward(){
            if(this.viewImage <=0) return
            this.viewImage-=1
        },
        applyDiscount(){
            this.acceptDiscount = !this.acceptDiscount
        }
    },
    created() {
        fetch("https://dummyjson.com/products/" + this.id).then((res: Response) => res.json()).then((val: any) => {
            this.info = val;
            console.log(val)
        })
    },
    setup() {
        const route = useRoute()
        const { id } = route.params
        return ({ id, chevronBackOutline, chevronForwardOutline })
    }
})
</script>

<style lang="scss" scoped>
.product-info{
    display:grid;
    grid-template-columns: 1fr 1fr;
    >.info{
        padding:1em;
        h1{
            font-size: 3em;
        }
        h3{
            &.mark{
                text-decoration: line-through;
            }
        }
        p{
            span{
                label{
                    padding-left:1em;
                }
            }
        }
    }
}
.images {
    overflow: hidden;
    >.image{
        display: flex;
        align-items: center;
        width:400px;
        aspect-ratio: 1/1;
        >img {
            object-fit: cover;
        }
        
    }
}
</style>