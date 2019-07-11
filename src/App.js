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
      currentUser: [],
      userGroups: [],
      groupSelection: '',
      podcasts: [],
      groupMembers: [],
      userGroupsAcc: []
    }
  }

  componentDidMount() {
    fetch(usersURL)
      .then(results => results.json())
      .then(users => this.setState({users}))
      .catch(error => console.error(error))
  }

  fetchUserGroups = (id) => {
    let userGroups = `https://secret-gorge-82811.herokuapp.com/users/${id}/groups`
    fetch(userGroups)
      .then(results => results.json())
      .then(userGroups => this.setState({userGroups}))
      .catch(error => console.error(error))
  }

  fetchGroupData = (id) => {
    let groupPodcastURL = `https://secret-gorge-82811.herokuapp.com/groups/${id}/podcasts`
    let groupUsersURL = `https://secret-gorge-82811.herokuapp.com/groups/${id}/users`
    let groupUserGroupsURL = `https://secret-gorge-82811.herokuapp.com/groups/${id}/usergroups`
    fetch(groupUsersURL)
      .then(response => response.json())
      .then(groupMembers => this.setState({groupMembers}))
      .catch(error => console.error(error))
    fetch(groupPodcastURL)
      .then(response => response.json())
      .then(podcasts => this.setState({podcasts}))
      .catch(error => console.error(error))
    fetch(groupUserGroupsURL)
      .then(response => response.json())
      .then(userGroupsAcc => this.setState({userGroupsAcc}))
  } 

  updateCurrentUser = event => {
    event.preventDefault()
    let userInfo = this.filterAllUsers(event.target.value)[0]
    this.setState({
      currentUser: userInfo
    })
    console.log(event.target.value)
    this.fetchUserGroups(event.target.value)
  }

  updateGroupSelection = event => {
    // debugger;
    this.setState({
      groupSelection: event.target.value
    })
    this.fetchGroupData(event.target.value)
  }

  filterUserGroupsAcc = user_group_id => {
    return this.state.userGroupsAcc.filter(userGroupsAcc => {
      // debugger
      return userGroupsAcc.id === user_group_id
    })
  }

  getUserID = user_group_id => {
    // debugger
    let user_id = this.filterUserGroupsAcc(user_group_id)[0].user_id
    // debugger;
    let user_name = this.filterAllUsers(user_id)[0].name
    // debugger;
    return user_name
  }

  filterAllUsers = currentUserId => {
    return this.state.users.filter(user => {
      return user.id === Number(currentUserId)
    })
  }

  groupMembers = () => {
    return this.state.groupMembers
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
        <HeaderElements updateCurrentUser={this.updateCurrentUser} groupMembers={this.state.groupMembers} podcasts={this.state.podcasts} allUsers={this.state.users} updateGroupSelection={this.updateGroupSelection} userGroups={this.state.userGroups} currentUser={this.state.currentUser}/>
        <table className="podcast-table">
          <TableHeader />
          <TableBody displayedPodcasts={this.state.podcasts} formatUserId={this.formatUserId} filterUsers={this.filterUsers} getUserID={this.getUserID}/>
        </table>
        <AddNewPodcastForm optimisticRenderPodcast={this.optimisticRenderPodcast} currentUser={this.state.currentUser}/>
      </React.Fragment>
    )
  }
}

