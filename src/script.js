// check status
const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}

// set up json variable
const json = (response) => response.json()

// construct class, initialise new_task, create empty tasks array
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_task: '',
      tasks: [],
    };

    // bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // create function to fetch tasks once component mounts
  componentDidMount() {
    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=191")
      .then(checkStatus)
      .then(json)
      .then((response) => {
        console.log(response);
        // set state of tasks array to response return
        this.setState({tasks: response.tasks});
      })
      // error catching
      .catch(error => {
        console.error(error.message);
      })
  }

  // create handleChange function
  handleChange(event) {
    // set state of relevant new_task to input value
    this.setState({ new_task: event.target.value });
  }

  // create handleSubmit function
  handleSubmit(event) {
    // for now, do nothing
    event.preventDefault();
  }

  // create render function
  render() {
    const { new_task, tasks } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-3">To Do List</h2>
            {// use conditional operator
            tasks.length > 0 ? tasks.map((task) => {
              // for now, return nothing
              return null;
            }) : <p>no tasks here</p>}
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <input 
                type="text"
                className="form-control mr-sm-2 mb-2"
                placeholder="new task"
                value={new_task}
                onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

// render into DOM
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<ToDoList />);