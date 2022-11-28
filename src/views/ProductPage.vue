<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <div>
                    <h3 @click="navigateTo('tabs/tab1')">Vue Shop</h3>
                    <h2>
                        {{ info.title }}
                    </h2>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="product-info">
                <div class="images">
                    <div class="image">
                        <ion-button @click="imageBackward" fill="clear" class="left">
                            <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                        <img :src="info.images[viewImage]" alt="not">
                        <ion-button @click="imageForward" fill="clear" class="right">
                            <ion-icon :icon="chevronForwardOutline"></ion-icon>
                        </ion-button>
                    </div>
                </div>
                <div class="info">
                    <p>{{ info.brand }}</p>
                    <h1>{{ info.title }}</h1>

                    <h3 v-if="acceptDiscount" class="mark"><span>${{ info.price }}</span>
                        <ion-icon :icon="arrowForwardOutline"></ion-icon>
                        ${{ Math.round(info.price - (info.discountPercentage / 100) * info.price) }}
                    </h3>
                    <h3 v-if="!acceptDiscount">${{ info.price }}</h3>
                    <p>
                        <span>
                            <input @input="applyDiscount()" type="checkbox" name="discount">
                            <label for="">Apply{{ info.discountPercentage }}% off</label>
                        </span>
                    </p>

                    <nav>
                        <ion-button>Buy for ${{ acceptDiscount ?
                                Math.round(info.price - (info.discountPercentage / 100) * info.price) : info.price
                        }}</ion-button>
                        <ion-button>Add to Cart</ion-button>
                    </nav>
                    <p>{{ info.description }}</p>
                    <p>{{ Math.round((info.rating / 5) * 100) }}% Positive Reviews</p>
                    <p>Category: {{ info.category }}</p>
                </div>
                <section>
                    <h2>Similar Products</h2>
                    <div class="similarProducts">
                        <ProductCardVue v-for="item in similarProducts" :key="item.id" :info="item"
                            @click='navigateTo("product/" + item.id)' />
                    </div>
                </section>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { chevronBackOutline, chevronForwardOutline, arrowForwardOutline } from 'ionicons/icons'
import {
    IonPage, IonHeader, IonContent, IonIcon, IonButton, IonToolbar
} from '@ionic/vue'
import ProductCardVue from '@/components/ProductCardVue.vue'
export default defineComponent({
    name: "ProductPage",
    components: {
        IonPage, IonHeader, IonContent, IonIcon, IonButton, ProductCardVue, IonToolbar
    },
    data() {
        return {
            info: {
                title: "",
                images: [],
                brand: "",
                description: "",
                rating: 0,
                category: "",
                price: 0,
                discountPercentage: 0
            },
            viewImage: 0,
            acceptDiscount: false,
            similarProducts: []
        }
    },
    methods: {
        imageForward() {
            if (this.viewImage >= this.info.images.length - 1) return
            this.viewImage += 1

        },
        imageBackward() {
            if (this.viewImage <= 0) return
            this.viewImage -= 1
        },
        applyDiscount() {

            this.acceptDiscount = !this.acceptDiscount
        },
        navigateTo(data: any) {
            this.$router.push(`/${data}`)
        }
    },
    created() {
        fetch("https://dummyjson.com/products/" + this.id).then((res: Response) => res.json()).then((val: any) => {
            this.info = val;
            fetch("https://dummyjson.com/products/category/" + this.info.category).then((res: Response) => res.json()).then((similar: any) => {
                this.similarProducts = similar.products
            })
        })
    },
    setup() {
        const route = useRoute()
        const { id } = route.params
        return ({id, chevronBackOutline, chevronForwardOutline, arrowForwardOutline })
    }
})
</script>

<style lang="scss" scoped>
ion-toolbar {
    div {
        display: flex;
        align-items: center;

        >h3 {
            margin: 0 1em;
            cursor: pointer;
        }

        >h2 {
            text-align: right;
        }
    }
}

.product-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 3em;
    margin-top: 3em;

    >.info {
        padding: 1em;

        h1 {
            font-size: 3em;
        }

        h3 {
            display: flex;
            align-items: center;

            &.mark {
                >span {
                    text-decoration: line-through;

                }
            }
        }

        p {
            span {
                label {
                    padding-left: 1em;
                }
            }
        }
    }
}

.images {
    overflow: hidden;

    >.image {
        display: flex;
        align-items: center;
        width: 400px;
        aspect-ratio: 1/1;

        >ion-button {
            height: 50%;
        }

        >img {
            object-fit: cover;
            border-radius: 3em;
            box-shadow: 0 0 2em 0 rgba(0, 0, 0, 0.5);
        }

    }
}

section {
    margin-top: 3em;
    grid-column: 1/3;

    .similarProducts {
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        >div {
            margin: 1em;
        }

    }

}

@media screen and (max-width:800px) {
    .product-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;

        >.info {
            padding: 1em;

            h1 {
                font-size: 3em;
            }

            h3 {
                display: flex;
                align-items: center;

                &.mark {
                    >span {
                        text-decoration: line-through;

                    }
                }
            }

            p {
                span {
                    label {
                        padding-left: 1em;
                    }
                }
            }
        }
    }

    .images {
        overflow: hidden;
        width: 100%;

        >.image {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 1em;
            aspect-ratio: 1/1;
            position: relative;

            >ion-button {
                height: 50%;
                padding: 0;
                position: absolute;

                &.left {
                    left: 0;
                }

                &.right {
                    right: 0;
                }
            }

            >img {
                object-fit: cover;
                border-radius: 3em;
                box-shadow: 0 0 2em 0 rgba(0, 0, 0, 0.5);
                &.moveLeft{
                    animation:moveLeft 0.2s 1 ease;
                }
            }

        }
    }
    @keyframes moveLeft{
        0%{
            transform: translate(0);
            opacity: 1;
        }
        100%{
            transform: translate(-100%);
            opacity: 0;
        }
    }

    section {
        margin-top: 3em;
        h2{
            font-size: 1em;
        }
        position: relative;
        .similarProducts {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            position: absolute;
            overflow-x: auto;
            >div {
                margin: 1em;
                min-width: 150px;
            }

        }

    }
}
</style>