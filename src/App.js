import React,  {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import HeaderElements from './components/HeaderElements';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import AddNewPodcastForm from './components/AddNewPodcastForm';
// import PodcastPlane from "./components/PodcastPlane"
// const groupPodcastURL = "https://secret-gorge-82811.herokuapp.com/groups/1/podcasts"
// const groupUsers = "https://secret-gorge-82811.herokuapp.com/groups/1/users"
// const baseURL = "https://secret-gorge-82811.herokuapp.com/"
const usersURL = "https://secret-gorge-82811.herokuapp.com/users"



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      currentUser: '',
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
    this.setState({
      currentUser: event.target.value
    })
    this.fetchUserTeams(event.target.value)
  }

  updateTeamSelection = event => {
    this.setState({
      teamSelection: event.target.value
    })
    this.fetchGroupData(event.target.value)
  }

  // displayedPodcasts = () => {
  //   return this.state.podcasts
  // }

 
// this function doesnt work I need to filter over an object 

  // formatUserId = (userID) => {
  //   let userIndex = (userID - 1)
  //   Object.filter = (obj, predicate) => 
  //     Object.assign(...Object.keys(obj)
  //                   .filter( key => predicate(obj[key]) )
  //                   .map( key => ({ [key]: obj[key] }) ) );

  

  //   this.state.teamUsers.filter(user.id => {
  //     return 
  //   })

  //   // console.log(userID)
  //   console.log(userID)
  //   console.log(this.state.users[userID])
  //   console.log(userIndex)
  //   console.log(this.state.users[userIndex])

  //   // debugger;
  //   // return this.state.users[userID].name 
  // }

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
        <HeaderElements updateCurrentUser={this.updateCurrentUser} teamUsers={this.state.teamUsers} podcasts={this.state.podcasts} allUsers={this.state.users} updateTeamSelection={this.updateTeamSelection} userTeams={this.state.userTeams}/>
        <table className="podcast-table">
          <TableHeader />
          <TableBody displayedPodcasts={this.state.podcasts} formatUserId={this.formatUserId}/>
        </table>
        <AddNewPodcastForm optimisticRenderPodcast={this.optimisticRenderPodcast} currentUser={this.state.currentUser}/>
      </React.Fragment>
    )
  }
}

