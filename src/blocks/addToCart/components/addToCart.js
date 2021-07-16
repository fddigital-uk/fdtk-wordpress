import {__} from "@wordpress/i18n";

import classnames from "classnames";


export default (props) => {
    const {productId = 0, text = __("Add to cart"), contentAlign = "left", size = "small"} = props;

    return <div className={classnames("fdtk-addtocart__wrap", `fdtk-align-${contentAlign}`)}>
        <a href={`?add-to-cart=${productId}'`} className={classnames("button fdtk-addtocart", `fdtk-addtocart--${size}`)}>
            {text}
        </a>
    </div>
};
