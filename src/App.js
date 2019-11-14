import React, { Fragment } from 'react';
import FrequencyTable from './components/FrequencyTable';
import PeopleTable from './components/PeopleTable';
import Links from './components/Links'
import all_people from './data.json';

import { IoIosArrowForward as NextArrow, IoIosArrowBack as PrevArrow } from 'react-icons/io';
import { WiMoonAltWaningCrescent4 as Moon } from 'react-icons/wi'

import SalesLoft_banner from './images/SalesLoft_banner.png';

import './stylesheets/Table.scss';
import './stylesheets/App.scss';


export default class App extends React.Component {

  state = {
    page: 1,
    lastPage: 7,

    per_page: 50,
    new_per_page: 50,

    showFrequencyTable: false,
    nightMode: false
  }

  toggleNightMode = () => this.setState({ nightMode: !this.state.nightMode })
  getAppStyle = () => ( this.state.nightMode ? { backgroundColor: 'black' } : {} )
  getNMBClass = () => ( this.state.nightMode ? 'night-mode-btn nm-on' : 'night-mode-btn nm-off' )

  changeNewPerPage = e => this.setState({ new_per_page: e.target.value })
  applyPerPage = () => {
    this.setState({
      page: 1,
      lastPage: Math.ceil(all_people.length / this.state.new_per_page),
      per_page: this.state.new_per_page
    })
  }

  prevPage = () => this.setState({ page: this.state.page-1 })
  nextPage = () => this.setState({ page: this.state.page+1 })
  renderPageButtons = () => {
    return (
      <div className='page-btn-container'>
        <button 
        className='blue-btn page-btn' 
        onClick={this.prevPage} 
        disabled={ this.state.page <= 1 }>
          <PrevArrow className='svg-align'/>&nbsp;Previous
        </button>

        <button 
        className='blue-btn page-btn' 
        onClick={this.nextPage} 
        disabled={ this.state.page === this.state.lastPage }>
          Next&nbsp;<NextArrow className='svg-align'/>
        </button>
        <div className='page-count-text'>Page {this.state.page} of {this.state.lastPage}</div>
      </div>
    )
  }

  getTables = ()=> {
    const people = all_people.slice( ((this.state.page-1)*this.state.per_page), (this.state.page * this.state.per_page) )
    return (
      <Fragment>
        { this.renderFrequencyTableButton() }
        { this.renderFrequencyTable(people) }

        { this.renderPageButtons() }
        <PeopleTable people={people} nightMode={this.state.nightMode}/>
        { this.renderPageButtons() }
      </Fragment>
    )
  }

  toggleFrequencyTable = ()=> this.setState({ showFrequencyTable: !this.state.showFrequencyTable })
  renderFrequencyTableButton = ()=> {
    return (
      <button className='blue-btn' onClick={this.toggleFrequencyTable}>
        {this.state.showFrequencyTable ? 'Hide' : 'Show'} Frequency Table
      </button>
    )
  }
  renderFrequencyTable = people => {
    if (this.state.showFrequencyTable)
      return <FrequencyTable people={people} nightMode={this.state.nightMode}/>
    else
      return null
  }

  render() {
    return (
      <div className='App' style={this.getAppStyle()}>

        <div className='top-container'>
          <div>
            <button onClick={this.toggleNightMode} className={this.getNMBClass()}>
              {this.state.nightMode ? 'Disable' : 'Enable'} Night Mode <Moon className='svg-align'/>
            </button>
          </div>
          
          <Links/>
        </div>

        <div className='banner-container'>
          <img className='banner' src={SalesLoft_banner} alt='SalesLoft-Banner' draggable='false' />
        </div>

        <div className='options-container'>
          <label>{ this.state.new_per_page } items per page</label>
          <br/>
          <input type='range' name='per_page' min='1' max='100' value={this.state.new_per_page} onChange={this.changeNewPerPage}/>
          <br/>

          <button 
          className='blue-btn apply'
          disabled={this.state.per_page === this.state.new_per_page} 
          onClick={this.applyPerPage}>
            Apply
          </button>
        </div>
        <br/>

        { this.getTables() }

      </div>
    )
  }
}
