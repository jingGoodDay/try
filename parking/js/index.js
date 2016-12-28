document.getElementById("mapView").style.visibility = "hidden";
document.getElementById("equipmentView").style.visibility = "hidden";
document.getElementById("statisticsView").style.visibility = "visible";
var mapTitle = document.getElementById("mapTitle");
var equipmentTitle = document.getElementById("equipmentTitle");
var statisticsTitle = document.getElementById("statisticsTitle");
mapTitle.onclick = function () {
    if (mapTitle.classList.contains("clicked") == false) {
        mapTitle.className = "clicked";
    }
    if (equipmentTitle.classList.contains("clicked") == true) {
        equipmentTitle.className = "";
    }
    if (statisticsTitle.classList.contains("clicked") == true) {
        statisticsTitle.className = "";
    }
    document.getElementById("mapView").style.visibility = "visible";
    document.getElementById("equipmentView").style.visibility = "hidden";
    document.getElementById("statisticsView").style.visibility = "hidden";
};
equipmentFunction = function () {
    if (mapTitle.classList.contains("clicked") == true) {
        mapTitle.className = "";
    }
    if (equipmentTitle.classList.contains("clicked") == false) {
        equipmentTitle.className = "clicked";
    }
    if (statisticsTitle.classList.contains("clicked") == true) {
        statisticsTitle.className = "";
    }
    document.getElementById("mapView").style.visibility = "hidden";
    document.getElementById("equipmentView").style.visibility = "visible";
    document.getElementById("statisticsView").style.visibility = "hidden";
};
equipmentTitle.onclick = equipmentFunction;
statisticsTitle.onclick = function () {
    if (mapTitle.classList.contains("clicked") == true) {
        mapTitle.className = "";
    }
    if (equipmentTitle.classList.contains("clicked") == true) {
        equipmentTitle.className = "";
    }
    if (statisticsTitle.classList.contains("clicked") == false) {
        statisticsTitle.className = "clicked";
    }
    document.getElementById("mapView").style.visibility = "hidden";
    document.getElementById("equipmentView").style.visibility = "hidden";
    document.getElementById("statisticsView").style.visibility = "visible";
};

var parkingNumber = 1000;//停车场总车位数
var equipmentNumber = 1200;//设备数
var chartParking = echarts.init(document.getElementById('chartParking'));
var chartEquipment = echarts.init(document.getElementById('chartEquipment'));

var option1 = {
    backgroundColor: 'white',
    title: {
        text: '空闲停车位数（总车位数1000）'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['停车场内车辆数', '空闲停车位数'],
        top: 30
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
                readOnly: false
                // optionToContent: function () {
                //     var axisData = this.xAxis.data;
                //     var series = this.series;
                //     var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                //         + '<td>时间</td>'
                //         + '<td>' + series[0].name + '</td>'
                //         + '<td>' + series[1].name + '</td>'
                //         + '</tr>';
                //     for (var i = 0, l = axisData.length; i < l; i++) {
                //         table += '<tr>'
                //             + '<td>' + axisData[i] + '</td>'
                //             + '<td>' + series[0].data[i] + '</td>'
                //             + '<td>' + series[1].data[i] + '</td>'
                //             + '</tr>';
                //     }
                //     table += '</tbody></table>';
                //     return table;
                // }
            },
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: (function () {
            var now = new Date();
            var res = [];
            var len = 20;
            while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(now - 2000);
            }
            return res;
        })()
    },

    yAxis: {
        type: 'value',
        scale: true,
        name: '数量',
        max: parkingNumber + 200,
        min: 0,
        boundaryGap: [0.2, 0.2]
    },
    series: [
        {
            name: '空闲停车位数',
            type: 'bar',
            // itemStyle:{
            //     normal:{
            //         color: '#932120'
            //     }
            // },
            data: (function () {
                var res = [];
                var len = 20;
                while (len--) {
                    res.push(Math.round(Math.random() * parkingNumber));
                }
                return res;
            })()
        },
        {
            name: '停车场内车辆数',
            type: 'line',
            itemStyle: {
                normal: {
                    color: '#4e5579'
                }
            },
            data: (function () {
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push(parkingNumber - Math.round(Math.random() * parkingNumber));
                    len++;
                }
                return res;
            })()
        }
    ]
};
setInterval(function () {
    var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

    var data0 = option1.series[0].data;
    var data1 = option1.series[1].data;
    var randomNumber = Math.round(Math.random() * parkingNumber);
    data0.shift();
    data0.push(randomNumber);
    data1.shift();
    data1.push(parkingNumber - randomNumber + Math.round(Math.random() * 200));

    option1.xAxis.data.shift();
    option1.xAxis.data.push(axisData);

    chartParking.setOption(option1);
}, 2000);
//window.onresize = chartParking.resize;

var option2 = {
    backgroundColor: 'white',
    title: {
        text: '设备情况'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['正常设备数', '异常设备数'],
        top: 30
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: (function () {
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(now - 2000);
            }
            return res;
        })()
    },
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '正常数量',
            max: parkingNumber + 200,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: '异常数量',
            max: 50,
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name: '正常设备数',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#98b0ff'
                }
            },
            data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * equipmentNumber));
                }
                return res;
            })()
        },
        {
            name: '异常设备数',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#ff5b51'
                }
            },
            yAxisIndex: 1,
            data: (function () {
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push(Math.round(Math.random() * 10));
                    len++;
                }
                return res;
            })()
        }
    ]
};
setInterval(function () {
    var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

    var data0 = option2.series[0].data;
    var data1 = option2.series[1].data;
    var randomNumber = Math.round(Math.random() * equipmentNumber);
    data0.shift();
    data0.push(randomNumber);
    data1.shift();
    data1.push(Math.round(Math.random() * 10));

    option2.xAxis.data.shift();
    option2.xAxis.data.push(axisData);

    chartEquipment.setOption(option2);
}, 2000);
// var resize=
window.onresize = function () {
    //alert("change");
    chartEquipment.resize();
    chartParking.resize();
};


chartEquipment.on('click', function (params) {
    if (params.componentType === 'series') {
        if (params.seriesType === 'bar') {
            equipmentFunction();
        }
    }
});

