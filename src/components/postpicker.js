/**
 * WordPress dependencies
 */
import {ComboboxControl} from '@wordpress/components';
import {useEffect, useState} from "react";
import {useSelect} from '@wordpress/data';

function PostPickerControl({type, selected, onChange}) {
    const [postId, setPostId] = useState(selected);
    const [options, setOptions] = useState([
        {
            value: selected,
            label: "Loading products..."
        }
    ]);
    const [filteredOptions, setFilteredOptions] = useState(options);

    let results = useSelect((select) => {
        return select('core').getEntityRecords('postType', type, {per_page: -1, context: 'view'});
    })

    useEffect(() => setPostId(selected), [selected])
    useEffect(() => {
        if (results) {
            setFilteredOptions(results.map(m => ({
                value: m.id,
                label: m.title.raw == null ? m.title.rendered : m.title.raw
            })));
        }
    }, [results])

    return (
        <ComboboxControl
            label="Product"
            value={postId}
            onChange={onChange}
            options={filteredOptions}
            onInputChange={(inputValue) =>
                setFilteredOptions(
                    options.filter((option) =>
                        option.label
                            .toLowerCase()
                            .indexOf(inputValue.toLowerCase()) > -1
                    )
                )
            }
        />
    );
}

export default PostPickerControl;
