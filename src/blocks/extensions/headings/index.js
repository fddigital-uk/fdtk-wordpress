import {addFilter} from "@wordpress/hooks";
import {withHeadingControl} from "./controlComponent";
import {addHeadingControlAttribute} from "./controlAttributes";

import "./controlAttributes";
import "./controlComponent";

addFilter('blocks.registerBlockType', 'fractaldimensions/extensions/headings/attribute', addHeadingControlAttribute);
addFilter('editor.BlockEdit', 'fractaldimensions/extensions/headings/control', withHeadingControl);
