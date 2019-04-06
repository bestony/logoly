<style lang="stylus" scoped>
.avatar
    width 10%
    border-radius 50%
.info
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding 50px 0px
h3
    margin-block-start 1px
h2
    margin-block-end 1px
.social
    display flex
    flex-direction row
    justify-content space-around
    align-items center
    padding 50px 0
</style>

<template>
    <div class="author">
        <div class="info">
            <img class="avatar" src="../assets/avatar.png" alt="bestony">
            <h2> Bestony</h2>
            <h4>An indie developer / Focus on something interesting.</h4>
        </div>
        <div class="social">
            <a class="github" href="https://github.com/bestony"><i class="iconfont icon-github"></i> GitHub</a>
            <a class="twitter" href="https://twitter.com/xiqingongzi"><i class="iconfont icon-twitter"></i> Twitter</a>
            <a class="gmail" href="mailto:xiqingongzi+logoly@gmail.com"><i class="iconfont icon-gmail"></i> Email</a>
        </div>
    </div>
</template>
