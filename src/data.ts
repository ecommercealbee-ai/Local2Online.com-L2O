import { Service, Testimonial, PricingTier, Project, BlogPost } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'amazon',
    title: 'Amazon Seller Setup & Launch',
    icon: 'ShoppingBag',
    shortDesc: 'Start selling to 100M+ active Amazon buyers with complete store setup, GTIN exemption, brand registry, and search optimization.',
    longDesc: 'Complete end-to-end setup to list your products, secure brand registry protection, configure payment gateways, optimize catalogs, and launch keyword-targeted ad campaigns on Amazon India.',
    features: [
      'Seller Account Creation & Verification',
      'GTIN / UPC Exemption & Brand Registry Support',
      'FBA (Fulfillment by Amazon) Onboarding',
      'First 50 Product Listings with Keyword Rich SEO',
      'A+ Content (EBC) Designing assistance'
    ],
    platforms: ['Amazon Seller Central']
  },
  {
    id: 'flipkart',
    title: 'Flipkart Seller Launchpad',
    icon: 'Layers',
    shortDesc: 'Launch your store on Flipkart, India’s largest homegrown marketplace, with high visibility and order management setup.',
    longDesc: 'Unlock millions of buyers across Tier 2 and Tier 3 cities in India. We handle seller registration, category brand approvals, optimized catalog creation, and initial advertising campaigns.',
    features: [
      'GST & Bank Account Verification support',
      'Flipkart Smart / Assured Status Guidance',
      'Category Approval & Trademark Setup',
      'Product Listing & High-Quality SEO Descriptions',
      'Operational training for dispatch operations'
    ],
    platforms: ['Flipkart Seller Hub']
  },
  {
    id: 'meesho',
    title: 'Meesho Low-Commission Sales Setup',
    icon: 'TrendingUp',
    shortDesc: 'Sell on India’s fastest-growing social commerce platform with 0% commission, and reach tier-2/3 shopping capitals.',
    longDesc: 'Meesho has zero commission and high traffic for clothing, household item, jewellery, and footwear sellers. Learn smart pricing strategies, catalog uploads, and advertising tricks.',
    features: [
      'Account Setup & GST configuration',
      'Zero-Commission Catalog Optimization',
      'Meesho Seller Ads Setup & Budget Strategy',
      'Single/Bulk Catalog uploads with search labels',
      'Shipment workflow training'
    ],
    platforms: ['Meesho Supplier Panel']
  },
  {
    id: 'shopify',
    title: 'Shopify Premium Store Development',
    icon: 'Globe',
    shortDesc: 'Build your own fully branded direct-to-consumer (D2C) web store with high-converting layouts, integrated payment gateways, and WhatsApp workflows.',
    longDesc: 'Establish your brand identity on Shopify. We configure automated Indian shipping options, custom fast checkout pages, payment gateways (Razorpay/Cashfree), and standard conversion integrations.',
    features: [
      'Premium responsive Shopify Theme setup',
      'Payment Gateway Integration (Razorpay, UPI)',
      'Automated COD Order Verification flows',
      'WhatsApp Order Status & Cart Abandonment Recovery',
      'SEO-Optimized speed templates for mobile conversion'
    ],
    platforms: ['Shopify']
  },
  {
    id: 'woocommerce',
    title: 'WooCommerce & WordPress Storefronts',
    icon: 'Code',
    shortDesc: 'Get a robust, self-hosted, commission-free WordPress shop with absolute design freedom and zero monthly platform subscriptions.',
    longDesc: 'For businesses who want total control without high running cost. Perfect for wholesalers, manufacturers, and custom brands needing bespoke catalog and checkout solutions.',
    features: [
      'Secure hosting & BigRock domain integration',
      'Custom theme creation matches brand style',
      'Unlimited products, variations, & configurations',
      'Free lifetime CMS access without commissions',
      'Fast, secure checkout & Indian GST billing support'
    ],
    platforms: ['WordPress', 'WooCommerce']
  },
  {
    id: 'management',
    title: 'Full Marketplace Account Management',
    icon: 'ShieldCheck',
    shortDesc: 'End-to-end management from price analysis, competitor tracking, coupon configurations, customer support to ad spent optimization.',
    longDesc: 'Outsource your entire e-commerce workload. We act as your growth team—managing daily orders, adjusting ad spends, processing brand files, resolving disputes, and providing transparent reports.',
    features: [
      'Daily Order Monitoring & Dispatch management support',
      'Amazon/Flipkart PPC Ad Management & ROI scaling',
      'Inventory health checks, restocking recommendation',
      'Customer Feedback & Review acquisition flows',
      'Comprehensive Monthly sales and profit reports'
    ],
    platforms: ['All Marketplaces']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    businessName: 'Kumar Apparels',
    location: 'Bangalore, Karnataka',
    rating: 5,
    review: 'Our wholesale garment business was struggling during offline slumps. Local2Online registered our GST, launched our brand on Meesho & Amazon, and now we process 150+ daily orders! Best decision we ever made.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    tag: 'Fashion Manufacturer'
  },
  {
    id: 't2',
    name: 'Anjali Sharma',
    businessName: 'Vedic Herbs & Beauty',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    review: 'We wanted a premium look for our skincare brand. The team built a premium Shopify store and optimized our listings on Amazon and Flipkart. Our direct website sales grew by 4x. Highly professional team!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    tag: 'D2C Skincare Brand'
  },
  {
    id: 't3',
    name: 'Vikram Singh',
    businessName: 'Singh Hardware & Tools',
    location: 'Ludhiana, Punjab',
    rating: 5,
    review: 'As an old manufacturer, selling online was foreign to us. Local2Online held our hand through catalog updates, product listing SEO, and inventory management. We are now official OEM suppliers on major portals.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    tag: 'Hardware Manufacturer'
  }
];

