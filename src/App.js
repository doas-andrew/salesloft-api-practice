import React from 'react';
import FrequencyTable from './components/FrequencyTable';
import PeopleTable from './components/PeopleTable';
import { key } from './api_key';
import { proxy_url, SL_People_url } from './constants';
import { IoIosArrowForward as NextArrow, IoIosArrowBack as PrevArrow } from 'react-icons/io';
import { WiMoonAltWaningCrescent4 as Moon } from "react-icons/wi"
import SalesLoft_banner from './images/SalesLoft_banner.png';
import './stylesheets/Table.scss';
import './stylesheets/App.scss';


export default class App extends React.Component {

  state = {
    people: [],
    page: 1,
    next_page: null,
    per_page: 50,

    new_per_page: 50,

    showFrequencyTable: false,
    nightMode: false
  }

  componentDidMount() {
    // this.fetchPeople()
  }

  fetchPeople = (pageNum = 1, per_page=this.state.per_page) => {
    let full_url = [
      proxy_url,
      SL_People_url,
      `?page=${pageNum}`,
      `&per_page=${per_page}`,
      "&sorting=created_at"
    ].join('')

    fetch(full_url, {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.data) {
        this.setState({ 
          people: res.data, 
          page: res.metadata.paging.current_page,
          next_page: res.metadata.paging.next_page
        }) 
      }
    })
  }

  setNewPerPage = e => this.setState({ new_per_page: e.target.value })
  changePerPage = e => {
    e.preventDefault(1, this.state.new_per_page)
    this.setState({ per_page: this.state.new_per_page })
    this.fetchPeople()
  }

  toggleNightMode = () => this.setState({ nightMode: !this.state.nightMode })

  getStyle = () => ( this.state.nightMode ? { backgroundColor: "black" } : {} )

  renderPageButtons = () => {
    return (
      <div className="page-btn-container">
        <button 
        className="blue-btn page-btn" 
        onClick={()=> this.fetchPeople(this.state.page - 1)} 
        disabled={ this.state.page <= 1 }>
          <PrevArrow className="svg-align"/>&nbsp;Previous
        </button>

        <button 
        className="blue-btn page-btn" 
        onClick={()=> this.fetchPeople(this.state.page + 1)} 
        disabled={!this.state.next_page }>
          Next&nbsp;<NextArrow className="svg-align"/>
        </button>
      </div>
    )
  }

  toggleFrequencyTable = ()=> this.setState({ showFrequencyTable: !this.state.showFrequencyTable })

  renderFrequencyTableButton = ()=> {
    if (this.state.people.length > 0)
      return (
        <button className="blue-btn" onClick={this.toggleFrequencyTable}>
          {this.state.showFrequencyTable ? "Hide" : "Show"} Frequency Table
        </button>
      )
  }
  renderFrequencyTable = ()=> {
    if (this.state.showFrequencyTable)
      return <FrequencyTable people={this.state.people} nightMode={this.state.nightMode}/>
    else
      return null
  }

  render() {
    // let asdf = {c:2, b:1, a:3}
    // console.log(Object.keys(asdf))
    return (
      <div className="App" style={this.getStyle()}>
        <button onClick={this.toggleNightMode} className="night-mode-btn">
          {this.state.nightMode ? "Disable" : "Enable"} Night Mode <Moon className="svg-align"/>
        </button>

        <br/>
        <img className="banner" src={SalesLoft_banner} alt="SalesLoft-Banner" draggable="false" />
        <br/>

        <div className="options-container">
          <form onSubmit={this.changePerPage}>
            <label>{ this.state.new_per_page } items per page</label>
            <br/>
            <input type="range" name="per_page" min="1" max="100" value={this.state.new_per_page} onChange={this.setNewPerPage}/>
            <br/>
            <button type="submit" className="blue-btn">Apply</button>
          </form>
        </div>
        <br/>

        { this.renderFrequencyTableButton() }
        { this.renderFrequencyTable() }

        { this.renderPageButtons() }
        <PeopleTable people={this.state.people} nightMode={this.state.nightMode}/>
        { this.renderPageButtons() }
      </div>
    )
  }
}
