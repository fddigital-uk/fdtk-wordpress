import classnames from "classnames";

const ImageListElements = ({items, start, numItems, className}) => {
    return <>
        {items && items.slice(start, numItems).map(i => <div key={i.id}
                                                             className={classnames(['image-list__image', className])}>
            <figure className={'size-medium is-resized'}><img
                src={i.url}
                alt={i.alt}
                className={classnames([
                    {[`wp-image-${i.id}`]: i.id != null}
                ])}
                width={i.width}
                title={i.title}
            /></figure>
        </div>)}
    </>
};

const ImageList = (props) => {
    const {
        attributes: {gallery = [], numberToShow = 4, numberOfColumns = 2, moreText},
    } = props;
    return <div className={classnames(["image-list", `image-list--col-${numberOfColumns}`])} data-image-list={true} data-image-list-columns={numberOfColumns}>
        {gallery.length > numberToShow && <ImageListElements key="more-four-start" items={gallery} start={0} numItems={numberToShow}/>}
        {gallery.length <= numberToShow &&
        <ImageListElements key="less-four" items={gallery} start={0} numItems={gallery.length}/>}
        {gallery.length > numberToShow && <>
            <ImageListElements key="more-fore-end" items={gallery} start={numberToShow} numItems={gallery.length}
                               className="hidden"/>
            <div className="image-list__more">
                <button className="button">{moreText}</button>
            </div>
        </>}
    </div>
};

export default ImageList;
