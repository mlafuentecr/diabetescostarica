<?php
/**
 * Bootstrap file for the Diabetes Costa Rica headless theme.
 *
 * Sets global references, detects the active environment and loads the
 * modular PHP files stored inside the /inc directory.
 */

/* -------------------------------------------------------------------------
 * 1. Global references
 * ------------------------------------------------------------------------- */
if ( ! defined( 'DCR_THEME_DIR' ) ) {
    define( 'DCR_THEME_DIR', get_template_directory() );
}

if ( ! defined( 'DCR_THEME_URI' ) ) {
    define( 'DCR_THEME_URI', get_template_directory_uri() );
}

if ( ! defined( 'DCR_THEME_VER' ) ) {
    $theme_data = wp_get_theme();
    define( 'DCR_THEME_VER', $theme_data->get( 'Version' ) );
}

$GLOBALS['DCR_THEME_PATH'] = DCR_THEME_URI;
$GLOBALS['DCR_THEME_VER']  = DCR_THEME_VER;
$GLOBALS['DCR_THEME_ENV']  = 'dist';

/* -------------------------------------------------------------------------
 * 2. Environment detection (local / staging / production)
 * ------------------------------------------------------------------------- */
$http_host  = $_SERVER['HTTP_HOST'] ?? '';

$local      = 'local.diabetescostarica.com';
$staging    = 'stg.diabetescostarica.com';
$production = 'diabetescostarica.com';

$environments = array(
    'local'      => $local,
    'staging'    => $staging,
    'production' => $production,
);

foreach ( $environments as $environment => $hostname ) {
    if ( $hostname !== '' && stripos( $http_host, $hostname ) !== false ) {
        $GLOBALS['DCR_THEME_ENV'] = ( $environment === 'local' ) ? 'src' : 'dist';
        break;
    }
}

/* -------------------------------------------------------------------------
 * 3. List of files to include
 * ------------------------------------------------------------------------- */
$theme_directory = DCR_THEME_DIR;

$theme_includes = array(
    '/inc/headless-setup.php',
    '/inc/admin-dashboard.php',
    // Add more modules here as the theme grows, e.g.:
    // '/inc/enqueue.php',
    // '/inc/helpers.php',
);

foreach ( $theme_includes as $file ) {
    $path = $theme_directory . $file;

    if ( file_exists( $path ) ) {
        require_once $path;
    }
}
