<style lang="stylus" scoped>
.pornhub
    display flex
    flex-direction  column
    align-items center
.box
    height 300px
    width 100%
    border 2px solid #f90
    border-radius 10px
    padding 20px 0px
    .editarea
        padding 10px
        text-align center
        font-size 50px
        .prefix
            color #fff
            padding 5px 5px

        .postfix
            color #000
            background-color #f90
            padding 5px 10px
            border-radius 7px
    .note
        text-align center
        color #666
</style>

<template>
    <div class="pornhub">
        <div class="box">
            <div class="editarea">
                <span class="prefix" contenteditable>Porn</span>
                <span class="postfix" contenteditable>Hub</span>
            </div>
            <div class="note">
                Click on the text above and modify it to generate your own logo
            </div>
        </div>
    </div>
</template>
