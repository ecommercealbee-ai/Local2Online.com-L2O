<?php
/**
 * Local2Online - Premium E-commerce Transformation Agency Homepage
 * Unified Single-Page Application (SPA) Engine for InfinityFree Hosting + BigRock Domain Setup
 * Designed for local2online.com
 */

require_once 'db_config.php';

$services = [];
$testimonials = [];
$pricing = [];
$portfolio = [];
$blogs = [];

$success_message = "";
$error_message = "";

// 1. Process Contact Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $business_name = isset($_POST['business_name']) ? trim($_POST['business_name']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $whatsapp = isset($_POST['whatsapp']) ? trim($_POST['whatsapp']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $service_needed = isset($_POST['service_needed']) ? trim($_POST['service_needed']) : '';
    $notes = isset($_POST['notes']) ? trim($_POST['notes']) : '';
    $type = isset($_POST['type']) ? trim($_POST['type']) : 'contact';

    if (empty($name) || empty($phone)) {
        $error_message = "Prerequisite Check Failed: Both Name and active Phone Number are mandatory.";
    } else {
        if (isset($pdo)) {
            try {
                $stmt = $pdo->prepare("INSERT INTO leads (name, business_name, phone, whatsapp, email, service_needed, notes, type, status) VALUES (:name, :business_name, :phone, :whatsapp, :email, :service_needed, :notes, :type, 'new')");
                
                $result = $stmt->execute([
                    'name' => $name,
                    'business_name' => $business_name,
                    'phone' => $phone,
                    'whatsapp' => !empty($whatsapp) ? $whatsapp : $phone,
                    'email' => $email,
                    'service_needed' => !empty($service_needed) ? $service_needed : 'General Advisory',
                    'notes' => $notes,
                    'type' => $type
                ]);

                if ($result) {
                    $success_message = "🎉 Your inquiry has been secured! One of our Head Enablers (Mohammed Sameer or Adnan Ahmed) will call or WhatsApp you within 2 hours to walk through strategy checkpoints.";
                } else {
                    $error_message = "Server error processing listing storage parameters.";
                }
            } catch (Exception $e) {
                $error_message = "Database Sync Offline: We received your details conceptually! (Verify database credentials in db_config.php to enable direct lead index tables logging). Detail: " . $e->getMessage();
            }
        } else {
            $error_message = "Server configuration offline: database variable is uninitialized. Ensure db_config.php contains proper credentials for InfinityFree MySQL hosts.";
        }
    }
}

// 2. Query dynamic records from database with fallbacks fallback
if (isset($pdo)) {
    try {
        $services = $pdo->query("SELECT * FROM services ORDER BY id ASC")->fetchAll();
        $testimonials = $pdo->query("SELECT * FROM testimonials")->fetchAll();
        $pricing = $pdo->query("SELECT * FROM pricing ORDER BY id ASC")->fetchAll();
        $portfolio = $pdo->query("SELECT * FROM portfolio ORDER BY id ASC")->fetchAll();
        $blogs = $pdo->query("SELECT * FROM blog_posts ORDER BY date DESC")->fetchAll();
    } catch (Exception $e) {
        // Fallback to static seeds
    }
}

// Fallback Seeds (To keep app working if db is not connected yet)
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

