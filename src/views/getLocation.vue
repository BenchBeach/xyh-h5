<template>
    <div class="container">
        <img src="@/assets/images/bg-1.png" class="bg">
        <div class="logo">
            <img src="@/assets/images/tju-logo.svg">
            <img src="@/assets/images/tju-word.svg">
        </div>
        <div class="mid">第十二届天津大学世界校友代表大会<br>邀请全球天大人为母校送上祝福</div>
        <div class="input">您是
            <div style="width:13vw;border-bottom:solid white 1px;margin:6px 4px;"></div>
            <input label="请输入" autofocus="autofocus" type="number" v-model="grade" style="position:absolute;width:20vw;border-bottom:solid white 1px;margin:6px 4px;height:24px;opacity:0;top: -40%;">
            级校友
        </div>
        <div class="location-input">您是居住在
            <div style="width:40vw;border-bottom:solid white 1px;margin:0 4px 6px 4px; color:#72ADF0;"
                 @click="getLocation()">
                <img src="@/assets/images/location.svg" width="16px;">
                {{ locationName }}
            </div>
        </div>
        <div class="grade-input">{{ grade }}</div>
        <div class="click-button" v-if="(locationName!=='点击获取定位')&&(grade!=='')" @click="toMap()">查看全球祝福</div>
        <div class="change-view" v-if="(locationName!=='点击获取定位')&&(grade!=='')">为了保障您的观看体验，下一页请横屏观看
        <img src="@/assets/images/change-view.svg" width="14px">
        </div>
    </div>
</template>
<script>
export default {
    name: 'getLocation',
    data() {
        return {
            grade: "",
            locationName: '点击获取定位',
            location: [0, 0]
        }
    },
    mounted() {
            function autoRootFontSize() {
                document.documentElement.style.fontSize =screen.height / 100 + 'px';
                // 取screen.width和document.documentElement.getBoundingClientRect().width的最小值；除以750，乘以32；懂的起撒，就是原本是750大小的32px;如果屏幕大小变成了375px,那么字体就是16px;也就是根字体fontSize大小和屏幕大小成正比变化！是不是很简单
            }
        window.addEventListener('resize', autoRootFontSize);
        autoRootFontSize();
    },
    methods: {
        getLocation() {
            const _this = this
            //eslint-disable-next-line
            let ipLocation = new TMap.service.IPLocation();
            ipLocation.locate()
                .then((result) => {
                    console.log(result)
                    _this.locationName = result.result.ad_info.nation + result.result.ad_info.province
                    _this.location = [result.result.location.lat, result.result.location.lng]
                }).catch((err) => {
                console.log(err)
            })
        },
        toMap(){
            this.$router.push({
                path: '/home',
                query:{
                    grade:this.grade,
                    lat:this.location[0],
                    lng:this.location[1],
                    name:this.locationName
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    height: 100rem;
    width: 100vw;
}

.bg {
    left: 0;
    top: 0;
    height: 100rem;
    width: 100vw;
    position: fixed;
    z-index: -1;
    filter: brightness(70%) contrast(70%)
}

.logo {
    color: white;
    position: fixed;
    left: 8%;
    z-index: 1;
    display: flex;
    flex-direction: row;

    > img:nth-child(1) {
        width: 12%;
    }

    > img:nth-child(2) {
        width: 24%;
        margin-left: -1%;
    }
}

.mid {
    top: 40rem;
    line-height: 180%;
    font-size: 16px;
    letter-spacing: 1px;
    left: 0;
    color: white;
    width: 100%;
    position: absolute;
    z-index: 1;
}

.input {
    flex-direction: row;
    justify-content: center;
    display: flex;
    top: 56%;
    line-height: 180%;
    font-size: 14px;
    letter-spacing: 1px;
    left: 0;
    color: white;
    width: 100vw;
    position: absolute;
    z-index: 1;
}

.grade-input {
    top: 55rem;
    line-height: 180%;
    font-size: 16px;
    letter-spacing: 1px;
    left: -3vw;
    color: white;
    width: 100vw;
    position: absolute;
    z-index: 1;
}

.location-input {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    top: 61rem;
    line-height: 180%;
    font-size: 14px;
    letter-spacing: 1px;
    left: 0;
    color: white;
    width: 100%;
    position: absolute;
    z-index: 1;
}

.click-button {
    text-align: center;
    line-height: 38px;
    height: 38px;
    bottom: 18rem;
    font-size: 18px;
    letter-spacing: 1px;
    left: 30%;
    color: white;
    width: 40%;
    position: absolute;
    background: #2360A4;
    border-radius: 8px;
    z-index: 1;
}

.change-view{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    transform: scale(0.9);
    text-align: center;
    bottom: 10rem;
    font-size: 8px;
    font-weight: lighter;
    letter-spacing: 1px;
    color: white;
    width: 100%;
    position: absolute;
    z-index: 1;
}
</style>
