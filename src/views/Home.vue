<template>
    <div class="home">
        <div id="myChart" :style="{width: '100vw', height: '100vh'}"></div>
    </div>
</template>

<script>
// import $ from 'jquery'
import * as echarts from 'echarts';
import world from '@/assets/custom.geo.json'

echarts.registerMap('world', world)

export default {
    name: 'Home',
    mounted() {
        // var allXY = [{
        //     value: [107.20, 30.08],
        // }]
        function renderItem(params,api) {
            var coords = [
                [116.7, 39.53],
                [103.73, 36.03],
                [112.91, 27.87],
                [120.65, 28.01],
                [119.57, 39.95]
            ];
            console.log(params)
            console.log(api)
            return{
                type:'line',
                data: [coords],
                smooth: true
            }
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
                zoom: 1,
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
                // boundingCoords: [
                //     // 定位左上角经纬度
                //     [-180, 90],
                //     // 定位右下角经纬度
                //     [180, -90]
                // ],
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
                itemStyle: {
                    opacity:1
                },
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
