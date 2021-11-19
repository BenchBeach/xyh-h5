<template>
    <div class="home">
        <div id="myChart" :style="{width: '100vw', height: '100vh',}"></div>
        <!--        <div id="myChart" :style="{width: '100vh', height: '100vw',}"></div>-->
        <svg width="100vw" height="100vh" id="my-svg" style="z-index:100;pointer-events: none;"></svg>
        <div ></div>
    </div>
</template>

<script>
// import CreatePath from '@/components/path/index.js'
import * as echarts from 'echarts';
import world from '@/assets/custom.geo.json'

echarts.registerMap('world', world)

export default {
    name: 'Home',
    mounted() {
        const myLoc = [parseFloat(this.$route.query.lng), parseFloat(this.$route.query.lat)]
        console.log(myLoc)
        var data = [                        //元素为对象的数组
            {name: '天津', value: 12},
            {name: '常州', value: 12},
        ];
        // if(!(/天津/.test(this.$route.query.locationName)||/常州/.test(this.$route.query.locationName))){
        //
        // }
        data.push({name: `您的位置:${this.$route.query.name}`, value: 12})
        var geoCoordMap = {                 //对象
            '天津': [117.20, 39.08],
            '常州': [119.58, 31.48],
        }
        geoCoordMap[`您的位置:${this.$route.query.name}`] = myLoc
        let myP = [{coords: [myLoc, [119.58, 31.48]]}]
        let allXY = []
        let allXYLOC=[]
        for (let i = 0; i < 100; i++) {
            let x = Math.random() * 180
            let r = Math.random()
            let r2 = Math.random()
            if (r2 < 0.5) {
                r2 = -1
            } else {
                r2 = 1
            }
            if (r < 0.5) {
                r = -1
            } else {
                r = 1
            }
            let y = Math.random() * 90 * r
            x = x * r2
            allXYLOC.push([x, y])
            allXY.push({coords: [[x, y], [119.58, 31.48]]})
        }
        setTimeout(() => {
            allXY.push({coords: [[1, 1], [119.58, 31.48]]})
        }, 2000)
        // allXY.push(myLoc)
        //eslint-disable-next-line
        // function renderItem(params, api) {
        //     const [x1, y1] = [api.value(0), api.value(1)]
        //     const [x2, y2] = [119.58, 31.48]
        //     const start = api.coord([
        //         Math.max(x1, -180),
        //         Math.max(y1, -90)
        //     ]);
        //     const end = api.coord([
        //         Math.min(x2, 180),
        //         Math.min(y2, 90)
        //     ]);
        //     CreatePath(start, end, [x1, y1, x2, y2])
        // }

        var myChart = echarts.init(document.getElementById('myChart'));

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)   //新值= 坐标+旧值；
                    });
                }
            }
            return res;                                         // [113.57, 37.85, 31]
        };

        var option = {
            backgroundColor: '#044161',
            geo: {
                map: "world",
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                zoom: 1,
                left: 0, top: 0, right: 0, bottom: 0,
                itemStyle: {
                    normal: {
                        areaColor: "#004981",
                        borderColor: "#029ED3"
                    },
                    emphasis: {
                        areaColor: "#2a333d"
                    },
                    markLine: {
                        symbolSize: 100
                    }
                },
            },
            series: [{
                name: '地点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 8)),    //选取从 start 到数组结尾的所有元素，该方法并不会修改数组，而是返回一个子数组
                symbolSize: function (val) {
                    return val[2] / 2;        //res数组中的第三个元素
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke',
                    number: 3,
                    scale: 4,
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        distance: 8,
                        fontSize: 12,
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 8,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            },
                //     {
                //     type: 'custom',
                //     coordinateSystem: 'geo',
                //     renderItem: renderItem,
                //     // animation: false,
                //     // silent: true,
                //     data: allXY,
                // }
                {
                    type: 'lines',
                    coordinateSystem: 'geo',
                    zlevel: 1,
                    cap: 'round',
                    // large:true,
                    lineStyle: {
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1,
                        curveness: 0.2,
                    },
                    // effect:{
                    //   show: true,
                    //     zlevel:2,
                    //     loop:false
                    // },
                    data: allXY,
                    animationThreshold: 10000,
                    animationDuration: 8000,
                    animationDurationUpdate: 800,
                    animationDelay: 4000
                },
                {
                    type: 'lines',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    cap: 'round',
                    lineStyle: {
                        color: '#ffffff',
                        opacity: 0.8,
                        width: 4,
                        curveness: 0.2,
                    },
                    data: myP,
                    animationThreshold: 10000,
                    animationDuration: 4000,
                },{
                    name: '小地点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: allXYLOC,
                    symbolSize: 3,
                    // showEffectOn: 'render',
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 8,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
        };

        myChart.setOption(option);
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.home {
    width: 100vw;
    height: 100vh;
    position: absolute;

    > svg {
        position: absolute;
        left: 0;
        top: 0;
    }

    > div {
        position: absolute;
        left: 0;
        top: 0;
    }
}

</style>
