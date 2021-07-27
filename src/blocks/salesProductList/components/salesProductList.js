const SalesProduct = props => {
    const {
        id,
        title,
        intro,
        short_description: shortDesc,
        included,
        image,
        children,
    } = props;

    return <article className="prodlist">
        <div className="prodlist__image" dangerouslySetInnerHTML={{__html: image}}>

        </div>
        <div className="prodlist__content">
            <h1>{title}</h1>
            <section>
                <p className="prodlist__subhead" dangerouslySetInnerHTML={{__html: intro}}>
                </p>
                <div className="prodlist__copy" dangerouslySetInnerHTML={{__html: shortDesc}}></div>
            </section>
            {included !== null && <section className="prodlist__included prodlist__included--hidden">
                <button className="prodlist__button">
                    See what's included
                    <div className="prodlist__button-caret">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"
                             className="svg-inline--fa fa-caret-right fa-w-6">
                            <path fill="currentColor"
                                  d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                  className=""></path>
                        </svg>
                    </div>
                </button>
                <div className="prodlist__included-content" dangerouslySetInnerHTML={{__html: included}}>
                </div>
            </section>}

        </div>
        {children}
    </article>
}

const SalesProductList = props => {
    const {
        products,
        controls: AdminControls,
        controlsCallback
    } = props;

    return <div className="prodlist__container">
        {products && products.map((p, i) => <SalesProduct key={p.id} {...p}>{AdminControls !== null &&
        <AdminControls callback={controlsCallback} index={i} {...p}/>}</SalesProduct>)}
    </div>
};

export default SalesProductList;
