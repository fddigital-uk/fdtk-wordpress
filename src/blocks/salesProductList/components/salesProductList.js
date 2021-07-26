import classnames from "classnames";
import {useSelect} from '@wordpress/data';

const SalesProduct = props => {
    const {
        productId
    } = props;

    let product = useSelect((select) => {
        return select('core').getEntityRecord('postType', 'product', productId)
    })
    //console.dir(product);
    // useEffect(() => {
    //     console.log("But this is working");
    // })

    return <article className="prodlist">
        <div className="prodlist__image">
        </div>
        <div className="prodlist__content">
            <h1>Copy My Copy</h1>
            <section>
                <p className="prodlist__subhead">
                    A variety of my most effective charming copy templates - and the crafty tactics, formulas,
                    devices,
                    and little nuances that make them so successful.
                </p>
                <p>Imagine being able to write your own stand out, disarming copy that enables you to open
                    opportunities
                    for yourself whenever you want - and achieve whatever your heart (or bank account)
                    desires.</p>
                <p>Well, there's no need to merely daydream. I'm giving you the exact copy templates to be able
                    to
                    do
                    all of these things - and more.</p>
                <p>You'll not only get the templates, you'll get a line-by-line breakdown of every tactic,
                    device,
                    formula, and nuance contained in my unorthodox, impressive, persuasive, disarming, effective
                    copy
                    templates.</p>
            </section>
            <section className="prodlist__included hidden">
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
                <div className="prodlist__included-content">
                    <ul>
                        <li>Email templates to send to their existing customers.</li>
                        <li>Email templates to send to their existing customers.</li>
                        <li>Email templates to send to their existing customers.</li>
                        <li>Email templates to send to their existing customers.</li>
                    </ul>
                </div>
            </section>
        </div>
    </article>
}

const SalesProductList = props => {
    const {
        products
    } = props;

    return <div className="spl">
        {products && products.map(p => <SalesProduct key={p} productId={p} />)}
    </div>
};

export default SalesProductList;
