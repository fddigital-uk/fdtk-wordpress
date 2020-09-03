import AddToCart from "./addToCart";

import {
  BlockControls,
  AlignmentToolbar,
  InnerBlocks,
  InspectorControls
} from "@wordpress/block-editor";
import { TextControl, PanelBody } from "@wordpress/components";
import {__} from "@wordpress/i18n";

export default (props) => {
  const {
    attributes: { contentAlign, customText, productId},
    setAttributes
  } = props;

  return [
    <BlockControls key="controls">
      <AlignmentToolbar
        value={contentAlign}
        onChange={value => setAttributes({ contentAlign: value })}
      />
    </BlockControls>,
    <InspectorControls>
      <PanelBody
        title={__("Options")}
        initialOpen={false}>
        <TextControl
          label={__("Custom Text")}
          onChange={value => setAttributes({ customText: value })}
        />
      </PanelBody>
    </InspectorControls>,
    <AddToCart
      productId={32}
      text={!customText || customText == '' ? undefined : customText}
      contentAlign={contentAlign}
    />
  ];
};
