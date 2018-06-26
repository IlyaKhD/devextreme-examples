// #region data.js
const employees = [{
    text: "John Heart",
    id: 1,
    color: "#56ca85",
    avatar: "images/gym/coach-man.png",
    age: 27,
    discipline: "ABS, Fitball, StepFit"
}, {
    text: "Sandra Johnson",
    id: 2,
    color: "#ff9747",
    avatar: "images/gym/coach-woman.png",
    age: 25,
    discipline: "ABS, Fitball, StepFit"
}];

const data = [{
    text: "Helen",
    employeeID: 2,
    startDate: new Date(2016, 7, 2, 9, 30),
    endDate: new Date(2016, 7, 2, 11, 30)
}, {
    text: "Helen",
    employeeID: 2,
    startDate: new Date(2016, 7, 11, 9, 30),
    endDate: new Date(2016, 7, 12, 11, 30)
}, {
    text: "Alex",
    employeeID: 1,
    startDate: new Date(2016, 7, 3, 9, 30),
    endDate: new Date(2016, 7, 3, 11, 30)
}, {
    text: "Alex",
    employeeID: 1,
    startDate: new Date(2016, 7, 12, 12, 0),
    endDate: new Date(2016, 7, 12, 13, 0)
}, {
    text: "Alex",
    employeeID: 2,
    startDate: new Date(2016, 7, 17, 9, 30),
    endDate: new Date(2016, 7, 17, 11, 30)
}, {
    text: "Stan",
    employeeID: 1,
    startDate: new Date(2016, 7, 8, 9, 30),
    endDate: new Date(2016, 7, 8, 11, 30)
}, {
    text: "Stan",
    employeeID: 1,
    startDate: new Date(2016, 7, 29, 9, 30),
    endDate: new Date(2016, 7, 29, 11, 30)
}, {
    text: "Stan",
    employeeID: 1,
    startDate: new Date(2016, 7, 31, 9, 30),
    endDate: new Date(2016, 7, 31, 11, 30)
},
{
    text: "Rachel",
    employeeID: 2,
    startDate: new Date(2016, 7, 5, 9, 30),
    endDate: new Date(2016, 7, 5, 11, 30)
}, {
    text: "Rachel",
    employeeID: 2,
    startDate: new Date(2016, 7, 8, 9, 30),
    endDate: new Date(2016, 7, 8, 11, 30)
}, {
    text: "Rachel",
    employeeID: 1,
    startDate: new Date(2016, 7, 22, 9, 30),
    endDate: new Date(2016, 7, 22, 11, 30)
}, {
    text: "Kelly",
    employeeID: 2,
    startDate: new Date(2016, 7, 16, 9, 30),
    endDate: new Date(2016, 7, 16, 11, 30)
}, {
    text: "Kelly",
    employeeID: 2,
    startDate: new Date(2016, 7, 30, 9, 30),
    endDate: new Date(2016, 7, 30, 11, 30)
}];
// #endregion
// tslint:enable:max-line-length

import * as React from 'react';

import Scheduler, { Resource } from 'devextreme-react/ui/scheduler';

function isWeekEnd(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

function markWeekEnd(cellData) {
    const classObject = {};
    classObject["employee-" + cellData.groups.employeeID] = true;
    classObject['employee-weekend-' + cellData.groups.employeeID] = isWeekEnd(cellData.startDate);
    return classObject;
}

function markTraining(cellData) {
    const classObject = {
        "day-cell": true
    };

    classObject[getCurrentTraining(cellData.startDate.getDate(), cellData.groups.employeeID)] = true;
    return classObject;
}

function getCurrentTraining(date, employeeID) {
    const result = (date + employeeID) % 3;
    const currentTraining = "training-background-" + result;

    return currentTraining;
}

class DataCell extends React.PureComponent {

    render() {
        return (
            <div className={markWeekEnd(this.props)}>
                <div className={markTraining(this.props)}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

class ResourceCell extends React.PureComponent {

    render() {
        return (
            <React.Fragment>
                <div className={'name'} style={{ background: this.props.color }}>
                    <h2>{this.props.text}</h2>
                </div>
                <div className={'avatar'}>
                    <img src={this.props.data.avatar} />
                </div>
                <div className={'info'} style={{ color: this.props.color }}>
                    Age: {this.props.data.age}
                    <br />
                    <b>{this.props.data.discipline}</b>
                </div>
            </React.Fragment>
        );
    }
}

const currentDate = new Date(2016, 7, 2, 11, 30);
const groups = ['employeeID'];
const views = ['month'];

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <Scheduler
                dataSource={data}
                dataCellComponent={DataCell}
                resourceCellComponent={ResourceCell}
                groups={groups}
                views={views}
                defaultCurrentView={'month'}
                defaultCurrentDate={currentDate}
                height={600}
                showAllDayPanel={true}
                firstDayOfWeek={1}
                startDayHour={8}
                endDayHour={18}
            >
                <Resource
                    label={'Employee'}
                    fieldExpr={'employeeID'}
                    dataSource={employees}
                    allowMultiple={false}
                />
            </Scheduler>
        );
    }
}
