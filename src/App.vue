<template>
  <div id="app">
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <span class="logoly">Logoly</span>
                        <span class="pro">Pro</span>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1" to="/">
                            <Icon type="ios-navigate"></Icon>
                            Home
                        </MenuItem>
                        <MenuItem name="2" to="/faq">
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

               <router-view></router-view>
               
            </Content>
            <Footer class="layout-footer-center">2019 &copy; Bestony</Footer>
        </Layout>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style lang="stylus" scoped>
html,#app,body
  height 100%

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

.layout-footer-center
    text-align: center;

</style>
