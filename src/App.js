import React,  {Component} from 'react';
import './App.css';
// import PodcastPlane from "./components/PodcastPlane"
const groupPodcastURL = "https://secret-gorge-82811.herokuapp.com/groups/1/podcasts"
const groupUsers = "https://secret-gorge-82811.herokuapp.com/groups/1/users"
// const baseURL = "https://secret-gorge-82811.herokuapp.com/"


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      teamSelection: '',
      podcasts: [],
      teamUsers: [],
      newPodcast: {
        firstName: "",
        lastName: "",
        role: "student"
    }
    }
  }

  componentDidMount() {
    fetch(groupPodcastURL)
      .then(results => results.json())
      .then(podcasts => this.setState({podcasts}))
      .catch(error => console.error(error))
    fetch(groupUsers)
      .then(results => results.json())
      .then(teamUsers => this.setState({teamUsers}))
      .catch(error => console.error(error))
  }

  updateFilterCategory = event => {
    this.setState({
      teamSelection: event.target.value
    })
  }

  displayedPodCasts = () => {
    return this.state.podcasts
  }

  teamUsers = () => {
    return this.state.teamUsers
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>The Media Library</h1>
            <div className="team-and-user-control">
              {/* <Search searchTerm={this.state.searchTerm} updateSearchTerm={this.updateSearchTerm}/> */}
              <form className="Team-Selection">
                <select name="filter-team" onChange={this.updateFilterCategory} >
                  <option value="selectTeam">Please Select a Team</option>
                  <option value="Team1">Show Only Team 1</option>
                  <option value="Team2">Show Only Team2</option>
                </select>
              </form >
              <div className="team-user-info">
                <h3>Team Stats</h3>
                <p>Number of Members: {this.state.teamUsers.length}</p>
                <p>Number of Podcasts Submitted: {this.state.podcasts.length}</p>
              </div>
              <div className="user-info">
                <h4>User Information</h4>
              </div>
            </div>  
        </header>
        <table className="podcast-table">
            <thead>
              <tr>
                <th>Show Name</th>
                <th>Episode Name</th>
                <th>User Comments</th>
                <th>URL</th>
                <th>Submitted By:</th>
              </tr>
            </thead>
            <tbody>
              {
                this.displayedPodCasts().map(podcast => {
                  return(
                    <tr key={podcast.id}>
                      <td>{podcast.showName}</td>
                      <td>{podcast.episodeName}</td>
                      <td>{podcast.comment}</td>
                      <td>{podcast.url}</td>
                      <td>{podcast.user_id}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          
      </React.Fragment>
    )
  }
}

