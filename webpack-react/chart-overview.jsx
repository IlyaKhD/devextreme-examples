//#region data.js
const complaintsData = [
    { complaint: 'Pizza is cold', count: 780 },
    { complaint: 'Inadequate cheese quantity', count: 120 },
    { complaint: 'Not baked properly', count: 52 },
    { complaint: 'Delayed delivery', count: 1123 },
    { complaint: 'Damaged delivery', count: 321 },
    { complaint: 'Incorrect billing', count: 89 },
    { complaint: 'Wrong size delivered', count: 222 }
];
//#endregion
import * as React from 'react';

import Chart, {
    ArgumentAxis,
    ArgumentAxisLabel,
    CommonSeriesSettings,
    Legend,
    Tooltip,
} from 'devextreme-react/ui/chart';

const data = complaintsData.sort(function(a, b) {
    return b.count - a.count;
});

const totalCount = data.reduce(function(prevValue, item) {
    return prevValue + item.count;
}, 0);
let cumulativeCount = 0;

const dataSource = data.map(function(item) {
    cumulativeCount += item.count;
    return {
        complaint: item.complaint,
        count: item.count,
        cumulativePercentage: Math.round(cumulativeCount * 100 / totalCount)
    };
});

const customizeTooltip = function(info) {
    return {
        html: '<div><div class="tooltip-header">' +
            info.argumentText + '</div>' +
            '<div class="tooltip-body"><div class="series-name">' +
            info.points[0].seriesName +
            ': </div><div class="value-text">' +
            info.points[0].valueText +
            '</div><div class="series-name">' +
            info.points[1].seriesName +
            ': </div><div class="value-text">' +
            info.points[1].valueText +
            '% </div></div></div>'
    };
};

const valueAxis = [{
    name: 'frequency',
    position: 'left',
    tickInterval: 300
}, {
    name: 'percentage',
    position: 'right',
    showZero: true,
    label: {
        customizeText: function(info) {
            return info.valueText + '%';
        }
    },
    constantLines: [{
        value: 80,
        color: '#fc3535',
        dashStyle: 'dash',
        width: 2,
        label: { visible: false }
    }],
    tickInterval: 20,
    valueMarginsEnabled: false
}];

const series = [{
    type: 'bar',
    valueField: 'count',
    axis: 'frequency',
    name: 'Complaints frequency',
    color: '#fac29a'
}, {
    type: 'spline',
    valueField: 'cumulativePercentage',
    axis: 'percentage',
    name: 'Cumulative percentage',
    color: '#6b71c3'
}];

export default class extends React.Component {

    render() {
        return (
            <Chart
                palette={'Harmony Light'}
                title={'Pizza Shop Complaints'}
                dataSource={dataSource}
                valueAxis={valueAxis}
                series={series}
            >
                <ArgumentAxis>
                    <ArgumentAxisLabel overlappingBehavior='stagger' />
                </ArgumentAxis>

                <Tooltip
                    enabled={true}
                    shared={true}
                    customizeTooltip={customizeTooltip}
                />

                <Legend
                    verticalAlignment={'top'}
                    horizontalAlignment={'center'}
                />

                <CommonSeriesSettings argumentField={'complaint'} />
            </Chart>
        );
    }
}
