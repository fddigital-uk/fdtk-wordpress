const { Component } = wp.element;

const classNames = require("classnames");

export default (props) => {
  const { contentAlign = "", color } = props;
  const contentClass = classNames([
    { "fdtk-fullwidth": true },
    { [`fdtk-align-${contentAlign}`]: contentAlign !== "" },
    { [`align${contentAlign}`]: contentAlign !== "" }
  ]);

  return (
    <div className={contentClass} style={color && color !== "" ? { backgroundColor: color } : {}}>
      {props.children}
    </div>
  );
};
