<style scoped lang="stylus">
.layout
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

.layout-logo
    width: 100px;
    height: 30px;
    color: #fff;
    float: left;
    position: relative;
    font-size 20px

.layout-nav
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;

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

.layout-footer-center
    text-align: center;

</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <span class="logoly">Logoly</span>
                        <span class="pro">Pro</span>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Home
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            FAQ
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            About
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '50px 50px'}">

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
            </Content>
            <Footer class="layout-footer-center">2019 &copy; Bestony</Footer>
        </Layout>
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
