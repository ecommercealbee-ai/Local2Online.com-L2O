-- ==========================================================
-- Local2Online Database Setup Schema
-- Designed for PHP 7.4 - 8.x + MySQL (InfinityFree / BigRock)
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Table structure for table `admins`
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default administrator account matching system login code (Username: admin / Password: local2online2026)
-- Password hash generated using password_hash('local2online2026', PASSWORD_BCRYPT)
INSERT INTO `admins` (`username`, `password_hash`, `email`) 
VALUES ('admin', '$2y$10$wW5SgOOfqjZep8YHe97SJuWzK2J7nOn2.P8zD.E0XGqXvU6Ff4.hK', 'admin@local2online.com')
ON DUPLICATE KEY UPDATE `username`='admin';


-- 2. Table structure for table `leads`
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `business_name` VARCHAR(150) NULL,
  `phone` VARCHAR(20) NOT NULL,
  `whatsapp` VARCHAR(20) NULL,
  `email` VARCHAR(100) NULL,
  `service_needed` VARCHAR(150) NOT NULL,
  `notes` TEXT NULL,
  `type` ENUM('contact', 'audit', 'consultation', 'callback') DEFAULT 'contact',
  `status` ENUM('new', 'contacted', 'joined', 'rejected') DEFAULT 'new',
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 3. Table structure for table `services`
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'Award',
  `short_desc` VARCHAR(255) NOT NULL,
  `long_desc` TEXT NULL,
  `features` TEXT NOT NULL, -- comma-separated
  `platforms` VARCHAR(255) DEFAULT 'All'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed initial services data
INSERT INTO `services` (`title`, `icon`, `short_desc`, `long_desc`, `features`, `platforms`) VALUES
('Amazon Seller Setup & Launch', 'ShoppingBag', 'Start selling to 100M+ active Amazon buyers with complete stores, listing SEO, and FBA dispatch registries.', 'Launch on Amazon India. We handle seller central accounts, secure brand approvals, UPC declarations, keyword indexing, and PPC advertising configuration.', 'Seller Central verification, GTIN / Brand support, FBA logistics onboarding, Catalog listing uploads, 30 days bid tuning', 'Amazon India'),
('Flipkart Seller Onboarding', 'Layers', 'Sell products on India homegrown ecommerce leader reaching Tier-2 and Tier-3 buying locations.', 'Register smart listings, secure Flipkart Smart assured categories, design SEO product titles and layout tags.', 'GST registration files assistance, Brand trademark checks, Multi-product bulk upload catalogs, Smart keyword indexing', 'Flipkart Hub'),
('Meesho Zero-Commission Hub', 'TrendingUp', 'Leverage social retail with 0% commission structures for quick garment and footwear stock sales.', 'Meesho zero-fee platforms. Perfect for boutique home manufacturers, weavers and small trade operators.', '0% platform setup assistance, Integrated Meesho ads launch, Catalog pricing configurations, Return label training', 'Meesho Supplier Panel'),
('Shopify Custom Web Store', 'Globe', 'Build your independent brand commerce site with automatic checkout payment gateways and courier tracking.', 'Premium responsive Shopify storefront design. Integrated with shipping aggregators (Shiprocket) for Cash on Delivery checks.', 'Responsive visual themed page design, Razorpay payment flow setups, Automated COD cart backup reminders, WhatsApp billing templates integration', 'Shopify'),
('WooCommerce WordPress Shop', 'Code', 'Total ownership storefront without expensive recurring monthly commissions or software subscription fees.', 'Free WordPress WooCommerce. Unlimited products list, total design adjustments, cheap shared hosting deployments.', 'Self-funded cpanel server setup, Customized layout elements, Complete database integration, Standard payment gateways UPI API', 'WooCommerce + WordPress'),
('Full Marketplace Management', 'ShieldCheck', 'Outsource complete digital workflows including analytics, advertising bids, and dispatch metrics.', 'Acting as your dedicated in-house digital team. We adjust bids, handle brand files, resolve reviews, and generate results reports.', 'Daily orders dispatch checks, PPC optimization support, Customer reviews capture campaigns, Weekly profit report parameters', 'All Indian Channels');


