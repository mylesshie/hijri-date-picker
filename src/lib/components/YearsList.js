// Hijri year (1356 to 1500)
import React, { Component } from 'react'
import styled from 'styled-components'
import { Select } from "antd"; 

const { Option } = Select;

const YearListContainer = styled.span`
  padding: 5px;
`

const YearSelect = styled.div`
  width: 100px;
  -webkit-appearance: menulist-button;
  background: transparent;
  height: 25px;
  border-radius: 4px;
  font-family: sans-serif;
  font-size: 12px;
`
class YearsList extends Component {
  
  state = {
      minYear: 1356,
      maxYear: 1500
  }

  render() {
    let yearsList = []
    // Generate a select options of all supported years
    for(let i = this.state.minYear; i <= this.state.maxYear; i = i + 1){
      yearsList.push(
        <Option className='year-option' key={i} value={i}>{i}</Option>
      )
    }
    return (
      <YearListContainer className='year-list-container'>
        <YearSelect>
          <Select style={{width: "100%"}} className='year-selector' onChange={this.props.onChange} value={this.props.currentTime.iYear()} getPopupContainer={(triggerNode) => {
              if (triggerNode) {
                return triggerNode.parentElement;
              }
              return document.body;
            }}>
            {yearsList} 
          </Select>
          {/* <YearSelect className='year-selector' onChange={this.props.onChange} value={this.props.currentTime.iYear()}>
            {yearsList} 
          </YearSelect> */}
        </YearSelect>
      </YearListContainer>
    )
  }
}

export default YearsList