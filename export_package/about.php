<?php
/**
 * Local2Online - About Us & Client Onboarding Story
 * Designed for InfinityFree + BigRock Host Name Configurations
 */

require_once 'db_config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Local2Online - E-commerce Enablers & Brand Enablers</title>
    <meta name="description" content="Meet Mohammed Sameer & Adnan Ahmed, the founders of Local2Online. Based in HSR Layout, Bangalore, our specialized team is dedicated to bringing traditional retailers online.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        .about-story {
            padding: 80px 0;
            background-color: white;
        }
        .story-grid {
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 64px;
            align-items: center;
        }
        .team-section {
            padding: 80px 0;
            background-color: var(--light);
        }
        .team-grid {
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 48px;
            max-width: 800px;
            margin: 0 auto;
        }
        .team-card {
            background-color: white;
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 32px;
            text-align: center;
            box-shadow: var(--shadow-sm);
        }
        .team-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 24px auto;
            object-fit: cover;
            border: 4px solid var(--accent);
        }
        .values-grid {
            display: grid;
            grid-template-cols: repeat(3, 1fr);
            gap: 32px;
            padding: 60px 0;
        }
        .value-card {
            background-color: white;
            padding: 32px;
            border-radius: 16px;
            text-align: left;
            border: 1px solid var(--border);
        }
        @media (max-width: 768px) {
            .story-grid, .team-grid, .values-grid {
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
                <a href="about.php" class="active">About Us</a>
                <a href="portfolio.php">Case Studies</a>
                <a href="blog.php">Blogs</a>
                <a href="contact.php" class="btn btn-secondary">Get Free Audit</a>
                <a href="contact.php" class="btn btn-primary">Free Consultation</a>
            </nav>
            
            <button class="menu-toggle" aria-label="Toggle Navigation">☰</button>
        </div>
    </header>

    <section class="hero" style="padding: 60px 0;">
        <div class="container text-center">
            <span class="badge" style="margin: 0 auto 16px auto;">OUR COMPANY</span>
            <h1 style="font-size: 36px; margin-bottom: 12px;">Bridging The Gap Between Offline & Online Selling</h1>
            <p style="margin: 0 auto; max-width: 600px;">Local2Online was founded with a single pure mission: helping regional Indian manufacturers and local wholesalers build nationwide brands.</p>
        </div>
    </section>

    <!-- STORY SECTION -->
    <section class="about-story">
        <div class="container">
            <div class="story-grid">
                <div>
                    <span class="section-label">THE FOUNDING SPARKS</span>
                    <h2 style="font-size: 28px; line-height: 1.3; margin-bottom: 24px;">Traditional retail is declining fast without a digital distribution gateway.</h2>
                    <p style="color: var(--text); font-size: 15px; margin-bottom: 20px;">We noticed that thousands of extremely high-quality local manufacturers and family-run boutique shops in clusters like Ludhiana, Surat, Ahmedabad, and Bangalore wanted to expand onto the internet, but were locked out by complex technology boundaries.</p>
                    <p style="color: var(--text); font-size: 15px;">They didn't understand catalog pricing formulas, product SEO algorithms, Gst code filings, Easy Ship labels, or PPC bidding. We created Local2Online to act as their outsourced growth partner, doing all the heavy lifting so local merchants can scale easily.</p>
                </div>
                <div>
                    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); color: white; padding: 40px; border-radius: 24px; box-shadow: var(--shadow-lg);">
                        <h3 style="color: white; font-size: 20px; margin-bottom: 16px;">✓ Out of the Box Operational Scale</h3>
                        <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 24px;">Unlike traditional consultants who just write manuals, we execute everything. We onboard your account, setup your lists, and manage your PPC ad campaigns.</p>
                        <div style="display: flex; gap: 24px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
                            <div>
                                <span style="font-size: 20px; font-weight: 800; color: var(--accent); font-family: var(--font-mono); display: block;">100+</span>
                                <span style="font-size: 11px; color: #cbd5e1;">Brand Partners</span>
                            </div>
                            <div>
                                <span style="font-size: 20px; font-weight: 800; color: var(--accent); font-family: var(--font-mono); display: block;">₹50L+</span>
                                <span style="font-size: 11px; color: #cbd5e1;">GMV Dispatched</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ENERGETIC VALUES -->
    <section style="background-color: var(--light); padding: 80px 0; border-y: 1px solid var(--border); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
        <div class="container text-center">
            <span class="section-label">HOW WE WORK</span>
            <h2>Our Architectural Values</h2>
            
            <div class="values-grid">
                <div class="value-card">
                    <span style="font-size: 24px; color: var(--accent); display: block; margin-bottom: 16px;">⚑</span>
                    <h4 style="font-size: 16px; margin-bottom: 12px;">Radical Honesty First</h4>
                    <p style="font-size: 13px; color: var(--text); margin: 0;">We won't take on your catalog page setup unless we genuinely see substantial keyword search volumes for your specific categories.</p>
                </div>
                <div class="value-card">
                    <span style="font-size: 24px; color: var(--accent); display: block; margin-bottom: 16px;">✓</span>
                    <h4 style="font-size: 16px; margin-bottom: 12px;">Pragmatic Cataloging Only</h4>
                    <p style="font-size: 13px; color: var(--text); margin: 0;">We build layouts and list configurations prioritizing what converts organic visitors to orders. No larping or overengineering.</p>
                </div>
                <div class="value-card">
                    <span style="font-size: 24px; color: var(--accent); display: block; margin-bottom: 16px;">★</span>
                    <h3 style="font-size: 16px; margin-bottom: 12px;">Zero Long-Term Lock-ins</h3>
                    <p style="font-size: 13px; color: var(--text); margin: 0;">We do flat-rate setup packages. You own the credentials, database tables, and Shopify storefront source sheets completely.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- TEAM FOUNDERS -->
    <section class="team-section">
        <div class="container">
            <div class="text-center mb-12">
                <span class="section-label">OUR CORE TEAM</span>
                <h2>Representing Founders & Engineers</h2>
                <p class="subtitle" style="margin-bottom: 0;">E-commerce experts combining product optimization codes with active seller center bid setups.</p>
            </div>

            <div class="team-grid">
                <div class="team-card">
                    <img class="team-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Mohammed Sameer">
                    <h3 style="font-size: 18px; margin-bottom: 4px;">Mohammed Sameer</h3>
                    <p style="font-size: 12px; font-family: var(--font-mono); color: var(--primary-light); font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">Co-founder & Head of Growth</p>
                    <p style="font-size: 13px; color: var(--text); line-height: 1.5; margin: 0;">Specializes in Amazon listing SEO algorithms, high-bid keyword adjustments, and Meesho supplier distribution structures.</p>
                </div>
                <div class="team-card">
                    <img class="team-avatar" src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=200&auto=format&fit=crop" alt="Adnan Ahmed">
                    <h3 style="font-size: 18px; margin-bottom: 4px;">Adnan Ahmed</h3>
                    <p style="font-size: 12px; font-family: var(--font-mono); color: var(--primary-light); font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">Co-founder & Web Architect</p>
                    <p style="font-size: 13px; color: var(--text); line-height: 1.5; margin: 0;">Leads customized Shopify storefront integrations, local WordPress WooCommerce deployments, and automation pipelines.</p>
                </div>
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

    <!-- Lucide Library & Custom Interaction Script -->
    <script src="https://unpkg.com/lucide@0.344.0/dist/umd/lucide.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
