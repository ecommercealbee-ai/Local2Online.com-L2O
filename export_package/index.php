<?php
/**
 * Local2Online - Premium E-commerce Transformation Agency Homepage
 * Designed for InfinityFree Hosting + BigRock Domain Setup
 */

require_once 'db_config.php';

// Fetch dynamic content if database is active, otherwise fallback gracefully
$services = [];
$testimonials = [];
$pricing = [];

if (isset($pdo)) {
    try {
        $services = $pdo->query("SELECT * FROM services LIMIT 6")->fetchAll();
        $testimonials = $pdo->query("SELECT * FROM testimonials")->fetchAll();
        $pricing = $pdo->query("SELECT * FROM pricing")->fetchAll();
    } catch (Exception $e) {
        // Fallback flag
    }
}

// Fallbacks if tables are empty or db is still unconfigured
if (empty($services)) {
    $services = [
        ['id' => 1, 'title' => 'Amazon Seller Setup & Launch', 'short_desc' => 'Start selling to 100M+ active Amazon buyers with complete stores, listing SEO, and FBA dispatch registries.', 'icon' => 'ShoppingBag', 'features' => 'Seller Central verification, GTIN / Brand support, FBA logistics onboarding'],
        ['id' => 2, 'title' => 'Flipkart Seller Onboarding', 'short_desc' => 'Sell products on India homegrown ecommerce leader reaching Tier-2 and Tier-3 buying locations.', 'icon' => 'Layers', 'features' => 'GST registration files assistance, Brand trademark checks, Bulk upload catalogs'],
        ['id' => 3, 'title' => 'Meesho Zero-Commission Hub', 'short_desc' => 'Leverage social retail with 0% commission structures for quick garment and footwear stock sales.', 'icon' => 'TrendingUp', 'features' => '0% platform setup assistance, Meesho ads launch, Catalog pricing configurations'],
        ['id' => 4, 'title' => 'Shopify Custom Web Store', 'short_desc' => 'Build your independent brand commerce site with automatic checkout payment gateways and courier tracking.', 'icon' => 'Globe', 'features' => 'Responsive visual themed page design, Razorpay payment setups, Automated COD cart reminders'],
        ['id' => 5, 'title' => 'WooCommerce WordPress Shop', 'short_desc' => 'Total ownership storefront without expensive recurring monthly commissions or software subscription fees.', 'icon' => 'Code', 'features' => 'Self-funded cpanel server setup, Customized layout elements, Complete database integration'],
        ['id' => 6, 'title' => 'Full Marketplace Management', 'short_desc' => 'Outsource complete digital workloads including analytics, advertising bids, and dispatch metrics.', 'icon' => 'ShieldCheck', 'features' => 'Daily orders dispatch checks, PPC optimization support, Customer reviews campaigns']
    ];
}

if (empty($testimonials)) {
    $testimonials = [
        ['name' => 'Rajesh Kumar', 'business_name' => 'Kumar Apparels', 'location' => 'Bangalore', 'rating' => 5, 'review' => 'Our wholesale garment business was struggling during offline slumps. Local2Online registered our GST, launched our brand on Meesho & Amazon, and now we process 150+ daily orders! Best decision we ever made.', 'tag' => 'Fashion Manufacturer', 'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'],
        ['name' => 'Anjali Sharma', 'business_name' => 'Vedic Herbs', 'location' => 'Mumbai', 'rating' => 5, 'review' => 'We wanted a premium look for our skincare brand. The team built a premium Shopify store and optimized our listings on Amazon and Flipkart. Our direct website sales grew by 4x. Highly professional team!', 'tag' => 'D2C Skincare Brand', 'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'],
        ['name' => 'Vikram Singh', 'business_name' => 'Singh Hardware', 'location' => 'Ludhiana', 'rating' => 5, 'review' => 'As an old manufacturer, selling online was foreign to us. Local2Online held our hand through catalog updates, product listing SEO, and inventory management. We are now official OEM suppliers.', 'tag' => 'Hardware Manufacturer', 'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop']
    ];
}

