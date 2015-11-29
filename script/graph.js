//******************************************サーバ用メソッド**********************************************//


//******************************************下グラフ用メソッド********************************************//
var ctx;
var options;
var lineChart;

var data = {
        labels: ['5分前', '4分30秒前', '4分前', '3分30秒前', '3分前', '2分30秒前', '2分前', '1分30秒前', '1分前', '30秒前', '現在'],
        datasets: [
            {
                label: "温度",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                label: "震度",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
};

options = {};

function init() {
    ctx = document.getElementById("lineChart").getContext("2d");
    lineChart = new Chart(ctx).Line(data, options);
    
    update(getThermo(),getAcc());
};

function update(thermo, acc){
    var i;
    
    for(i=0; i<10; i++){
        lineChart.datasets[0].points[i].value = lineChart.datasets[0].points[i+1].value;
        lineChart.datasets[1].points[i].value = lineChart.datasets[1].points[i+1].value;
    }
    lineChart.datasets[0].points[10].value = thermo;
    lineChart.datasets[1].points[10].value = acc;
        
    lineChart.update();
}