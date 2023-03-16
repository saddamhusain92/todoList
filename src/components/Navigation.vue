<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-3 px-2 flex flex-col gap-4 items-center sm:flex-row">
    <div class="flex items-center gap-x-4">
      <img class="w-14" src="../assets/images/notepage.png" alt=""/>
      <h1>My Sticky</h1>
    </div>
    <ul class="flex flex-1 justify-end  items-center gap-x-10">
      <router-link  v-if="user"   class="cursor-pointer" :to="{name:'Home'}">My Sticky Notes</router-link>
      <router-link v-if="user"   class="cursor-pointer" :to="{name:'Sticky'}">icon test</router-link>
      <router-link v-if="!user" class="cursor-pointer" :to="{name:'Register'}">Create</router-link>
      <router-link v-if="!user" class="cursor-pointer" :to="{name:'Login'}">Login</router-link>
      <li  v-if="user"  class="cursor-pointer" @click="logout">
       Logout
      </li>
      <li  v-if="user"  class="cursor-pointer">
       <div class="bg-white px-2 rounded-full text-xl pb-3 select-none flex items-center justify-center py-2 h-9 w-9 text-at-light-green">
        {{ user.email.slice(0,1) }}
       </div>
      </li>
    </ul>
    </nav>
  </header>
</template>

<script>
import { supabase } from "../supabase/init";
import { computed } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
export default {
  setup() {
     // Get user from store
     const router = useRouter();
    // Setup ref to router
    // Logout function
    const user = computed(()=>store.state.user)
    const logout = async()=>{
      await supabase.auth.signOut()
      router.push({name:"Login"})
    }
    return {
      logout,
      user
    };
  },
};
</script>
