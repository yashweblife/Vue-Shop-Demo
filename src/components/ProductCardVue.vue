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
    box-shadow: 0 0 2em 0 rgba(0,0,0,0.9), 0 0 3em 0 rgba(255,255,255,0.1);
    background-color: rgb(32,32,32);
    overflow: hidden;
    border-radius: 2em;
    cursor: pointer;
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
            text-align: center;
            font-size: 1em;
            width: 100%;
        }
        p{
            position: absolute;
            top:-50%;
            left:50%;
            transform: translate(-50%,-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width:4rem; 
            aspect-ratio: 2/1;
            border-radius: 1em;
            box-shadow: 0 0 1em 0 rgba(0,0,0,0.6);
            background-color: rgb(32,32,32);
            &::before{
                content:"$"
            }
        }
    }
    transition: 0.2s box-shadow;
    &:hover{
        box-shadow: 0 0 1em 0 rgba(68, 68, 68, 0.5);
    }
}
</style>