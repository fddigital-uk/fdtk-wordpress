import classnames from "classnames";

const Quote = props => {
    const {
        image = {},
        caption = "",
        children
    } = props;
    console.dir(image)
    return <article className="fdtk-quote">
        <figure className="fdtk-quote__image">
            <img
                className={classnames([
                    {[`wp-image-${image.id}`]: image.id != null}
                ])}
                src={image.url}
                alt={image.alt}
                width={image.width}
                title={image.title}
            />
            <figcaption>{caption}</figcaption>
        </figure>
        <div className="fdtk-quote__content">
            {children}
        </div>
    </article>
}

export default Quote;
