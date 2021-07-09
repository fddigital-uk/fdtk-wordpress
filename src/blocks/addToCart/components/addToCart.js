import {__} from "@wordpress/i18n";

import classnames from "classnames";


export default (props) => {
    const {productId = 0, text = __("Add to cart"), contentAlign = "left", size = "small"} = props;

    return <div className={classnames("fdtk-addtocart__wrap", `fdtk-align-${contentAlign}`)}>
        <button className={classnames("button fdtk-addtocart", `fdtk-addtocart--${size}`)}
                onClick={`window.location.href = '?add-to-cart=${productId}'`}>
            {text}
        </button>
    </div>
};