export const INITIAL_PRICING: PricingTier[] = [
  {
    id: 'p1',
    name: 'Starter Launch',
    subtitle: 'Great for small local shops launching their first online sales channel',
    price: '₹9,999',
    period: 'one-time setup',
    description: 'Establish a solid foundation with professional accounts on one major marketplace or catalog setup.',
    features: [
      'GST Onboarding Support',
      'Any 1 Marketplace (Amazon / Meesho / Flipkart)',
      'Account Setup & Brand Verification',
      'Up to 30 Product Listings with Basic SEO',
      'Standard Store Banner Design',
      'Order dispatch training (2 Hours)',
      '1 Month of basic email assistance'
    ],
    isPopular: false,
    ctaText: 'Get Started Today'
  },
  {
    id: 'p2',
    name: 'Growth Pack',
    subtitle: 'Our target choice for growing brands, wholesalers & small manufacturers',
    price: '₹19,999',
    period: 'one-time setup',
    description: 'Multiply your sales by launching across all three major platforms simultaneously with advanced SEO design.',
    features: [
      'GST Support & Brand Registry assistance',
      '3 Marketplaces (Amazon + Flipkart + Meesho)',
      'Up to 80 Product Listings & Catalog creation',
      'Advanced Keyword SEO Optimization',
      'A+ Grid Banner & Professional Brand Logo',
      'Smart Ad Campaign launch & bidding strategy',
      '30 Days of Handholding & Performance Sync'
    ],
    isPopular: true,
    ctaText: 'Choose Growth Pack'
  },
  {
    id: 'p3',
    name: 'Omnichannel Pro',
    subtitle: 'The complete enterprise brand setup + dedicated DTC web store',
    price: '₹34,999',
    period: 'one-time setup',
    description: 'Dominate the web both on public marketplaces and your own elegant, commission-free e-commerce storefront.',
    features: [
      'Everything in the Growth Pack',
      'Custom Shopify or WordPress WooCommerce development',
      'Payment Gateway Integration (Razorpay/UPI)',
      'WhatsApp billing & cart recovery templates',
      'Full catalog import across website & marketplaces',
      'Pricing strategy, competitive mapping',
      '2 Months of dedicated Account Management support'
    ],
    isPopular: false,
    ctaText: 'Build My Brand'
  }
];

