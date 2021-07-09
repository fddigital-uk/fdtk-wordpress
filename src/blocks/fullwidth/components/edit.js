import FullWidth from "./fullWidth";
import {
    BlockControls,
    AlignmentToolbar,
    InnerBlocks,
    InspectorControls,
} from "@wordpress/block-editor";
import {CheckboxControl, PanelBody} from "@wordpress/components";
import {__} from "@wordpress/i18n";

const ColorListItem = ({color, selected, onClick}) => {
    return <li className={`fwb-color-list--${color} ${selected == color ? 'selected' : ''}`} onClick={() => onClick(color)}>
        <div><span className="heading">Heading</span><span className="text">Text</span></div>
    </li>
}

export default (props) => {
    const {
        attributes: {contentAlign = "full", color, hasInner},
        setAttributes
    } = props;

    return [
        <BlockControls key="controls">
            <AlignmentToolbar
                value={contentAlign}
                onChange={(value) => setAttributes({contentAlign: value})}
            />
        </BlockControls>,
        <InspectorControls>
            <PanelBody
                title={__("Style")}
                initialOpen={true}>
                <CheckboxControl
                    label="Has Inner"
                    help="Check for full width box to have coloured inner box"
                    checked={hasInner}
                    onChange={(value) => setAttributes({hasInner: value})}
                />
                <ul className={`fwb-color-list ${hasInner ? 'inner' : ''}`}>
                    {['none', 'one', 'one-light', 'one-dark', 'two'].map(c => <ColorListItem key={c} selected={color} color={c} onClick={(value) => setAttributes({color: value})} />)}
                </ul>
            </PanelBody>
        </InspectorControls>,
        <FullWidth {...props.attributes} key={props.clientId}>
            <InnerBlocks/>
        </FullWidth>
    ];
};
