<?php

class FDTKSettings
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_plugin_page'));
        add_action('admin_init', array($this, 'page_init'));
    }

    /**
     * Add options page
     */
    public function add_plugin_page()
    {
        // This page will be under "Settings"
        add_options_page(
            'FD Toolkit Settings',
            'Charm Offensive Settings',
            'manage_options',
            'co-setting-admin',
            array($this, 'create_admin_page')
        );
    }

    /**
     * Options page callback
     */
    public function create_admin_page()
    {
        // Set class property
        $this->options = get_option('co_woo_options');
        ?>
        <div class="wrap">
            <h1>My Settings</h1>
            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields
                settings_fields('co_woo_options_group');
                do_settings_sections('co-setting-admin');
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function page_init()
    {
        register_setting(
            'co_woo_options_group', // Option group
            'co_woo_options', // Option name
            array($this, 'sanitize') // Sanitize
        );

        add_settings_section(
            'co_woo_settings_section', // ID
            'Woocommerce Settings', // Title
            array($this, 'print_section_info'), // Callback
            'co-setting-admin' // Page
        );

        add_settings_field(
            'co_woo_straight_to_cart', // ID
            'Straight to Cart', // Title
            array($this, 'straight_to_cart_callback'), // Callback
            'co-setting-admin', // Page
            'co_woo_settings_section' // Section
        );
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize($input)
    {
        $new_input = array();
        if (isset($input['co_woo_straight_to_cart']))
            $new_input['co_woo_straight_to_cart'] = $input['co_woo_straight_to_cart'] == "true";

        return $new_input;
    }

    /**
     * Print the Section text
     */
    public function print_section_info()
    {
        print 'Enter your settings below:';
    }

    /**
     * Get the settings option array and print one of its values
     */
    public function straight_to_cart_callback()
    {
        printf(
            '<input type="checkbox" id="co_woo_straight_to_cart" name="co_woo_options[co_woo_straight_to_cart]" %s value="true"/>',
            isset($this->options['co_woo_straight_to_cart']) && $this->options['co_woo_straight_to_cart'] ? "checked" : ''
        );
    }
}

if (is_admin())
    $settings_page = new FDTKSettings();
