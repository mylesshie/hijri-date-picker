import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment-hijri'
import onClickOutside from 'react-onclickoutside'
import DayNames from './DayNames.js'
import MonthList from './MonthsList'
import YearsList from './YearsList'
import MonthDaysView from './MonthDaysView'
// import 'antd/dist/antd.css';
import "../index.css";
import { Popover, Icon } from "antd";

const HijriCalender = styled.div`
  width: 266px;
  direction: rtl;
  background: #ffffff;
  margin-top: 2px;
  font-family: serif;
  box-sizing: unset;
  -webkit-box-sizing: unset;
  font-size: 14px;
  border-radius: 4px;
  z-index: 1000;
  color: black !important;
`

const HijriCalenderControls = styled.div`
  direction: rtl;
  text-align: center;

  .hijri-calender-control-top {
    display: flex;
    justify-content: space-between;
  }
`


const MonthName = styled.strong`
`

const YearAndMonthList = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`

const Style = styled.div``;

class HijriDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.selectedDate || "",
      dateFormat: props.dateFormat || 'iYYYY/iMM/iDD',
      currentTime: moment(),
      calenderShown: false
    };
  }

  componentDidMount() {
    if (this.state.selectedDate) {
      this.setState({
        currentTime: moment(this.state.selectedDate, this.state.dateFormat),
      })
    }
  }
  componentDidUpdate(prevProps) {
    const { selectedDate: prevSelectedDate } = prevProps;
    const { selectedDate: nextSelectedDate } = this.props;
    if (prevSelectedDate !== nextSelectedDate) {
      console.log("componentDidUpdate--", this.state);
      this.setState({ ...this.state, selectedDate: nextSelectedDate })
    }
  }

  handleClickOutside = evt => {
    // this.setState({
    //   calenderShown: false
    // })
  }

  subtractMonth = () => {
    this.setState((prevState) => ({
      currentTime: prevState.currentTime.subtract(1, 'iMonth')
    }));
  }

  addMonth = () => {
    this.setState((prevState) => ({
      currentTime: prevState.currentTime.add(1, 'iMonth')
    }));
  }

  setSelectedDate = (event) => {
    let time = this.state.currentTime
    time.iDate(parseInt(event.target.value, 10))
    const selectedDate = time.format(this.state.dateFormat)
    this.setState({
      selectedDate,
      calenderShown: false
    })
    this.handleChange(selectedDate)
  }

  getMonthStartDayName = () => {
    let time = this.state.currentTime
    time.startOf('iMonth')
    return time.format('dd')
  }

  handleFocus = (event) => {
    const { onFocus = () => { } } = this.props
    onFocus(event.target.value)
    // this.showCalender()
  }

  handleChange = (value) => {
    const { onChange = () => { } } = this.props
    onChange(value)
  }

  showCalender = () => {
    this.setState({
      calenderShown: true
    })
  }

  handelMonthChange = (value) => {
    let time = this.state.currentTime
    time.iMonth(parseInt(value, 10))
    this.setState({
      currentTime: time
    })
  }
  handelYearChange = (value) => {
    let time = this.state.currentTime
    time.iYear(parseInt(value, 10))
    this.setState({
      currentTime: time
    })
  }

  handelOnChange = (event) => {
    // 
  }


  handleVisibleChange = visible => {
    console.log("handleVisibleChange---", visible);
    this.setState({ calenderShown: visible });
    setTimeout(() => {
      console.log(this.state);
    }, 2000)
  };

  render() {
    const { className, name, placeholder, input, disabled, placement, ...rest } = this.props;
    return (
      <Style className="hijri-calendar-component">
        <Popover 
          overlayClassName={"hijri-calendar-pop"}
          className={className}
          placement={placement || "bottomLeft"}
          visible={this.state.calenderShown}
          onVisibleChange={this.handleVisibleChange}
        content={
          <div>
            <HijriCalender className='hijri-calender-wrap' data-placement={placement}>
              <HijriCalenderControls className='hijri-calender-controls'>
                <div className='hijri-calender-control-top'>
                  <Icon type="right" className='hijri-btn next-btn' onClick={this.addMonth} />
                  {/* <PreviousButton className='hijri-btn previous-btn' onClick={this.subtractMonth} type="button" >{'<'}</PreviousButton> */}
                  <MonthName className='month-name'>{this.state.currentTime.format('iMMMM') + ' ('+this.state.currentTime.format('iMM')+') ' + this.state.currentTime.format('iYYYY')}</MonthName>
                  
                  <Icon type="left" className='hijri-btn previous-btn' onClick={this.subtractMonth}/>
                </div>
                {/* <NextButton className='hijri-btn next-btn' onClick={this.addMonth} type="button" > {'>'} </NextButton> */}
                {this.props.quickSelect &&
                  <YearAndMonthList className='year-month-list-wrap'>
                    <YearsList currentTime={this.state.currentTime} onChange={this.handelYearChange}/>
                    <MonthList currentTime={this.state.currentTime} onChange={this.handelMonthChange}/>
                  </YearAndMonthList>
                }
                
              </HijriCalenderControls>
              <DayNames />
              <MonthDaysView currentTime={this.state.currentTime} dateFormat={this.state.dateFormat} selectedDate={this.state.selectedDate} setSelectedDate={this.setSelectedDate}/>
              {/* <div ref={arrowProps.ref} style={arrowProps.style} /> */}
            </HijriCalender>
          </div>
        } trigger="click" 
        {...rest}>
          <input type="text" autoComplete="off" {...{ className, name, placeholder, disabled, ...input }} value={this.state.selectedDate} onFocus={this.handleFocus} readOnly />
        </Popover>
      </Style>
    )
  }
}

export default onClickOutside(HijriDatePicker);
