<template>
    <div>
        <router-view v-on:download-image="download" v-on:share-twitter="shareToTwitter"></router-view>
    </div>
</template>
<script>
import domtoimage from 'dom-to-image'

export default {
    methods:{
        downloadIamge(imgsrc, name) {//下载图片地址和图片名
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            let url = canvas.toDataURL("image/png"); 
            let a = document.createElement("a"); 
            let event = new MouseEvent("click"); 
            a.download = name || "logoly"; 
            a.href = url; 
            a.dispatchEvent(event); 
        };
        image.src = imgsrc;
        },
        download(){
            var that=this
            var node = document.getElementById('logo')
            domtoimage.toPng(node).then(function(res) {
                console.log("Image Base64",res)
                that.downloadIamge(res,"logo")
            })
        },
        shareToTwitter(){
            let url = 'https://logoly.pro'
            let text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`)
            window.open(`https://twitter.com/intent/tweet?text=${text}`)
        }
    }
}
</script>
