<template>
    <div>
        <div class="card">
            <div class="header">
                <div class="img">
                    <img :src="info.thumbnail" :alt="info.description">
                </div>
            </div>
            <div class="content">
                <h1>{{info.title}}</h1>
                <p>{{info.price}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"ProductCardVue",
    props:["info"]
})
</script>

<style lang="scss" scoped>
.card{  
    box-shadow: 0 0 1em 0 rgba(0,0,0,0.9);
    background-color: rgb(32,32,32);
    overflow: hidden;
    border-radius: 2em;
    >.header{
        width:100%;
        img{
            width:100%;
            aspect-ratio: 1/1;
            object-fit: cover;
        }
    }
    .content{
        display:flex;
        position: relative;
        h1{
            font-size: 1em;
            padding-left:2em;
        }
        p{
            position: absolute;
            top:-100%;
            right:3em;
            display: flex;
            align-items: center;
            justify-content: center;
            width:4rem; 
            aspect-ratio: 1/1;
            border-radius: 50%;
            background-color: rgb(255, 220, 79);
            color:black;
            &::before{
                content:"$"
            }
        }
    }
}
</style>