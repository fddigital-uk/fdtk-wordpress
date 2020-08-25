import FullWidth from "./fullWidth";
import {
  BlockControls,
  AlignmentToolbar,
  InnerBlocks,
} from "@wordpress/block-editor";

export default (props) => {
  const {
    attributes: { fullWidthAlignment },
    setAttributes,
  } = props;
  return [
    <BlockControls key="controls">
      <AlignmentToolbar
        value={fullWidthAlignment}
        onChange={(value) => setAttributes({ fullWidthAlignment: value })}
      />
    </BlockControls>,
    <FullWidth fullWidthAlignment={"center"}>
      <InnerBlocks />
    </FullWidth>,
  ];
};
