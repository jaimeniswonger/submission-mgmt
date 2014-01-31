define(['phoenix', 'app', 'tpl!dashboard/dashboardItem.tmpl'], function (Phoenix, App, Template) {

    'use strict';

    return Phoenix.ItemView.extend({
        template: Template,
        className: 'container-fluid',

        pieChart: undefined,
        lastSlice: undefined,

        events: {
            'click #commit': 'commit'
        },
        initialize: function () {
            console.log('Initializing View: DashboardItem.View');

            this.listenTo(this.model, "change", this.modelChanged);

            _(this).bindAll('pieChartSelected');
        },
        modelChanged: function () {
            this.render();
        },
        onRender: function () {
            console.log('Rendered View: DashboardItem.View');
            this.drawChart(this.$("#chart")[0]);
        },
        commit: function () {
            console.log('commit clicked...');
        },
        drawChart: function (container) {
            var _this = this;
            require(['google!visualization,1,packages:[corechart]'], function () {
                var data = google.visualization.arrayToDataTable([
                    ['Category', 'Number'],
                    ['Matched', _this.model.get('matched')],
                    ['Confirmed', _this.model.get('confirmed')],
                    ['Unmatched', _this.model.get('unmatched')],
                    ['Fuzzy', _this.model.get('fuzzy')]
                ]);
                _this.pieChart = new google.visualization.PieChart(container);
                _this.pieChart.draw(data, {pieSliceText: 'value', colors: ['#3a87ad', '#468847', '#b94a48', '#f89406'], height: 150, width: 170, is3D: true, legend: {position: 'none'}, chartArea: {left: 5, top: 5, width: "100%", height: "100%"}});

                google.visualization.events.addListener(_this.pieChart, 'select', _this.pieChartSelected);
            });
        },
        pieChartSelected: function () {
            var _slice = this.pieChart.getSelection(), _uriSuffix;
            _slice = _slice.length > 0 ? _slice : this.lastSlice;
            this.lastSlice = _slice;
            switch (_slice[0].row) {
                case 0:
                    _uriSuffix = 'matched';
                    break;
                case 1:
                    _uriSuffix = 'confirmed';
                    break;
                case 2:
                    _uriSuffix = 'unmatched';
                    break;
                case 3:
                    _uriSuffix = 'fuzzy';
                    break;
            }
            Backbone.history.navigate(this.model.title + '/' + _uriSuffix, true);
        }
    });
});