-- 4. Table structure for table `testimonials`
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `business_name` VARCHAR(150) NOT NULL,
  `location` VARCHAR(100) DEFAULT 'India',
  `rating` INT DEFAULT 5,
  `review` TEXT NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `tag` VARCHAR(50) DEFAULT 'Retailer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default reviews data
INSERT INTO `testimonials` (`name`, `business_name`, `location`, `rating`, `review`, `avatar`, `tag`) VALUES
('Rajesh Kumar', 'Kumar Apparels', 'Bangalore, Karnataka', 5, 'Our wholesale garment business was struggling during offline slumps. Local2Online registered our GST, launched our brand on Meesho & Amazon, and now we process 150+ daily orders! Best decision we ever made.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', 'Fashion Manufacturer'),
('Anjali Sharma', 'Vedic Herbs & Beauty', 'Mumbai, Maharashtra', 5, 'We wanted a premium look for our skincare brand. The team built a premium Shopify store and optimized our listings on Amazon and Flipkart. Our direct website sales grew by 4x. Highly professional team!', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', 'D2C Skincare Brand'),
('Vikram Singh', 'Singh Hardware & Tools', 'Ludhiana, Punjab', 5, 'As an old manufacturer, selling online was foreign to us. Local2Online held our hand through catalog updates, product listing SEO, and inventory management. We are now official OEM suppliers on major portals.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', 'Hardware Manufacturer');


-- 5. Table structure for table `pricing`
CREATE TABLE IF NOT EXISTS `pricing` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `subtitle` VARCHAR(150) NOT NULL,
  `price` VARCHAR(30) NOT NULL,
  `period` VARCHAR(30) NOT NULL,
  `description` TEXT NOT NULL,
  `features` TEXT NOT NULL -- comma separated
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pricing` (`name`, `subtitle`, `price`, `period`, `description`, `features`) VALUES
('Starter Launch', 'Great for small local shops launching their first online sales channel', '₹9,999', 'one-time setup', 'Establish a solid foundation with professional accounts on one major marketplace or catalog setup.', 'GST Onboarding Support, Any 1 Marketplace (Amazon / Meesho / Flipkart), Account Setup & Brand Verification, Up to 30 Product Listings with Basic SEO, Standard Store Banner Design, Order dispatch training (2 Hours), 1 Month of basic email assistance'),
('Growth Pack', 'Our target choice for growing brands, wholesalers & small manufacturers', '₹19,999', 'one-time setup', 'Multiply your sales by launching across all three major platforms simultaneously with advanced SEO design.', 'GST Support & Brand Registry assistance, 3 Marketplaces (Amazon + Flipkart + Meesho), Up to 80 Product Listings & Catalog creation, Advanced Keyword SEO Optimization, A+ Grid Banner & Professional Brand Logo, Smart Ad Campaign launch & bidding strategy, 30 Days of Handholding & Performance Sync'),
('Omnichannel Pro', 'The complete enterprise brand setup + dedicated DTC web store', '₹34,999', 'one-time setup', 'Dominate the web both on public marketplaces and your own elegant, commission-free e-commerce storefront.', 'Everything in the Growth Pack, Custom Shopify or WordPress WooCommerce development, Payment Gateway Integration (Razorpay/UPI), WhatsApp billing & cart recovery templates, Full catalog import across website & marketplaces, Pricing strategy competitive mapping, 2 Months of dedicated Account Management support');


-- 6. Table structure for table `portfolio`
CREATE TABLE IF NOT EXISTS `portfolio` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `client` VARCHAR(100) NOT NULL,
  `industry` VARCHAR(100) NOT NULL,
  `platform` VARCHAR(150) NOT NULL,
  `image` VARCHAR(255) NULL,
  `metrics` VARCHAR(255) NOT NULL, -- comma separated
  `description` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `portfolio` (`title`, `client`, `industry`, `platform`, `image`, `metrics`, `description`) VALUES
('Transforming a Heritage Silk Boutique Into a High-Converting Brand', 'Royal Silks', 'Ethnic Wear', 'Shopify Store + Cataloging', 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop', '+350% Sales Growth, 12000+ Orders Processed, Active on Shopify & Amazon', 'We rebuilt their online catalog from low-quality phone images to stunning, high-definition model shoots paired with professional copy. Built a sleek Shopify store and opened their Amazon store, generating record-breaking monthly traffic.'),
('Launching Local Organic Spice Estate to Nationwide Bestseller List', 'Nisarga Spices', 'Organic Foods', 'Amazon + Flipkart + Meesho Hub', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop', 'Amazon Choice Badge, ₹15 Lakh Trial Revenue, 50000+ Visitors Monthly', 'Assisted an agricultural co-op with food license compliance certificates, brand register filings, and Amazon Smart listing keywords. Scaled low-bid advertising keyword pools, making their authentic masalas category leaders inside four months.'),
('From Traditional Ludhiana Footwear Factory to Automated Brand Store', 'StepOn Shoes', 'Footwear & Fashion', 'WooCommerce + Multi-Marketplace Seller Hub', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop', '0% Monthly Commission, Automated Shipping Pipeline, ₹5L Monthly Ad Return', 'Installed a custom WooCommerce platform integrated with Indian shipping matrices (Shiprocket) to automate label generation, courier pickup, and WhatsApp status reminders. Integrated with Meesho Supplier panel to offload deadstock stocks.');


-- 7. Table structure for table `blog_posts`
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `excerpt` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `read_time` VARCHAR(30) DEFAULT '5 mins read',
  `image` VARCHAR(255) NULL,
  `date` DATE NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Mohammed Sameer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `category`, `read_time`, `image`, `date`, `author`) VALUES
('How to Sell on Amazon India: The Ultimate Step-by-Step Guide for Beginners', 'how-to-sell-on-amazon', 'Thinking of launching your retail business on Amazon India? This mega tutorial lays out absolute prerequisites from GSTIN codes, banking sheets, listing guidelines to winning buy-box secrets.', 'Detailed guidelines about setting up GSTIN, verifying IFSC savings or current accounts and choosing easy ship or Amazon FBA fulfillment matrices.', 'Marketplaces', '6 mins read', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop', '2026-05-18', 'Mohammed Sameer'),
('Shopify vs WooCommerce in India: Best Platform for Your Independent Store', 'shopify-vs-woocommerce-india', 'Want your own web store to avoid high marketplace commissions? We compare Shopify India with WooCommerce on monthly costs, performance, payment settings, and ease of use.', 'Detailed comparison between Shopify starting licenses against open resource WordPress systems.', 'Web Stores', '5 mins read', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop', '2026-05-24', 'Adnan Ahmed'),
('The Meesho Growth Secret: How of 0% Commission Transforms Wholesalers', 'meesho-growth-secret-suppliers', 'Meesho has singlehandedly revolutionized social retail in India. Discover how local textile, jewellery and footwear shops can leverage Meesho zero platform fees for high-volume sales.', 'Explaining the 0% commission advantage which empowers local weavers and apparel manufacturers.', 'Meesho Tips', '4 mins read', 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop', '2026-06-01', 'Mohammed Sameer');


-- 8. Table structure for table `settings`
CREATE TABLE IF NOT EXISTS `settings` (
  `key_name` VARCHAR(100) PRIMARY KEY,
  `value_data` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settings` (`key_name`, `value_data`) VALUES
('whatsapp_num', '+91 63618 75394'),
('company_email', 'contact@local2online.com'),
('company_address', 'HSR Layout, Sector 6, Bangalore, Karnataka - 560102');

SET FOREIGN_KEY_CHECKS = 1;
