<template>
    <div>
        <h1>Hello World</h1>
        <p>{{id}}</p>
    </div> 
</template>

<script lang="ts">
import { useRoute } from 'vue-router';

    export default {
        name:"ProductPage",
        setup(){
            const route = useRoute()
            const {id} = route.params
            console.log(id)
            return({id})
        }
    }
</script>

<style lang="scss" scoped>

</style>