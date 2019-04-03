<style lang="stylus" scoped>
.demo-carousel
    height 300px
    background-color #096dd9
    display flex
    justify-content center
    align-items center
    color #ffffff
    font-size 30px
    line-height 38px
</style>

<template>
    <Carousel v-model="value1" loop>
        <CarouselItem>
            <div class="demo-carousel" style="background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);">
                Logoly —— A Simple Logo generator
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel" style="background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);">
                Just need 3 seconds
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel" style="background-image: linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%);">
                Choose, Edit, and Export
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel" style="background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);">
                Design for Developers
            </div>
        </CarouselItem>
    </Carousel>
</template>
<script>
    export default {
        data () {
            return {
                value1: 0
            }
        }
    }
</script>
