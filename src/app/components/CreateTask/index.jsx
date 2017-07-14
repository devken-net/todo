import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

const btnAdd = {
  width: '30%',
  float: 'right'
}

class CreateTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }
  
  onSubmit(title = null, description = null, callBack) {
    if(!title || !description) {
      return false
    }
    this.setState({
      title: '',
      description: ''
    })
    return callBack(title, description)
  }

  render() {
    return <Paper className='createTask' zDepth={2}>
      <TextField
        hintText='What do you want to do?'
        floatingLabelText='Title'
        onChange={(event, newValue) => this.setState({ title: newValue })}
        value={this.state.title}
        fullWidth
      />
      <TextField
        hintText='more details...'
        floatingLabelText='Description'
        onChange={(event, newValue) => this.setState({ description: newValue })}
        value={this.state.description}
        fullWidth
        multiLine
        rowsMax={2}
      />
      <RaisedButton 
        onTouchTap={() => this.onSubmit(this.state.title, this.state.description, this.props.onSubmit)}
        label='Add'
        className='btnAdd' 
        primary />
    </Paper>
  }
}

export default CreateTask;
