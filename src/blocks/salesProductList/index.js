import "./styles/editor.scss";
import "./styles/style.scss";

import EditSalesProductList from "./components/edit";
import SalesProductList from "./components/salesProductList";

wp.blocks.registerBlockType("fractaldimensions/sales-product-list", {
    title: "Sales Product List",
    icon: "store",
    category: "fractaldimensions",
    attributes: {
        products: {
            type: "array",
            default: [],
        },
    },
    edit: function (props) {
        return <EditSalesProductList key={props.clientId} {...props} />
    },
    save: function (props) {
        return <SalesProductList {...props.attributes} />
    }
})