export const INITIAL_PORTFOLIO: Project[] = [
  {
    id: 'proj1',
    title: 'Transforming a Heritage Silk Boutique Into a High-Converting Brand',
    client: 'Royal Silks',
    industry: 'Ethnic Wear',
    platform: 'Shopify Store + Cataloging',
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
    metrics: ['+350% Sales Growth', '12,000+ Orders Processed', 'Active on Shopify & Amazon'],
    description: 'We rebuilt their online catalog from low-quality phone images to stunning, high-definition model shoots paired with professional copy. Built a sleek Shopify store and opened their Amazon store, generating record-breaking monthly traffic.'
  },
  {
    id: 'proj2',
    title: 'Launching Local Organic Spice Estate to Nationwide Bestseller List',
    client: 'Nisarga Spices',
    industry: 'Organic Foods',
    platform: 'Amazon + Flipkart + Meesho Hub',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop',
    metrics: ['Amazon Choice Badge', '₹15 Lakh Trial Revenue', '50,000+ Visitors Monthly'],
    description: 'Assisted an agricultural co-op with food license compliance certificates, brand register filings, and Amazon Smart listing keywords. Scaled low-bid advertising keyword pools, making their authentic masalas category leaders inside four months.'
  },
  {
    id: 'proj3',
    title: 'From Traditional Ludhiana Footwear Factory to Automated Brand Store',
    client: 'StepOn Shoes',
    industry: 'Footwear & Fashion',
    platform: 'WooCommerce + Multi-Marketplace Seller Hub',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    metrics: ['0% Monthly Commission', 'Automated Shipping Pipeline', '₹5L Monthly Ad Return'],
    description: 'Installed a custom WooCommerce platform integrated with Indian shipping matrices (Shiprocket) to automate label generation, courier pickup, and WhatsApp status reminders. Integrated with Meesho Supplier panel to offload deadstock stocks.'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Sell on Amazon India: The Ultimate Step-by-Step Guide for Beginners',
    slug: 'how-to-sell-on-amazon',
    excerpt: 'Thinking of launching your retail business on Amazon India? This mega tutorial lays out absolute prerequisites from GSTIN codes, banking sheets, listing guidelines to winning buy-box secrets.',
    content: 'Selling on Amazon India is one of the most effective ways to transition from local retail to national impact. Hundreds of thousands of Indian suppliers grow their livelihood daily on Amazon. In this exhaustive handbook, we outline simple checklist blocks required to kickstart your journey.\n\n### 1. The Onboarding Documents\nBefore registering, ensure you have the following active items:\n- **GST Registration Number (GSTIN)**: Non-negotiable for online selling in commercial physical assets (exempted categories exist for physical books only).\n- **Active Savings or Current Bank Account**: Registered under the business legal name with active IFSC capabilities.\n- **Unused PAN Card**: Associated with the owner or company entity.\n- **Mobile phone number & Active email id**.\n\n### 2. Registering Your Account\nGo to services.amazon.in, register as a merchant seller and perform standard bank detail uploads. You will configure tax rates and select your fulfillment mechanism:\n- **Amazon Easy Ship**: Amazon logistics collects packages from your physical shop or warehouse and drops them directly at customer doorsteps.\n- **Fulfillment by Amazon (FBA)**: Send bulk inventory to Amazon massive robotic hubs and they take complete charge of speed wrapping, 2-day prime deliveries, client calls and returns.',
    category: 'Marketplaces',
    readTime: '6 mins read',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    date: '2026-05-18',
    author: 'Mohammed Sameer'
  },
  {
    id: 'b2',
    title: 'Shopify vs WooCommerce in India: Best Platform for Your Independent Store',
    slug: 'shopify-vs-woocommerce-india',
    excerpt: 'Want your own web store to avoid high marketplace commissions? We compare Shopify India with WooCommerce on monthly costs, performance, payment settings, and ease of use.',
    content: 'Building an independent brand allows you to sell direct-to-consumer (D2C) without paying high 10-30% referral commissions to Amazon, Flipkart, or Meesho. You are in total control of client details, email marketing, and product placement, building physical company equity over time.\n\nThere are two giants dominating digital retail building blocks today: Shopify and WordPress WooCommerce. Which is optimal for an Indian retail brand?\n\n### 1. Shopify: The Zero-Maintenance SaaS Option\nShopify is incredible if you want a system that works out of the box with zero system management, server updates, code leaks or hosting problems.\n- **Pros**: Fast speed metrics out-of-the-box, native mobile responsiveness, built-in fraud control, extreme uptime, and premium plug-and-play third-party apps.\n- **Cons**: High starting license fees (~$25+/month) plus transactional charges, and dependencies on recurring paid modules.\n\n### 2. WooCommerce: The Commission-Free Powerhouse\nWooCommerce is a free plugin built on top of WordPress. It powers millions of stores worldwide with complete licensing freedom.\n- **Pros**: Absolutely free license, unlimited custom database flexibility, cheap Indian server hosting, total ownership of site files.\n- **Cons**: Requires active site maintenance, software version supervision, and custom optimizations for speed security.',
    category: 'Web Stores',
    readTime: '5 mins read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    date: '2026-05-24',
    author: 'Adnan Ahmed'
  },
  {
    id: 'b3',
    title: 'The Meesho Growth Secret: How of 0% Commission Transforms Wholesalers',
    slug: 'meesho-growth-secret-suppliers',
    excerpt: 'Meesho has singlehandedly revolutionized social retail in India. Discover how local textile, jewellery and footwear shops can leverage Meesho zero platform fees for high-volume sales.',
    content: 'Meesho has emerged as a titan of Indian social and rural e-commerce, directly challenging Flipkart or Amazon by keeping its commissions at absolute 0%. This has unlocked doors for humble manufacturers, traditional weavers, and household brands across remote towns.\n\n### Why Meesho is 100% Unique\n- **Zero Commission**: Meesho charges absolute 0% commission from registered suppliers. If you list a product for ₹200, you receive the full ₹200 (minus tax adjustments and returns of course!).\n- **No Penalties**: Meesho has dropped arbitrary penalty fees for listing cancellations, making the onboarding friendly for offline operators who might check inventory logs slowly.\n- **Massive Organic Spreads**: Since Meesho relies heavily on a community reseller network, your products are shared over lakhs of WhatsApp groups and Instagram feeds daily, giving you traffic without spend.',
    category: 'Meesho Tips',
    readTime: '4 mins read',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop',
    date: '2026-06-01',
    author: 'Mohammed Sameer'
  }
];

