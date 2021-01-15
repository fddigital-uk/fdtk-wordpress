/**
 * BLOCK: Add to cart button
 */

import Edit from "./components/edit";
import AddToCart from "./components/addToCart";

import "./styles/style.scss"

wp.blocks.registerBlockType("fractaldimensions/add-to-cart-block", {
  title: "Add to Cart Button Block",
  icon: "cart",
  category: "common",
  attributes: {
    productId: { type: "number" },
    text: { type: "string" },
    contentAlign: { type: "string" }
  },
  support: {
    align: true
  },
  edit: function(props) {
    return <Edit {...props} />;
  },
  save: function(props) {
    return <AddToCart {...props.attributes} />;
  }
});
