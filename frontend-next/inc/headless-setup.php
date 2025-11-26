<?php
/**
 * Configuración del tema en modo headless.
 *
 * Desactiva funciones de frontend innecesarias y asegura que solo la API REST
 * permanezca accesible para el cliente headless.
 */

if (!function_exists('ml_headless_setup')) {
    /**
     * Ajustes generales para un entorno headless.
     */
    function ml_headless_setup()
    {
        // Desactiva feeds de RSS.
        remove_action('do_feed_rdf', 'do_feed_rdf', 10, 1);
        remove_action('do_feed_rss', 'do_feed_rss', 10, 1);
        remove_action('do_feed_rss2', 'do_feed_rss2', 10, 1);
        remove_action('do_feed_atom', 'do_feed_atom', 10, 1);

        // Desactiva el frontend, salvo la API REST.
        add_action('template_redirect', function () {
            if (!is_admin() && !ml_is_wp_rest_request()) {
                wp_die('This site is headless. Access is restricted.', '', ['response' => 403]);
            }
        });

        // Desactiva los emojis.
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');

        // Desactiva enlaces innecesarios en wp_head.
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'feed_links', 2);
        remove_action('wp_head', 'feed_links_extra', 3);

        // Desactiva scripts y estilos innecesarios.
        add_action('wp_enqueue_scripts', function () {
            wp_dequeue_style('wp-block-library');
            wp_dequeue_style('wp-block-library-theme');
            wp_dequeue_style('global-styles');
        }, 100);
    }

    add_action('after_setup_theme', 'ml_headless_setup');
}

if (!function_exists('ml_is_wp_rest_request')) {
    /**
     * Detecta si la solicitud es para la API REST.
     */
    function ml_is_wp_rest_request()
    {
        $prefix = rest_get_url_prefix();

        if (defined('REST_REQUEST') && REST_REQUEST) {
            return true;
        }

        if (isset($_GET['rest_route']) && strpos(trim($_GET['rest_route'], '\\/'), $prefix) === 0) {
            return true;
        }

        $rest_url    = wp_parse_url(site_url($prefix));
        $current_url = wp_parse_url(add_query_arg([]));

        return isset($current_url['path'], $rest_url['path'])
            && strpos($current_url['path'], $rest_url['path']) === 0;
    }
}

// Oculta la barra de herramientas del administrador para usuarios no logueados.
add_filter('show_admin_bar', '__return_false');

// Desactiva los feeds directamente.
add_action('do_feed', function () {
    wp_die('Feeds are disabled.', '', ['response' => 403]);
}, 1);
