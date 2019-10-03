import React, { Fragment } from 'react';
import FrequencyTable from './components/FrequencyTable';
import PeopleTable from './components/PeopleTable';
import { proxy_url, SL_People_url, total_records } from './constants';
import { IoIosArrowForward as NextArrow, IoIosArrowBack as PrevArrow } from 'react-icons/io';
import { WiMoonAltWaningCrescent4 as Moon } from "react-icons/wi"
import ReactLoading from 'react-loading';
import SalesLoft_banner from './images/SalesLoft_banner.png';
import github from './images/github_cloud.png';
import linkedin from './images/linkedin.png';
import asallen from './images/asallen-profile.png';
import './stylesheets/Table.scss';
import './stylesheets/App.scss';


const key = process.env.REACT_APP_SALESLOFT_API_KEY

export default class App extends React.Component {

  state = {
    loading: false,

    people: [],
    page: 1,
    next_page: null,
    per_page: 50,

    new_per_page: 50,

    showFrequencyTable: false,
    nightMode: false
  }

  componentDidMount() {
    this.fetchPeople()
  }

  fetchPeople = (pageNum = 1, per_page = this.state.per_page) => {
    this.setState({ loading: true })
    let full_url = [
      proxy_url,
      SL_People_url,
      `?page=${pageNum}`,
      `&per_page=${per_page}`,
      "&sorting=created_at"
    ].join('')

    fetch(full_url, {
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
          loading: false,
          people: res.data, 
          page: res.metadata.paging.current_page,
          next_page: res.metadata.paging.next_page,
          per_page: res.metadata.paging.per_page
        }) 
      }
    })
  }

  getAppStyle = () => ( this.state.nightMode ? { backgroundColor: "black" } : {} )

  toggleNightMode = () => this.setState({ nightMode: !this.state.nightMode })

  getNMBClass = () => ( this.state.nightMode ? "night-mode-btn nm-on" : "night-mode-btn nm-off" )

  changeNewPerPage = e => this.setState({ new_per_page: e.target.value })

  renderPageButtons = () => {
    return (
      <div className="page-btn-container">
        <button 
        className="blue-btn page-btn" 
        onClick={()=> this.fetchPeople(this.state.page - 1)} 
        disabled={ this.state.page <= 1 || this.state.loading }>
          <PrevArrow className="svg-align"/>&nbsp;Previous
        </button>

        <button 
        className="blue-btn page-btn" 
        onClick={()=> this.fetchPeople(this.state.page + 1)} 
        disabled={!this.state.next_page || this.state.loading }>
          Next&nbsp;<NextArrow className="svg-align"/>
        </button>
        <div className="page-count-text">Page {this.state.page} of { Math.ceil(total_records / this.state.per_page) }</div>
      </div>
    )
  }

  toggleFrequencyTable = ()=> this.setState({ showFrequencyTable: !this.state.showFrequencyTable })

  renderFrequencyTableButton = ()=> {
    return (
      <button className="blue-btn" onClick={this.toggleFrequencyTable} disabled={this.state.loading}>
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

  getTables = ()=> {
    if (this.state.loading)
      return (
        <Fragment>
          { this.renderFrequencyTableButton() }

          { this.renderPageButtons() }
          <ReactLoading className="loading" type="spokes" color="#2897D3" width="15%"/>
        </Fragment>
      )
    else
      return (
        <Fragment>
          { this.renderFrequencyTableButton() }
          { this.renderFrequencyTable() }

          { this.renderPageButtons() }
          <PeopleTable people={this.state.people} nightMode={this.state.nightMode}/>
          { this.renderPageButtons() }
        </Fragment>
      )
  }

  render() {
    return (
      <div className="App" style={this.getAppStyle()}>
        <button onClick={this.toggleNightMode} className={this.getNMBClass()} disabled={this.state.loading}>
          {this.state.nightMode ? "Disable" : "Enable"} Night Mode <Moon className="svg-align"/>
        </button>

        <div className="links-container">
          <a className="link" href="https://github.com/ASAllen67/salesloft-api-practice" target="_blank" rel="noopener noreferrer">
            <img className="github-icon" src={github} alt="github-icon" />
          </a>
          <a className="link" href="https://www.linkedin.com/in/asallen67/" target="_blank" rel="noopener noreferrer">
            <img className="linkedin-icon" src={linkedin} alt="linkedin-icon" />
          </a>
          <a className="link" href="https://asallen.info" target="_blank" rel="noopener noreferrer">
            <img className="asallen-icon" src={asallen} alt="asallen-icon" />
          </a>
        </div>

        <br/>
        <img className="banner" src={SalesLoft_banner} alt="SalesLoft-Banner" draggable="false" />
        <br/>

        <div className="options-container">
          <label>{ this.state.new_per_page } items per page</label>
          <br/>
          <input type="range" name="per_page" min="1" max="100" value={this.state.new_per_page} onChange={this.changeNewPerPage}/>
          <br/>

          <button 
          className="blue-btn apply"
          disabled={this.state.loading || this.state.per_page == this.state.new_per_page} 
          onClick={()=> this.fetchPeople(1, this.state.new_per_page)}>
            Apply
          </button>
        </div>
        <br/>

        { this.getTables() }

      </div>
    )
  }
}
