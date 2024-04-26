var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// check status
var checkStatus = function checkStatus(response) {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
};

// set up json variable
var json = function json(response) {
  return response.json();
};

// construct ToDoList component, initialise new_task, create empty tasks array

var ToDoList = function (_React$Component) {
  _inherits(ToDoList, _React$Component);

  function ToDoList(props) {
    _classCallCheck(this, ToDoList);

    var _this = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, props));

    _this.state = {
      new_task: '',
      tasks: []
    };

    // bind functions
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.fetchTasks = _this.fetchTasks.bind(_this);
    _this.deleteTask = _this.deleteTask.bind(_this);
    return _this;
  }

  // fetch tasks on mount


  _createClass(ToDoList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchTasks();
    }

    // fetchTasks method

  }, {
    key: 'fetchTasks',
    value: function fetchTasks() {
      var _this2 = this;

      fetch('https://fewd-todolist-api.onrender.com/tasks?api_key=191').then(checkStatus).then(json).then(function (response) {
        console.log(response);
        // set state of tasks array to response data
        _this2.setState({ tasks: response.tasks });
      }).catch(function (error) {
        console.error(error.message);
      });
    }

    // deleteTask method with id

  }, {
    key: 'deleteTask',
    value: function deleteTask(id) {
      var _this3 = this;

      // early return if no id supplied
      if (!id) {
        return;
      }

      fetch('https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=191', {
        method: "DELETE",
        mode: "cors"
      }).then(checkStatus).then(json).then(function (data) {
        // fetch tasks after delete to render updated task list
        _this3.fetchTasks();
      }).catch(function (error) {
        _this3.setState({ error: error.message });
        console.log(error);
      });
    }

    // handleChange method

  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      // set state of relevant new_task to input value
      this.setState({ new_task: event.target.value });
    }

    // handleSubmit method to add new task

  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this4 = this;

      // override default
      event.preventDefault();
      // create new task from input
      var new_task = this.state.new_task;

      new_task = new_task.trim();
      if (!new_task) {
        return;
      }

      // fetch request method - post to server on Submit then run fetchTasks method
      fetch('https://fewd-todolist-api.onrender.com/tasks?api_key=191', {
        method: "POST", //*GET, POST, PUT, DELETE, etc.
        mode: "cors", // cors (cross origin resource sharing), *same-origin, etc.
        headers: {
          "Content-Type": "application/json" // "Content-Type": "application/x-www-form-urlencoded" (but this is sending JSON data)
        },
        body: JSON.stringify({
          task: {
            content: new_task
          }
        }) // transforms data into JSON; body data type must match "Content-Type" header
      }).then(checkStatus).then(json).then(function (data) {
        // create new task, set to empty string
        _this4.setState({ new_task: '' });
        // run fetchTasks to repopulate task list with new task
        _this4.fetchTasks();
      }).catch(function (error) {
        _this4.setState({ error: error.message });
        console.log(error);
      });
    }

    // render method

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          new_task = _state.new_task,
          tasks = _state.tasks;


      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-12' },
            React.createElement(
              'h2',
              { className: 'mb-3' },
              'To Do List'
            ),
            // use conditional operator
            tasks.length > 0 ? tasks.map(function (task) {
              // return task from Task component
              return React.createElement(Task, {
                key: task.id,
                task: task
                // run deleteTask method on delete
                , onDelete: _this5.deleteTask
              });
            }) : React.createElement(
              'p',
              null,
              'no tasks here'
            ),
            React.createElement(
              'form',
              { onSubmit: this.handleSubmit, className: 'form-inline my-4' },
              React.createElement('input', {
                type: 'text',
                className: 'form-control mr-sm-2 mb-2',
                placeholder: 'new task',
                value: new_task,
                onChange: this.handleChange
              }),
              React.createElement(
                'button',
                { type: 'submit', className: 'btn btn-primary mb-2' },
                'Submit'
              )
            )
          )
        )
      );
    }
  }]);

  return ToDoList;
}(React.Component);

// construct Task component to use in ToDoList component to render tasks


var Task = function (_React$Component2) {
  _inherits(Task, _React$Component2);

  function Task() {
    _classCallCheck(this, Task);

    return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
  }

  _createClass(Task, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          task = _props.task,
          onDelete = _props.onDelete,
          onComplete = _props.onComplete;
      var id = task.id,
          content = task.content,
          completed = task.completed;

      // return paragraph to render task content, delete button, and completion checkbox

      return React.createElement(
        'div',
        { className: 'row mb-1' },
        React.createElement(
          'p',
          { className: 'col' },
          content
        ),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return onDelete(id);
            }
          },
          'Delete'
        ),
        React.createElement('input', {
          className: 'd-inline-block mt-2',
          type: 'checkbox',
          onChange: function onChange() {
            return onComplete(id, completed);
          },
          checked: completed
        })
      );
    }
  }]);

  return Task;
}(React.Component);

// render into DOM


var container = document.getElementById('root');
var root = ReactDOM.createRoot(container);
root.render(React.createElement(ToDoList, null));