<script setup>
import HeaderButtonVue from '../components/HeaderButton.vue';
import Delete from '../icons/Delete.vue';
import Play from '../icons/Play.vue';
import Upload from '../icons/Upload.vue';
import Download from '../icons/Download.vue';
import Less from '../icons/Less.vue';
import More from '../icons/More.vue';
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(true);

const bpm = ref(null);
const npb = ref(null);
const file = ref(null);


const onSubmit = () => {
  console.log("toto");
};

</script>

<template>
  <nav
    class="w-screen flex flex-row flex-wrap content-center justify-between bg-dark border-2 border-b-light_green z-0">
    <img src="../assets/img/logo.png" width="90" alt="Echo editor logo">

    <div class="flex flex-row flex-wrap content-center justify-evenly">
      <HeaderButtonVue>
        <Delete />
      </HeaderButtonVue>
      <HeaderButtonVue @click="" >
        <Play />
        <!-- <Play v-if="play"/>
        <Pause v-else/> -->
      </HeaderButtonVue>
      <HeaderButtonVue @click="open = true">
        <Upload />
      </HeaderButtonVue>
      <HeaderButtonVue>
        <Download />
      </HeaderButtonVue>
    </div>

    <div class="bg-dark border-2 border-light_green rounded-xl flex content-center flex-wrap" height="50">
      <span class="p-1 font-sans text-light_green font-bold text-2xl">00:00:00</span>
    </div>

    <!-- <div class="flex flex-row flex-wrap content-center justify-evenly">
      <HeaderButtonVue>
        <Less />
      </HeaderButtonVue>
      <HeaderButtonVue>
        <More />
      </HeaderButtonVue>
    </div> -->
  </nav>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                      Upload song</DialogTitle>
                    <div>
                      <form action="#" method="POST" @submit.prevent="onSubmit">
                        <div class="space-y-6 bg-white px-4 py-5 sm:p-6 w-full">
                          <div class="col-span-6 sm:col-span-3">
                            <label for="npb" class="block text-sm font-medium text-gray-700">Note per Beat</label>
                            <select v-model="npm" id="npb" name="note_per_beat" autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                              <option>4</option>
                              <option>8</option>
                              <option>16</option>
                              <option>32</option>
                            </select>
                          </div>


                          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label for="bpm" class="block text-sm font-medium text-gray-700">BPM</label>
                            <input v-model="bpm" type="bpm" name="bpm" id="postal-code" autocomplete="postal-code"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>

                          <div>
                            <label class="block text-sm font-medium text-gray-700">Music file</label>
                            <div
                              class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                              <div class="space-y-1 text-center">
                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                  viewBox="0 0 48 48" aria-hidden="true">
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="flex text-sm text-gray-600">
                                  <label for="file-upload"
                                    class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                  </label>
                                  <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">MP3 up to 10MB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button type="button" @click="open = false" ref="cancelButtonRef"
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                            <button type="submit"
                            class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                           >Save</button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
              <!-- <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="open = false">Deactivate</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="open = false" ref="cancelButtonRef">Cancel</button>
              </div> -->
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
nav {
  height: 100px;
  max-height: 100px;
}

span,
span::before {
  height: 50px;
  max-height: 50px;
}
</style>