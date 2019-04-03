<style scoped lang="stylus">


.title
    margin 50px 0px 20px 0px

.logo-matrix
    margin 20px 0px
    .logo-container
        display flex
        justify-content center
        align-items center
        .logo
            height 100px
            max-width 100%;

.sponsors-matrix
    margin 20px 0px
    .sponsor-container
        display flex
        justify-content center
        align-items center
        .sponsor
            height 30px
            -webkit-filter: grayscale(100%);     
            -moz-filter: grayscale(100%);     
            -ms-filter: grayscale(100%);     
            -o-filter: grayscale(100%);          
            filter: grayscale(100%); 	     
            filter: gray;

</style>
<template>
    <div class="index">
        <IndexCarousel></IndexCarousel>
               <div class="title">
                   <h1>Logos</h1>
               </div>
               <div class="logo-matrix">
                   <Row :gutter="16">
                        <Col span="6">
                            <Card  :style='{"border":"1px solid #dcdee2"}'>
                               <p slot="title" class="logo-title">Pornhub Flavour</p>
                               <p slot="extra" class="logo-link">
                                   <router-link to="/pornhub">Build>></router-link>
                               </p>
                               <div class="logo-container"><img class="logo" src="@logos/pornhub.png" alt=""></div>
                            </Card>
                        </Col>
                        <Col span="6">
                            <Card :style='{"border":"1px solid #dcdee2"}'>
                               <p slot="title" class="logo-title">Pornhub App Flavour</p>
                               <p slot="extra" class="logo-link">
                                   <router-link to="/">Build>></router-link>
                               </p>
                               <div class="logo-container">
                                   <img class="logo" src="@logos/pornhub-app.png" alt="">
                               </div>
                            </Card>
                        </Col>
                        
                    </Row>
               </div>
               <div class="title">
                   <h1>Sponsors</h1>
               </div>
               <div class="sponsors-matrix">
                   <Row :gutter="16">

                        <Col span="3" class="sponsor-container">
                            <a href="https://linux.cn/" target="_blank">
                                <img class="sponsor" src="@/assets/sponsors/linuxcn.jpg" alt="">
                            </a>
                        </Col>
                        <Col span="3" class="sponsor-container">
                            <a href="https://www.leancloud.app/" target="_blank">
                                <img class="sponsor" src="@/assets/sponsors/leancloud.png" alt="">
                            </a>                        
                        </Col>
                    </Row>
               </div>
    </div>
</template>
<script>
    import IndexCarousel from '@com/IndexCarousel'
    export default {
        components:{
            IndexCarousel
        }
    }
</script>
