<?php
/**
 * Local2Online - Database Controller Configuration
 * Designed for InfinityFree PHP + MySQL environment
 */

define('DB_HOST', 'sqlxxx.infinityfree.com'); // Put your InfinityFree MySQL Hostname here
define('DB_USER', 'if0_xxxxxxx');            // Put your InfinityFree Database Username here
define('DB_PASS', 'xxxxxxxxxxxxx');          // Put your InfinityFree Database Password here
define('DB_NAME', 'if0_xxxxxxx_local2online'); // Put your InfinityFree Database Name here

// Establish secure PDO connection
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    // In local development, fail gracefully with directions
    error_log("Database connection failure: " . $e->getMessage());
    $pdo_error = "Database Connection Offline (Configure db_config.php parameters for InfinityFree MySQL server).";
}
