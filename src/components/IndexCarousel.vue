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
            <div class="demo-carousel">
                Logoly —— A Simple Logo generator
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                Just need 3 seconds
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                Choose, Edit, and Export
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
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
