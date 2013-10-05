var Agent = Agent || {};
Agent.Charts = Agent.Charts || {};
Agent.Dialog = Agent.Dialog || {};
Agent.Host = Agent.Host || {};

Agent.Charts.CreateChart = function (title, placeHolder, options, onClick) {
    var defaultOptions = {
        type: 'pie',
        name: 'Modex X Share',
        data: [],
        cursor: "pointer",
        events: {
            click: onClick ? onClick : $.noop
        }
    };

    if (options.length != 0)
        $.extend(defaultOptions, options);

    return Agent.Charts.CreatePieChart($(placeHolder), {
        title: { text: title },
        series: [defaultOptions]
    });
};

Agent.Charts.CreatePieChart = function (placeHolder, options) {
    var defaultOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: true
        },
        title: {
            text: 'Browser market shares at a specific website, 2010'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        chart: {
            events: {
            }
        },
        series: []
    }

    if (options.length != 0)
        $.extend(defaultOptions, options);

    return $(placeHolder).highcharts(defaultOptions);
};

Agent.Dialog.CreateDialog = function (placeHolder, width, height) {
    width = width || 300;
    height = height || 300;
    var defaultOptions = {
        modal: true,
        width: width,
        height: height,
        autoOpen: false,
        resizable: false
    };

    placeHolder.dialog(defaultOptions);



    this.open = function () {
        placeHolder.dialog("open");
        placeHolder.parent().css("box-shadow", "2px -2px 21px -1px");
    };

    this.close = function () {
        placeHolder.dialog("close");
        placeHolder.destroy();
    };

    this.resizable = function (isResizable) {
        placeHolder.dialog("option", "resizable", isResizable);
    }

    this.onClose = function (fn) {
        if (!fn)
            return;

        placeHolder.on("dialogbeforeclose", fn);
    };

    this.onOpen = function (fn) {
        if (!fn)
            return;
        placeHolder.on("dialogopen", fn);
    };

    this.setTitle = function (title) {
        $(".ui-dialog-titlebar").css("text-align", "left");
        placeHolder.dialog("option", "title", title);
    };
};

Agent.Charts.CreateBarChart = function (placeHolder, options) {
    function setChart(name, categories, data, color) {
        chart.xAxis[0].setCategories(categories, false);
        chart.series[0].remove(false);
        chart.addSeries({
            name: name,
            data: data,
            color: color || 'white'
        }, false);
        chart.redraw();
    }

    var colors = Highcharts.getOptions().colors;
    var chart = $(placeHolder).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Model X Electronic Device Health'
        },
        subtitle: {
            text: 'Click the columns to view details'
        },
        xAxis: {
            categories: options.categories
        },
        yAxis: {
            title: {
                text: 'Failure'
            }
        },
        plotOptions: {
            column: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            var drilldown = this.drilldown;
                            if (drilldown) { // drill down
                                setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                            } else { // restore
                                setChart(options.name, options.categories, options.data);
                            }
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    color: colors[0],
                    style: {
                        fontWeight: 'bold'
                    },
                    formatter: function () {
                        return this.y + '%';
                    }
                }
            }
        },
        tooltip: {
            formatter: function () {
                var point = this.point,
                    s = this.x + ':<b>' + this.y + '% Failure</b><br/>';
                if (point.drilldown) {
                    s += 'Click to view ' + point.category + ' details';
                } else {
                    s += 'Click to return to electronic device details';
                }
                return s;
            }
        },
        series: [{
            name: options.name,
            data: options.data,
            color: 'red'
        }],
        exporting: {
            enabled: false
        }
    }).highcharts();

    this.redraw = function () {
        chart.redraw();
    };
}

Agent.Host.getHostUrl = function () {
    return location.protocol + "//" + location.host;
};

Agent.Host.openUrl = function (url) {
    window.location.href = url;
};

Agent.HighlightTab = function (pos) {
    var table = $("#header table");
    table.find(".tabHover").removeClass("tabHover");
    var tds = table.find("td");
    if (tds.length != 0)
        $(tds[pos - 1]).addClass("tabHover");
};



