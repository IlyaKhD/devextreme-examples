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
    Series,
    Tooltip,
    ValueAxis,
    ValueAxisConstantLine,
    ValueAxisConstantLineLabel,
    ValueAxisLabel
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

function customizePercentageText(info) {
    return info.valueText + '%';
}

export default class extends React.Component {

    render() {
        return (
            <Chart title={'Pizza Shop Complaints'} dataSource={dataSource} palette={'Harmony Light'} >

                <ArgumentAxis>
                    <ArgumentAxisLabel overlappingBehavior='stagger' />
                </ArgumentAxis>

                <ValueAxis name={'frequency'} position={'left'} tickInterval={300} />
                <ValueAxis
                    name={'percentage'}
                    position={'right'}
                    tickInterval={20}
                    showZero={true}
                    valueMarginsEnabled={false}
                >
                    <ValueAxisLabel customizeText={customizePercentageText} />
                    <ValueAxisConstantLine value={80} width={2} color={'#fc3535'} dashStyle={'dash'} >
                        <ValueAxisConstantLineLabel visible={false} />
                    </ValueAxisConstantLine>
                </ValueAxis>

                <Series
                    name={'Complaints frequency'}
                    valueField={'count'}
                    axis={'frequency'}
                    type={'bar'}
                    color={'#fac29a'}
                />
                <Series
                    name={'Cumulative percentage'}
                    valueField={'cumulativePercentage'}
                    axis={'percentage'}
                    type={'spline'}
                    color={'#6b71c3'}
                />

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