if (empty($pricing)) {
    $pricing = [
        ['name' => 'Starter Launch', 'subtitle' => 'Great for small local shops', 'price' => '₹9,999', 'period' => 'one-time setup', 'description' => 'Establish a solid foundation with professional accounts on one major marketplace.', 'features' => 'GST Onboarding Support, Any 1 Marketplace, Account Setup & Brand Verification, Up to 30 Product Listings, Standard Store Banner, Order dispatch training'],
        ['name' => 'Growth Pack', 'subtitle' => 'Target choice for small manufacturers', 'price' => '₹19,999', 'period' => 'one-time setup', 'description' => 'Multiply sales by launching across all three major platforms simultaneously.', 'features' => 'GST Support & Brand Registry, 3 Marketplaces (Amazon+Flipkart+Meesho), Up to 80 Product Listings, Advanced Keyword SEO, Professional Brand Logo, Smart Ad Campaign launch, 30 Days support'],
        ['name' => 'Omnichannel Pro', 'subtitle' => 'The complete enterprise brand setup', 'price' => '₹34,999', 'period' => 'one-time setup', 'description' => 'Dominate the web both on public marketplaces and your own elegant storefront.', 'features' => 'Everything in Growth Pack, Custom Shopify/WooCommerce development, Payment Gateway Setup, WhatsApp cart recovery templates, Full catalog auto-import, Pricing strategy audit, 2 Months Account Management']
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Take Your Local Shop Online - Local2Online | Amazon, Meesho, Flipkart, Shopify Setup</title>
    <meta name="description" content="We help local retailers, manufacturers, and brands start selling online and grow on Amazon, Flipkart, Meesho, Shopify, and more. From Local Shop To Online Brand.">
    
    <!-- Premium Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    
    <!-- Schema Markup for Lead Generation agency -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Local2Online",
      "image": "https://local2online.com/assets/logo.png",
      "url": "https://local2online.com",
      "telephone": "+91 6361875394",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 6, HSR Layout",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "postalCode": "560102",
        "addressCountry": "IN"
      },
      "priceRange": "INR 9999 - INR 34999",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "19:00"
      }
    }
    </script>
