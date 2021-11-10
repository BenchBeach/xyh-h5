<template>
    <div class="home">
        <div id="myChart" :style="{width: '100vw', height: '100vh',}"></div>
        <!--        <div id="myChart" :style="{width: '100vh', height: '100vw',}"></div>-->
        <svg width="100vw" height="100vh" id="my-svg" style="z-index:100;pointer-events: none;"></svg>
    </div>
</template>

<script>
import CreatePath from '@/components/path/index.js'
import * as echarts from 'echarts';
import world from '@/assets/custom.geo.json'

echarts.registerMap('world', world)

export default {
    name: 'Home',
    mounted() {
        function renderItem(params, api) {
            const [x1, y1] = [117.20, 39.08]
            const [x2, y2] = [119.58, 31.48]
            const start = api.coord([
                Math.max(x1, -180),
                Math.max(y1, -90)
            ]);
            const end = api.coord([
                Math.min(x2, 180),
                Math.min(y2, 90)
            ]);
            CreatePath(start,end,[x1,y1,x2,y2])
        }

        var myChart = echarts.init(document.getElementById('myChart'));
        var data = [                        //元素为对象的数组
            {name: '天津', value: 6},
            {name: '常州', value: 6},
        ];

        var geoCoordMap = {                 //对象
            '天津': [117.20, 39.08],
            '常州': [119.58, 31.48],
        }

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
                center: [117.20, 39.08],
                zoom: 9,
                left: 0, top: 0, right: 0, bottom: 0,
                itemStyle: {
                    normal: {
                        areaColor: "#004981",
                        borderColor: "#029ED3"
                    },
                    emphasis: {
                        areaColor: "#2a333d"
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
                        fontSize: 9,
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
            }, {
                type: 'custom',
                coordinateSystem: 'geo',
                renderItem: renderItem,
                // animation: false,
                // silent: true,
                data: [0],
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
    > svg{
        position:absolute;
        left:0;
        top:0;
    }
    > div{
        position:absolute;
        left:0;
        top:0;
    }
}

</style>
