import React from 'react'

function CommentDisplay({ctext = "dummy text", c_author_name = ""}) {
  return (
    <div>
        <h3>{ctext}</h3>
        <p>{c_author_name}</p>
      
    </div>
  )
}

export default CommentDisplay
