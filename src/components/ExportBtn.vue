<template>
  <div>
    <v-tooltip text="Export your own logo" location="top" model-value>
      <template v-slot:activator="{ props }">
        <v-btn color="#f90" v-bind="props">
          <v-icon icon="mdi-download"></v-icon>Export
          <v-menu activator="parent">
            <v-list>
              <v-list-item key="png" value="png" @click="download('png')">PNG</v-list-item>
              <v-list-item key="svg" value="svg" @click="download('svg')">SVG</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/store';
import domtoimage from 'dom-to-image';
import { ref } from 'vue';
import { event } from 'vue-gtag';
import { onClickOutside } from '@vueuse/core';

const store = useStore();
const showMenu = ref(false);
const btnRef = ref(null);

onClickOutside(btnRef, () => (showMenu.value = false));

const downloadImage = (imgsrc, name) => {
  //下载图片地址和图片名
  let image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    let event = new MouseEvent('click');
    a.download = name || 'photo';
    a.href = url;
    a.dispatchEvent(event);
  };
  image.src = imgsrc;
};

const download = (type) => {
  showMenu.value = false;
  store.editable = false;
  event('download');
  if (type === 'png') {
    var node = document.getElementById('logo');
    domtoimage.toPng(node).then(function (res) {
      downloadImage(res, store.prefix + '-' + store.suffix + '.png');
      store.editable = true;
    });
  } else if (type === 'svg') {
    var node = document.getElementById('logo');
    domtoimage.toSvg(node).then(function (res) {
      var link = document.createElement('a');
      link.download = store.prefix + '-' + store.suffix + '.svg';
      link.href = res;
      link.click();
      store.editable = true;
    });
  }
};
</script>
