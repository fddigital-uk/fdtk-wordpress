import AddToCart from "./addToCart";

import {
    BlockControls,
    AlignmentToolbar,
    InspectorControls
} from "@wordpress/block-editor";
import {TextControl, PanelBody, RadioControl} from "@wordpress/components";
import {__} from "@wordpress/i18n";
import PostPickerControl from "../../../components/postpicker";

export default (props) => {
    const {
        attributes: {contentAlign, text, productId = 0, size = "small"},
        setAttributes
    } = props;
    const post_id = wp.data.select("core/editor").getCurrentPostId();

    return [
        <BlockControls key="controls">
            <AlignmentToolbar
                value={contentAlign}
                onChange={value => setAttributes({contentAlign: value})}
            />
        </BlockControls>,
        <InspectorControls>
            <PanelBody
                title={__("Options")}
                initialOpen={false}>
                <TextControl
                    label={__("Custom Text")}
                    value={text}
                    onChange={value => setAttributes({text: value})}
                />
                <RadioControl
                    label={__("Button Size")}
                    selected={size}
                    options={[
                        {label: "Small", value: "small"},
                        {label: "Medium", value: "medium"},
                        {label: "Large", value: "large"}
                    ]}
                    onChange={(v) => setAttributes({size: v})}
                />
                <PostPickerControl type={'product'} selected={productId}
                                   onChange={(id) => setAttributes({productId: id})}/>
            </PanelBody>
        </InspectorControls>,
        <AddToCart
            productId={post_id}
            text={!text || text == "" ? undefined : text}
            size={size}
            contentAlign={contentAlign}
        />
    ];
};
