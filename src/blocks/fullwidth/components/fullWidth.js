const { Component } = wp.element;

const classNames = require("classnames");

export default class FullWidth extends Component {
  render() {
    const { contentAlign = "", position } = this.props;

    const contentClass = classNames([
      { "fdtk-fullwidth": true },
      { [`fdtk-align-${contentAlign}`]: contentAlign !== "" },
      { [`align${position}`]: position !== "" },
    ]);

    return (
      <div class={contentClass}>
        {this.props.children}
      </div>
    );
  }
}
