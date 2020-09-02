import {createHigherOrderComponent} from "@wordpress/compose";
import {Fragment, useEffect, useRef} from "@wordpress/element";
import {InspectorControls} from "@wordpress/block-editor";
import {PanelBody, RadioControl} from "@wordpress/components";
import {__} from "@wordpress/i18n";
import {headingControlOptions} from "./controlAttributes";
import classnames from 'classnames';

export const withHeadingControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const {attributes: {headingOption}, setAttributes} = props;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title={__('Heading controls')}
                        initialOpen={false}>
                        <RadioControl
                            label={__('Heading Type')}
                            selected={headingOption}
                            options={headingControlOptions}
                            onChange={(selectedOption) => {
                                setAttributes({
                                    headingOption: selectedOption
                                })
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        )
    }
}, 'withHeadingControl');

import {addFilter} from "@wordpress/hooks";

function coverApplyExtraClass(extraProps, blockType, attributes) {
    const { headingOption } = attributes;

    if (typeof headingOption !== 'undefined') {
        extraProps.className = extraProps.className + ' ' + headingOption;
    }
    return extraProps;
}

addFilter(
    'blocks.getSaveContent.extraProps',
    'fractaldimensions/extensions/headings/props',
    coverApplyExtraClass
);
