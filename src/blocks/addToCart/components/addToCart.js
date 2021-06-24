import {__} from "@wordpress/i18n";

import classnames from "classnames";


export default (props) => {
    const {productId = 0, text = __("Add to cart"), contentAlign = "left"} = props;

    return <div className={classnames("fdtk-addtocart__wrap", `fdtk-align-${contentAlign}`)}>
        <button className="button fdtk-addtocart" onClick={`window.location.href = '?add-to-cart=${productId}'`}>
            {text}
        </button>
    </div>
};
