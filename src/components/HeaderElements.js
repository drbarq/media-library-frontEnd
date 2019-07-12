import React from 'react'

export default function HeaderElements(props) {

    return (
        <header>
            <div className="state-control">
                <h1>The Media Library</h1>

                <form className="User-Selection">
                    <select name="filter-user" onChange={props.updateCurrentUser} >
                        <option defaultValue="selectUser" >Please Select a User</option>
                        {props.allUsers.map(user => {
                            return(
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        })}
                    </select>
                </form >

                <form className="Group-Selection">
                    <select name="filter-team" onChange={(event) => props.updateGroupSelection(event)} >
                        <option defaultValue="selectTeam" >Please Select a Team</option>
                        {props.userGroups.map(team => {
                            return(
                                <option key={team.id} value={team.id}>{team.name}</option>
                            )
                        })}
                    </select>
                </form >
            </div>

            <div className="team-and-user-info">
                <div className="team-info">
                    <h4>Team Stats</h4>
                    <p>Number of Members: {props.groupMembers.length}</p>
                    <p>Number of Podcasts Submitted: {props.podcasts.length}</p>
                </div>
                <div className="user-info">
                    <h4>User Information </h4>
                    <p>Name: {props.currentUser.name}</p>
                    <p>Email: {props.currentUser.email}</p>
                    <p>Member of {props.userGroups.length} Teams</p>
                </div>
            </div>  
        </header>
    )
}


