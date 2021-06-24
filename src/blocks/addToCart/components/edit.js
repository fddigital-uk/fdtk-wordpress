import AddToCart from "./addToCart";

import {
    BlockControls,
    AlignmentToolbar,
    InspectorControls
} from "@wordpress/block-editor";
import {TextControl, PanelBody} from "@wordpress/components";
import {__} from "@wordpress/i18n";

export default (props) => {
    const {
        attributes: {contentAlign, text},
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
                    onChange={value => setAttributes({text: value})}
                />
            </PanelBody>
        </InspectorControls>,
        <AddToCart
            productId={post_id}
            text={!text || text == "" ? undefined : text}
            contentAlign={contentAlign}
        />
    ];
};
