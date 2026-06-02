<?php
/**
 * Local2Online - Lead Generation Form & DB Sync
 * Secure PDO insertion, designed for InfinityFree compatibility
 */

require_once 'db_config.php';

$success_message = "";
$error_message = "";

// Dynamic form values prefilled via query parameters
$query_service = isset($_GET['service']) ? trim($_GET['service']) : '';
$query_type = isset($_GET['type']) ? trim($_GET['type']) : 'contact';
$query_package = isset($_GET['package']) ? trim($_GET['package']) : '';

if ($query_package) {
    $query_service = "E-Commerce Launch Plans: " . $query_package;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $business_name = isset($_POST['business_name']) ? trim($_POST['business_name']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $whatsapp = isset($_POST['whatsapp']) ? trim($_POST['whatsapp']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $service_needed = isset($_POST['service_needed']) ? trim($_POST['service_needed']) : '';
    $notes = isset($_POST['notes']) ? trim($_POST['notes']) : '';
    $type = isset($_POST['type']) ? trim($_POST['type']) : 'contact';

    // Validation checks
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
                    // Clear inputs after successful submission
                    $query_service = '';
                    $query_type = 'contact';
                } else {
                    $error_message = "Server error processing listing storage parameters.";
                }
            } catch (Exception $e) {
                // In case database connection is disconnected locally or on temporary host nodes
                $error_message = "Database Sync Offline: We received your details conceptually! (Verify database credentials in db_config.php to enable direct lead index tables logging). Detail log: " . $e->getMessage();
            }
        } else {
            $error_message = "Server configuration offline: database variable is uninitialized. Ensure db_config.php contains proper credentials for InfinityFree MySQL hosts.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book E-commerce Strategy Consulting & Audits - Local2Online</title>
    <meta name="description" content="Take your retail showroom online. Secure a free listing optimization audit, schedule call-back meetings or consultation. HSR Layout, Bangalore.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
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
            .contact-layout {
                grid-template-cols: 1fr;
                gap: 48px;
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
                <a href="blog.php">Blogs</a>
                <a href="contact.php" class="btn btn-secondary">Get Free Audit</a>
                <a href="contact.php" class="btn btn-primary">Free Consultation</a>
            </nav>
        </div>
    </header>

    <section class="hero" style="padding: 60px 0;">
        <div class="container text-center">
            <span class="badge" style="margin: 0 auto 16px auto;">INBOUND INQUIRY</span>
            <h1 style="font-size: 36px; margin-bottom: 12px;">Launch Your Online Transformation</h1>
            <p style="margin: 0 auto; max-width: 600px;">Connect with an in-house expert today. No bots or generic call centers — real strategic handholding session starts here.</p>
        </div>
    </section>

    <!-- CONTENT FORM & CONTACT INFO SECTION -->
    <section style="padding: 80px 0; background-color: white;">
        <div class="container">
            <div class="contact-layout">
                
                <!-- Information Panel -->
                <div class="info-pane">
                    <span class="section-label" style="background-color: rgba(255,200,61,0.2);">TALK DIRECTLY</span>
                    <h2 style="font-size: 24px; color: var(--primary); margin-bottom: 16px;">Corporate Head Office</h2>
                    
                    <p style="font-size: 14px; color: var(--text); line-height: 1.6; margin-bottom: 24px;">
                        Local2Online is located in Bangalore electronic corridor HSR Layout. We support visiting business owners for offline consultations.
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 20px; font-size: 14px; color: var(--text);">
                        <div>
                            <strong style="display: block; color: var(--primary); font-size: 12px; text-transform: uppercase;">📍 Office Location Address:</strong>
                            <span>Sector 6, HSR Layout, Bangalore, Karnataka - 560102</span>
                        </div>
                        <div>
                            <strong style="display: block; color: var(--primary); font-size: 12px; text-transform: uppercase;">📞 Support Contact:</strong>
                            <span>+91 63618 75394 (Head of Growth, Sameer)</span>
                        </div>
                        <div>
                            <strong style="display: block; color: var(--primary); font-size: 12px; text-transform: uppercase;">✉ Email Enquiries:</strong>
                            <span>contact@local2online.com</span>
                        </div>
                    </div>

                    <div style="background-color: white; border-left: 4px solid var(--accent); padding: 16px 20px; border-radius: 8px; margin-top: 32px; font-size: 13px; font-style: italic;">
                        "Taking over 100+ Indian showrooms online since 2024. Your stock catalogs are in trusted hands."
                    </div>
                </div>

                <!-- Contact Form Card -->
                <div class="form-card">
                    <h3 style="font-size: 20px; color: var(--primary); margin-bottom: 8px;">Submit Actionable Blueprint Form</h3>
                    <p style="font-size: 13px; color: var(--text-light); margin-bottom: 24px;">Fill these details: we review competitor volumes and return a tactical action blueprint.</p>
                    
                    <?php if (!empty($success_message)): ?>
                        <div class="alert alert-success"><?php echo $success_message; ?></div>
                    <?php endif; ?>

                    <?php if (!empty($error_message)): ?>
                        <div class="alert alert-error"><?php echo $error_message; ?></div>
                    <?php endif; ?>

                    <form action="contact.php" method="POST" style="display: flex; flex-direction: column;">
                        
                        <div class="form-group">
                            <label for="type">Select Blueprint Engagement Plan</label>
                            <select name="type" id="type" class="form-control">
                                <option value="contact" <?php echo $query_type === 'contact' ? 'selected' : ''; ?>>General Store Inquiry Consultation</option>
                                <option value="audit" <?php echo $query_type === 'audit' ? 'selected' : ''; ?>>Comprehensive Search Listing Audit (100% Free)</option>
                                <option value="consultation" <?php echo $query_type === 'consultation' ? 'selected' : ''; ?>>Direct Video Consultation Slot Schedule</option>
                                <option value="callback" <?php echo $query_type === 'callback' ? 'selected' : ''; ?>>Quick Phone Callback within 30 Minutes</option>
                            </select>
                        </div>

                        <div class="grid" style="display: grid; grid-template-cols: 1fr 1fr; gap: 16px;">
                            <div class="form-group">
                                <label for="name">Your Name (Mandatory) *</label>
                                <input type="text" name="name" id="name" class="form-control" placeholder="Rajesh Kumar" required>
                            </div>
                            <div class="form-group">
                                <label for="business_name">Business or Shop Name</label>
                                <input type="text" name="business_name" id="business_name" class="form-control" placeholder="Kumar Apparels">
                            </div>
                        </div>

                        <div class="grid" style="display: grid; grid-template-cols: 1fr 1fr; gap: 16px;">
                            <div class="form-group">
                                <label for="phone">Phone Number (Mandatory) *</label>
                                <input type="tel" name="phone" id="phone" class="form-control" placeholder="+91 98765 43210" required>
                            </div>
                            <div class="form-group">
                                <label for="whatsapp">WhatsApp Number</label>
                                <input type="tel" name="whatsapp" id="whatsapp" class="form-control" placeholder="Same as phone number">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">E-mail Address</label>
                            <input type="email" name="email" id="email" class="form-control" placeholder="rajesh@kumarapparels.com">
                        </div>

                        <div class="form-group">
                            <label for="service_needed">Target Marketplace / E-commerce Channels</label>
                            <input type="text" name="service_needed" id="service_needed" class="form-control" placeholder="e.g. Amazon, Meesho, Shopify Setup" value="<?php echo htmlspecialchars($query_service); ?>">
                        </div>

                        <div class="form-group">
                            <label for="notes">Additional Inventory details or queries</label>
                            <textarea name="notes" id="notes" class="form-control" rows="4" placeholder="Tell us briefly about what products you currently stock (garments, spices, tools) and if you already hold active GST numbers."></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary btn-large w-full text-center" style="margin-top: 12px; display: block;">
                            Get My Free Growth Strategy Map →
                        </button>

                    </form>
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

</body>
</html>