</head>
<body>

    <!-- Header Navigation -->
    <header class="navbar">
        <div class="container nav-container">
            <a href="index.php" class="logo">
                <span class="logo-accent">Local<span class="logo-num">2</span>Online</span>
            </a>
            
            <nav class="nav-links">
                <a href="index.php" class="active">Home</a>
                <a href="services.php">Services</a>
                <a href="pricing.php">Pricing Plans</a>
                <a href="about.php">About Us</a>
                <a href="portfolio.php">Case Studies</a>
                <a href="blog.php">Blogs</a>
                <a href="contact.php" class="btn btn-secondary">Get Free Audit</a>
                <a href="contact.php" class="btn btn-primary">Free Consultation</a>
            </nav>
            
            <button class="menu-toggle" aria-label="Toggle Navigation">☰</button>
        </div>
    </header>

    <!-- Section 1: Hero Section -->
    <section class="hero">
        <div class="container hero-grid">
            <div class="hero-text">
                <div class="badge">#1 E-commerce Enabler In India</div>
                <h1>We Help Businesses <br><span class="text-accent">Sell Online & Grow Faster</span></h1>
                <p>We help local retailers, manufacturers, and brands sell on Amazon, Flipkart, Meesho, Shopify, and their own websites. We manage the paperwork, listing SEO, and ad campaigns.</p>
                <div class="hero-actions">
                    <a href="contact.php?type=consultation" class="btn btn-primary btn-large">Book Free Consultation</a>
                    <a href="contact.php?type=audit" class="btn btn-secondary btn-large">Get Free Audit ✓</a>
                </div>
                <div class="trust-foot">
                    <div class="trust-item"><strong>100+</strong> <span>Indian Retailers</span></div>
                    <div class="trust-item"><strong>250+</strong> <span>Stores Setup Live</span></div>
                    <div class="trust-item"><strong>4.9/5</strong> <span>Rating Reviews</span></div>
                </div>
            </div>
            
            <div class="hero-visual">
                <div class="visual-card">
                    <div class="visual-header">
                        <span class="status-dot"></span> <span>Active Channel Sync: LIVE</span>
                    </div>
                    <div class="revenue-big">₹4,89,500 <span class="trend-pos">+184% MoM</span></div>
                    <div class="progress-bar"><div class="progress" style="width: 75%;"></div></div>
                    <p class="channels-list">Live Channels: Amazon FBA • Flipkart Smart • Meesho Supplier • Shopify DTC</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 2: Trusted Platforms -->
    <section class="trusted">
        <div class="container">
            <h2>Trusted Inbound Sales Channels</h2>
            <div class="brands-grid">
                <div class="brand-item">Amazon India</div>
                <div class="brand-item">Flipkart Hub</div>
                <div class="brand-item">Meesho Panel</div>
                <div class="brand-item">Shopify Brand</div>
                <div class="brand-item">WooCommerce WP</div>
            </div>
        </div>
    </section>

    <!-- Section 3: Why Sell Online? -->
    <section class="why-online">
        <div class="container online-grid">
            <div class="online-left">
                <span class="section-label">THE INTERNET REVOLUTION</span>
                <h2>Your Customers Are Already Shopping Online</h2>
                <p>By moving your inventory catalogs to Amazon, Flipkart, Meesho, and Shopify, your products become searchable by 100M+ active users nationwide, delivering sales even while you sleep!</p>
                <div class="quote-card">
                    "Reach customers beyond your local street and process orders securely."
                </div>
            </div>
            <div class="online-right">
                <div class="advantage-card">
                    <h3>✓ 24/7 Sales Openings</h3>
                    <p>Unlike local shops, digital store checkout pages process bids and customer checkouts non-stop.</p>
                </div>
                <div class="advantage-card">
                    <h3>✓ Unlimited Scalability</h3>
                    <p>Your regional brand can ship to over 19,000 pincodes across India without establishing showrooms.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 4: Why Choose Local2Online -->
    <section class="why-choice">
        <div class="container text-center">
            <span class="section-label">YOUR PREMIUM OUTSOURCED GROWTH TEAM</span>
            <h2>Your Complete Online Selling Partner</h2>
            <p class="subtitle">We remove all technological complexities so you can focus strictly on stocks and packing.</p>
            
            <div class="benefits-grid">
                <div class="benefit-card">
                    <div class="benefit-check">✓</div>
                    <h3>GST Setup Support</h3>
                    <p>Complete paperwork filling assistance to make you instantly seller ready.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-check">✓</div>
                    <h3>Marketplace launch</h3>
                    <p>Onboard and list on Amazon, Flipkart, and Meesho concurrently.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-check">✓</div>
                    <h3>Product SEO Optimization</h3>
                    <p>Write keyword descriptions so customers locate your specific products easily.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 5: Services cards -->
    <section class="services">
        <div class="container">
            <div class="section-header-row">
                <h2>Everything You Need To Sell Online</h2>
                <a href="services.php" class="link-more">View Detailed Services Map →</a>
            </div>
            
            <div class="services-grid">
                <?php foreach ($services as $srv): ?>
                <div class="service-card">
                    <div class="service-icon">★</div>
                    <h3><?php echo htmlspecialchars($srv['title']); ?></h3>
                    <p><?php echo htmlspecialchars($srv['short_desc']); ?></p>
                    <a href="contact.php?service=<?php echo urlencode($srv['title']); ?>" class="btn btn-secondary w-full text-center">Launch Channel Now</a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Section 6: How It Works -->
    <section class="how-works">
        <div class="container text-center">
            <span class="section-label">OUR STEP BY STEP BLUEPRINT</span>
            <h2>How We Take You Online</h2>
            
            <div class="timeline">
                <div class="timeline-step">
                    <div class="step-num">01</div>
                    <h4>Free Consultation</h4>
                    <p>We review your localized category and tell you the best platform.</p>
                </div>
                <div class="timeline-step">
                    <div class="step-num">02</div>
                    <h4>Documentation</h4>
                    <p>Secure bank validations and active GSTIN certifications safely.</p>
                </div>
                <div class="timeline-step">
                    <div class="step-num">03</div>
                    <h4>Setup & Launch</h4>
                    <p>Configure layouts, list catalogs and establish shipping pickup grids.</p>
                </div>
                <div class="timeline-step">
                    <div class="step-num">04</div>
                    <h4>Search SEO</h4>
                    <p>Optimize keywords and titles to gain automated page 1 placement.</p>
                </div>
                <div class="timeline-step">
                    <div class="step-num">05</div>
                    <h4>PPC Management</h4>
                    <p>Adjust marketing budgets, review ratings, and scale profits monthly.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 7: Stats -->
    <section class="stats">
        <div class="container stats-grid">
            <div class="stat-box">
                <h2>100+</h2>
                <p>Happy Indian Businesses</p>
            </div>
            <div class="stat-box">
                <h2>250+</h2>
                <p>Digital Projects Completed</p>
            </div>
            <div class="stat-box">
                <h2>₹50L+</h2>
                <p>GMV Client Revenue</p>
            </div>
            <div class="stat-box">
                <h2>4.9/5</h2>
                <p>Overall Trust Rating</p>
            </div>
        </div>
    </section>

    <!-- Section 8: Testimonials Slider -->
    <section class="testimonials">
        <div class="container text-center">
            <span class="section-label">MERCHANT TRUST LOGS</span>
            <h2>Trusted By Real Indian Business Owners</h2>
            
            <div class="testimonials-deck">
                <?php foreach ($testimonials as $t): ?>
                <div class="testimonial-card">
                    <div class="testimonial-rating">★★★★★</div>
                    <p>"<?php echo htmlspecialchars($t['review']); ?>"</p>
                    <h4><?php echo htmlspecialchars($t['name']); ?></h4>
                    <span><?php echo htmlspecialchars($t['business_name']); ?> • <?php echo htmlspecialchars($t['location']); ?></span>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Section 9: Pricing Column tiers -->
    <section class="pricing">
        <div class="container">
            <div class="text-center mb-12">
                <span class="section-label">INVESTMENTS & PRICING</span>
                <h2>Flexible Setup Packages</h2>
                <p class="subtitle">Flat commissions. Select the option configured for your stock volume.</p>
            </div>
            
            <div class="pricing-grid">
                <?php foreach ($pricing as $tier): ?>
                <div class="pricing-card">
                    <h3><?php echo htmlspecialchars($tier['name']); ?></h3>
                    <p class="pricing-sub"><?php echo htmlspecialchars($tier['subtitle']); ?></p>
                    <div class="price"><?php echo htmlspecialchars($tier['price']); ?> <span class="period">/ <?php echo htmlspecialchars($tier['period']); ?></span></div>
                    <p class="desc">"<?php echo htmlspecialchars($tier['description']); ?>"</p>
                    <a href="contact.php?package=<?php echo urlencode($tier['name']); ?>" class="btn btn-primary w-full text-center">Choose Plan</a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Section 10: FAQs Accordion -->
    <section class="faq">
        <div class="container max-width-md">
            <h2 class="text-center mb-12">Frequently Answered Queries</h2>
            <div class="faq-accordion">
                <div class="faq-item">
                    <h4>Do I need a GST number to sell online in India?</h4>
                    <p>Yes, having an active GSTIN (GST identification key) is mandatory to sell physical goods on Amazon, Flipkart, Meesho, or Shopify within India.</p>
                </div>
                <div class="faq-item">
                    <h4>What are your setup costs? Are there monthly charges?</h4>
                    <p>We have flat, transparent, one-time setup packages starting from ₹9,999 (Starter pack) to launch on your favorite marketplace.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 11: Final CTA -->
    <section class="final-cta">
        <div class="container text-center">
            <h2>Ready To Take Your Business Online?</h2>
            <p>Join hundreds of growing Indian manufacturers and boutique stores scaling nationwide. Get your free custom audit report today!</p>
            <div class="cta-actions">
                <a href="contact.php?type=consultation" class="btn btn-primary btn-large">Book Free Consultation</a>
                <a href="contact.php?type=audit" class="btn btn-secondary btn-large">Get Free Audit ✓</a>
            </div>
        </div>
    </section>

    <!-- Floating WhatsApp integration -->
    <a href="https://wa.me/916361875394?text=Hello%20Local2Online%20I%20would%20like%20to%20know%20more%20about%20your%20services" class="floating-whatsapp" target="_blank" rel="noreferrer">
        <span>💬 Contact WhatsApp</span>
    </a>

    <!-- Footer columns -->
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
