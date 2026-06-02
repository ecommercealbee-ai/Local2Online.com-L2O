<?php
/**
 * Local2Online - Portfolio / Merchant Case Studies
 * Dynamic query index connected to SQL data streams
 */

require_once 'db_config.php';

$portfolio = [];
if (isset($pdo)) {
    try {
        $portfolio = $pdo->query("SELECT * FROM portfolio ORDER BY id ASC")->fetchAll();
    } catch (Exception $e) {
        // Fallback flag
    }
}

if (empty($portfolio)) {
    $portfolio = [
        [
            'id' => 1,
            'title' => 'Transforming a Heritage Silk Boutique Into a High-Converting Brand',
            'client' => 'Royal Silks',
            'industry' => 'Ethnic Wear',
            'platform' => 'shopify',
            'image' => 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
            'metrics' => '+350% Sales Growth, 12000+ Orders Processed, Active on Shopify & Amazon',
            'description' => 'We rebuilt their online catalog from low-quality phone images to stunning, high-definition model shoots paired with professional copy. Built a sleek Shopify store and opened their Amazon store, generating record-breaking monthly traffic.'
        ],
        [
            'id' => 2,
            'title' => 'Launching Local Organic Spice Estate to Nationwide Bestseller List',
            'client' => 'Nisarga Spices',
            'industry' => 'Organic Foods',
            'platform' => 'marketplace',
            'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop',
            'metrics' => 'Amazon Choice Badge, ₹15 Lakh Trial Revenue, 50000+ Visitors Monthly',
            'description' => 'Assisted an agricultural co-op with food license compliance certificates, brand register filings, and Amazon Smart listing keywords. Scaled low-bid advertising keyword pools, making their authentic masalas category leaders inside four months.'
        ],
        [
            'id' => 3,
            'title' => 'From Traditional Ludhiana Footwear Factory to Automated Brand Store',
            'client' => 'StepOn Shoes',
            'industry' => 'Footwear & Fashion',
            'platform' => 'woocommerce',
            'image' => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
            'metrics' => '0% Monthly Commission, Automated Shipping Pipeline, ₹5L Monthly Ad Return',
            'description' => 'Installed a custom WooCommerce platform integrated with Indian shipping matrices (Shiprocket) to automate label generation, courier pickup, and WhatsApp status reminders. Integrated with Meesho Supplier panel to offload deadstock stocks.'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-commerce Success Stories & Case Studies - Local2Online</title>
    <meta name="description" content="Discover how local Indian manufacturers scaled their offline catalogs using our Shopify, WooCommerce, Amazon seller enabler solutions. Real case studies.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        .filter-bar {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-bottom: 48px;
            flex-wrap: wrap;
        }
        .filter-btn {
            padding: 8px 16px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: 600;
            background-color: var(--light);
            border: 1px solid var(--border);
            color: var(--text);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .filter-btn.active, .filter-btn:hover {
            background-color: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        .portfolio-grid {
            display: grid;
            grid-template-cols: repeat(3, 1fr);
            gap: 32px;
        }
        .portfolio-card {
            background-color: white;
            border: 1px solid var(--border);
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: var(--shadow-sm);
            transition: all 0.3s ease;
        }
        .portfolio-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent);
        }
        .portfolio-img {
            height: 200px;
            width: 100%;
            object-fit: cover;
        }
        .portfolio-content {
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
        }
        .metric-badge {
            background-color: rgba(16, 185, 129, 0.1);
            color: var(--success);
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            display: inline-block;
            margin-bottom: 12px;
        }
        @media (max-width: 1024px) {
            .portfolio-grid {
                grid-template-cols: repeat(2, 1fr);
            }
        }
        @media (max-width: 768px) {
            .portfolio-grid {
                grid-template-cols: 1fr;
            }
        }
    </style>
</head>
<body>

    <header class="navbar">
        <div class="container nav-container">
            <a href="index.php" class="logo">
                <span class="logo-accent">Local<span class="logo-num">2</span>Online</span>
            </a>
            
            <nav class="nav-links">
                <a href="index.php">Home</a>
                <a href="services.php">Services</a>
                <a href="pricing.php">Pricing Plans</a>
                <a href="about.php">About Us</a>
                <a href="portfolio.php" class="active">Case Studies</a>
                <a href="blog.php">Blogs</a>
                <a href="contact.php" class="btn btn-secondary">Get Free Audit</a>
                <a href="contact.php" class="btn btn-primary">Free Consultation</a>
            </nav>
            
            <button class="menu-toggle" aria-label="Toggle Navigation">☰</button>
        </div>
    </header>

    <section class="hero" style="padding: 60px 0;">
        <div class="container text-center">
            <span class="badge" style="margin: 0 auto 16px auto;">CASE STUDIES</span>
            <h1 style="font-size: 36px; margin-bottom: 12px;">Proven E-commerce Transformations</h1>
            <p style="margin: 0 auto; max-width: 600px;">Read about how we successfully migrated wholesale clothing shops, traditional hardware foundries, and spice makers onto the national index.</p>
        </div>
    </section>

    <!-- PORTFOLIO FILTER & INDEX -->
    <section style="padding: 80px 0;">
        <div class="container">
            <div class="filter-bar">
                <button class="filter-btn active" data-filter="all">All Case Studies</button>
                <button class="filter-btn" data-filter="shopify">Shopify Stores</button>
                <button class="filter-btn" data-filter="woocommerce">WooCommerce Shops</button>
                <button class="filter-btn" data-filter="marketplace">Amazon & Meesho Panels</button>
            </div>

            <div class="portfolio-grid" id="portfolio_grid_box">
                <?php foreach ($portfolio as $p): 
                    // Normalize tags
                    $platform_slug = strtolower($p['platform']);
                    if (strpos($platform_slug, 'shopify') !== false) {
                        $platform_class = 'shopify';
                    } else if (strpos($platform_slug, 'woocommerce') !== false) {
                        $platform_class = 'woocommerce';
                    } else {
                        $platform_class = 'marketplace';
                    }
                ?>
                <div class="portfolio-card" data-category="<?php echo $platform_class; ?>">
                    <img class="portfolio-img" src="<?php echo htmlspecialchars($p['image']); ?>" alt="<?php echo htmlspecialchars($p['title']); ?>">
                    <div class="portfolio-content">
                        <div>
                            <span style="font-size: 11px; font-weight: bold; color: var(--primary-light); text-transform: uppercase; font-family: var(--font-mono); margin-bottom: 8px; display: block;">
                                <?php echo htmlspecialchars($p['client']); ?> • <?php echo htmlspecialchars($p['industry']); ?>
                            </span>
                            
                            <h3 style="font-size: 16px; line-height: 1.4; margin-bottom: 12px; color: var(--primary);">
                                <?php echo htmlspecialchars($p['title']); ?>
                            </h3>
                            
                            <!-- Highlights metrics splits -->
                            <div style="margin-bottom: 16px; display: flex; flex-wrap: wrap; gap: 6px;">
                                <?php 
                                $metrics = is_array($p['metrics']) ? $p['metrics'] : explode(',', $p['metrics']);
                                foreach ($metrics as $m): 
                                ?>
                                <span class="metric-badge"><?php echo htmlspecialchars(trim($m)); ?></span>
                                <?php endforeach; ?>
                            </div>

                            <p style="font-size: 13px; color: var(--text); line-height: 1.6; margin-bottom: 24px;">
                                <?php echo htmlspecialchars($p['description']); ?>
                            </p>
                        </div>

                        <a href="contact.php?type=consultation&service=Case Study Consultation: <?php echo urlencode($p['client']); ?>" class="btn btn-secondary" style="color: var(--primary); border-color: var(--primary); width: 100%; text-align: center;">
                            Model My Business Like This
                        </a>
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

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.portfolio-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Toggle active button class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedFilter = btn.dataset.filter;

                cards.forEach(card => {
                    const cardCat = card.dataset.category;
                    if (selectedFilter === 'all' || cardCat === selectedFilter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    });
    </script>

    <!-- Lucide Library & Custom Interaction Script -->
    <script src="https://unpkg.com/lucide@0.344.0/dist/umd/lucide.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
