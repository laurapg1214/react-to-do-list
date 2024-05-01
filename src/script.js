// check status
const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error("Request was either a 404 or 500");
}

// set up json variable
const json = (response) => response.json()

// construct ToDoList component, initialise new_task, create empty tasks array
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_task: '',
      tasks: [],
      filter: "all"
    };

    // bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  // fetch tasks on mount
  componentDidMount() {
    this.fetchTasks();
  }

  // fetchTasks method
  fetchTasks() {
    fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=191`)
    .then(checkStatus)
    .then(json)
    .then((response) => {
      console.log(response);
      // set state of tasks array to response data
      this.setState({tasks: response.tasks});
    })
    .catch(error => {
      console.error(error.message);
    })
  }
  
  // handleChange method
  handleChange(event) {
    // set state of relevant new_task to input value
    this.setState({ new_task: event.target.value });
  }

  // handleSubmit method to add new task
  handleSubmit(event) {
    // override default
    event.preventDefault();
    // create new task from input
    let { new_task } = this.state;
    new_task = new_task.trim();
    if (!new_task) {
      return;
    }

    // fetch request method - post to server on Submit then run fetchTasks method
    fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=191`, {
      method: "POST", //*GET, POST, PUT, DELETE, etc.
      mode: "cors", // cors (cross origin resource sharing), *same-origin, etc.
      headers: {
        "Content-Type": "application/json", // "Content-Type": "application/x-www-form-urlencoded" (but this is sending JSON data)
      },
      body: JSON.stringify({
        task: {
          content: new_task
        }
      }), // transforms data into JSON; body data type must match "Content-Type" header
    }).then(checkStatus)
      .then(json)
      .then((data) => {
        // create new task, set to empty string
        this.setState({new_task: ''});
        // run fetchTasks to repopulate task list with new task
        this.fetchTasks();
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
   }

  // deleteTask method
  deleteTask(id) {
    // early return if no id supplied
    if (!id) {
      return; 
    }

    fetch(`https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=191`, {
      method: "DELETE",
      mode: "cors",
    }).then(checkStatus)
      .then(json)
      .then((data) => {
        // fetch tasks after delete to render updated task list
        this.fetchTasks(); 
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  // toggleComplete method
  toggleComplete(id, completed) {
    // early return if no id 
    if (!id) {
      return;
    }
    // use conditional operator for newState var
    const newState = completed ? "active" : "complete";

    // fetch tasks to update task list with completed status
    fetch(`https://fewd-todolist-api.onrender.com/tasks/${id}/mark_${newState}?api_key=191`, {
      method: "PUT",
      mode: "cors",
    }).then(checkStatus)
      .then(json)
      .then((data) => {
        this.fetchTasks();
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  // toggleFilter method
  toggleFilter(e) {
    console.log(e.target.name)
    this.setState({
      filter: e.target.name
    })
  }

  // render method
  render() {
    const { new_task, tasks, filter } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-3">To Do List</h2>
            {// use conditional operator
            tasks.length > 0 ? tasks.filter(task => {
              if (filter === "all") {
                return true;
              } else if (filter === "active") {
                return !task.completed;
              } else {
                return task.completed;
              }
            }).map((task) => {
              // return task from Task component
              return (
                <Task 
                  key={task.id} 
                  task={task}
                  // run deleteTask method on delete
                  onDelete={this.deleteTask}
                  // run toggleComplete method on checkbox tick
                  onComplete={this.toggleComplete}
              />);
            }) : <p>no tasks here</p>}
            <div className="mt-3">
              <label>
                <input type="checkbox" name="all" checked={filter === "all"} onChange={this.toggleFilter} /> All   
              </label>
              <label>
                <input type="checkbox" name="active" checked={filter === "active"} onChange={this.toggleFilter} /> Active   
              </label>
              <label>
                <input type="checkbox" name="completed" checked={filter === "completed"} onChange={this.toggleFilter} /> Completed   
              </label>
            </div>
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

// construct Task component to use in ToDoList component to render tasks
class Task extends React.Component {
  render () {
    const { task, onDelete, onComplete } = this.props;
    const { id, content, completed } = task;

    // return paragraph to render task content, delete button, and completion checkbox
    return (
      <div className="row mb-1">
        <p className="col">{content}</p>
        <button 
          onClick={() => onDelete(id)}
        >Delete</button>
        <input  
          className="d-inline-block mt-2"
          type="checkbox"
          onChange={() => onComplete(id, completed)}
          checked={completed}
        />
      </div>
    )
  }
}

// render into DOM
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<ToDoList />);