<style lang="stylus" scoped>
.title
    margin 0px 0px 20px 0px
.faq-box
    margin 10px 0px
</style>

<template>
    <div class="faq" shadow>
        <h1 class="title">FAQ</h1>
        <Card class="faq-box">
            <p slot="title"><Icon type="md-help"></Icon> How to use this generator?</p>
            <p>The generator is very simple to use. You can get a logo in just 4 steps:</p>
            <p>1. Choose a style (e.g. Horizontal/Vertical, Pornhub/Youtube/...).</p>
            <p>2. Edit the text in the center box.</p>
            <p>3. Customize your logo (color, background, font size, etc.).</p>
            <p>4. Finally, click the "Export" button and get the logo of your own.</p>
        </Card>
        <Card class="faq-box" icon="md-help">
            <p slot="title"><Icon type="md-help"></Icon> Can I use the generated logo for personal or commercial purposes?</p>
            <p>The generated logo fully belongs to you. You can use it freely for any purposes. Though credit is always appreciated.</p>
        </Card>
        <Card class="faq-box" icon="md-help">
            <p slot="title"><Icon type="md-help"></Icon> What is the default Font ?</p>
            <p>The Default Font Family is Arial,Helvetica,sans-serif.</p>
        </Card>

        <Card class="faq-box" icon="md-help">
            <p slot="title"><Icon type="md-help"></Icon> How Can i add a new Font into Logoly ?</p>
            <p>Visit <a href="https://fonts.google.com/" target="_blank">Google Fonts</a>, find the Font you like, then <a href="https://github.com/bestony/logoly/issues/new"  target="_blank">open an issue</a> and tell me the font name.</p>
            <p>Or you can send the Font name to <a href="mailto:xiqingongzi+logoly@gmail.com">my Email</a></p>
        </Card>
    </div>
</template>
