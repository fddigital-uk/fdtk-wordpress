const {Component} = wp.element;

const classNames = require("classnames");

const HasWrap = (props) => {
    if (props.wrap) {
        return <div className={'container'}><div className={'fullwidth-block__inner'}>{props.children}</div></div>
    }

    return <div className={'container'}>{props.children}</div>
}

export default (props) => {
    const {contentAlign = "", color, hasInner = false} = props;
    const contentClass = classNames([
        {"fullwidth-block": true},
        {[`fdtk-align-${contentAlign}`]: contentAlign !== ""},
        {[`fullwidth-block--${color}`]: true}
    ]);

    return (
        <div className={contentClass}>
            <HasWrap wrap={hasInner}>
                {props.children}
            </HasWrap>
        </div>
    );
};
