<?php
/**
 * Personalizaciones del escritorio de WordPress para el tema headless.
 *
 * El objetivo es limpiar los widgets por defecto y mostrar información
 * relevante para quienes administran el contenido en modo headless.
 */

if (!function_exists('dcr_customize_dashboard_widgets')) {
    /**
     * Ajusta los widgets del escritorio, removiendo los menos útiles y
     * añadiendo un panel con indicaciones del proyecto.
     */
    function dcr_customize_dashboard_widgets()
    {
        // Elimina widgets predeterminados que no aportan en el flujo headless.
        remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
        remove_meta_box('dashboard_primary', 'dashboard', 'side');
        remove_meta_box('dashboard_activity', 'dashboard', 'normal');
        remove_meta_box('dashboard_right_now', 'dashboard', 'normal');

        // Agrega un widget propio con recordatorios para el equipo.
        wp_add_dashboard_widget(
            'dcr_headless_briefing',
            __('Guía del sitio headless', 'dcr'),
            'dcr_render_headless_widget'
        );
    }

    add_action('wp_dashboard_setup', 'dcr_customize_dashboard_widgets');
}

if (!function_exists('dcr_render_headless_widget')) {
    /**
     * Renderiza el contenido del widget personalizado.
     */
    function dcr_render_headless_widget()
    {
        $api_url      = trailingslashit(get_site_url()) . 'wp-json/';
        $graphql_page = admin_url('admin.php?page=graphql');
        ?>
        <p><?php esc_html_e('Este sitio funciona en modo headless. Utiliza el dashboard solo para gestionar contenido y configuración de la API.', 'dcr'); ?></p>
        <ul>
            <li><?php esc_html_e('API REST: disponible para integraciones externas.', 'dcr'); ?> <code><?php echo esc_html($api_url); ?></code></li>
            <li><?php esc_html_e('GraphQL: configura esquemas y pruebas desde la pantalla del plugin.', 'dcr'); ?> <a href="<?php echo esc_url($graphql_page); ?>"><?php esc_html_e('Ir a GraphQL', 'dcr'); ?></a></li>
            <li><?php esc_html_e('Recuerda que el frontend público está deshabilitado; revisa cambios mediante el cliente headless.', 'dcr'); ?></li>
        </ul>
        <?php
    }
}
