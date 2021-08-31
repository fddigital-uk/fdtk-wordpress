<?php

function fd_toolkit_block_assets()
{
    wp_register_style(
        'fd-toolkit-blocks-style-css',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );

    wp_enqueue_script(
        'fd-toolkit-blocks-client-script',
        plugin_dir_url(__FILE__) . "build/client.js",
        array('wp-block-editor', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill'),
        filemtime(plugin_dir_path(__FILE__) . "build/client.js"),
        true
    );

    register_block_type('fractaldimensions/fullwidth-block', array(
        'style' => 'fd-toolkit-blocks-style-css',
        'script' => 'fd-toolkit-blocks-client-script',
        'editor_style' => 'fd-toolkit-blocks-editor-css',
        'editor_script' => 'fd-toolkit-blocks',
    ));
}

add_action('init', 'fd_toolkit_block_assets');

function fd_toolkit_editor_assets()
{
    wp_enqueue_style(
        'fd-toolkit-blocks-editor-css',
        plugin_dir_url(__FILE__) . "build/index.css",
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    wp_enqueue_script(
        'fd-toolkit-blocks',
        plugin_dir_url(__FILE__) . "build/index.js",
        array('wp-block-editor', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill'),
        filemtime(plugin_dir_path(__FILE__) . "build/index.js"),
        true
    );
}

add_action('enqueue_block_editor_assets', 'fd_toolkit_editor_assets');

add_action( 'admin_menu', function () {
    add_menu_page( 'linked_url', 'Reusable Blocks', 'read', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
});

add_filter('block_categories', function ($categories, $post) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'fractaldimensions',
                'title' => 'Fractal Dimensions',
            ),
        )
    );
}, 10, 2);

$woo_options = get_option('co_woo_options');

if ($woo_options && isset($woo_options['co_woo_straight_to_cart']) && $woo_options['co_woo_straight_to_cart']) {
    add_filter( 'woocommerce_add_to_cart_validation', 'woo_one_in_cart', 9999, 2 );

    function woo_one_in_cart( $passed, $added_product_id ) {
        wc_empty_cart();
        return $passed;
    }

    add_filter( 'woocommerce_product_single_add_to_cart_text', 'woocommerce_custom_single_add_to_cart_text' );
    function woocommerce_custom_single_add_to_cart_text() {
        return __( 'Buy Now', 'woocommerce' );
    }

    add_filter('woocommerce_product_add_to_cart_text', 'woo_archive_custom_cart_button_text');    // 2.1 +
    function woo_archive_custom_cart_button_text()
    {
        return __('Buy Now', 'woocommerce');
    }

    add_filter( 'woocommerce_add_to_cart_redirect', 'woo_redirect_checkout_add_cart' );
    function woo_redirect_checkout_add_cart() {
        return wc_get_checkout_url();
    }
}
