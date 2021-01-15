import FullWidth from "./fullWidth";
import {
  BlockControls,
  AlignmentToolbar,
  InnerBlocks,
  InspectorControls,
  PanelColorSettings
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default (props) => {
  const {
    attributes: { contentAlign = "full", color },
    setAttributes
  } = props;

  return [
    <BlockControls key="controls">
      <AlignmentToolbar
        value={contentAlign}
        onChange={(value) => setAttributes({ contentAlign: value })}
      />
    </BlockControls>,
    <InspectorControls>
      <PanelBody
        title={__("Background Color")}
        initialOpen={false}>
        <PanelColorSettings
          title={__("Color")}
          colorSettings={[
            {
              value: color,
              onChange: (colorValue) => setAttributes({ color: colorValue }),
              label: __("Background Color")
            }]}
        />
      </PanelBody>
    </InspectorControls>,
    <FullWidth {...props.attributes}>
      <InnerBlocks />
    </FullWidth>
  ];
};
