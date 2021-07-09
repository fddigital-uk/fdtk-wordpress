import ImageList from "./imageList";
import {MediaUploadCheck, MediaUpload, InspectorControls, BlockControls} from "@wordpress/block-editor";
import {Button, Modal, PanelBody} from "@wordpress/components";
import {__} from "@wordpress/i18n";
import {useState} from "react";

const EditImageList = (props) => {
    const {
        attributes: {gallery = []},
        setAttributes
    } = props;
    const [open, setOpen] = useState(false)
    console.dir(gallery);

    const moveItem = (index, move) => {
        const updated = [...gallery];
        const element = updated[index];
        const toIndex = index + move;
        updated.splice(index, 1);
        updated.splice(toIndex, 0, element);
        setAttributes({gallery: updated});
    };

    const deleteItem = (index) => {
        const updated = [...gallery];
        updated.splice(index, 1);
        setAttributes({gallery: updated});
    };

    return [
        <BlockControls key="controls">

        </BlockControls>,
        <InspectorControls>
            <PanelBody></PanelBody>
        </InspectorControls>,
        <>
            <h1>Image List</h1>
            <MediaUploadCheck>
                <MediaUpload
                    allowedTypes={['image']}
                    multiple={'add'}
                    onSelect={values => setAttributes({gallery: values})}
                    value={gallery.map(m => m.id)}
                    render={({open}) => (
                        <Button
                            className={gallery.length ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                            onClick={open}
                        >
                            {__('Choose image(s)', 'awp')}
                        </Button>
                    )}
                />
            </MediaUploadCheck>
            <Button
                onClick={() => setOpen(!open)}
            >
                {__('Change image order', 'awp')}
            </Button>
            <ImageList {...props}></ImageList>
            {open && <Modal
                title={"Change image order"}
                className={'image-list__modal'}
                onRequestClose={() => setOpen(false)}>
                <ul className={'image-list__modal__list'}>
                    {gallery && gallery.map((i, index) => <li className={'image-list__modal__item'}>
                        <div>
                            <Button onClick={() => deleteItem(index)}>X</Button>
                        </div>
                        <figure className={'size-medium is-resized'}><img
                            src={i.url}
                            alt={i.alt}
                            className={i.id ? `wp-image-${i.id}` : null}
                            width={i.width}
                            title={i.title}
                        />
                        </figure>
                        <div className="image-list__modal__label">
                            <h3>{i.title}</h3> {i.alt !== "" && <h5>Alt: {i.alt}</h5>}
                        </div>
                        <div>
                            <Button onClick={() => moveItem(index, -1)}>Up</Button>
                            <Button onClick={() => moveItem(index, 1)}>Down</Button>
                        </div>
                    </li>)}
                </ul>
            </Modal>}
        </>
    ]
};

export default EditImageList;
