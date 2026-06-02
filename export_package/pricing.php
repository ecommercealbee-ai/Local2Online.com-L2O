<?php
/**
 * Local2Online - Transparent Pricing Packages & Calculator
 * Built with dynamic channel estimator widgets
 */

require_once 'db_config.php';

$pricing = [];
if (isset($pdo)) {
    try {
        $pricing = $pdo->query("SELECT * FROM pricing ORDER BY id ASC")->fetchAll();
    } catch (Exception $e) {
        // Fallback flag
    }
}

if (empty($pricing)) {
    $pricing = [
        [
            'id' => 1,
            'name' => 'Starter Launch',
            'subtitle' => 'Great for small local shops launching their first online sales channel',
            'price' => '₹9,999',
            'period' => 'one-time setup',
            'description' => 'Establish a solid foundation with professional accounts on one major marketplace.',
            'features' => 'GST Onboarding Support, Any 1 Marketplace (Amazon / Meesho / Flipkart), Account Setup & Brand Verification, Up to 30 Product Listings, Standard Store Banner, Order dispatch training, 1 Month Assistance'
        ],
        [
            'id' => 2,
            'name' => 'Growth Pack',
            'subtitle' => 'Great for small manufacturers & wholesalers',
            'price' => '₹19,999',
            'period' => 'one-time setup',
            'description' => 'Multiply sales by launching across all three major platforms simultaneously.',
            'features' => 'GST Support & Brand Registry assistance, 3 Marketplaces (Amazon + Flipkart + Meesho), Up to 80 Product Listings & Catalog creation, Advanced Keyword SEO Optimization, A+ Grid Banner & Professional Brand Logo, Smart Ad Campaign launch & bidding strategy, 30 Days of Handholding & Performance Sync'
        ],
        [
            'id' => 3,
            'name' => 'Omnichannel Pro',
            'subtitle' => 'The complete enterprise brand setup + dedicated DTC web store',
            'price' => '₹34,999',
            'period' => 'one-time setup',
            'description' => 'Dominate both public marketplaces and your own elegant storefront.',
            'features' => 'Everything in Growth Pack, Custom Shopify or WordPress WooCommerce development, Payment Gateway Setup (Razorpay/UPI), WhatsApp cart recovery templates, Full catalog auto-import, Pricing strategy audit, 2 Months Account Management'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Affordable E-commerce Setup Investment Plans - Local2Online</title>
    <meta name="description" content="Check setup plans starting at ₹9,999. No recurring fees or commissions. Use our interactive e-commerce launching calculator to build custom platform packages.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        .calc-box {
            background-color: white;
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 32px;
            margin-top: 48px;
            text-align: left;
        }
        .calc-grid {
            display: grid;
            grid-template-cols: 1.2fr 0.8fr;
            gap: 32px;
        }
        .platform-choice {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background-color: var(--light);
            border: 1px solid var(--border);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .platform-choice:hover {
            border-color: var(--accent);
        }
        .platform-choice.selected {
            border-color: var(--primary);
            background-color: rgba(7, 27, 77, 0.04);
            font-weight: 600;
        }
        @media (max-width: 768px) {
            .calc-grid {
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
                <a href="pricing.php" class="active">Pricing Plans</a>
                <a href="about.php">About Us</a>
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
            <span class="badge" style="margin: 0 auto 16px auto;">INVESTMENTS</span>
            <h1 style="font-size: 36px; margin-bottom: 12px;">Flat One-Time Setup Plans</h1>
            <p style="margin: 0 auto; max-width: 600px;">Take complete ownership of your e-commerce channels. No monthly commissions of your revenue or software locks.</p>
        </div>
    </section>

    <section class="pricing">
        <div class="container">
            <div class="pricing-grid">
                <?php foreach ($pricing as $tier): ?>
                <div class="pricing-card <?php echo ($tier['id'] == 2) ? 'popular' : ''; ?>">
                    <?php if ($tier['id'] == 2): ?>
                    <span style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background-color: var(--primary); color: var(--accent); font-size: 10px; font-weight: bold; letter-spacing: 1px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
                        MERCHANTS CHOICE
                    </span>
                    <?php endif; ?>
                    
                    <div style="border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 16px;">
                        <h3 style="font-size: 20px;"><?php echo htmlspecialchars($tier['name']); ?></h3>
                        <p class="pricing-sub" style="margin-bottom: 0;"><?php echo htmlspecialchars($tier['subtitle']); ?></p>
                    </div>

                    <div class="price" style="margin-bottom: 12px;">
                        <?php echo htmlspecialchars($tier['price']); ?>
                        <span class="period">/ <?php echo htmlspecialchars($tier['period']); ?></span>
                    </div>

                    <p class="desc" style="font-size: 13px; color: var(--text-light); line-height: 1.5; margin-bottom: 24px;">
                        "<?php echo htmlspecialchars($tier['description']); ?>"
                    </p>

                    <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 32px; flex-grow: 1;">
                        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px;">
                            <?php 
                            $feats = is_array($tier['features']) ? $tier['features'] : explode(',', $tier['features']);
                            foreach ($feats as $f): 
                            ?>
                            <li style="font-size: 12px; color: var(--text); display: flex; align-items: start; gap: 8px;">
                                <span style="color: var(--success); font-weight: bold;">✓</span>
                                <span><?php echo htmlspecialchars(trim($f)); ?></span>
                            </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>

                    <a href="contact.php?package=<?php echo urlencode($tier['name']); ?>" class="btn <?php echo ($tier['id'] == 2) ? 'btn-primary' : 'btn-secondary'; ?>" style="<?php echo ($tier['id'] != 2) ? 'color: var(--primary); border: 1px solid var(--border); bg: var(--light);' : ''; ?> text-align: center; width: 100%;">
                        Book Setup Pack
                    </a>
                </div>
                <?php endforeach; ?>
            </div>

            <!-- COMPARISON METRICS -->
            <div class="calc-box">
                <h2 style="font-size: 24px; margin-bottom: 12px;">🛠 Custom Package Cost Builder</h2>
                <p style="font-size: 14px; color: var(--text-light); margin-bottom: 32px;">Choose your custom blend of marketplaces & web stores. Get a live estimate of total bundle costs including dynamic platform discounts!</p>
                
                <div class="calc-grid">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div class="platform-choice" data-id="amazon" data-price="8000">
                            <input type="checkbox" id="chk_amazon" style="width: 18px; height: 18px; cursor: pointer;">
                            <div>
                                <h4 style="font-size: 14px; margin: 0;">Amazon Onboarding Hub (₹8,000)</h4>
                                <p style="font-size: 11px; color: var(--text-light); margin: 0;">Account Setup + GTIN Exemption listing + PPC optimization</p>
                            </div>
                        </div>
                        <div class="platform-choice" data-id="flipkart" data-price="6000">
                            <input type="checkbox" id="chk_flipkart" style="width: 18px; height: 18px; cursor: pointer;">
                            <div>
                                <h4 style="font-size: 14px; margin: 0;">Flipkart Seller Launch (₹6,000)</h4>
                                <p style="font-size: 11px; color: var(--text-light); margin: 0;">Flipkart assured category listings + bulk catalogs upload</p>
                            </div>
                        </div>
                        <div class="platform-choice" data-id="meesho" data-price="5000">
                            <input type="checkbox" id="chk_meesho" style="width: 18px; height: 18px; cursor: pointer;">
                            <div>
                                <h4 style="font-size: 14px; margin: 0;">Meesho Supplier zero-commission setup (₹5,000)</h4>
                                <p style="font-size: 11px; color: var(--text-light); margin: 0;">0% Commission listing configuration + pricing strategy</p>
                            </div>
                        </div>
                        <div class="platform-choice" data-id="shopify" data-price="15000">
                            <input type="checkbox" id="chk_shopify" style="width: 18px; height: 18px; cursor: pointer;">
                            <div>
                                <h4 style="font-size: 14px; margin: 0;">Custom Shopify D2C Visual Store (₹15,000)</h4>
                                <p style="font-size: 11px; color: var(--text-light); margin: 0;">Theme design + COD filters + Razorpay and Shiprocket sync</p>
                            </div>
                        </div>
                        <div class="platform-choice" data-id="woocommerce" data-price="14000">
                            <input type="checkbox" id="chk_woocommerce" style="width: 18px; height: 18px; cursor: pointer;">
                            <div>
                                <h4 style="font-size: 14px; margin: 0;">WordPress WooCommerce Shop setup (₹14,000)</h4>
                                <p style="font-size: 11px; color: var(--text-light); margin: 0;">Lifetime commission-free server setup + dynamic queries</p>
                            </div>
                        </div>
                    </div>

                    <div style="background-color: var(--light); border: 1px solid var(--border); padding: 24px; border-radius: 16px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <h4 style="font-size: 15px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">Order Estimate Summary</h4>
                            
                            <div style="display: flex; justify-content: space-between; font-size: 13px;">
                                <span>Base Platform Cost:</span>
                                <span id="calc_base" style="font-weight: bold; font-family: var(--font-mono);">₹0</span>
                            </div>
                            
                            <div id="div_discount" style="display: none; justify-content: space-between; font-size: 13px; color: var(--success);">
                                <span>Combo Discount (15%):</span>
                                <span id="calc_discount" style="font-weight: bold; font-family: var(--font-mono);">-₹0</span>
                            </div>

                            <div style="display: flex; justify-content: space-between; font-size: 13px;">
                                <span>Estimated GST (18%):</span>
                                <span id="calc_gst" style="font-weight: bold; font-family: var(--font-mono);">₹0</span>
                            </div>

                            <div style="display: flex; justify-content: space-between; font-size: 16px; border-top: 1px solid var(--border); padding-top: 12px; color: var(--primary); font-weight: bold;">
                                <span>Final Estimate Sum:</span>
                                <span id="calc_final" style="font-family: var(--font-mono);">₹0</span>
                            </div>
                        </div>

                        <div style="margin-top: 24px;">
                            <p style="font-size: 11px; color: var(--text-light); margin-bottom: 12px;">★ Bundle 3+ channels simultaneously to automatically earn 15% pricing discount.</p>
                            <button id="btn_submit_calc" class="btn btn-primary w-full text-center" style="display: block;">Custom Setup Advisory Consultation</button>
                        </div>
                    </div>
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

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const platforms = document.querySelectorAll('.platform-choice');
        const basePriceSpan = document.getElementById('calc_base');
        const discountDiv = document.getElementById('div_discount');
        const discountSpan = document.getElementById('calc_discount');
        const gstSpan = document.getElementById('calc_gst');
        const finalSpan = document.getElementById('calc_final');
        const submitBtn = document.getElementById('btn_submit_calc');

        function recalculate() {
            let baseSum = 0;
            let countSelected = 0;
            const selectedNames = [];

            platforms.forEach(p => {
                const chk = p.querySelector('input[type="checkbox"]');
                if (chk.checked) {
                    baseSum += parseInt(p.dataset.price);
                    countSelected++;
                    p.classList.add('selected');
                    selectedNames.push(p.querySelector('h4').textContent.split(' (')[0]);
                } else {
                    p.classList.remove('selected');
                }
            });

            // If 3 or more channels are selected, give a 15% discount
            let isEligible = countSelected >= 3;
            let discount = isEligible ? Math.round(baseSum * 0.15) : 0;
            let gst = Math.round((baseSum - discount) * 0.18);
            let finalSum = (baseSum - discount) + gst;

            basePriceSpan.textContent = '₹' + baseSum.toLocaleString('en-IN');
            if (isEligible) {
                discountDiv.style.display = 'flex';
                discountSpan.textContent = '-₹' + discount.toLocaleString('en-IN');
            } else {
                discountDiv.style.display = 'none';
            }
            gstSpan.textContent = '₹' + gst.toLocaleString('en-IN');
            finalSpan.textContent = '₹' + finalSum.toLocaleString('en-IN');

            submitBtn.dataset.list = selectedNames.join(', ');
        }

        platforms.forEach(p => {
            p.addEventListener('click', function(e) {
                const chk = p.querySelector('input[type="checkbox"]');
                if (e.target !== chk) {
                    chk.checked = !chk.checked;
                }
                recalculate();
            });
        });

        submitBtn.addEventListener('click', function() {
            let items = submitBtn.dataset.list || '';
            let url = 'contact.php?type=consultation';
            if (items) {
                url += '&service=' + encodeURIComponent('Custom Cost Bundle: ' + items);
            }
            window.location.href = url;
        });

        // Initialize state with Amazon selected by default
        document.getElementById('chk_amazon').checked = true;
        recalculate();
    });
    </script>

    <!-- Lucide Library & Custom Interaction Script -->
    <script src="https://unpkg.com/lucide@0.344.0/dist/umd/lucide.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
