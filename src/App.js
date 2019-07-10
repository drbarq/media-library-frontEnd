import React,  {Component} from 'react';
import './App.css';
// import PodcastPlane from "./components/PodcastPlane"
const groupPodcastURL = "https://secret-gorge-82811.herokuapp.com/groups/1/podcasts"
const groupUsers = "https://secret-gorge-82811.herokuapp.com/groups/1/users"
// const baseURL = "https://secret-gorge-82811.herokuapp.com/"
const podcastURL = "https://secret-gorge-82811.herokuapp.com/podcasts"


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      teamSelection: '',
      podcasts: [],
      teamUsers: [],
      newPodcast: {
        showName: "",
        episodeName: "",
        url: "",
        comment: "",
        user_id: ""
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

  postNewPodcast = newPodcast => {
    this.setState(state => {
      state.podcasts = [...state.podcasts, newPodcast]
      return state
    })
    fetch(podcastURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPodcast)
    }).catch(error => console.error(error.message))
  }

  updateNewPodcast = event => {
    const key = event.target.name
    const value = event.target.value
    this.setState(state => {
      state.newPodcast[key] = value
      return state
    })
  }

  // Podcast.create(episodeName: 'worst cast', showName: 'not me', url: 'www.aol.com', comment: 'good', user: joe)

  addNewPodcast = event => {
    event.preventDefault()
    const newPodcast = {
      showName: this.state.newPodcast.showName,
      episodeName: this.state.newPodcast.episodeName,
      url: this.state.newPodcast.url,
      comment: this.state.newPodcast.comment,
      user_id: this.state.newPodcast.user_id
    }
    this.postNewPodcast(newPodcast)
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
                  <option defaultValue="selectTeam" >Please Select a Team</option>
                  <option value="Team1">Show Only Team 1</option>
                  <option value="Team2">Show Only Team2</option>
                </select>
              </form >
              <div className="team-user-info">
                <h4>Team Stats</h4>
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
              <tr key="info-header">
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
          <form onSubmit={this.addNewPodcast} className="add-new-podcast">
                <h2>Add New Podcast</h2>
                <input 
                    onChange={this.updateNewPodcast} 
                    required 
                    type="text" 
                    name="showName" 
                    placeholder="Show Name" 
                    value={this.state.newPodcast.showName}
                />
                <input 
                    onChange={this.updateNewPodcast}  
                    required 
                    type="text" 
                    name="episodeName" 
                    placeholder="Episode Name" 
                    value={this.state.newPodcast.episodeName}
                />
                <input 
                    onChange={this.updateNewPodcast}  
                    required 
                    type="text" 
                    name="comment" 
                    placeholder="Comments about the show" 
                    value={this.state.newPodcast.comment}
                />
                <input 
                    onChange={this.updateNewPodcast}  
                    required 
                    type="text" 
                    name="url" 
                    placeholder="Link to the Podcast" 
                    value={this.state.newPodcast.url}
                />
                <input 
                    onChange={this.updateNewPodcast}  
                    required 
                    type="text" 
                    name="user_id" 
                    placeholder="User ID" 
                    value={this.state.newPodcast.user_id}
                />
                {/* <select onChange={this.updateNewPerson} required name="role" value={this.state.newPerson.role}>
                    <option value="Please Select" selected disabled={true}>Please Select a Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="administrator">Administrator</option>
                </select> */}
                <input type="submit" value="Add Podcast" /> 
            </form>
      </React.Fragment>
    )
  }
}

