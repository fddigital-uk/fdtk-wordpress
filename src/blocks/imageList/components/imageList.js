const ImageListElements = ({items, start, numItems}) => {
    return <>
        {items && items.slice(start, numItems).map(i => <div className={'image-list__image'}>
            <figure className={'size-medium is-resized'}><img
                src={i.url}
                alt={i.alt}
                className={i.id ? `wp-image-${i.id}` : null}
                width={i.width}
                title={i.title}
            /></figure>
        </div>)}
    </>
};

const ImageList = (props) => {
    const {
        attributes: {gallery = []},
    } = props;
    return <div className="image-list">
        {gallery.length > 4 && <div className="start"><ImageListElements items={gallery} start={0} numItems={4}/></div>}
        {gallery.length <= 4 && <ImageListElements items={gallery} start={0} numItems={gallery.length}/>}
        {gallery.length > 4 && <>
            <div className="end"><ImageListElements items={gallery} start={4} numItems={gallery.length - 4}/></div>
            <div className="more">
                <button>More</button>
            </div>
        </>}
    </div>
};

export default ImageList;
