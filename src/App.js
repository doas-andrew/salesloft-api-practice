import React from 'react';
import { key } from './api_key';
import { proxy_url, SL_People_url } from './constants';
import './stylesheets/App.css';


class App extends React.Component {

  state = {
    people: [],
    page: 1,
    per_page: 50,
    sort_by: "created_at",
    sort_direction: "ASC"
  }

  componentDidMount() {
    this.fetchPeople()
  }

  fetchPeople = ()=> {
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
      console.log(res)
      this.setState({ people: res.data }) 
    })
  }


  render() {
    return (
      <div className="App">
        Hello, world.
      </div>
    )
  }
}

export default App;
