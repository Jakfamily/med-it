<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

/** MySQL settings - You can get this info from your web host **/
/** The name of the database for WordPress */
define('DB_NAME', 'p10_medit');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost' . ':' . '3306');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** Disable WordPress file editor */
define( 'DISALLOW_FILE_EDIT', true );

define( 'COOKIEHASH', md5($_SERVER['WORDPRESS_DB_PASSWORD'] . 'secure cookies' .$_SERVER['WORDPRESS_DB_PASSWORD'] ) );	// Cookies hardening

define( 'WP_MEMORY_LIMIT', '256M' );

// Disable OP Cache mu-plugin feature
define('HIDE_CACHE_CLEAR',false);

// Disable SSO mu-plugin feature
define('HIDE_SSO_LINK',false);

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'UzSL1ba=T$z%>1L|}UIMNc|U.P0JRd8zwn}ie_`M+x2k}{v0~F|h(9#@Ng4QOu)h');
define('SECURE_AUTH_KEY',  's!iOlNwEdKOAEoWwkVsQKP^.[^wM]((-pZIbp-/B)/~*fUS7VpIiq_3?wuP.bQ$l');
define('LOGGED_IN_KEY',    '({TcOy<bV,fv/faw~OD~nzv.9)f<d*L1&D&Whql VPdn?W2;yDN[xmoMgRhu9J&X');
define('NONCE_KEY',        '@A9sJQpHiD_z2P W@.J@T:9f{jt/{YR6{?L~V$13Der#zpLj8RXXa>G/h3&5 A#2');
define('AUTH_SALT',        'E-5>kj$)VDC-9D9J-oSQaW5}q&-XTxI-oO|B2BPXdg%*#Y&2Om`^8^TFjfxc;|9R');
define('SECURE_AUTH_SALT', '~%UALv|dA6[~~UQUi)s#S`A;2#;kT_aREVrcW){=?_y4Ov<CrCmZtxTm)llfD3k');
define('LOGGED_IN_SALT',   'UnJ.ABd&M3^j>:6#fM1}U<ugcZCA~eDwi_f:Ehp&dof@pkTi=yC9&JhNG~Q8SQBF');
define('NONCE_SALT',       '`%KRwR~S~1ewcv^u4kakw}hukLV3PhU.`3OKNexK`^xlXecj)p|+T3(JHzX:Djn_');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', true);
define('WP_DEBUG_DISPLAY', true);
define('WP_DEBUG_LOG', true);
$sapi_type = php_sapi_name();
if ( $sapi_type == 'cli' ) {
    define( 'WP_DEBUG', false );
    error_reporting(0);
    @ini_set('display_errors', 0);
}
// @ini_set('log_errors', 'On');

define( 'WPMU_PLUGIN_DIR', '/mu-plugin' );
define( 'DOCKET_CACHE_CONTENT_PATH', '/tmp/docket_cache' );
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

/** change permisssions for plugin installation */
define("FS_METHOD","direct");
