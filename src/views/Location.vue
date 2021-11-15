<template>
    <div class="container" @click="nextPage()">
        <img src="@/assets/images/bg-1.png" class="bg">
        <div class="logo">
            <img src="@/assets/images/tju-logo.svg">
            <img src="@/assets/images/tju-word.svg">
        </div>
        <div class="big-l big">缘起天大</div>
        <div class="big-r big">梦聚北洋</div>
        <div class="mid">11月25日·江苏常州<br>第十二届世界校友代表大会</div>
        <div class="small">江苏省天津大学校友会承办<br><img src="@/assets/images/twt.png">天外天工作室技术支持</div>
        <img class="arrow" src="@/assets/images/arrow-down.svg">
    </div>
</template>
<script>
export default {
    name: 'Location',
    data() {
        return {
            timestamp:Date.parse(new Date()),
        }
    },
    methods:{
        nextPage(){
            const now=Date.parse(new Date());
            console.log(now-this.timestamp)
            if(now-this.timestamp>3000){
                this.$router.push('/getlocation')
            }
        }
    }
}
</script>
<style scoped lang="scss">
$START_DELAY: 1s;
$BG_T: 0.5s;
$LOGO_T: 0.5s;
$ARROW_T: 1.8s;

.container {
    height: 100vh;
    width: 100vw;
}

.bg {
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    position: fixed;
    animation: down $BG_T ease-in $START_DELAY;
    animation-fill-mode: forwards;
    z-index: -1;
}

.logo {
    color:white;
    position: fixed;
    top: 2%;
    opacity: 0;
    left: 8%;
    animation: shade-in $LOGO_T ease-in $START_DELAY+$BG_T+0.5s;
    animation-fill-mode: forwards;
    z-index: 1;
    display: flex;
    flex-direction: row;
    > img:nth-child(1){
        width: 10%;
    }
    > img:nth-child(2){
        width: 20%;
        margin-left: -1%;
    }
}

.big{
    opacity: 0;
    position: absolute;
    writing-mode: vertical-lr;
    z-index: 1;
    animation: shade-in $LOGO_T ease-in $START_DELAY+$BG_T+0.5s+$LOGO_T;
    animation-fill-mode: forwards;
}

.big-r{
    top: 28%;
    right: 30%;
    color:white;
    letter-spacing:14px;
    font-size: 38px;
    font-family: serif;
    font-weight:900;
}

.big-l{
    top: 12%;
    left: 30%;
    color:white;
    letter-spacing:14px;
    font-size: 38px;
    font-family: serif;
    font-weight:900;
}

.mid{
    top: 70%;
    line-height: 180%;
    font-size: 16px;
    font-weight: lighter;
    letter-spacing:1px;
    left: 0;
    color:white;
    width: 100%;
    opacity: 0;
    position: absolute;
    z-index: 1;
    animation: shade-in $LOGO_T ease-in $START_DELAY+$BG_T+0.5s+$LOGO_T;
    animation-fill-mode: forwards;
}

.small{
    transform: scale(0.8);
    top: 82%;
    line-height: 160%;
    font-size: 8px;
    font-weight: lighter;
    left: 0;
    color:#EEEEEE;
    width: 100%;
    opacity: 0;
    position: absolute;
    z-index: 1;
    animation: shade-in $LOGO_T ease-in $START_DELAY+$BG_T+0.5s+$LOGO_T;
    animation-fill-mode: forwards;
    > img{
        width: 5%;
        margin-bottom: -1%;
        filter:brightness(0) invert(1);
    }
}

.arrow{
    position: absolute;
    opacity: 0;
    animation: arrow-move $ARROW_T ease-in $START_DELAY+$BG_T+0.5s+$LOGO_T+0.5s infinite;
    width: 16%;
    bottom: 4vh;
    left: 42%;
}

@keyframes down {
    from {
        filter: brightness(100%) contrast(100%)
    }
    to {
        filter: brightness(70%) contrast(70%)
    }
}

@keyframes shade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes arrow-move {
    0%{
        opacity: 0;
        bottom: 4vh;
    }
    66%{
        opacity: 1;
        bottom: 2vh;
    }
    100%{
        opacity: 0;
        bottom: 2vh;
    }
}

</style>
