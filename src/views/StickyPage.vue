<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        
        <form @submit.prevent="saveSticky" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
            <h1 class="text-3xl text-at-light-green mb-4">Favicon test</h1>
            <div class="flex flex-col mb-2">
                <label for="title" class="mb-1 text-sm text-at-light-green">URL</label>
                <input type="url" required class="p-2 text-gray-500 focus:outline-none" id="title" v-model="url" />
            </div>
            <img :src=imgUrl class="w-14 h-15" />
            <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
                Test
            </button>



        </form>
        <button @click="imgA">open Ai</button>
    </div>

</template>
<script>
import { ref } from 'vue';
import axios from 'axios'
export default {
    name: "sticky",
    setup() {
        // Create data / vars
        const url = ref("https://app.supabase.com")
        const statusAlert = ref(null);
       const  imgUrl = ref("https://asset.brandfetch.io/idsSceG8fK/idWn_b8lo4.svg")
        // save function
        const saveSticky = async () => {
        console.log(url.value.split("//")[1]);
        let config = {
    headers: {
      'Authorization': 'Bearer ' + "wmvNbm9HsvJqXvtU0e1mtqMbJxr5RwmGucetbS4WstQ="
    }
  }
  axios.get( 
      `https://api.brandfetch.io/v2/brands/${url.value.split("//")[1]}`,
      config
    )
    .then( ( response ) => {
        imgUrl.value =  response.data.logos[0].formats[0].src 
    } )
    .catch()

        }



const imgA = ()=>{


}
        return {
            url,
            saveSticky,
            statusAlert,
            imgUrl,
            imgA
        }
    }
}
</script>
<style>

</style>