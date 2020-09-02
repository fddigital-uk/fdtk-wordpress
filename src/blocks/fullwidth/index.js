/**
 * BLOCK: Full Width Block
 */

/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */

import Edit from "./components/edit";
import {InnerBlocks} from "@wordpress/block-editor";
import FullWidth from "./components/fullWidth";

import "./styles/editor.scss";
import "./styles/styles.scss";

wp.blocks.registerBlockType("fractaldimensions/fullwidth-block", {
  title: "Full Width Block",
  icon: "smiley",
  category: "common",
  attributes: {
    position: { type: "string" },
    contentAlign: { type: "string" },
  },
  supports: {
    align: true
  },

  /* This configures how the content and color fields will work, and sets up the necessary elements */

  edit: function (props) {
    return <Edit {...props} />;
  },
  save: function (props) {
    return <FullWidth {...props.attributes}><InnerBlocks.Content /></FullWidth>;
  },
});

