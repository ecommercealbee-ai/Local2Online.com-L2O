<?php
/**
 * Local2Online - Detailed Services Catalog
 * Fully connected to dynamic MySQL services index
 */

require_once 'db_config.php';

$services = [];
if (isset($pdo)) {
    try {
        $services = $pdo->query("SELECT * FROM services ORDER BY id ASC")->fetchAll();
    } catch (Exception $e) {
        // Fallback flag
    }
}

if (empty($services)) {
    $services = [
        [
            'id' => 1, 
            'title' => 'Amazon Seller Setup & Launch', 
            'short_desc' => 'Start selling to 100M+ active Amazon buyers with complete stores, listing SEO, and FBA dispatch registries.', 
            'long_desc' => 'Launch on Amazon India. We handle seller central accounts, secure brand approvals, UPC declarations, keyword indexing, and PPC advertising configuration.',
            'icon' => 'ShoppingBag', 
            'platforms' => 'Amazon India, Amazon Easy Ship, FBA Logistics',
            'features' => 'Seller Central verification, GTIN / Brand support, FBA logistics onboarding, Catalog listing uploads, 30 days bid tuning'
        ],
        [
            'id' => 2, 
            'title' => 'Flipkart Seller Onboarding', 
            'short_desc' => 'Sell products on India homegrown ecommerce leader reaching Tier-2 and Tier-3 buying locations.', 
            'long_desc' => 'Register smart listings, secure Flipkart Smart assured categories, design SEO product titles and layout tags.',
            'icon' => 'Layers', 
            'platforms' => 'Flipkart Hub, Flipkart Smart',
            'features' => 'GST registration files assistance, Brand trademark checks, Multi-product bulk upload catalogs, Smart keyword indexing'
        ],
        [
            'id' => 3, 
            'title' => 'Meesho Zero-Commission Hub', 
            'short_desc' => 'Leverage social retail with 0% commission structures for quick garment and footwear stock sales.', 
            'long_desc' => 'Meesho zero-fee platforms. Perfect for boutique home manufacturers, weavers and small trade operators.',
            'icon' => 'TrendingUp', 
            'platforms' => 'Meesho Supplier Panel',
            'features' => '0% platform setup assistance, Integrated Meesho ads launch, Catalog pricing configurations, Return label training'
        ],
        [
            'id' => 4, 
            'title' => 'Shopify Custom Web Store', 
            'short_desc' => 'Build your independent brand commerce site with automatic checkout payment gateways and courier tracking.', 
            'long_desc' => 'Premium responsive Shopify storefront design. Integrated with shipping aggregators (Shiprocket) for Cash on Delivery checks.',
            'icon' => 'Globe', 
            'platforms' => 'Shopify, Shiprocket, Razorpay Partner',
            'features' => 'Responsive visual themed page design, Razorpay payment flow setups, Automated COD cart backup reminders, WhatsApp billing templates integration'
        ],
        [
            'id' => 5, 
            'title' => 'WooCommerce WordPress Shop', 
            'short_desc' => 'Total ownership storefront without expensive recurring monthly commissions or software subscription fees.', 
            'long_desc' => 'Free WordPress WooCommerce. Unlimited products list, total design adjustments, cheap shared hosting deployments.',
            'icon' => 'Code', 
            'platforms' => 'WooCommerce + WordPress',
            'features' => 'Self-funded cpanel server setup, Customized layout elements, Complete database integration, Standard payment gateways UPI API'
        ],
        [
            'id' => 6, 
            'title' => 'Full Marketplace Management', 
            'short_desc' => 'Outsource complete digital workflows including analytics, advertising bids, and dispatch metrics.', 
            'long_desc' => 'Acting as your dedicated in-house digital team. We adjust bids, handle brand files, resolve reviews, and generate results reports.',
            'icon' => 'ShieldCheck', 
            'platforms' => 'All Indian Channels',
            'features' => 'Daily orders dispatch checks, PPC optimization support, Customer reviews capture campaigns, Weekly profit report parameters'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-commerce Launch & Marketplace Catalog Setup Services - Local2Online</title>
    <meta name="description" content="Detailed list of our e-commerce enabler services in India: Amazon seller central optimization, Flipkart Smart, Meesho zero commission, Custom Shopify & WooCommerce development.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="navbar">
        <div class="container nav-container">
            <a href="index.php" class="logo">
                <span class="logo-accent">Local<span class="logo-num">2</span>Online</span>
            </a>
            
            <nav class="nav-links">
                <a href="index.php">Home</a>
                <a href="services.php" class="active">Services</a>
                <a href="pricing.php">Pricing Plans</a>
                <a href="about.php">About Us</a>
                <a href="portfolio.php">Case Studies</a>
                <a href="blog.php">Blogs</a>
                <a href="contact.php" class="btn btn-secondary">Get Free Audit</a>
                <a href="contact.php" class="btn btn-primary">Free Consultation</a>
            </nav>
        </div>
    </header>

    <section class="hero" style="padding: 60px 0;">
        <div class="container text-center">
            <span class="badge" style="margin: 0 auto 16px auto;">CAPABILITIES MAP</span>
            <h1 style="font-size: 36px; margin-bottom: 12px;">Our E-Commerce Enabler Services</h1>
            <p style="margin: 0 auto; max-width: 600px;">We take complete digital ownership of your brand storefronts and marketplaces. Choose one or multiple integration parameters below.</p>
        </div>
    </section>

    <section class="services" style="background-color: var(--light);">
        <div class="container">
            <div style="display: flex; flex-direction: column; gap: 40px;">
                <?php foreach ($services as $srv): ?>
                <div class="service-card" style="background-color: white; border: 1px solid var(--border); border-radius: 24px; padding: 40px; display: grid; grid-template-cols: 1fr; gap: 24px;">
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div class="service-icon" style="margin-bottom: 0;">★</div>
                        <h2 style="font-size: 24px; color: var(--primary);"><?php echo htmlspecialchars($srv['title']); ?></h2>
                        <span style="font-family: var(--font-mono); font-size: 11px; font-weight: bold; text-transform: uppercase; color: var(--text-light); bg: var(--light); padding: 4px 8px; border-radius: 4px; width: fit-content; background: #f1f5f9;">
                            Integrated Portals: <?php echo htmlspecialchars($srv['platforms'] ?? 'All Marketplace'); ?>
                        </span>
                        <p style="font-size: 14px; color: var(--text); line-height: 1.7; margin: 0;">
                            <?php echo htmlspecialchars($srv['long_desc'] ?? $srv['short_desc']); ?>
                        </p>
                    </div>
                    
                    <div style="border-top: 1px solid var(--border); padding-top: 24px;">
                        <h4 style="font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); margin-bottom: 12px;">Core Deliverables & Handholding Benchmarks:</h4>
                        <ul style="display: grid; grid-template-cols: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; list-style: none; padding: 0;">
                            <?php 
                            $feats = is_array($srv['features']) ? $srv['features'] : explode(',', $srv['features']);
                            foreach ($feats as $f): 
                            ?>
                            <li style="font-size: 13px; color: var(--text); display: flex; align-items: start; gap: 8px;">
                                <span style="color: var(--success); font-weight: bold;">✓</span>
                                <span><?php echo htmlspecialchars(trim($f)); ?></span>
                            </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>

                    <div style="display: flex; gap: 16px; margin-top: 12px;">
                        <a href="contact.php?service=<?php echo urlencode($srv['title']); ?>&type=consultation" class="btn btn-primary">Launch Channel Setup</a>
                        <a href="contact.php?service=<?php echo urlencode($srv['title']); ?>&type=audit" class="btn btn-secondary" style="color: var(--primary); border-color: var(--primary);">Request Audit</a>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container footer-grid">
            <div>
                <h3>Local2Online</h3>
                <p>Helping local retailers, wholesalers, and brands build high-converting online pipelines on major Indian marketplaces.</p>
            </div>
            <div>
                <h4>Quick Links</h4>
                <a href="index.php">Home</a>
                <a href="about.php">About Us</a>
                <a href="portfolio.php">Case Studies</a>
                <a href="pricing.php">Investments</a>
                <a href="admin.php" class="admin-link">🔓 Admin Panel</a>
            </div>
            <div>
                <h4>Services</h4>
                <a href="services.php">Amazon Setup</a>
                <a href="services.php">Flipkart Setup</a>
                <a href="services.php">Meesho Setup</a>
            </div>
            <div>
                <h4>Contact Info</h4>
                <p>+91 63618 75394</p>
                <p>contact@local2online.com</p>
                <p>HSR Layout, Sector 6, Bangalore</p>
            </div>
        </div>
        <div class="container text-center footer-copy">
            <p>© <?php echo date('Y'); ?> Local2Online. All Rights Reserved. Hosted on InfinityFree.</p>
        </div>
    </footer>

</body>
</html>
