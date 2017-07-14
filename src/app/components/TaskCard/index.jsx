import React from 'react'

import Checkbox from 'material-ui/Checkbox'
import { Card, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

const TaskCard = ({ item, index, ...props }) => {
  const { id, title, description, status } = item
  let { priority } = item
  const cardStyle = {
    backgroundColor: status ? '#F3F3F3' : '#FFF',
  }
  const taskTitle = {
    fontSize: '24px',
    textAlign: 'left',
    marginBottom: '10px',
    textDecorationLine: status ? 'line-through' : 'none'
  }
  const taskText = {
    width:'55%', 
    paddingRight: '20px'
  }
  const checkBox = {
    display: 'inline-block',
    width: 'auto',
    marginRight: 0,
  }

  return (
    <Card className='taskCard' style={cardStyle}>
      <CardHeader
        textStyle={taskText}
        titleStyle={taskTitle}
        avatar={
          <Checkbox className='checkBox' 
            onTouchTap={() => props.onUpdate(!status, index, 'status')}
            checked={status} 
            style={checkBox} />
        }
        title={title}
        subtitle={description}
      >
        <div className='buttons'>
          <IconButton
            onTouchTap={() => props.onUpdate('down', index, 'priority')}
            disabled={status}>
            <i className='material-icons'>arrow_downward</i>
          </IconButton>
          <IconButton
            onTouchTap={() => props.onUpdate('up', index, 'priority')}
            disabled={status}>
            <i className='material-icons'>arrow_upward</i>
          </IconButton>
          <IconButton
            disabled={status}
            onTouchTap={() => props.onUpdate(id, index, 'delete')}>
            <i className='material-icons'>delete</i>
          </IconButton>
          <IconButton
            disabled={status}
            onTouchTap={() => console.log(id)}>
            <i className="material-icons">create</i>
          </IconButton>
        </div>
      </CardHeader>
      
    </Card>
  )
}

export default TaskCard
