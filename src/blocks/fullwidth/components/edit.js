import FullWidth from "./fullWidth";
import {
  BlockControls,
  AlignmentToolbar,
  InnerBlocks
} from "@wordpress/block-editor";

export default (props) => {
  const {
    attributes: { contentAlign, position },
    setAttributes
  } = props;
  return [
    <BlockControls key="controls">
      <AlignmentToolbar
        value={contentAlign}
        onChange={(value) => setAttributes({ contentAlign: value })}
      />
    </BlockControls>,
    <FullWidth contentAlign={contentAlign} position={position}>
      <InnerBlocks />
    </FullWidth>
  ];
};
