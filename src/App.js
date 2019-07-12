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
      .catch(error => console.error(error))
  } 

  updateCurrentUser = event => {
    event.preventDefault()
    let userInfo = this.filterAllUsers(event.target.value)[0]
    this.setState({
      currentUser: userInfo
    })
    this.fetchUserGroups(event.target.value)
  }

  updateGroupSelection = event => {
    this.setState({
      groupSelection: event.target.value
    })
    this.fetchGroupData(event.target.value)
  }

  filterUserGroupsAcc = user_group_acc_id => {
    let userGroupsAcc = this.state.userGroupsAcc
    return userGroupsAcc.filter(userGroupsAcc => {
      return userGroupsAcc.id === user_group_acc_id
    })
  }

  getUserID = user_group_acc_id => {
    let user_id = this.filterUserGroupsAcc(user_group_acc_id)[0].user_id
    let user_name = this.filterUsers(user_id)[0].name
    return user_name
  }

  filterAllUsers = currentUserId => {
    let users = this.state.users
    return users.filter(user => {
      return user.id === Number(currentUserId)
    })
  }

  filterUsers = currentUserId => {
    let users = this.state.users
    return users.filter(user => {
      return user.id === currentUserId
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
        <AddNewPodcastForm optimisticRenderPodcast={this.optimisticRenderPodcast} currentUser={this.state.currentUser} groupSelection={Number(this.state.groupSelection)}/>
      </React.Fragment>
    )
  }
}

