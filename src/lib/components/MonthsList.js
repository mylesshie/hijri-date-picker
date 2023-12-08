import React, { Component } from 'react'
import styled from 'styled-components'
import { Select } from "antd"; 

const { Option } = Select;
const MonthListContainer = styled.span`
  padding: 5px;
`

const MonthSelect = styled.div`
  width: 120px;
  -webkit-appearance: menulist-button;
  background: transparent;
  height: 25px;
  border-radius: 4px;
  font-family: sans-serif;
  font-size: 14px;
`

class MonthsList extends Component {
  state = {
    months: [
      {number: 0, name: 'محرم'},
      {number: 1, name: 'صفر'},
      {number: 2, name: 'ربيع 1'},
      {number: 3, name: 'ربيع 2'},
      {number: 4, name: 'جمادي 1'},
      {number: 5, name: 'جمادي 2'},
      {number: 6, name: 'رجب'},
      {number: 7, name: 'شعبان'},
      {number: 8, name: 'رمضان'},
      {number: 9, name: 'شوال'},
      {number: 10, name: 'ذو القعدة'},
      {number: 11, name: 'ذو الحجة'},
    ]
  }

  render() {
    return (
      <MonthListContainer className='month-list-container'>
        <MonthSelect className='month-list-box'>
          <Select style={{width: "100%"}}  className='month-selector' onChange={this.props.onChange} value={this.props.currentTime.iMonth()} getPopupContainer={(triggerNode) => {
              if (triggerNode) {
                return triggerNode.parentElement;
              }
              return document.body;
            }}>
            {
              this.state.months.map((item, key) => <Option className='month-option' key={item.number} value={item.number}>{item.name}</Option>)
            }
          </Select>
          {/* <MonthSelect className='month-selector' onChange={this.props.onChange} value={this.props.currentTime.iMonth()}>
            {
              this.state.months.map((item, key) => <option className='month-option' key={item.number} value={item.number}>{item.name}</option>)
            }
          </MonthSelect> */}
        </MonthSelect>
      </MonthListContainer>
    )
  }
}

export default MonthsList