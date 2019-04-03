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

.sponsors-matrix
    margin 20px 0px
    .sponsor-container
        display flex
        justify-content center
        align-items center
        .sponsor
            height 50px

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
                            <Card :bordered="false" class="logo-container">
                               <img class="logo" src="@logos/pornhub.png" alt="">
                            </Card>
                        </Col>
                        <Col span="6">
                            <Card :bordered="false" class="logo-container">
                               <img class="logo" src="@logos/pornhub-app.png" alt="">
                            </Card>
                        </Col>
                        
                    </Row>
               </div>
               <div class="title">
                   <h1>Sponsors</h1>
               </div>
               <div class="sponsors-matrix">
                   <Row :gutter="16">
                        <Col span="6" class="sponsor-container">
                            <img class="sponsor" src="@/assets/sponsors/linuxcn.jpg" alt="">
                        </Col>
                        <Col span="6" class="sponsor-container">
                                <img class="sponsor" src="@/assets/sponsors/leancloud.png" alt="">
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
