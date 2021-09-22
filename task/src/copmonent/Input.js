import React, { Component, Fragment } from "react";
import Item from "./Item";

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: "",
      listValues: [],
      allItems: [],
    };
  }
  addItem = (event) => {
    const { itemName, listValues } = this.state;
    if (itemName !== "") {
      this.setState({
        listValues: [
          ...listValues,
          { id: listValues.length, value: itemName, checked: "false" },
        ],
        itemName: "",
      });
    }

    event.preventDefault();
  };

  deleteitem = (itemId) => {
    const { listValues } = this.state;
    this.setState({
      listValues: listValues.filter((item) => item.id !== itemId),
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
    this.setState({
      allItems: listValues,
      listValues: listValues.filter((item) => item.checked === "true"),
    });
  };

  render() {
    const { listValues } = this.state;
    return (
      <div>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            value={this.state.itemName}
            onChange={(e) =>
              this.setState({
                itemName: e.target.value,
              })
            }
          />
          <input type="submit" value="Add" />
        </form>
        <button>Show all tasks</button>
        <button onClick={this.showActiveTasks}>Show active tasks</button>
        {listValues.length > 0 ? (
          <Fragment>
            <h1>{listValues.length} tasks remaining</h1>
            <ul>
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
