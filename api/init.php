<?php

namespace Fdtk;

class Fdtk_Api_Loader
{
    public static function init()
    {
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
    }

    public static function register_routes()
    {
        register_rest_route('fdtk/v1', '/mailing/unsubscribe', array(
            'methods' => 'POST',
            'callback' => array(__CLASS__, 'mailing')
        ));
        register_rest_route('fdtk/v1', '/product/(?P<product_id>\d+)', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'product_data')
        ));
    }

    public static function mailing()
    {

    }

    public static function product_data($data)
    {
        $product_id = $data['product_id'];
        $product = wc_get_product($product_id);

        if ($product == null) {
            return new \WP_Error('no_product', 'Product for provided ID not found', array('status' => 404));
        }

        $fields = get_fields($product_id);

        return array(
            'title' => $product->get_name(),
            'intro' => $fields['into_line'],
            'short_description' => $fields['short_description'],
            'included' => $fields['whats_included'],
            'image' => $product->get_image()
        );
    }
}