if (empty($testimonials)) {
    $testimonials = [
        ['name' => 'Rajesh Kumar', 'business_name' => 'Kumar Apparels', 'location' => 'Bangalore', 'rating' => 5, 'review' => 'Our wholesale garment business was struggling during offline slumps. Local2Online registered our GST, launched our brand on Meesho & Amazon, and now we process 150+ daily orders! Best decision we ever made.', 'tag' => 'Fashion Manufacturer', 'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'],
        ['name' => 'Anjali Sharma', 'business_name' => 'Vedic Herbs', 'location' => 'Mumbai', 'rating' => 5, 'review' => 'We wanted a premium look for our skincare brand. The team built a premium Shopify store and optimized our listings on Amazon and Flipkart. Our direct website sales grew by 4x. Highly professional team!', 'tag' => 'D2C Skincare Brand', 'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'],
        ['name' => 'Vikram Singh', 'business_name' => 'Singh Hardware', 'location' => 'Ludhiana', 'rating' => 5, 'review' => 'As an old manufacturer, selling online was foreign to us. Local2Online held our hand through catalog updates, product listing SEO, and inventory management. We are now official OEM suppliers.', 'tag' => 'Hardware Manufacturer', 'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop']
    ];
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
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Take Your Local Shop Online - Local2Online | Amazon, Meesho, Flipkart, Shopify Setup</title>
    <meta name="description" content="We help local retailers, manufacturers, and brands sell online and grow on Amazon, Flipkart, Meesho, Shopify. From Local Shop To Online Brand. Flat transparent setup plans.">
    
    <!-- Premium Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    
    <!-- Inline Custom Styles for Segment Specific Layouts to keep style.css safe -->
    <style>
        /* Modern Single Page App View Controllers */
        .app-view {
            display: none !important;
        }
        .app-view.active-view {
            display: block !important;
            animation: fadeInView 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInView {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Portfolio / Case Studies Styles */
        .filter-bar {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-bottom: 48px;
            flex-wrap: wrap;
        }
        .filter-btn {
            padding: 8px 18px;
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
            text-align: left;
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
            width: fit-content;
        }

        /* Calculator Styles */
        .calc-box {
            background-color: var(--primary);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 24px;
            padding: 40px;
            margin-top: 56px;
            text-align: left;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px -15px rgba(7, 27, 77, 0.4);
        }
        .calc-box::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 200px;
            height: 200px;
            background-color: rgba(255, 200, 61, 0.12);
            border-radius: 50%;
            filter: blur(40px);
            pointer-events: none;
            z-index: 1;
        }
        .calc-box::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200px;
            height: 200px;
            background-color: rgba(10, 44, 115, 0.6);
            border-radius: 50%;
            filter: blur(40px);
            pointer-events: none;
            z-index: 1;
        }
        .calc-box .calc-grid {
            position: relative;
            z-index: 2;
        }
        .calc-grid {
            display: grid;
            grid-template-cols: 1.25fr 0.75fr;
            gap: 32px;
            align-items: center;
        }
        .platform-choice {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 16px 20px;
            background-color: rgba(255, 255, 255, 0.04);
            border: 2px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .platform-choice:hover {
            border-color: rgba(255, 255, 255, 0.25);
            background-color: rgba(255, 255, 255, 0.06);
        }
        .platform-choice.selected {
            border-color: var(--accent);
            background-color: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 16px rgba(255, 200, 61, 0.12);
        }
        .platform-choice input[type="checkbox"] {
            accent-color: var(--accent);
            width: 18px;
            height: 18px;
            cursor: pointer;
            flex-shrink: 0;
        }
        .platform-choice .choice-details {
            flex-grow: 1;
            pointer-events: none;
            text-align: left;
        }
        .platform-choice h4 {
            font-size: 14px;
            margin: 0;
            color: #ffffff;
            font-weight: 700;
            line-height: 1.3;
        }
        .platform-choice p {
            font-size: 11px;
            color: #cbd5e1;
            margin: 4px 0 0 0;
            line-height: 1.2;
        }
        .platform-choice .choice-price {
            font-family: var(--font-mono);
            font-weight: 700;
            color: var(--accent);
            font-size: 14px;
            flex-shrink: 0;
        }

        /* Blogs Page Styles */
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
            text-align: left;
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

        /* Blog overlay modal */
        .blog-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(15, 23, 42, 0.6);
            z-index: 1000;
            backdrop-filter: blur(4px);
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .blog-modal.active {
            display: flex;
        }
        .blog-modal-content {
            background-color: white;
            border-radius: 24px;
            width: 100%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            padding: 40px;
            box-shadow: var(--shadow-lg);
            text-align: left;
            animation: modalSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes modalSlide {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .blog-modal-close {
            position: absolute;
            top: 24px;
            right: 24px;
            font-size: 28px;
            font-weight: bold;
            color: var(--text-light);
            cursor: pointer;
            transition: color 0.2s ease;
            line-height: 1;
        }
        .blog-modal-close:hover {
            color: var(--dark);
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

        /* Contact Details Page Styles */
        .contact-layout {
            display: grid;
            grid-template-cols: 0.9fr 1.1fr;
            gap: 64px;
            align-items: start;
        }
        .info-pane {
            background-color: var(--light);
            border: 1px solid var(--border);
            padding: 40px;
            border-radius: 20px;
            text-align: left;
        }
        .form-card {
            background-color: white;
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 40px;
            box-shadow: var(--shadow-sm);
            text-align: left;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 6px;
        }
        .form-control {
            width: 100%;
            padding: 12px 16px;
            font-size: 14px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-family: var(--font-body);
            transition: all 0.2s ease;
        }
        .form-control:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(7, 27, 77, 0.08);
        }
        .alert {
            padding: 16px 20px;
            border-radius: 12px;
            font-size: 13px;
            margin-bottom: 24px;
            line-height: 1.5;
        }
        .alert-success {
            background-color: var(--success-bg);
            color: var(--success);
            border: 1px solid rgba(16, 185, 129, 0.2);
            font-weight: 600;
        }
        .alert-error {
            background-color: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 1024px) {
            .portfolio-grid, .blog-grid {
                grid-template-cols: repeat(2, 1fr);
            }
            .contact-layout {
                grid-template-cols: 1fr;
                gap: 48px;
            }
        }
        @media (max-width: 768px) {
            .portfolio-grid, .blog-grid, .calc-grid {
                grid-template-cols: 1fr;
            }
            .filter-bar {
                gap: 8px;
            }
        }
    </style>
    
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
            <a href="#" class="logo">
                <span class="logo-accent">Local<span class="logo-num">2</span>Online</span>
            </a>
            
            <nav class="nav-links">
                <a href="#" class="active">Home</a>
                <a href="#services">Services</a>
                <a href="#pricing">Pricing Plans</a>
                <a href="#about">About Us</a>
                <a href="#portfolio">Case Studies</a>
                <a href="#blog">Blogs</a>
                <a href="#contact" class="btn btn-secondary">Get Free Audit</a>
                <a href="#contact" class="btn btn-primary">Free Consultation</a>
            </nav>
            
            <button class="menu-toggle" aria-label="Toggle Navigation">☰</button>
        </div>
    </header>

    <!-- ==================== VIEW 1: HOME PAGE ==================== -->
    <div id="view_home" class="app-view active-view">
        <!-- Hero Section -->
        <section class="hero">
            <div class="container hero-grid">
                <div class="hero-text">
                    <div class="badge">#1 E-commerce Enabler In India</div>
                    <h1>We Help Businesses <br><span class="text-accent">Sell Online & Grow Faster</span></h1>
                    <p>We help local retailers, manufacturers, and brands sell on Amazon, Flipkart, Meesho, Shopify, and their own websites. We manage the paperwork, listing SEO, and ad campaigns.</p>
                    <div class="hero-actions">
                        <a href="#contact" onclick="prefillContactForm('consultation', 'Booked Free Advisory Advisory Consultation')" class="btn btn-primary btn-large">Book Free Consultation</a>
                        <a href="#contact" onclick="prefillContactForm('audit', 'Store Catalog Optimization Audit Support')" class="btn btn-secondary btn-large">Get Free Store Audit ✓</a>
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

        <!-- Trusted Platforms -->
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

        <!-- Why Sell Online -->
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

        <!-- Why Choose Us -->
        <section class="why-choice">
            <div class="container text-center">
                <span class="section-label">YOUR PREMIUM OUTSOURCED GROWTH TEAM</span>
                <h2>Your Complete Selling Partner</h2>
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

        <!-- Services Preview Section (Dynamic Grid Mapping) -->
        <section class="services">
            <div class="container">
                <div class="section-header-row">
                    <h2>Everything You Need To Sell Online</h2>
                    <a href="#services" class="link-more">View Detailed Services Map →</a>
                </div>
                
                <div class="services-grid">
                    <?php 
                    $preview_services = array_slice($services, 0, 3);
                    foreach ($preview_services as $srv): 
                        $icon_map = [
                            'ShoppingBag' => 'shopping-bag',
                            'Layers' => 'layers',
                            'TrendingUp' => 'trending-up',
                            'Globe' => 'globe',
                            'Code' => 'code',
                            'ShieldCheck' => 'shield-check'
                        ];
                        $current_icon = isset($icon_map[$srv['icon']]) ? $icon_map[$srv['icon']] : 'star';
                    ?>
                    <div class="service-card">
                        <div class="service-icon">
                            <i data-lucide="<?php echo $current_icon; ?>"></i>
                        </div>
                        <h3><?php echo htmlspecialchars($srv['title']); ?></h3>
                        <p><?php echo htmlspecialchars($srv['short_desc']); ?></p>
                        <a href="#contact" onclick="prefillContactForm('contact', '<?php echo esc_js($srv['title']); ?>')" class="btn btn-secondary w-full text-center">Launch Channel Now</a>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- How It Works Blueprints -->
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

        <!-- Stats Counter -->
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

        <!-- FAQs Section -->
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
    </div>


    <!-- ==================== VIEW 2: SERVICES MAP ==================== -->
    <div id="view_services" class="app-view">
        <section class="hero" style="padding: 60px 0;">
            <div class="container text-center">
                <span class="badge" style="margin: 0 auto 16px auto;">OUR SERVICES</span>
                <h1 style="font-size: 36px; margin-bottom: 12px;">E-commerce Launch & Marketplace Setup</h1>
                <p style="margin: 0 auto; max-width: 600px;">Direct action execution to launch your physical portfolio on India's lead buying hubs. We build the stores, listing SEO, and PPC strategies.</p>
            </div>
        </section>

        <section class="services-detailed" style="padding: 60px 0;">
            <div class="container">
                <div style="display: grid; grid-template-columns: 1fr; gap: 40px;">
                    <?php foreach ($services as $srv): 
                        $icon_map = [
                            'ShoppingBag' => 'shopping-bag',
                            'Layers' => 'layers',
                            'TrendingUp' => 'trending-up',
                            'Globe' => 'globe',
                            'Code' => 'code',
                            'ShieldCheck' => 'shield-check'
                        ];
                        $current_icon = isset($icon_map[$srv['icon']]) ? $icon_map[$srv['icon']] : 'star';
                    ?>
                    <div class="detailed-service-card" style="background-color: white; border: 1px solid var(--border); border-radius: 24px; padding: 40px; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; text-align: left; box-shadow: var(--shadow-sm);">
                        <div style="display: flex; flex-direction: column; gap: 18px;">
                            <div class="service-icon" style="margin-bottom: 0; width: fit-content;">
                                <i data-lucide="<?php echo $current_icon; ?>"></i>
                            </div>
                            <h2 style="font-size: 26px; color: var(--primary);"><?php echo htmlspecialchars($srv['title']); ?></h2>
                            <p style="font-size: 15px; color: var(--text); line-height: 1.7;"><?php echo htmlspecialchars($srv['long_desc'] ?? $srv['short_desc']); ?></p>
                            
                            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 8px;">
                                <h4 style="font-size: 14px; margin-bottom: 12px; color: var(--primary);">What Is Included in Setup:</h4>
                                <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
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
                        </div>

                        <div style="background-color: var(--light); border: 1px solid var(--border); border-radius: 16px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <span style="font-family: var(--font-mono); font-size: 11px; font-weight: bold; text-transform: uppercase; color: var(--primary-light); background-color: #f1f5f9; padding: 6px 12px; border-radius: 6px; display: inline-block; margin-bottom: 18px;">
                                    Target Platform Stack
                                </span>
                                <h4 style="font-size: 18px; color: var(--primary); margin-bottom: 12px;">Supported Portals</h4>
                                <p style="font-size: 14px; color: var(--text); line-height: 1.6; margin-bottom: 0;">
                                    <?php echo htmlspecialchars($srv['platforms'] ?? 'All Native Marketplaces'); ?>
                                </p>
                            </div>
                            
                            <div style="margin-top: 24px;">
                                <a href="#contact" onclick="prefillContactForm('contact', '<?php echo esc_js($srv['title']); ?>')" class="btn btn-primary w-full text-center" style="display: block;">Onboard with Us</a>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
    </div>


    <!-- ==================== VIEW 3: PRICING & CALCULATOR ==================== -->
    <div id="view_pricing" class="app-view">
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
                    <div class="pricing-card" style="position: relative;">
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

                        <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 32px; flex-grow: 1; text-align: left;">
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

                        <a href="#contact" onclick="prefillContactForm('consultation', 'E-Commerce Launch Plans: <?php echo esc_js($tier['name']); ?>')" class="btn btn-primary text-center" style="width: 100%;">
                            Book Setup Pack
                        </a>
                    </div>
                    <?php endforeach; ?>
                </div>

                <!-- Live Cost Estimator Builder -->
                <div class="calc-box">
                    <div style="margin-bottom: 32px; position: relative; z-index: 2;">
                        <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); background-color: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 9999px; display: inline-block; margin-bottom: 8px; font-family: var(--font-mono);">CRO Tool Engine</span>
                        <h3 style="font-size: 24px; font-weight: bold; color: #ffffff; margin: 4px 0 8px 0;">Build Your Bespoke E-commerce Blueprint Estimate</h3>
                        <p style="font-size: 13px; color: #cbd5e1; margin: 0;">Select the channels you want to launch simultaneously. We apply custom discounts for multi-channel onboarding requests.</p>
                    </div>
                    
                    <div class="calc-grid" id="calculator_grid">
                        <div style="display: flex; flex-direction: column; gap: 12px;" id="calculator_choices">
                            <div class="platform-choice" data-id="amazon" data-price="8000">
                                <div style="display: flex; align-items: start; gap: 12px;">
                                    <input type="checkbox" id="chk_amazon" style="margin-top: 2px;">
                                    <div class="choice-details">
                                        <h4>Amazon Seller Onboarding</h4>
                                        <p>Seller central account registry + first listings + PPC configure</p>
                                    </div>
                                </div>
                                <span class="choice-price">₹8,000</span>
                            </div>
                            <div class="platform-choice" data-id="flipkart" data-price="6000">
                                <div style="display: flex; align-items: start; gap: 12px;">
                                    <input type="checkbox" id="chk_flipkart" style="margin-top: 2px;">
                                    <div class="choice-details">
                                        <h4>Flipkart Launch Setup</h4>
                                        <p>Verification approval support + smart catalog templates</p>
                                    </div>
                                </div>
                                <span class="choice-price">₹6,000</span>
                            </div>
                            <div class="platform-choice" data-id="meesho" data-price="5000">
                                <div style="display: flex; align-items: start; gap: 12px;">
                                    <input type="checkbox" id="chk_meesho" style="margin-top: 2px;">
                                    <div class="choice-details">
                                        <h4>Meesho Supplier Hub Enablement</h4>
                                        <p>Commission-free pricing matrix configuration</p>
                                    </div>
                                </div>
                                <span class="choice-price">₹5,000</span>
                            </div>
                            <div class="platform-choice" data-id="shopify" data-price="15000">
                                <div style="display: flex; align-items: start; gap: 12px;">
                                    <input type="checkbox" id="chk_shopify" style="margin-top: 2px;">
                                    <div class="choice-details">
                                        <h4>Premium Shopify D2C store</h4>
                                        <p>Design theme setup + payment integration + shipping rules</p>
                                    </div>
                                </div>
                                <span class="choice-price">₹15,000</span>
                            </div>
                            <div class="platform-choice" data-id="woocommerce" data-price="14000">
                                <div style="display: flex; align-items: start; gap: 12px;">
                                    <input type="checkbox" id="chk_woocommerce" style="margin-top: 2px;">
                                    <div class="choice-details">
                                        <h4>Hosting Self-Managed WordPress store</h4>
                                        <p>Lifetime license + unlimited products listing</p>
                                    </div>
                                </div>
                                <span class="choice-price">₹14,000</span>
                            </div>
                        </div>

                        <div id="calculator_receipt" style="background-color: #ffffff; color: #010c26; border-radius: 16px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; position: relative; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3); min-height: 400px; align-self: stretch;">
                            <span style="position: absolute; top: -10px; right: 16px; padding: 3px 8px; background: #10b981; color: #ffffff; font-size: 9px; font-weight: bold; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);">Instant calculation</span>
                            
                            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
                                <h4 style="font-size: 13px; text-transform: uppercase; font-family: var(--font-mono); letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 4px; color: var(--primary);">Estimate Proposal</h4>
                                
                                <div id="receipt_itemized" style="display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #475569;">
                                    <!-- Populated dynamically via JS -->
                                </div>
                                
                                <div style="border-top: 1px solid #f1f5f9; padding-top: 14px; display: flex; flex-direction: column; gap: 10px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 13px; color: #475569;">
                                        <span>Sub Total</span>
                                        <span id="calc_base" style="font-weight: 600; font-family: var(--font-mono); color: #010c26;">₹0</span>
                                    </div>
                                    
                                    <div id="div_discount" style="display: none; justify-content: space-between; font-size: 13px; color: #10b981; font-weight: bold;">
                                        <span>Bundle Discount (15% Off)</span>
                                        <span id="calc_discount" style="font-family: var(--font-mono);">-₹0</span>
                                    </div>

                                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8;">
                                        <span>Estimated GST (18%)</span>
                                        <span id="calc_gst" style="font-family: var(--font-mono);">+₹0</span>
                                    </div>
                                </div>

                                <div style="border-top: 2px dashed #cbd5e1; padding-top: 14px; margin-top: 4px; display: flex; justify-content: space-between; font-size: 17px; font-weight: bold; color: var(--primary);">
                                    <span>Total Investment</span>
                                    <span id="calc_final" style="font-family: var(--font-mono); color: #10b981;">₹0</span>
                                </div>
                            </div>

                            <div style="margin-top: 20px; width: 100%;">
                                <div id="calc_tip_container" style="padding: 10px 12px; border-radius: 8px; font-size: 11px; line-height: 1.4; margin-bottom: 16px; transition: all 0.2s ease;">
                                    <!-- Populated dynamically via JS -->
                                </div>
                                <button id="btn_submit_calc" class="btn btn-primary" style="display: block; width: 100%; font-weight: bold; text-transform: uppercase; padding: 12px; border-radius: 10px; font-size: 11px; box-shadow: 0 4px 12px rgba(255, 200, 61, 0.25);">Lock This Quote & Get Consultation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>


    <!-- ==================== VIEW 4: ABOUT US ==================== -->
    <div id="view_about" class="app-view">
        <section class="hero" style="padding: 60px 0;">
            <div class="container text-center">
                <span class="badge" style="margin: 0 auto 16px auto;">OUR COMPANY</span>
                <h1 style="font-size: 36px; margin-bottom: 12px;">Bridging The Gap Between Offline & Online Selling</h1>
                <p style="margin: 0 auto; max-width: 600px;">Local2Online was founded with a single pure mission: helping regional Indian manufacturers and local wholesalers build nationwide brands.</p>
            </div>
        </section>

        <section class="about-story" style="padding: 60px 0;">
            <div class="container">
                <div class="story-grid" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; text-align: left; align-items: center;">
                    <div>
                        <span class="section-label">THE FOUNDING SPARKS</span>
                        <h2 style="font-size: 28px; line-height: 1.3; margin-bottom: 24px; color: var(--primary);">Traditional retail is declining fast without a digital distribution gateway.</h2>
                        <p style="color: var(--text); font-size: 15px; margin-bottom: 20px; line-height: 1.7;">We noticed that thousands of extremely high-quality local manufacturers and family-run boutique shops in clusters like Ludhiana, Surat, Ahmedabad, and Bangalore wanted to expand onto the internet, but were locked out by complex technology boundaries.</p>
                        <p style="color: var(--text); font-size: 15px; line-height: 1.7;">They didn't understand catalog pricing formulas, product SEO algorithms, GST code filings, Easy Ship labels, or PPC bidding. We created Local2Online to act as their outsourced growth partner, doing all the heavy lifting so local merchants can scale easily.</p>
                    </div>
                    <div>
                        <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); color: white; padding: 40px; border-radius: 24px; box-shadow: var(--shadow-lg);">
                            <h3 style="color: white; font-size: 20px; margin-bottom: 16px;">✓ Out of the Box Operational Scale</h3>
                            <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 24px; line-height: 1.6;">Unlike traditional consultants who just write manuals, we execute everything. We onboard your account, setup your lists, and manage your PPC ad campaigns.</p>
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

        <!-- Values Section -->
        <section style="background-color: var(--light); padding: 80px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
            <div class="container text-center">
                <span class="section-label">HOW WE WORK</span>
                <h2 style="color: var(--primary); margin-bottom: 40px;">Our Architectural Values</h2>
                
                <div class="values-grid">
                    <div class="value-card">
                        <span style="font-size: 24px; color: var(--accent); display: block; margin-bottom: 16px;">⚑</span>
                        <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--primary);">Radical Honesty First</h4>
                        <p style="font-size: 13px; color: var(--text); margin: 0; line-height: 1.6;">We won't take on your catalog page setup unless we genuinely see substantial keyword search volumes for your specific categories.</p>
                    </div>
                    <div class="value-card">
                        <span style="font-size: 24px; color: var(--accent); display: block; margin-bottom: 16px;">✓</span>
                        <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--primary);">Pragmatic Cataloging Only</h4>
                        <p style="font-size: 13px; color: var(--text); margin: 0; line-height: 1.6;">We build layouts and list configurations prioritizing what converts organic visitors to orders. No larping or overengineering.</p>
                    </div>
                    <div class="value-card">
                        <span style="font-size: 24px; color: var(--accent); display: block; margin-bottom: 16px;">★</span>
                        <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--primary);">Zero Long-Term Lock-ins</h4>
                        <p style="font-size: 13px; color: var(--text); margin: 0; line-height: 1.6;">We do flat-rate setup packages. You own the credentials, database tables, and Shopify storefront source sheets completely.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="team-section" style="padding: 60px 0;">
            <div class="container">
                <div class="text-center mb-12">
                    <span class="section-label">OUR CORE TEAM</span>
                    <h2 style="color: var(--primary); margin-bottom: 8px;">Representing Founders & Engineers</h2>
                    <p class="subtitle" style="margin-bottom: 0;">E-commerce experts combining product optimization codes with active seller center bid setups.</p>
                </div>

                <div class="team-grid">
                    <div class="team-card">
                        <img class="team-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Mohammed Sameer">
                        <h3 style="font-size: 18px; margin-bottom: 4px; color: var(--primary);">Mohammed Sameer</h3>
                        <p style="font-size: 12px; font-family: var(--font-mono); color: var(--primary-light); font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">Co-founder & Head of Growth</p>
                        <p style="font-size: 13px; color: var(--text); line-height: 1.5; margin: 0;">Specializes in Amazon listing SEO algorithms, high-bid keyword adjustments, and Meesho supplier distribution structures.</p>
                    </div>
                    <div class="team-card">
                        <img class="team-avatar" src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=200&auto=format&fit=crop" alt="Adnan Ahmed">
                        <h3 style="font-size: 18px; margin-bottom: 4px; color: var(--primary);">Adnan Ahmed</h3>
                        <p style="font-size: 12px; font-family: var(--font-mono); color: var(--primary-light); font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">Co-founder & Web Architect</p>
                        <p style="font-size: 13px; color: var(--text); line-height: 1.5; margin: 0;">Leads customized Shopify storefront integrations, local WordPress WooCommerce deployments, and automation pipelines.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>


    <!-- ==================== VIEW 5: CASE STUDIES ==================== -->
    <div id="view_portfolio" class="app-view">
        <section class="hero" style="padding: 60px 0;">
            <div class="container text-center">
                <span class="badge" style="margin: 0 auto 16px auto;">MERCHANT JOURNEYS</span>
                <h1 style="font-size: 36px; margin-bottom: 12px;">E-commerce Success Stories</h1>
                <p style="margin: 0 auto; max-width: 600px;">Discover how local Indian manufacturers scaled their offline catalogs using our Shopify, WooCommerce, Amazon seller enabler solutions.</p>
            </div>
        </section>

        <section class="portfolio" style="padding: 40px 0 80px 0;">
            <div class="container">
                <!-- Live JS Interactive Tags Filter -->
                <div class="filter-bar">
                    <button class="filter-btn active" data-filter="all">All Channels</button>
                    <button class="filter-btn" data-filter="shopify">Shopify Stores</button>
                    <button class="filter-btn" data-filter="woocommerce">WooCommerce WP</button>
                    <button class="filter-btn" data-filter="marketplace">Marketplaces</button>
                </div>

                <div class="portfolio-grid" id="portfolio_grid_container">
                    <?php foreach ($portfolio as $project): ?>
                    <div class="portfolio-card" data-channel="<?php echo htmlspecialchars($project['platform']); ?>">
                        <img class="portfolio-img" src="<?php echo htmlspecialchars($project['image']); ?>" alt="<?php echo htmlspecialchars($project['client']); ?>">
                        <div class="portfolio-content">
                            <div>
                                <span class="metric-badge"><?php echo htmlspecialchars($project['metrics']); ?></span>
                                <h3 style="font-size: 18px; color: var(--primary); margin-bottom: 8px; font-family: var(--font-heading);"><?php echo htmlspecialchars($project['title']); ?></h3>
                                <p style="font-size: 12px; color: var(--text-light); text-transform: uppercase; font-family: var(--font-mono); margin-bottom: 16px; font-weight: bold;">
                                    Client: <?php echo htmlspecialchars($project['client']); ?> • <?php echo htmlspecialchars($project['industry']); ?>
                                </p>
                            </div>
                            <p style="font-size: 14px; color: var(--text); line-height: 1.6; margin: 0;">
                                <?php echo htmlspecialchars($project['description']); ?>
                            </p>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
    </div>


    <!-- ==================== VIEW 6: BLOG PUBLICATIONS ==================== -->
    <div id="view_blog" class="app-view">
        <section class="hero" style="padding: 60px 0;">
            <div class="container text-center">
                <span class="badge" style="margin: 0 auto 16px auto;">CMS ARTICLES</span>
                <h1 style="font-size: 36px; margin-bottom: 12px;">Digital Strategy publications</h1>
                <p style="margin: 0 auto; max-width: 600px;">Learn how to sell on Amazon, Flipkart, Meesho, Shopify inside India. Standard cataloging checklists, GST filings, and PPC tricks.</p>
            </div>
        </section>

        <section class="blogs" style="padding: 40px 0 80px 0;">
            <div class="container">
                <div class="blog-grid">
                    <?php foreach ($blogs as $b): ?>
                    <div class="blog-card" style="cursor: pointer;" onclick="openBlogPostModal('<?php echo esc_js($b['slug']); ?>')">
                        <img class="blog-img" src="<?php echo htmlspecialchars($b['image']); ?>" alt="<?php echo htmlspecialchars($b['title']); ?>">
                        <div class="blog-body">
                            <div>
                                <span style="font-family: var(--font-mono); color: var(--primary-light); font-size: 11px; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 8px;">
                                    <?php echo htmlspecialchars($b['category']); ?> • <?php echo htmlspecialchars($b['read_time']); ?>
                                </span>
                                <h3 style="font-size: 17px; color: var(--primary); margin-bottom: 12px; line-height: 1.4;"><?php echo htmlspecialchars($b['title']); ?></h3>
                                <p style="font-size: 13.5px; color: var(--text); line-height: 1.6; margin-bottom: 20px;">
                                    <?php echo htmlspecialchars($b['excerpt']); ?>
                                </p>
                            </div>
                            <div style="border-top: 1px solid #f1f5f9; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-light);">
                                <span>By <?php echo htmlspecialchars($b['author']); ?></span>
                                <span><?php echo date('M d, Y', strtotime($b['date'])); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- Instant Blog Viewer Pop-up Modal (Matches SPA React feel) -->
        <div id="blog_detail_modal" class="blog-modal" onclick="closeBlogPostModal()">
            <div class="blog-modal-content" onclick="event.stopPropagation()">
                <span class="blog-modal-close" onclick="closeBlogPostModal()">✕</span>
                <div id="blog_modal_body_content">
                    <!-- Loaded dynamically via JavaScript -->
                </div>
            </div>
        </div>
    </div>


    <!-- ==================== VIEW 7: CONTACT / CONSULTATION ==================== -->
    <div id="view_contact" class="app-view">
        <section class="hero" style="padding: 60px 0;">
            <div class="container text-center">
                <span class="badge" style="margin: 0 auto 16px auto;">CONNECT TEAM</span>
                <h1 style="font-size: 36px; margin-bottom: 12px;">Get Free Onboarding Guidance</h1>
                <p style="margin: 0 auto; max-width: 600px;">Our Head Enablers will review your physical catalogs and build a dedicated seller-ready roadmap during our meeting.</p>
            </div>
        </section>

        <section style="padding: 40px 0 80px 0;">
            <div class="container">
                <div class="contact-layout">
                    <!-- Info details -->
                    <div class="info-pane">
                        <span class="section-label" style="display: inline-block; margin-bottom: 12px;">VISIT OR DIAL</span>
                        <h2 style="font-size: 24px; color: var(--primary); margin-bottom: 24px;">Start Your Online Switch</h2>
                        
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            <div style="display: flex; gap: 16px; align-items: start;">
                                <span style="font-size: 20px;">📞</span>
                                <div>
                                    <h4 style="font-size: 14px; color: var(--primary); margin: 0;">Phone & WhatsApp Advisory</h4>
                                    <p style="font-size: 13.5px; color: var(--text); margin: 0;">+91 63618 75394</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 16px; align-items: start;">
                                <span style="font-size: 20px;">✉</span>
                                <div>
                                    <h4 style="font-size: 14px; color: var(--primary); margin: 0;">Official Communications</h4>
                                    <p style="font-size: 13.5px; color: var(--text); margin: 0;">contact@local2online.com</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 16px; align-items: start;">
                                <span style="font-size: 20px;">📍</span>
                                <div>
                                    <h4 style="font-size: 14px; color: var(--primary); margin: 0;">Operational Head Hub</h4>
                                    <p style="font-size: 13.5px; color: var(--text); margin: 0;">Sector 6, HSR Layout, Bangalore - 560102</p>
                                </div>
                            </div>
                        </div>

                        <div style="border-top: 1px solid var(--border); padding-top: 32px; margin-top: 32px; background: rgba(255, 200, 61, 0.05); border-radius: 12px; padding: 24px;">
                            <h4 style="font-size: 15px; color: var(--primary); margin-bottom: 10px;">★ No Upfront Consultation Costs</h4>
                            <p style="font-size: 13px; color: var(--text); line-height: 1.6; margin: 0;">Everything we outline on our initial call is completely yours to keep. No credit card records, no monthly subscriptions.</p>
                        </div>
                    </div>

                    <!-- Interactive Submission Card -->
                    <div class="form-card">
                        <?php if (!empty($success_message)): ?>
                        <div class="alert alert-success">
                            <?php echo $success_message; ?>
                        </div>
                        <?php endif; ?>

                        <?php if (!empty($error_message)): ?>
                        <div class="alert alert-error">
                            <?php echo $error_message; ?>
                        </div>
                        <?php endif; ?>

                        <form action="#contact" method="POST">
                            <input type="hidden" name="type" id="form_lead_type" value="contact">
                            
                            <div class="form-group">
                                <label for="form_name">Your Name *</label>
                                <input type="text" name="name" id="form_name" class="form-control" placeholder="e.g. Rajesh Kumar" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="form_business">Business Name (Showroom or Factory)</label>
                                <input type="text" name="business_name" id="form_business" class="form-control" placeholder="e.g. Kumar Textiles Bangalore">
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div class="form-group">
                                    <label for="form_phone">Phone Number *</label>
                                    <input type="tel" name="phone" id="form_phone" class="form-control" placeholder="e.g. 9876543210" required>
                                </div>
                                <div class="form-group">
                                    <label for="form_whatsapp">WhatsApp Number</label>
                                    <input type="tel" name="whatsapp" id="form_whatsapp" class="form-control" placeholder="e.g. 9876543210">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="form_email">Email Address</label>
                                <input type="email" name="email" id="form_email" class="form-control" placeholder="e.g. rajesh@kumartextiles.com">
                            </div>

                            <div class="form-group">
                                <label for="form_service_needed">Channel Selection Focus</label>
                                <select name="service_needed" id="form_service_needed" class="form-control">
                                    <option value="General Advisory">Choose Target Market Channel...</option>
                                    <?php foreach ($services as $srv): ?>
                                    <option value="<?php echo htmlspecialchars($srv['title']); ?>"><?php echo htmlspecialchars($srv['title']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="form_notes">Catalog details or Current Website links</label>
                                <textarea name="notes" id="form_notes" rows="4" class="form-control" placeholder="Tell us what physical products you make/sell (e.g., sarees, organic seeds, leather shoes)..."></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary w-full" style="padding: 14px 20px; font-size: 15px;">Secure Priority Advisory Call ✓</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>


    <!-- Floating WhatsApp Integration -->
    <a href="https://wa.me/916361875394?text=Hello%20Local2Online%20I%20would%20like%20to%20know%20more%20about%20your%20services" class="floating-whatsapp" target="_blank" rel="noreferrer">
        <span>💬 Contact WhatsApp</span>
    </a>


    <!-- Footer Block -->
    <footer class="footer">
        <div class="container footer-grid">
            <div>
                <h3>Local2Online</h3>
                <p>Helping local retailers, wholesalers, and manufacturers build high-converting online pipelines on major Indian marketplaces.</p>
            </div>
            <div>
                <h4>Quick Links</h4>
                <a href="#">Home</a>
                <a href="#services">Services</a>
                <a href="#pricing">Investments</a>
                <a href="#about">About Us</a>
                <a href="#portfolio">Case Studies</a>
                <a href="#blog">Blogs</a>
                <a href="admin.php" class="admin-link">🔓 Admin Panel</a>
            </div>
            <div>
                <h4>Services</h4>
                <a href="#services">Amazon Setup</a>
                <a href="#services">Flipkart Setup</a>
                <a href="#services">Meesho Setup</a>
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


    <!-- Data transfer elements for JS to retrieve dynamic blogs fallbacks seamlessly -->
    <script>
        const DYNAMIC_BLOGS_SEED = <?php echo json_encode($blogs); ?>;
    </script>

    <!-- Lucide Library & Custom Interaction Script -->
    <script src="https://unpkg.com/lucide@0.344.0/dist/umd/lucide.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
<?php
// Secure escaping utility
function esc_js($str) {
    return str_replace("'", "\\'", htmlspecialchars($str));
}
?>
