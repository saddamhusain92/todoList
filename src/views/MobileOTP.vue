<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
            <button @click="sendOtp" type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
                Send
            </button>
      
    </div>
</template>
<script>
// import { ref } from 'vue'
import { supabase } from "../supabase/init";
export default {
    name: "mobilOtp",
    setup() {
        // Create data / vars
     
        // save function
        const sendOtp = async() => {
            let {error } = await supabase
  .from('stikyapp')
  .select("*")
  .eq('description','good night')
  if(error) throw error
        }
        return {
            sendOtp,
            
        }

    }


}


</script>
<style>

</style>




