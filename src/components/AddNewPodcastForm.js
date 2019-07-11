import React, {Component} from 'react'
const podcastURL = "https://secret-gorge-82811.herokuapp.com/podcasts"

 
export default class AddNewPodcastForm extends Component {
    constructor() {
        super()
        this.state = {
            newPodcast: {
                showName: "",
                episodeName: "",
                url: "",
                comment: "",
                user_id: ""
            },
        }
    }

    addNewPodcast = (event, props) => {
        event.preventDefault()
        const newPodcast = {
          showName: this.state.newPodcast.showName,
          episodeName: this.state.newPodcast.episodeName,
          url: this.state.newPodcast.url,
          comment: this.state.newPodcast.comment,
          user_id: props.currentUser
        }
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
        .catch(error => console.error(error.message))
    }


    render() {
        return (
            <form onSubmit={this.addNewPodcast} className="add-new-podcast">
                <h2>Add New Podcast</h2>
                <div className="new-podcast-inputs">
                    <input 
                        onChange={this.setNewPodcast} 
                        required 
                        type="text" 
                        name="showName" 
                        placeholder="Show Name" 
                        value={this.state.newPodcast.showName}
                    />
                    <input 
                        onChange={this.setNewPodcast}  
                        required 
                        type="text" 
                        name="episodeName" 
                        placeholder="Episode Name" 
                        value={this.state.newPodcast.episodeName}
                    />
                    <input 
                        onChange={this.setNewPodcast}   
                        required 
                        type="text" 
                        name="comment" 
                        placeholder="Comments about the show" 
                        value={this.state.newPodcast.comment}
                    />
                    <input 
                        onChange={this.setNewPodcast}   
                        required 
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
 
