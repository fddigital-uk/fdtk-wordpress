import "./styles/editor.scss";
import "./styles/style.scss";

import {InnerBlocks} from "@wordpress/block-editor";
import EditQuote from "./components/edit";
import Quote from "./components/quote";

wp.blocks.registerBlockType("fractaldimensions/quote", {
    title: "FD - Quote [CO]",
    icon: "dashicons-format-quote",
    category: "fractaldimensions",
    attributes: {
        title: {
            type: "string",
            default: "",
        },
        caption: {
            type: "string",
            default: "",
        },
        image: {
            type: "object",
            default: {}
        },
        moreText: {
            type: "string",
            default: "More",
        }
    },
    edit: function (props) {
        return <EditQuote key={props.clientId} {...props}/>
    },
    save: function (props) {
        return <Quote {...props.attributes}><InnerBlocks.Content/></Quote>
    }
})
