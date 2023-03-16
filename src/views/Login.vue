<template>
  <div class="max-w-screen-sm mx-auto py-10">
  <div v-if="errorAlert" class="mb-10 p-4 rounded-md-bg-light-grey">
  <p class="text-red-500"> </p>{{errorAlert }}
  </div>
  <form @submit.prevent="handleLogin" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
<h1 class="text-3xl text-at-light-green mb-4">
Login
</h1>
<div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
</div>

<div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
</div>
<button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">Login</button>
      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }">
        Dont't have an account? <span class="text-at-light-green">Register</span>
      </router-link>
  </form>

  </div>

</template>

<script>
import { supabase } from "../supabase/init";
import { ref } from 'vue';
import { useRouter } from "vue-router";

export default {
  name: "login",
  setup() {
      // Create data / vars

  const email = ref(null)
    const password = ref(null)
    const errorAlert = ref(null)
    const router = useRouter();

    // login function
    const handleLogin = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errorAlert.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorAlert.value = null;
        }, 5000);
      }
    };
    return {
      email,
      password,
      errorAlert,
      handleLogin
    };
  },
};
</script>
