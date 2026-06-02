<?php
/**
 * Local2Online - Blog Index & CMS Single Article Reader
 * Seamlessly fetches dynamic publications from SQL databases
 */

require_once 'db_config.php';

$blogs = [];
$single_post = null;
$slug_param = isset($_GET['slug']) ? trim($_GET['slug']) : null;

if (isset($pdo)) {
    try {
        if ($slug_param) {
            // Query a single blog article dynamically
            $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug = :slug LIMIT 1");
            $stmt->execute(['slug' => $slug_param]);
            $single_post = $stmt->fetch();
        }
        
        // Fetch all blog posts for listings or sidebar recommendations
        $blogs = $pdo->query("SELECT * FROM blog_posts ORDER BY date DESC")->fetchAll();
    } catch (Exception $e) {
        // Fallback flag
    }
}

// Robust fallback values if DB is unconfigured or tables are empty
if (empty($blogs)) {
    $blogs = [
        [
            'id' => 1,
            'title' => 'How to Sell on Amazon India: The Ultimate Step-by-Step Guide for Beginners',
            'slug' => 'how-to-sell-on-amazon',
            'excerpt' => 'Thinking of launching your retail business on Amazon India? This mega tutorial lays out absolute prerequisites from GSTIN codes, banking sheets, listing guidelines to winning buy-box secrets.',
            'content' => "<h3>1. GSTIN Registration Obligations</h3><p>To list physical goods on Amazon Seller portal, you have to acquire a valid Indian Goods & Services Tax Identification number (GSTIN). We provide full filing support to help you achieve this effortlessly within days.</p><h3>2. Easy Ship vs Amazon FBA</h3><p>Choose between packing items at the warehouse yourself with courier pickups (Easy Ship) or offloading storage & packing entirely to Amazon Fulfilled Centers (Amazon FBA) for premium visibility badges.</p><h3>3. cataloging & smart search SEO</h3><p>We write rich titles, bullets, item definitions and keywords to make sure high rankings when regional clients query. Our automated pricing matrices secure the competitive buy-box permissions.",
            'category' => 'Marketplaces',
            'read_time' => '6 mins read',
            'image' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
            'date' => '2026-05-18',
            'author' => 'Mohammed Sameer'
        ],
        [
            'id' => 2,
            'title' => 'Shopify vs WooCommerce in India: Best Platform for Your Independent Store',
            'slug' => 'shopify-vs-woocommerce-india',
            'excerpt' => 'Want your own web store to avoid high marketplace commissions? We compare Shopify India with WooCommerce on monthly costs, performance, payment settings, and ease of use.',
            'content' => "<h3>Shopify Setup Advantages</h3><p>Shopify provides zero server complications, responsive visual themes, robust automated checkout scripts, and direct shipping integrations natively. However, it requires monthly licensing plans.</p><h3>WooCommerce Self-ownership</h3><p>WooCommerce is free, open source and runs dynamically on cheap shared hosting. You own the database fully and pay no commission rates back. It requires more server expertise, which we provide out of the box.",
            'category' => 'Web Stores',
            'read_time' => '5 mins read',
            'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
            'date' => '2026-05-24',
            'author' => 'Adnan Ahmed'
        ],
        [
            'id' => 3,
            'title' => 'The Meesho Growth Secret: How of 0% Commission Transforms Wholesalers',
            'slug' => 'meesho-growth-secret-suppliers',
            'excerpt' => 'Meesho has singlehandedly revolutionized social retail in India. Discover how local textile, jewellery and footwear shops can leverage Meesho zero platform fees for high-volume sales.',
            'content' => "<h3>The 0% Commission Edge</h3><p>Meesho’s major leverage is charging absolute zero commission margins to selling suppliers. Your margin rates stay entirely in your bank accounts! It empowers local wholesale merchants or home weavers to compete on equal pricing footprints.</p><h3>High Organic App Volume</h3><p>With massive active users in Tier-2 and Tier-3 Indian cities, Meesho handles huge fashion, cosmetics, and lifestyle catalog inquiries. We align your listing files to gain instant traction in daily category updates.",
            'category' => 'Meesho Tips',
            'read_time' => '4 mins read',
            'image' => 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop',
            'date' => '2026-06-01',
            'author' => 'Mohammed Sameer'
        ]
    ];
}

