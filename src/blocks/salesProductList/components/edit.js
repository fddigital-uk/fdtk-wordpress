import SalesProductList from "./salesProductList";
import {BlockControls, InspectorControls} from "@wordpress/block-editor";
import {Button, Modal} from "@wordpress/components";
import {__} from "@wordpress/i18n";
import PostPickerControl from "../../../components/postpicker";
import {useState} from "react";

const SalesProductListAdminControl = props => {
    return <div className="spl-admin__controls">
        <h2>Controls</h2>
    </div>
}

const SelectProductModal = props => {
    const {
        confirmText = "OK",
        value = null,
        onCancel,
        onSelect,
        onClose,
    } = props;
    const [productId, setProductId] = useState(value);

    const doOnSelect = () => {
        onSelect(productId);
        onClose();
    }

    return <Modal
        title={__("Add Product")}
        className="spl-admin__modal"
        onRequestClose={onCancel}
    >
        <PostPickerControl type={'product'} selected={productId}
                           onChange={setProductId}/>

        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={doOnSelect}>{confirmText}</Button>
    </Modal>
}

const EditSalesProductList = props => {
    const {
        attributes: {products = []},
        setAttributes,
    } = props;
    const [showAddProduct, setShowAddProduct] = useState(false);

    return [
        <BlockControls key="spl-controls">
        </BlockControls>,
        <InspectorControls key="spl-inspect-controls">
        </InspectorControls>,
        <>
            <SalesProductList {...props.attributes} controls={SalesProductListAdminControl}/>
            <Button onClick={() => setShowAddProduct(true)}>Add Product</Button>
            {showAddProduct && <SelectProductModal
                onClose={() => setShowAddProduct(false)}
                onCancel={() => setShowAddProduct(false)}
                onSelect={(productId) => setAttributes({products: [...products, productId]})}
            />}
        </>
    ]
};

export default EditSalesProductList;
