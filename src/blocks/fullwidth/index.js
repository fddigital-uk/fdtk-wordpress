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
    content: { type: "string" },
    fullWidthAlignment: { type: "string" },
  },

  /* This configures how the content and color fields will work, and sets up the necessary elements */

  edit: function (props) {
    function updateContent(event) {
      props.setAttributes({ content: event.target.value });
    }

    function updateColor(value) {
      props.setAttributes({ color: value.hex });
    }

    return <Edit {...props} />;
  },
  save: function (props) {
    return <FullWidth fullWidthAlignment={props.attributes}><InnerBlocks.Content /></FullWidth>;
  },
});

/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */

// wp.blocks.registerBlockType('fractaldimensions/fullwidth-block', {
//     title: 'Full Width Block',
//     icon: 'smiley',
//     category: 'common',
//     attributes: {
//         content: {type: 'string'},
//         color: {type: 'string'}
//     },
//
//     /* This configures how the content and color fields will work, and sets up the necessary elements */
//
//     edit: function (props) {
//         function updateContent(event) {
//             props.setAttributes({content: event.target.value})
//         }
//
//         function updateColor(value) {
//             props.setAttributes({color: value.hex})
//         }
//
//         return React.createElement(
//             "div",
//             null,
//             React.createElement(
//                 "h1",
//                 null,
//                 "Simple Box Test"
//             ),
//             React.createElement("input", {type: "text", value: props.attributes.content, onChange: updateContent}),
//             React.createElement(wp.components.ColorPicker, {
//                 color: props.attributes.color,
//                 onChangeComplete: updateColor
//             })
//         );
//     },
//     save: function (props) {
//         return wp.element.createElement(
//             "h1",
//             {style: {border: "3px solid " + props.attributes.color}},
//             props.attributes.content
//         );
//     }
// })
