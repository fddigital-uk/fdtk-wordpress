<?php

function fd_toolkit_block_assets()
{
    wp_register_style(
        'fd-toolkit-blocks-style-css',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );

    register_block_type('fractaldimensions/fullwidth-block', array(
        'style' => 'fd-toolkit-blocks-style-css',
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
