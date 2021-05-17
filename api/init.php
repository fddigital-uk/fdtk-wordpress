<?php

namespace Fdtk;

class Fdtk_Api_Loader
{
    public static function init()
    {
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
    }

    public static function register_routes() {
        register_rest_route('fdtk/v1', '/mailing/unsubscribe', array(
            'methods' => 'POST',
            'callback' => array(__CLASS__, 'mailing')
        ));
    }

    public static function mailing() {

    }
}
