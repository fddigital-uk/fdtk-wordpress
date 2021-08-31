<?php


function fd_toolkit_autoload()
{
    require_once plugin_dir_path(__FILE__) . "init.php";
    require_once plugin_dir_path(__FILE__) . "api/init.php";
    require_once plugin_dir_path(__FILE__) . "acf.php";
    require_once plugin_dir_path(__FILE__) . "options.php";

    \Fdtk\Fdtk_Api_Loader::init();
}

function fdtk_load_api()
{
}

add_action('plugins_loaded', 'fd_toolkit_autoload');
