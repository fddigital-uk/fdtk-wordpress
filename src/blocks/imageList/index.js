/**
 * BLOCK: Image List
 */

import "./styles/editor.scss";
import "./styles/style.scss";
import EditImageList from "./components/edit";
import ImageList from "./components/imageList";

wp.blocks.registerBlockType("fractaldimensions/image-list", {
    title: "Image List (Continuous)",
    icon: "images-alt2",
    category: "fractaldimensions",
    attributes: {
        gallery: {
            type: 'array',
            default: []
        }
    },
    edit: function (props) {
        return <EditImageList {...props}/>
    },
    save: function (props) {
        console.log("PROPS:");
        console.dir(props);
        return <ImageList {...props} />
    }
})
