import React from 'react';

import { ActionCreators } from '../../actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CreateTask from '../../components/CreateTask';
import TaskLists from '../../components/TaskLists';

import {
    fromJS,
} from 'immutable';

const swap = (a, b, arr) => {
  if (a < 0 || a >= arr.length || b < 0 || b >= arr.length) {
    return arr;
  }
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  return arr;
};

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  componentDidMount() {
    this.props.initializeApp();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.tasks.equals(this.props.equals)) {
      this.setState({
        tasks: nextProps.tasks,
      });
    }
  }

  onSubmitHandler(title, description, callBack) {
    let newTask = {
      title,
      description,
    };
    return callBack(newTask);
  }

  onUpdateHandler({ value, index, field, callBack }) {
    let newList;
    const list = this.props.tasks;
    switch (field) {
      case 'priority':
        const indexB = value === 'up' ? index - 1 : index + 1;
        newList = swap(index, indexB, list.toArray());
        break;
      // TODO: put all finished items to bottom
      // case 'status':
      //   newList = list.setIn([index, field], value);
      //   newList = swap(index, list.size - 1, newList.toArray());
      //   break;
      case 'delete':
        newList = list.filter(item => item.get('id') !== value);
        break;
      default:
        newList = list.setIn([index, field], value);
        break;
    }
    this.setState({
      tasks: fromJS(newList),
    });
    return callBack(newList);
  }

  render() {
    return (<MuiThemeProvider>
      <div className="container">
        <CreateTask
          onSubmit={(title, description) => {
            this.onSubmitHandler(title, description, this.props.createTasks);
          }}
        />
        <TaskLists
          items={this.state.tasks.toJS()}
          onUpdate={
            (value, index, field) => {
              this.onUpdateHandler({ value, index, field, callBack: this.props.updateTasks });
            }
          }
        />
      </div>
    </MuiThemeProvider>);
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.todoList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
