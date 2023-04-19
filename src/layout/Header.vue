<script setup>
import HeaderButtonVue from '../components/HeaderButton.vue';
import Delete from '../icons/Delete.vue';
import Play from '../icons/Play.vue';
import Pause from '../icons/Pause.vue';
import Upload from '../icons/Upload.vue';
import Download from '../icons/Download.vue';
import Less from '../icons/Less.vue';
import More from '../icons/More.vue';
import { ref,nextTick } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import axios from 'axios'
// ! remettre a true

const props = defineProps({
  grid: Array
})

const emit = defineEmits(['audioCreated', 'audioDuration']);

const open = ref(true);
// const bpm = ref(null);
const npb = ref(16);
const file = ref(null);
const audio = ref(null);
const duration = ref(null);
const listen = ref(true);

//ajout filename
const song = {
  title: {
    value: null,
    label: 'title'
  },
  artist: {
    value: null,
    label: 'artist'
  },
  jacket: {
    value: null,
    label: 'jacket'
  },
  difficulty: {
    value: 'easy',
    label: 'difficulty'
  },
  bpm: {
    value: 128,
    label: 'bpm'
  },
  volume: {
    value: 75,
    label: 'vol'
  },
  bg: {
    value: null,
    label: 'bg'
  },
}
// jacket => '.jpg'
// difficulty => Easy/Medium/Hard

const fileConstruct = () => {
  var text = '';

  //initialize header of file
  for (const [key, data] of Object.entries(song)) {
    text += data.label+'='+data.value+'\r';
  }

  text += '-- \r'
  for (let i = 0; i < props.grid[0].length; i++) {
    for (let j = 0; j < props.grid.length; j++) {
      text += props.grid[j][i]
    }
    text += '|00 \r'
    if ((i+1) % npb.value == 0) {
      text += '--  \r';
    }
  }
  return text;
}

const onSubmit = async () => {
  const file = fileConstruct();
  const grid = props.grid;
  const gridBlob = new Blob([file], {type: "octet/stream"});
  const imageURL = URL.createObjectURL(gridBlob);
  const anchor = document.createElement("a");
  anchor.href = imageURL;
  anchor.download = song.title.value+".pe";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL( imageURL);
};

const onFileChange = (e) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  file.value = files[0];
  song.title.value = file.value.name.replaceAll(' ', '_');

  const urlObj = URL.createObjectURL(file.value);
  audio.value = new Audio(urlObj);

  // Allow us to control the audio
  audio.controls = "true";

  // Set the src and start loading the audio from the file
  audio.src = urlObj;
  emit('audioCreated', audio.src);
  const audioEl = document.getElementsByTagName('audio')[0];
  audio.value.onloadedmetadata = () => {
    duration.value = Math.round(audio.value.duration);
    const bps = Math.round(song.bpm.value / 60);
    emit('audioDuration', {duration: duration.value, bps: bps, npb: npb.value});
  }
  open.value = false;
};


const play = () => {
  const audioEl = document.getElementsByTagName('audio')[0];
  audioEl.play();
  listen.value = !listen.value
}

const pause = () => {
  const audioEl = document.getElementsByTagName('audio')[0];
  audioEl.pause();
  listen.value = !listen.value
}

</script>

<template>
  <nav
    class="w-screen flex flex-row flex-wrap content-center justify-between bg-dark border-2 border-b-light_green z-0">
    <img src="../assets/img/logo.png" width="90" alt="Echo editor logo">

    <div class="flex flex-row flex-wrap content-center justify-evenly">
      <HeaderButtonVue v-if="listen" @click="play">
        <Play/>
      </HeaderButtonVue>
      <HeaderButtonVue v-else @click="pause">
        <Pause/>
      </HeaderButtonVue>

      <HeaderButtonVue @click="open = true">
        <Upload />
      </HeaderButtonVue>
      <HeaderButtonVue>
        <Download @click="onSubmit"/>
      </HeaderButtonVue>
    </div>
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
                      {{ file }}
                      {{ audio }}
                      <form action="#" method="POST" @submit.prevent="onSubmit">
                        <div class="space-y-6 bg-white px-4 py-5 sm:p-6 w-full">
                          <div class="col-span-6 sm:col-span-3">
                            <label for="npb" class="block text-sm font-medium text-gray-700">Note per Beat</label>
                            <select v-model="npb" id="npb" name="note_per_beat" autocomplete="country-name"
                              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                              <option>4</option>
                              <option>8</option>
                              <option>16</option>
                              <option>32</option>
                            </select>
                          </div>


                          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label for="bpm" class="block text-sm font-medium text-gray-700">BPM</label>
                            <input v-model="song.bpm.value" type="bpm" name="bpm" id="postal-code" autocomplete="postal-code"
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
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                      @change="onFileChange" accept=".mp3,audio/*" />
                                  </label>
                                  <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">MP3 up to 10MB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
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