export const GENERAL_FAQS = [
  {
    q: 'Do I need a GST number to sell online in India?',
    a: 'Yes, having an active GSTIN (GST identification key) is mandatory to sell physical goods on Amazon, Flipkart, Meesho, or Shopify within India. (Exceptions exist for print books and certain educational goods). If you do not have one, don’t worry! Local2Online provides complete GST advisory support to help you get registered quickly.'
  },
  {
    q: 'What are your setup costs? Are there monthly charges?',
    a: 'We have flat, transparent, one-time setup packages starting from ₹9,999 (Starter pack) to launch on your favorite marketplace. We do not take cuts of your sales during initial launches. If you opt for our optional premium Monthly Account Management services, we charge a flat manageable retainer to act as your digital team.'
  },
  {
    q: 'How long does it take for my store to go live?',
    a: 'On average, marketplace setup (like Amazon or Meesho) takes about 7 to 14 working days, subject to GST validation and category approval. A custom premium Shopify website typically goes live within 15 to 20 days including design approvals, payment configurations, and catalog tuning.'
  },
  {
    q: 'Who processes the shipping and customer orders?',
    a: 'On marketplaces like Amazon, Flipkart, and Meesho, they have pre-contracted couriers who collect products from your physical shop or warehouse. On your independent web store (Shopify/WooCommerce), we set you up with premium shipping aggregators (like Shiprocket or Delhivery) to fully automate package pick-ups, COD authentications, and transit updates.'
  },
  {
    q: 'Will you create product photos and content?',
    a: 'We write SEO-optimized titles, product descriptions, meta texts, and bullet points. For photos, we can help you optimize your existing supplier product images, or recommend affordable local boutique photography partners if high-quality images are needed.'
  }
];
