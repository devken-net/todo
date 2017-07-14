import React from 'react'

import TaskCard from '../TaskCard'

const TaskList = ({ items, ...props }) => {
  return (
    <div className='taskList'>
      {items.map((item, index, list) => <TaskCard key={item.id}  {...{item, index, ...props}} />)}
    </div>
  )
}

export default TaskList
