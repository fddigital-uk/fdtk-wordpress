import Quote from "./quote";
import {BlockControls, InspectorControls, InnerBlocks, MediaUploadCheck, MediaUpload} from "@wordpress/block-editor";
import {__} from "@wordpress/i18n";
import {Button, PanelBody, PanelRow, TextControl} from "@wordpress/components";
import {StyledField, StyledLabel} from "@wordpress/components/build/base-control/styles/base-control-styles";

const EditQuote = props => {
    const {
        attributes: {
            image,
            caption
        },
        setAttributes
    } = props;
    return [
        <InspectorControls key="editquote-inspector">
            <PanelBody
                title={__("Options")}
                initialOpen={true}>
                <div className="components-base-control">
                    <div className="components-base-control__field">
                        <label className="components-base-control__label editquote-label">Main image</label>
                        <div>
                            <MediaUploadCheck>
                                <MediaUpload
                                    allowedTypes={['image']}
                                    multiple={false}
                                    onSelect={value => setAttributes({image: value})}
                                    value={image ? image.id : null}
                                    render={({open}) => (
                                        <Button
                                            className="button editquote-button"
                                            onClick={open}
                                        >
                                            {__('Choose image', 'awp')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
                <TextControl
                    label={__("Name / Image Caption")}
                    value={caption}
                    onChange={value => setAttributes({caption: value})}
                />
            </PanelBody>
        </InspectorControls>,
        <Quote key="editquote-quote" {...props.attributes}><InnerBlocks/></Quote>
    ];
}

export default EditQuote
