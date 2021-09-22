import React, { Component, Fragment } from "react";

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
      <Fragment>
        <input type="checkbox" onChange={this.handleChange} />
        {this.state.edited ? (
          <input
            type="text"
            onKeyDown={this.handleKeyDown}
            placeholder={value}
            onChange={(e) => this.setState({ newVlaue: e.target.value })}
          />
        ) : (
          <label>{value}</label>
        )}
        <br />
        <button onClick={() => this.setState({ edited: true })}>
          Edit {value}
        </button>
        <button onClick={deleteitem}>Delete {value}</button>
      </Fragment>
    );
  }
}

export default Item;
