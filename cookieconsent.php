<?php

add_action('wp_head', 'co_cookieconsent_head');
function co_cookieconsent_head()
{
    ?>
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" as="style"
          onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css">
    </noscript>
    <?php
}

/* Inline script printed out in the footer */
add_action('wp_footer', 'co_cookieconsent_footer');
function co_cookieconsent_footer()
{
    ?>
    <script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script>
    <script>window.cookieconsent.initialise({
            'palette': {
                'popup': {
                    'background': '#ffffff',
                    'text': '#000'
                },
                'button': {
                    'background': '#527B24'
                }
            },
            'theme': 'edgeless',
            'position': 'bottom'
        });</script>
    <?php
}
