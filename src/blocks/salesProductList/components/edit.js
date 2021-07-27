import SalesProductList from "./salesProductList";
import {BlockControls, InspectorControls} from "@wordpress/block-editor";
import {Button, Modal} from "@wordpress/components";
import {__} from "@wordpress/i18n";
import PostPickerControl from "../../../components/postpicker";
import {useEffect, useState} from "react";

const SalesProductListAdminControl = props => {
    const {
        index,
        id,
        callback
    } = props;

    return <div className="prodlist__controls">
        <div className="prodlist__controls-inner">
            <button className="button" onClick={() => callback('moveUp', index)}>Up</button>
            <button className="button" onClick={() => callback('moveDown', index)}>Down</button>
            -
            <button className="button" onClick={() => callback('refresh', id)} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                     className="svg-inline--fa fa-sync-alt fa-w-16 fa-2x" style={{height: "15px", width: "15px"}}>
                    <path fill="currentColor"
                          d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"
                          className=""></path>
                </svg>
            </button>
            -
            <button className="button" onClick={() => callback('delete', index)}>Remove</button>
        </div>
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

    const getProduct = async (productId) => {
        return wp.apiFetch({
            path: `fdtk/v1/product/${productId}`,
        })
            .then(data => {
                return {
                    'id': productId,
                    'title': data['title'],
                    'intro': data['intro'],
                    'short_description': data['short_description'],
                    'included': data['included'],
                    'image': data['image']
                }
            });
    }

    const addProduct = (productId) => {
        getProduct(productId).then(data => {
            setAttributes({
                products: [
                    ...products,
                    data
                ]
            });
        })
    };

    const updateProduct = (productId) => {
        getProduct(productId).then(data => {
            products.forEach((p, index) => {
                if (productId === p.id) {
                    products[index] = data;
                }
            });

            setAttributes({products: [...products]});
        })
    }

    const moveItem = (index, move) => {
        const updated = [...products];
        const element = updated[index];
        const toIndex = index + move;
        updated.splice(index, 1);
        updated.splice(toIndex, 0, element);
        setAttributes({products: updated});
    };

    const handleAdminAction = (action, value) => {
        switch (action) {
            case "delete":
                const updated = [...products];
                updated.splice(value, 1);
                setAttributes({products: updated});
                break;
            case "moveUp":
                moveItem(value, -1)
                break;
            case "moveDown":
                moveItem(value, 1)
                break;
            case "refresh":
                updateProduct(value);
                break;
        }
    }

    useEffect(() => {
        const ids = [];
        products.forEach(p => {
            if (ids.indexOf(p.id) === -1) {
                ids.push(p.id)
                updateProduct(p.id);
            }
        });
    }, []);

    return [
        <BlockControls key="spl-controls">
        </BlockControls>,
        <InspectorControls key="spl-inspect-controls">
        </InspectorControls>,
        <>
            <SalesProductList {...props.attributes} controls={SalesProductListAdminControl}
                              controlsCallback={handleAdminAction}/>
            <div className="prodlist__addproduct"><Button className="button " onClick={() => setShowAddProduct(true)}>Add Product</Button></div>
            {showAddProduct && <SelectProductModal
                onClose={() => setShowAddProduct(false)}
                onCancel={() => setShowAddProduct(false)}
                onSelect={(productId) => addProduct(productId)}
            />}
        </>
    ]
};

export default EditSalesProductList;
