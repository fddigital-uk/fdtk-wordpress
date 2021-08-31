/**
 * BLOCK: Image List
 */

import "./styles/editor.scss";
import "./styles/style.scss";
import EditImageList from "./components/edit";
import ImageList from "./components/imageList";

wp.blocks.registerBlockType("fractaldimensions/image-list", {
    title: "FD - Image List (Continuous)",
    icon: "images-alt2",
    category: "fractaldimensions",
    attributes: {
        gallery: {
            type: "array",
            default: [],
        },
        numberToShow: {
            type: "number",
            default: 4,
        },
        numberOfColumns: {
            type: "string",
        },
        moreText: {
            type: "string",
            default: "More",
        }
    },
    edit: function (props) {
        return <EditImageList key={props.clientId} {...props}/>
    },
    save: function (props) {
        return <ImageList {...props} />
    }
})
