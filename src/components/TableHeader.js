import React from 'react'

export default function TableHeader() {
    return (
      <thead>
        <tr key="info-header">
          <th>Show Name</th>
          <th>Episode Name</th>
          <th>User Comments</th>
          <th>URL</th>
          <th>Submitted By:</th>
          <th>Edit | Delete</th>
        </tr>
      </thead>
    )
}