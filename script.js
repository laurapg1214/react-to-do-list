var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var checkStatus = function checkStatus(response) {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
};

var json = function json(response) {
  return response.json();
};

// construct class, initialise new_task, create empty tasks array

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
    return _this;
  }

  // create handleChange function


  _createClass(ToDoList, [{
    key: 'handleChange',
    value: function handleChange(event) {
      // set state of relevant new_task to input value
      this.setState({ new_task: event.target.value });
    }

    // create handleSubmit function

  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      // for now, do nothing
      event.preventDefault();
    }

    // create render function

  }, {
    key: 'render',
    value: function render() {
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
              // for now, return nothing
              return null;
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

// render into DOM


var container = document.getElementById('root');
var root = ReactDOM.createRoot(container);
root.render(React.createElement(ToDoList, null));