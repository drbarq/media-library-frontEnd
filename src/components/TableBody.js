import React from 'react'

export default function TableBody(props) {

    return (
        <tbody>
        {
          props.displayedPodcasts.map(podcast => {
            // debugger;
            return(
              <tr key={podcast.id}>
                <td>{podcast.showName}</td>
                <td>{podcast.episodeName}</td>
                <td>{podcast.comment}</td>
                <td>{podcast.url}</td>
                <td>{podcast.user_group_id}</td>
                {/* <td>{props.getUserID(podcast.user_group_id)}</td> */}
                <td>
                  <button>
                    <i className="fa fa-edit"></i>
                  </button> 
                  <button>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
    )
}