// Populate single post from fallbacks if no dynamic match is discovered in DB
if ($slug_param && !$single_post) {
    foreach ($blogs as $b) {
        if ($b['slug'] === $slug_param) {
            $single_post = $b;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $single_post ? htmlspecialchars($single_post['title']) : 'Ecommerce Marketing Insights & Onboarding Guides - Local2Online'; ?></title>
    <meta name="description" content="<?php echo $single_post ? htmlspecialchars($single_post['excerpt']) : 'Learn how to sell on Amazon, Flipkart, Meesho, Shopify inside India. Standard cataloging checklists, GST filings, and PPC tricks.'; ?>">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        .blog-grid {
            display: grid;
            grid-template-cols: repeat(3, 1fr);
            gap: 32px;
        }
        .blog-card {
            background-color: white;
            border: 1px solid var(--border);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        .blog-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent);
        }
        .blog-img {
            height: 180px;
            width: 100%;
            object-fit: cover;
        }
        .blog-body {
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
        }
        .article-layout {
            display: grid;
            grid-template-cols: 1.5fr 0.5fr;
            gap: 48px;
            text-align: left;
        }
        .article-main h3 {
            font-size: 20px;
            margin: 24px 0 12px 0;
            color: var(--primary);
        }
        .article-main p {
            font-size: 15px;
            color: var(--text);
            line-height: 1.8;
            margin-bottom: 20px;
        }
        @media (max-width: 1024px) {
            .blog-grid {
                grid-template-cols: repeat(2, 1fr);
            }
            .article-layout {
                grid-template-cols: 1fr;
            }
        }
        @media (max-width: 768px) {
            .blog-grid {
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
                <a href="portfolio.php">Case Studies</a>
                <a href="blog.php" class="active">Blogs</a>
                <a href="contact.php" class="btn btn-secondary">Get Free Audit</a>
                <a href="contact.php" class="btn btn-primary">Free Consultation</a>
            </nav>
        </div>
    </header>

    <?php if ($single_post): ?>
        <!-- SINGLE ARTICLE DISPLAY STYLE -->
        <section class="hero" style="padding: 60px 0; text-align: left;">
            <div class="container">
                <span class="badge" style="margin-bottom: 12px;"><?php echo htmlspecialchars($single_post['category']); ?></span>
                <h1 style="font-size: 34px; line-height: 1.3; color: white; margin-bottom: 16px;"><?php echo htmlspecialchars($single_post['title']); ?></h1>
                
                <div style="display: flex; gap: 24px; align-items: center; color: #cbd5e1; font-size: 13px; font-family: var(--font-mono);">
                    <span>Published: <?php echo htmlspecialchars(date('F j, Y', strtotime($single_post['date']))); ?></span>
                    <span>•</span>
                    <span>By: <?php echo htmlspecialchars($single_post['author'] ?? 'Mohammed Sameer'); ?></span>
                    <span>•</span>
                    <span><?php echo htmlspecialchars($single_post['read_time']); ?></span>
                </div>
            </div>
        </section>

        <section style="padding: 80px 0; background-color: white;">
            <div class="container">
                <div class="article-layout">
                    <!-- Main Content Panel -->
                    <article class="article-main">
                        <img src="<?php echo htmlspecialchars($single_post['image']); ?>" alt="<?php echo htmlspecialchars($single_post['title']); ?>" style="width: 100%; height: 360px; object-fit: cover; border-radius: 20px; margin-bottom: 32px; border: 1px solid var(--border);">
                        
                        <div style="font-size: 15px; color: var(--text); line-height: 1.8;">
                            <?php echo $single_post['content']; ?>
                        </div>

                        <!-- Mini Call to Action Inside Article Base -->
                        <div style="background-color: var(--light); border: 2px dashed var(--accent); border-radius: 16px; padding: 32px; margin-top: 48px;">
                            <h4 style="font-size: 18px; color: var(--primary); margin-bottom: 8px;">🚀 Want customized setup or bid parameters for your catalog?</h4>
                            <p style="font-size: 13px; color: var(--text); margin-bottom: 20px;">We take complete operational ownership. Start selling to active Indian buyers on Amazon, Flipkart, and Meesho.</p>
                            <a href="contact.php?type=consultation&service=Consulation after Blog: <?php echo urlencode($single_post['title']); ?>" class="btn btn-primary">Book Consultation Call</a>
                        </div>
                    </article>

                    <!-- Sidebar Panel -->
                    <aside style="display: flex; flex-direction: column; gap: 32px;">
                        <div style="background-color: var(--light); padding: 24px; border-radius: 16px; border: 1px solid var(--border);">
                            <h4 style="font-size: 15px; color: var(--primary); border-bottom: 1px solid var(--border); padding-bottom: 8px; margin-bottom: 16px;">Other Guides</h4>
                            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;">
                                <?php foreach ($blogs as $other): if ($other['slug'] !== $single_post['slug']): ?>
                                <li>
                                    <a href="blog.php?slug=<?php echo urlencode($other['slug']); ?>" style="font-size: 13px; font-weight: 600; color: var(--primary-light); display: block; line-height: 1.4;">
                                        👉 <?php echo htmlspecialchars($other['title']); ?>
                                    </a>
                                </li>
                                <?php endif; endforeach; ?>
                            </ul>
                        </div>

                        <div style="background-color: var(--primary); color: white; padding: 24px; border-radius: 16px; text-align: center;">
                            <h4 style="color: white; font-size: 16px; margin-bottom: 8px;">Free Channel Audit ✓</h4>
                            <p style="font-size: 12px; color: #cbd5e1; margin-bottom: 16px;">We analyze your competitors, keyword density, and list layouts for zero costs.</p>
                            <a href="contact.php?type=audit" class="btn btn-primary" style="width: 100%; text-align: center;">Get Audit Report</a>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

    <?php else: ?>
        <!-- ALL ARTICLES LISTING INDEX VIEW -->
        <section class="hero" style="padding: 60px 0;">
            <div class="container text-center">
                <span class="badge" style="margin: 0 auto 16px auto;">RESOURCE HUB</span>
                <h1 style="font-size: 36px; margin-bottom: 12px;">E-commerce Catalog Tips & Guides</h1>
                <p style="margin: 0 auto; max-width: 600px;">Read articles written by Mohammed Sameer and Adnan Ahmed focusing strictly on Indian sellers central dashboards, logistics models, and tax rules.</p>
            </div>
        </section>

        <section style="padding: 80px 0; background-color: var(--light);">
            <div class="container">
                <div class="blog-grid">
                    <?php foreach ($blogs as $post): ?>
                    <article class="blog-card">
                        <img class="blog-img" src="<?php echo htmlspecialchars($post['image']); ?>" alt="<?php echo htmlspecialchars($post['title']); ?>">
                        <div class="blog-body">
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); color: var(--text-light); margin-bottom: 8px;">
                                    <span><?php echo htmlspecialchars($post['category']); ?></span>
                                    <span><?php echo htmlspecialchars($post['read_time']); ?></span>
                                </div>
                                <h3 style="font-size: 15px; line-height: 1.4; color: var(--primary); margin-bottom: 12px;">
                                    <?php echo htmlspecialchars($post['title']); ?>
                                </h3>
                                <p style="font-size: 13px; color: var(--text); line-height: 1.6; margin-bottom: 20px;">
                                    <?php echo htmlspecialchars($post['excerpt']); ?>
                                </p>
                            </div>
                            
                            <a href="blog.php?slug=<?php echo urlencode($post['slug']); ?>" class="btn btn-secondary" style="color: var(--primary); border-color: var(--primary); width: 100%; text-align: center;">
                                Read Strategy Guide →
                            </a>
                        </div>
                    </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
    <?php endif; ?>

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
