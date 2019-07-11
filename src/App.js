import React,  {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import HeaderElements from './components/HeaderElements';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import AddNewPodcastForm from './components/AddNewPodcastForm';


const usersURL = "https://secret-gorge-82811.herokuapp.com/users"



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      // currentUser: '',
      currentUser: [],
      userTeams: [],
      teamSelection: '',
      podcasts: [],
      teamUsers: [],
    }
  }

  componentDidMount() {
    fetch(usersURL)
      .then(results => results.json())
      .then(users => this.setState({users}))
      .catch(error => console.error(error))
  }

  fetchUserTeams = (id) => {
    let userTeams = `https://secret-gorge-82811.herokuapp.com/users/${id}/groups`
    fetch(userTeams)
      .then(results => results.json())
      .then(userTeams => this.setState({userTeams}))
      .catch(error => console.error(error))
  }

  fetchGroupData = (id) => {
    let groupPodcastURL = `https://secret-gorge-82811.herokuapp.com/groups/${id}/podcasts`
    let groupUsersURL = `https://secret-gorge-82811.herokuapp.com/groups/${id}/users`
    fetch(groupUsersURL)
      .then(response => response.json())
      .then(teamUsers => this.setState({teamUsers}))
      .catch(error => console.error(error))
    fetch(groupPodcastURL)
      .then(response => response.json())
      .then(podcasts => this.setState({podcasts}))
      .catch(error => console.error(error))
  }

  updateCurrentUser = event => {
    event.preventDefault()
    let userInfo = this.filterAllUsers(event.target.value)[0]
    this.setState({
      currentUser: userInfo
    })
    this.fetchUserTeams(event.target.value)
  }

  updateTeamSelection = event => {
    this.setState({
      teamSelection: event.target.value
    })
    this.fetchGroupData(event.target.value)
  }

  filterUsers = userID => {
    return this.state.teamUsers.filter(user => {
      return user.id === userID
    })
  }

  getUserID = userID => {
    let usersName = this.filterUsers(userID)[0].name
    return usersName
  }

  filterAllUsers = currentUserId => {
    return this.state.users.filter(user => {
      return user.id === Number(currentUserId)
    })
  }

  teamUsers = () => {
    return this.state.teamUsers
  }

  optimisticRenderPodcast = (newPodcast) => {
    this.setState(state => {
      state.podcasts = [...state.podcasts, newPodcast]
      return state
    })
  }

  render() {
    return (
      <React.Fragment>
        <HeaderElements updateCurrentUser={this.updateCurrentUser} teamUsers={this.state.teamUsers} podcasts={this.state.podcasts} allUsers={this.state.users} updateTeamSelection={this.updateTeamSelection} userTeams={this.state.userTeams} currentUser={this.state.currentUser}/>
        <table className="podcast-table">
          <TableHeader />
          <TableBody displayedPodcasts={this.state.podcasts} formatUserId={this.formatUserId} filterUsers={this.filterUsers} getUserID={this.getUserID}/>
        </table>
        <AddNewPodcastForm optimisticRenderPodcast={this.optimisticRenderPodcast} currentUser={this.state.currentUser}/>
      </React.Fragment>
    )
  }
}

