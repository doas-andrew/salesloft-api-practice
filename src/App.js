import React from 'react';
import PeopleTable from './components/PeopleTable'
import { key } from './api_key';
import { proxy_url, SL_People_url } from './constants';
import { IoIosArrowForward as NextArrow, IoIosArrowBack as PrevArrow } from 'react-icons/io'
import SalesLoft_banner from './images/SalesLoft_banner.png'
import './stylesheets/App.scss';


export default class App extends React.Component {

  state = {
    people: [],
    page: 1,
    next_page: null,
    per_page: 50,

    showCharStats: false,
    darkMode: false
  }

  componentDidMount() {
    this.fetchPeople()
  }

  fetchPeople = (pageNum = 1) => {
    let full_url = [
      proxy_url,
      SL_People_url,
      `?page=${pageNum}`,
      `&per_page=${this.state.per_page}`,
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

  changePerPage = e => {
    let newState = { per_page: e.target.value }
    if (newState.per_page * this.state.page > 346)
      newState.page = 1

    this.setState(newState)
  }

  toggleDarkMode = () => this.setState({ darkMode: !this.state.darkMode })

  getStyle = () => ( this.state.darkMode ? { backgroundColor: "black" } : {} )

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

  render() {
    console.log(this.state.page)
    return (
      <div className="App" style={this.getStyle()}>
        <img className="banner" src={SalesLoft_banner} alt="SalesLoft-Banner" draggable="false" />
        <br/>

        <div className="options-container">
          <button type="button" onClick={this.toggleDarkMode}>{this.state.darkMode ? "Disable" : "Enable"} Dark Mode</button>
          <br/>

          <label>{ this.state.per_page } items per page</label>
          <br/>
          <input type="range" name="per_page" min="1" max="100" value={this.state.per_page} onChange={this.changePerPage}/>
        </div>

        { this.renderPageButtons() }
        <PeopleTable darkMode={this.state.darkMode} people={this.state.people}/>
        { this.renderPageButtons() }
      </div>
    )
  }
}
