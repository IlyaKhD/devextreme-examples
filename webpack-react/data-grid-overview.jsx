import ODataStore from 'devextreme/data/odata/store';
import * as React from 'react';

import { Template } from 'devextreme-react/core/template';
import Bullet, { Font, Margin, Size, Tooltip } from 'devextreme-react/ui/bullet';
import DataGrid, {
    Column,
    FilterRow,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    Selection
} from 'devextreme-react/ui/data-grid';

const dataSourceOptions = {
    store: new ODataStore({
        url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
        beforeSend: function(request) {
            request.params.startDate = '2018-05-10';
            request.params.endDate = '2018-05-15';
        }
    })
};

const customizeTooltip = function(data) {
    return {
        text: parseInt(data.value) + '%'
    };
};

const discountCellTemplate = function(cellData) {
    return (
        <Bullet
            showTarget={false}
            showZeroLevel={true}
            value={cellData.value * 100}
            startScaleValue={0}
            endScaleValue={100}
        >
            <Size width={150} height={35} />
            <Margin top={5} bottom={0} left={5} />
            <Tooltip
                enabled={true}
                paddingTopBottom={2}
                zIndex={5}
                customizeTooltip={customizeTooltip}
            >
                <Font size={18} />
            </Tooltip>
        </Bullet>
    );
}

let collapsed = false;
const onContentReady = function(e) {
    if (!collapsed) {
        e.component.expandRow(['EnviroCare']);
        collapsed = true;
    }
};

export default class extends React.Component {

    render() {
        return (
            <DataGrid
                dataSource={dataSourceOptions}
                allowColumnReordering={true}
                onContentReady={onContentReady}
            >
                <GroupPanel visible={true} />
                <SearchPanel visible={true} highlightCaseSensitive={true} />
                <Grouping autoExpandAll={false} />
                <FilterRow visible={true} />
                <Selection mode={'multiple'} />

                <Column dataField={'Product'} groupIndex={0} />
                <Column
                    dataField={'Amount'}
                    caption={'Sale Amount'}
                    dataType={'number'}
                    format={'currency'}
                    alignment={'right'}
                />
                <Column
                    dataField={'Discount'}
                    caption={'Discount %'}
                    dataType={'number'}
                    format={'percent'}
                    alignment={'right'}
                    allowGrouping={false}
                    cellTemplate={'discountCellTemplate'}
                    cssClass={'bullet'}
                />
                <Column dataField={'SaleDate'} dataType={'date'} />
                <Column dataField={'Region'} dataType={'string'} />
                <Column dataField={'Sector'} dataType={'string'} />
                <Column dataField={'Channel'} dataType={'string'} />
                <Column dataField={'Customer'} dataType={'string'} width={150} />

                <Pager allowedPageSizes={[10, 25, 50, 100]} showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />

                <Template name={'discountCellTemplate'} render={discountCellTemplate} />
            </DataGrid>
        );
    }
}
