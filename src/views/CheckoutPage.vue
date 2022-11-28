<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Checkout
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div>
                <details>
                    <summary>
                        <h2>Payment Method</h2>
                    </summary>
                    <nav>
                        <div class="card">
                            <div class="cnum">
                                {{ cardInfo.bank.cardNumber }}
                            </div>
                            <h3>{{ cardInfo.bank.cardType }}</h3>
                            <h3>{{}}</h3>
                        </div>
                    </nav>
                </details>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {IonPage, IonHeader, IonContent, IonToolbar, IonTitle} from '@ionic/vue'
interface CardDetailInterface{
    name:string;
    bank:{
        number:string,
        type:string,
        expiry:string
    }
}
interface AddressInterface{
    local:string;
    city:string;
    state:string;
    postal:string
}
interface UserInterface{
    firstName:string;
    middleName:string;
    lastName:string;
    email:string;
    phone:string;
    image:string;
    address:AddressInterface,
    cards:CardDetailInterface[]
}
export default defineComponent({
    components:{
        IonPage, IonHeader, IonContent, IonToolbar, IonTitle
    },
    data() {
        return ({
            cardInfo: {
                bank: {
                    cardNumber: "",
                    cardType: ""
                }
            }
        })
    },
    created() {
        fetch('https://dummyjson.com/users/1')
            .then(res => res.json())
            .then((val: any) => {
                this.cardInfo = val
                let output = "";
                for(var i=0;i<16;i+=4){
                    output+=this.cardInfo.bank.cardNumber.slice(i,i+4) + " "
                }
                this.cardInfo.bank.cardNumber = output
            });
    }
})
</script>

<style lang="scss" scoped>
.card{
    width:400px;
    padding:1em;
    border-radius: 1em;
    box-shadow: 0 0 1em 0 rgba(0,0,0,0.5);
}
</style>