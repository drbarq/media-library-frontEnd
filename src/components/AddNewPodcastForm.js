import React, {Component} from 'react'
const podcastURL = "https://secret-gorge-82811.herokuapp.com/podcasts"
const userGroupsURL = "https://secret-gorge-82811.herokuapp.com/user_groups"

 
export default class AddNewPodcastForm extends Component {
    constructor() {
        super()
        this.state = {
            newPodcast: {
                showName: "",
                episodeName: "",
                url: "",
                comment: "",
                user_groups: ""
            },
            newUserGroups: {
                user_id: 0,
                group_id: 0
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentUser !== this.props.currentUser || nextProps.groupSelection!== this.props.groupSelection){
            this.setState({
                newUserGroups: {
                    user_id: nextProps.currentUser.id,
                    group_id: nextProps.groupSelection
                }
            });
        }
    }

    addNewPodcast = (event, props) => {
        event.preventDefault()
        const newPodcast = {
          showName: this.state.newPodcast.showName,
          episodeName: this.state.newPodcast.episodeName,
          url: this.state.newPodcast.url,
          comment: this.state.newPodcast.comment,
          user_groups: this.state.user_groups
        }
        // debugger
        this.postNewPodcast(newPodcast)
    }

    setNewPodcast = event => {
        const key = event.target.name
        const value = event.target.value
        this.setState(state => {
          state.newPodcast[key] = value
          return state
        })
      }

    postNewPodcast = (newPodcast, props) => {
        props.optimisticRenderPodcast(newPodcast)        
        fetch(podcastURL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPodcast)
        })
        .then(response => console.log(response))
        .catch(error => console.error(error.message))
    }

    postNewGroupUser = (event, props) => {
        event.preventDefault()
        // debugger
        this.setNewUserGroup()
        debugger
        fetch(userGroupsURL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newUserGroups)
          })
          .then(response => console.log(response))
          .catch(error => console.error(error.message))
    }

    // setNewUserGroup = (props) => {
    //     debugger
    //    this.setState(state => {
    //         newUserGroups: {
    //             user_id: this.props.currentUser.id,
    //             group_id: parseInt(this.props.groupSelection)
    //         }
    //         return state
    //     })
    // }


    // componentDidMount(props) {
    //     this.setNewUserGroup(props)
    // }


    setNewUserGroup = (props) => {
        debugger
        this.setState({
                user_id: this.props.currentUser,
                group_id: this.props.groupSelection
        })
    }

                // <form onSubmit={this.addNewPodcast} className="add-new-podcast">
            // <form onSubmit={(event) => this.postNewGroupUser(event)} className="add-new-podcast">

    render() {
        return (

            <form onSubmit={event => this.postNewGroupUser(event)} className="add-new-podcast">
                <h2>Add New Podcast</h2>
                <div className="new-podcast-inputs">
                    <input 
                        onChange={this.setNewPodcast} 
                        // required 
                        type="text" 
                        name="showName" 
                        placeholder="Show Name" 
                        value={this.state.newPodcast.showName}
                    />
                    <input 
                        onChange={this.setNewPodcast}  
                        // required 
                        type="text" 
                        name="episodeName" 
                        placeholder="Episode Name" 
                        value={this.state.newPodcast.episodeName}
                    />
                    <input 
                        onChange={this.setNewPodcast}   
                        // required 
                        type="text" 
                        name="comment" 
                        placeholder="Comments about the show" 
                        value={this.state.newPodcast.comment}
                    />
                    <input 
                        onChange={this.setNewPodcast}   
                        // required 
                        type="text" 
                        name="url" 
                        placeholder="Link to the Podcast" 
                        value={this.state.newPodcast.url}
                    />
                    <input type="submit" value="Add Podcast" /> 
                </div>
            </form>
        )
    }
}
 
