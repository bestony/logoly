<template>
  <div class="dropdown"
    :style="showMenu ? 'border-radius: 3px 3px 0px 0px' : 'border-radius: 3px'"
    v-tooltip="{ content: 'Export your own logo', shown: true, popperClass: 'tooltipClasses', theme: 'ownTooltip' }">
    <div class="dropbtn download" @click="showMenu = true">
      Export
    </div>
    <div ref="btnRef" v-if="showMenu" class="dropdown-content">
      <div @click="download('png')">PNG</div>
      <div @click="download('svg')">SVG</div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/stores/store';
  import domtoimage from 'dom-to-image'
  import { ref } from 'vue';
  import { event } from 'vue-gtag'
  import { onClickOutside } from '@vueuse/core'

  const store = useStore()
  const showMenu = ref(false);
  const btnRef = ref(null)

  onClickOutside(btnRef, () => showMenu.value = false)

  const downloadImage = (imgsrc, name) => {
    //下载图片地址和图片名
    let image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      let url = canvas.toDataURL('image/png')
      let a = document.createElement('a')
      let event = new MouseEvent('click')
      a.download = name || 'photo'
      a.href = url
      a.dispatchEvent(event)
    }
    image.src = imgsrc
  }

  const download = (type) => {
    showMenu.value = false;
    store.editable = false;
    event('download');
    if (type === 'png') {
      var node = document.getElementById('logo')
      domtoimage.toPng(node).then(function (res) {
        downloadImage(res, store.prefix + '-' + store.suffix + '.png')
        store.editable = true
      })
    } else if (type === 'svg') {
      var node = document.getElementById('logo')
      domtoimage.toSvg(node).then(function (res) {
        var link = document.createElement('a');
            link.download = store.prefix + '-' + store.suffix + '.svg';
            link.href = res;
            link.click();
            store.editable = true
      })
    }
  }
</script>

<style scoped>
  .dropdown {
    float: left;
    overflow: hidden;
  }

  .dropdown-content {
    position: absolute;
    background-color: #f90;
    border-radius: 0px 0px 3px 3px;
    color: #000;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content div:hover {
    background-color: rgb(255, 172, 47);
  }

  .download {
    display: flex;
    justify-content: space-around;
    width: 80%;
    min-width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    color: black;
    background: #f90;
  }
</style>