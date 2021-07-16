/**
 * BLOCK: Full Width Block
 */

import Edit from "./components/edit";
import {InnerBlocks} from "@wordpress/block-editor";
import FullWidth from "./components/fullWidth";

import "./styles/editor.scss";
import "./styles/style.scss";

wp.blocks.registerBlockType("fractaldimensions/fullwidth-block", {
    title: "Full Width Colour Block",
    icon: "smiley",
    category: "fractaldimensions",
    attributes: {
        contentAlign: {type: "string", default: "left"},
        color: {type: "string", default: "one"},
        align: {type: 'string', default: "full"},
        hasInner: {type: "boolean", default: false}
    },
    supports: {
        align: ["full"],
        default: "full"
    },

    /* This configures how the content and color fields will work, and sets up the necessary elements */

    edit: function (props) {
        return <Edit key={props.clientId} {...props} />;
    },
    save: function (props) {
        return <FullWidth {...props.attributes}><InnerBlocks.Content/></FullWidth>;
    }
});

