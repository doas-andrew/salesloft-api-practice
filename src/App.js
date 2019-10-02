import React from 'react';
import { key } from './api_key';
import { proxy_url, SL_People_url } from './constants';
import SalesLoft_banner from './images/SalesLoft_banner.png'
import './stylesheets/App.scss';


class App extends React.Component {

  state = {
    people: [],
    page: 1,
    next_page: null,
    per_page: 50,
    sort_by: "created_at",
    sort_direction: "ASC",
    showCharStats: false
  }

  componentDidMount() {
    // this.fetchPeople()
  }

  fetchPeople = () => {
    let full_url = [
      proxy_url,
      SL_People_url,
      `?page=${this.state.page}`,
      `&per_page=${this.state.per_page}`,
      `&sort_by=${this.state.sort_by}`,
      `&sort_direction=${this.state.sort_direction}`
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

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = e => {
    e.preventDefault()
    this.setState({ showCharStats: false })
    this.fetchPeople()
  }


  render() {
    return (
      <div className="App">
        <img className="banner" src={SalesLoft_banner} alt="SalesLoft-Banner" draggable="false" />
        <br/>
        <form className="sort-form" onSubmit={this.handleSubmit}>

          <label>Sort By</label>
          <select name="sort_by" className="select" value={this.state.sort_by} onChange={this.handleChange}>
            <option value="created_at">Date of Entry (ID)</option>
            <option value="updated_at">Date of last Update</option>
            <option value="last_contacted_at">Date of Last Contact</option>
          </select>
          <br/>
          <label>Order</label>
          <select name="sort_direction" className="select" value={this.state.sort_direction} onChange={this.handleChange}>
            <option value="ASC">Ascending (small to large)</option>
            <option value="DESC">Descending (large to small)</option>
          </select>
          <br/>
          
          <div className="center-contents">
            <label>{ this.state.per_page } items per page</label>
            <br/>
            <input type="range" name="per_page" min="1" max="100" value={this.state.per_page} onChange={this.handleChange} />
          </div>

          <div className="center-contents">
            <button className="blue-btn submit" type="submit">Apply Sorting Options</button>
          </div>
        </form>
        <br/>
      </div>
    )
  }
}

export default App;
