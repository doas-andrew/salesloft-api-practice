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
    // this.fetchPeople()
  }

  toggleDarkMode = ()=> {
    this.setState({ darkMode: !this.state.darkMode })
  }

  fetchPeople = () => {
    let full_url = [
      proxy_url,
      SL_People_url,
      `?page=${this.state.page}`,
      `&per_page=${this.state.per_page}`
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
      // console.log(res)
      if (res.data) {
        this.setState({ 
          people: res.data, 
          next_page: res.metadata.paging.next_page
        }) 
      }
    })
  }

  getStyle = () => ( this.state.darkMode ? { backgroundColor: "black" } : {} )

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  refetch = () => {
    this.setState({ page: 1, showCharStats: false })
    this.fetchPeople()
  }

  fetchPage = increment => {
    this.setState({ page: this.state.page + increment })
    this.fetchPeople()
  }

  render() {
    return (
      <div className="App" style={this.getStyle()}>
        <img className="banner" src={SalesLoft_banner} alt="SalesLoft-Banner" draggable="false" />
        <br/>

        <div className="options-container">
          <button type="button" onClick={this.toggleDarkMode}>{this.state.darkMode ? "Disable" : "Enable"} Dark Mode</button>
          <br/>

          <label>{ this.state.per_page } items per page</label>
          <br/>
          <input type="range" name="per_page" min="1" max="100" value={this.state.per_page} onChange={this.handleChange}/>

          <br/>
          <button className="blue-btn submit" onClick={this.refetch}>Fetch!</button>
        </div>

        <div className="page-btn-container">
          <button onClick={()=> this.fetchPage(-1)} disabled={ this.state.page <= 1 }><PrevArrow/></button>
          <button onClick={()=> this.fetchPage(+1)} disabled={!this.state.next_page }><NextArrow/></button>
        </div>

        <PeopleTable darkMode={this.state.darkMode} people={this.state.people}/>
      </div>
    )
  }
}
