import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Button from "react-bootstrap/Button";
export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edited: false,
      newVlaue: "",
      checked: true,
    };
  }
  handleKeyDown = (e) => {
    const { updateItem } = this.props;
    const { id } = this.props.item;
    if (e.key === "Enter" && this.state.newVlaue !== "") {
      updateItem(id, this.state.newVlaue);
      this.setState({ edited: false });
    }
  };
  handleChange = () => {
    const { isSelected } = this.props;
    const { id } = this.props.item;
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
    isSelected(id, this.state.checked);
  };
  render() {
    const { value } = this.props.item;
    const { deleteitem } = this.props;
    return (
      <div className="item-block">
        <input type="checkbox" onChange={this.handleChange} className="check" />
        {this.state.edited ? (
          <input
            type="text"
            onKeyDown={this.handleKeyDown}
            placeholder={value}
            onChange={(e) => this.setState({ newVlaue: e.target.value })}
          />
        ) : (
          <label className="item-title">{value}</label>
        )}

        <Button
          onClick={() => this.setState({ edited: true })}
          variant="secondary"
          className="edit-btn"
        >
          <FaRegEdit />
        </Button>
        <Button onClick={deleteitem} variant="warning" className="del-btn">
          <FaRegTrashAlt />
        </Button>
      </div>
    );
  }
}

export default Item;
