import React, { Component, Fragment } from "react";
import Item from "./Item";
import axios from "axios";
import "../css/Input.css";
class Input extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      itemName: "",
      definedList: [],
      listValues: [],
      allItem: [],
    };
  }

  componentDidMount = () => {
    axios
      .get("./assets/data/list.json")
      .then((response) => {
        this.setState({
          listValues: response.data,
          allItem: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.inputRef.current.focus();
  };
  addItem = (event) => {
    const { itemName, listValues, allItem } = this.state;
    if (itemName !== "") {
      this.setState({
        listValues: [
          ...listValues,
          { id: listValues.length, value: itemName, checked: "false" },
        ],
        itemName: "",
        allItem: [
          ...allItem,
          { id: listValues.length, value: itemName, checked: "false" },
        ],
      });
    }

    event.preventDefault();
  };

  deleteitem = (itemId) => {
    const { listValues } = this.state;
    this.setState({
      listValues: listValues.filter((item) => item.id !== itemId),
      allItem: listValues.filter((item) => item.id !== itemId),
    });
  };
  updateItem = (itemId, value) => {
    const { listValues } = this.state;
    this.setState({
      listValues: listValues.filter(
        (item) => (item.value = item.id === itemId ? value : item.value)
      ),
    });
  };
  isSelected = (itemId, checked) => {
    const { listValues } = this.state;
    const selected = checked ? "true" : "false";
    this.setState({
      listValues: listValues.filter(
        (item) => (item.checked = item.id === itemId ? selected : item.checked)
      ),
    });
  };
  showActiveTasks = () => {
    const { listValues } = this.state;
    this.setState((prevState) => ({
      allItem: prevState.listValues,
      listValues: listValues.filter((item) => item.checked === "true"),
    }));
  };
  showallTasks = () => {
    const { allItem } = this.state;
    this.setState({
      listValues: allItem,
    });
  };
  render() {
    const { listValues } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.addItem} className="input-box">
          <input
            placeholder="Add new task"
            type="text"
            value={this.state.itemName}
            onChange={(e) =>
              this.setState({
                itemName: e.target.value,
              })
            }
            className="input-container"
            ref={this.inputRef}
          />
          <input type="submit" value="Add new Task" className="add-block" />
        </form>
        <div className="btn-container">
          <button onClick={this.showallTasks} className="btn-wrapper btn-1">
            Show all tasks
          </button>
          <button onClick={this.showActiveTasks} className="btn-wrapper">
            Show active tasks
          </button>
        </div>

        {listValues.length > 0 ? (
          <Fragment>
            <h2 className="taske-header">
              {listValues.length} tasks remaining
            </h2>
            <ul className="list-item">
              {listValues.map((item) => (
                <li key={item.id}>
                  <Item
                    item={item}
                    deleteitem={() => this.deleteitem(item.id)}
                    updateItem={this.updateItem}
                    isSelected={this.isSelected}
                  />
                </li>
              ))}
            </ul>
          </Fragment>
        ) : (
          <h2>Empty list</h2>
        )}
      </div>
    );
  }
}

export default Input;
