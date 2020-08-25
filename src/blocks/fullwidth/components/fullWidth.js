const { Component } = wp.element;

export default class FullWidth extends Component {
  render() {
    const { fullWidthAlignment } = this.props;

    return (
      <div class={"fdtk-fullwidth"} style={{ backgroundColor: "cyan" }}>
        {this.props.children}
      </div>
    );
  }
}
