<template>
  <div v-if="isLoading" class="container mt-10 px-4">
  <div v-if="stickyData.length === 0" class="w-full flex-col items-center">
      <h2>Sticky Empty</h2>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li @click="() => open = !open"
          class="col-span-1 text-4xl cursor-pointer text-at-light-green flex flex-col divide-y divide-gray-200 rounded-lg bg-white justify-center text-center shadow">
          +
        </li>
      </ul>
    </div>
    <div v-else>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li @click="() => open = !open"
          class="col-span-1 text-4xl cursor-pointer text-at-light-green flex flex-col divide-y divide-gray-200 rounded-lg bg-white justify-center text-center shadow">
          +
        </li>
        <!-- <li v-for="(sticky,index) in stickyData" :key="index" class="col-span-1 relative flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow +colorArr"> -->
        <li v-for="(sticky, index) in stickyData" :key="index"
          :class="[colorArr.length != 0 ? `col-span-1 relative flex flex-col divide-y divide-gray-200 rounded-lg -500 text-center shadow ${sticky.colors} ` : `ml-2 h-5 w-5 group-hover:text-gray-500`]">
          <div class="flex flex-1 flex-col p-2">
            <h3 class="mt-6 text-sm font-medium text-gray-900 ">{{ sticky.title }}</h3>
            <dl class="mt-1 flex flex-grow flex-col justify-between">
             {{ sticky.uid  }}
              <dd class="mt-3">
                <span class="mb-4 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{{
                  sticky.description
                }}</span>
              </dd>
            </dl>
            <div
              @click="()=>deletStiky(sticky)"
              class="absolute right-2 top-1 text-xl cursor-pointer px-1 rounded-md select-none">
              <img src="../assets/images/trash-light.png " class="h-3" alt=""/>
            </div>
            <div
              @click="()=>updateModal(sticky)"
              class="absolute left-2 top-1 text-xl cursor-pointer px-1 rounded-md select-none">
              <img src="../assets/images/pencil-light.png " class="h-3" alt=""/>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-1 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-2">
              <div>
                <form @submit.prevent="saveSticky" class="p-2 flex flex-col bg-light-grey rounded-md shadow-lg">
                  <div class="flex flex-col mb-2">
                    <label for="title" class="mb-1 text-sm text-at-light-green">Title</label>
                    <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="title"
                      v-model="title" />
                  </div>
                  <div class="flex flex-col mb-2">
                    <label for="descriptionl" class="mb-1 text-sm text-at-light-green">Description</label>
                    <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="description"
                      v-model="description" />
                  </div>
                  <div class="flex justify-between">
                    <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
                      Save
                    </button>
                    <button type="button" @click="open = !open" class="py-2 px-6 rounded-sm self-end text-sm
      text-white bg-red-500 duration-200 border-solid
      border-2 border-transparent hover:border-red-200 hover:bg-white
      hover:text-red-500">
                      Close
                    </button>
                  </div>




                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot as="template" :show="uOpen">
    <Dialog as="div" class="relative z-10" @close="uOpen = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-1 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-2">
              <div>
                <form @submit.prevent="updateStiky" class="p-2 flex flex-col bg-light-grey rounded-md shadow-lg">
                  <div class="flex flex-col mb-2">
                    <label for="title" class="mb-1 text-sm text-at-light-green">Title</label>
                    <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="title"
                      v-model="uTitle" />
                  </div>
                  <div class="flex flex-col mb-2">
                    <label for="descriptionl" class="mb-1 text-sm text-at-light-green">Description</label>
                    <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="description"
                      v-model="uDescription" />
                  </div>
                  <div class="flex justify-between">
                    <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
                      update
                    </button>
                    <button type="button" @click="uOpen = !uOpen" class="py-2 px-6 rounded-sm self-end text-sm
      text-white bg-red-500 duration-200 border-solid
      border-2 border-transparent hover:border-red-200 hover:bg-white
      hover:text-red-500">
                      Close
                    </button>
                  </div>




                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>






</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase/init';
import {uid} from 'uid'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
export default {
  name: "Home",
  components: {
    Dialog, DialogPanel, TransitionChild, TransitionRoot
  },
  setup() {
    // Create data / vars
    const stickyData = ref([])
    const isLoading = ref(null)
    const open = ref(false)
    const uOpen = ref(false)
    const title = ref(null)
    const description = ref(null)
    const uTitle = ref(null)
    const uId = ref(null)
    const uDescription = ref(null)
    const errorAlert = ref(null);
    const statusAlert = ref(null);
    const colorArr = ref(["bg-teal", "bg-rose", "bg-rose", "bg-sky", "bg-cyan", "bg-pink", "bg-orange", "bg-blue", "bg-violet", "bg-purple"])
    // Get data
    const getData = async () => {
      try {
        let { data: stikyapp, error } = await supabase
          .from('stikyapp')
          .select('*')
        if (error) throw error
        stickyData.value = stikyapp;
        isLoading.value = true
        // console.log(stickyData.value);
      }
      catch (error) {
        console.log(error.message);
      }

    }
    const saveSticky = async () => {
      try {
        const { error } = await supabase.from('stikyapp').insert([
          {uid:uid(), title: title.value, description: description.value,colors:colorArr.value[Math.floor(Math.random() * 11)] },
        ])
        if (error) throw error
        statusAlert.value = "successfully save sticky Note"
        getData()
        open.value = false
        title.value = null
        description.value = null
        setTimeout(() => {
          statusAlert.value = null
        }, 5000)
      }
      catch (error) {
        errorAlert.value`Error ${error}`
        setTimeout(() => {
          errorAlert.value = null
        }, 5000)
      }
    }



const deletStiky = async(val)=>{
  try{
    const {error } = await supabase
  .from('stikyapp')
  .delete()
  .eq('id',val.id)
  if(error) throw error
  getData()
  }
  catch(error){
    console.log(error.message);

}
}
const updateModal = async(val)=>{
 uOpen.value = !uOpen.value
 uTitle.value = val.title
 uDescription.value = val.description
 uId.value = val.id

}
const updateStiky = async ()=>{
  try{
  const { error } = await supabase
  .from('stikyapp')
  .update({title:uTitle.value, description:uDescription.value,})
  .eq('id',uId.value)
  if(error) throw error
  uOpen.value = !uOpen.value
  getData()
  
}
catch(error){
console.log(error.message);
}

}


    // Run data function
    getData()
    return {
      stickyData,
      isLoading,
      open,
      title,
      description,
      uTitle,
      uDescription,
      saveSticky,
      updateStiky,
      errorAlert,
      statusAlert,
      colorArr,
      deletStiky,
      updateModal,
      uOpen
      

    };
  },
};
</script>
