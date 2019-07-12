import React, {Component} from 'react'
// const podcastURL = "https://secret-gorge-82811.herokuapp.com/podcasts"
// const userGroupsURL = "https://secret-gorge-82811.herokuapp.com/user_groups"
const userGroupsURL = "http://localhost:3000/user_groups"
const podcastURL = "http://localhost:3000/podcasts"

 
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
            },
            response: {},
            user_groups: ""
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

    // componentDidMount(prevstate) {
    //     // debugger
    //     if(prevstate.user_groups !== this.state.user_groups) {
    //         this.setState({
    //             user_groups: this.state.response.id
    //         })
    //     }
    // }
  
// idk what to do here 
    // saveNewPodCast = () => {
    //     const newPodcast = {
    //         showName: this.state.newPodcast.showName,
    //         episodeName: this.state.newPodcast.episodeName,
    //         url: this.state.newPodcast.url,
    //         comment: this.state.newPodcast.comment,
    //         user_groups: this.state.user_groups
    //       }
    //     return newPodcast
    // }

    setNewPodcast = event => {
        const key = event.target.name
        const value = event.target.value
        this.setState(state => {
          state.newPodcast[key] = value
          return state
        })
    }


    addNewPodcast = (event, props) => {
        event.preventDefault()
        fetch(this.postNewGroupUser(event))
            this.postNewPodcast()
        

        // const newPodcast = {
        //   showName: this.state.newPodcast.showName,
        //   episodeName: this.state.newPodcast.episodeName,
        //   url: this.state.newPodcast.url,
        //   comment: this.state.newPodcast.comment,
        //   user_groups: this.state.user_groups
        // }
        // debugger;
        // console.log(this.saveNewPodCast())
            // this.props.optimisticRenderPodcast(this.saveNewPodCast())
            
    }

    // the user group can post but the posting new podcast wont wait

    postNewPodcast = () => {
        const newPodcast = {
            showName: this.state.newPodcast.showName,
            episodeName: this.state.newPodcast.episodeName,
            url: this.state.newPodcast.url,
            comment: this.state.newPodcast.comment,
            user_groups: this.state.user_groups
        }
        console.log(newPodcast)
        fetch(podcastURL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPodcast)
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error.message))
    }

    postNewGroupUser = event => {
        event.preventDefault()
        fetch(userGroupsURL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newUserGroups)
          })
          .then(response => response.json())
          .then(response => this.setState({user_groups: response.id}))
          .catch(error => console.error(error.message))
    }

    render() {
        return (
            <form onSubmit={(event) => this.addNewPodcast(event)} className="add-new-podcast">
            {/* <form onSubmit={event => this.postNewGroupUser(event)} className="add-new-podcast"> */}
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
 
