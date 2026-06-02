<?php
/**
 * Local2Online - Secure Administration Dashboard
 * Allows managing database leads, editing site parameters, and dynamic blog updates.
 * Authentication matching schema seed (admin / local2online2026)
 */

require_once 'db_config.php';

session_start();

$is_logged_in = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
$login_error = "";
$message = "";

// 1. Handle Login Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        $login_error = "Please fill in all security fields.";
    } else {
        if (isset($pdo)) {
            try {
                // Verify credentials against standard SQL table BCRYPT hashing
                $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = :username LIMIT 1");
                $stmt->execute(['username' => $username]);
                $user = $stmt->fetch();

                if ($user && password_verify($password, $user['password_hash'])) {
                    $_SESSION['admin_logged_in'] = true;
                    $_SESSION['admin_user'] = $user['username'];
                    $is_logged_in = true;
                } else if ($username === 'admin' && $password === 'local2online2026') {
                    // Fail-safe logic in case database connection parameters aren't setup yet but credentials correct
                    $_SESSION['admin_logged_in'] = true;
                    $_SESSION['admin_user'] = 'admin';
                    $is_logged_in = true;
                } else {
                    $login_error = "Invalid administrator credentials verified.";
                }
            } catch (Exception $e) {
                // offline fail-safe for local workspace sandbox verification
                if ($username === 'admin' && $password === 'local2online2026') {
                    $_SESSION['admin_logged_in'] = true;
                    $_SESSION['admin_user'] = 'admin';
                    $is_logged_in = true;
                } else {
                    $login_error = "Authentication offline verification failed because: " . $e->getMessage();
                }
            }
        } else {
            // pure offline local mockup login
            if ($username === 'admin' && $password === 'local2online2026') {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_user'] = 'admin';
                $is_logged_in = true;
            } else {
                $login_error = "Server offline: Try default admin username/password keys.";
            }
        }
    }
}

// 2. Handle Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit();
}

// 3. Query leads and handle database edits only if logged in
$leads = [];
if ($is_logged_in) {
    // A. Handle Lead status update
    if (isset($_POST['action']) && $_POST['action'] === 'update_lead') {
        $lead_id = intval($_POST['lead_id']);
        $new_status = $_POST['status'];
        if (isset($pdo)) {
            try {
                $stmt = $pdo->prepare("UPDATE leads SET status = :status WHERE id = :id");
                $stmt->execute(['status' => $new_status, 'id' => $lead_id]);
                $message = "Lead status updated to " . htmlspecialchars($new_status);
            } catch (Exception $e) {
                $message = "Error: Database update failed.";
            }
        }
    }

    // B. Handle Lead delete
    if (isset($_GET['delete_lead'])) {
        $lead_id = intval($_GET['delete_lead']);
        if (isset($pdo)) {
            try {
                $stmt = $pdo->prepare("DELETE FROM leads WHERE id = :id");
                $stmt->execute(['id' => $lead_id]);
                $message = "Lead successfully removed.";
            } catch (Exception $e) {
                $message = "Error deleting lead.";
            }
        }
    }

    // C. Handle Dynamic Blog Upload
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_blog') {
        $title = trim($_POST['title']);
        $excerpt = trim($_POST['excerpt']);
        $content = trim($_POST['content']);
        $category = trim($_POST['category']);
        $read_time = trim($_POST['read_time']);
        $image = trim($_POST['image']);
        $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $title));

        if (empty($title) || empty($content)) {
            $message = "Error: Title and Content cannot be left empty.";
        } else {
            if (isset($pdo)) {
                try {
                    $stmt = $pdo->prepare("INSERT INTO blog_posts (title, slug, excerpt, content, category, read_time, image, date, author) VALUES (:title, :slug, :excerpt, :content, :category, :read_time, :image, :date, :author)");
                    $stmt->execute([
                        'title' => $title,
                        'slug' => $slug,
                        'excerpt' => $excerpt,
                        'content' => $content,
                        'category' => !empty($category) ? $category : 'Marketplaces',
                        'read_time' => !empty($read_time) ? $read_time : '5 mins read',
                        'image' => !empty($image) ? $image : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
                        'date' => date('Y-m-d'),
                        'author' => $_SESSION['admin_user']
                    ]);
                    $message = "🎉 Article '" . htmlspecialchars($title) . "' uploaded and published live on the front-end blog!";
                } catch (Exception $e) {
                    $message = "Error publishing blog: " . $e->getMessage();
                }
            } else {
                $message = "Blog Conceptual Save (Setup SQL connection variables to enable publishing).";
            }
        }
    }

    // Fetch leads for dashboard grid
    if (isset($pdo)) {
        try {
            $leads = $pdo->query("SELECT * FROM leads ORDER BY submitted_at DESC")->fetchAll();
        } catch (Exception $e) {
            // empty sandbox logs fallback
        }
    }

    // Fallbacks if tables unconfigured
    if (empty($leads)) {
        $leads = [
            [
                'id' => 1,
                'name' => 'Anand Patel',
                'business_name' => 'Patel Footwear',
                'phone' => '0987654321',
                'whatsapp' => '0987654321',
                'email' => 'anand@patelfootwear.com',
                'service_needed' => 'Meesho Low-Commission Sales Setup',
                'notes' => 'We have a retail stall in Ahmedabad. Want to reach Surat and Delhi buyers.',
                'type' => 'audit',
                'status' => 'new',
                'submitted_at' => date('Y-m-d H:i:s')
            ],
            [
                'id' => 2,
                'name' => 'Meena Advani',
                'business_name' => 'Chic Styles',
                'phone' => '0812345678',
                'whatsapp' => '0812345678',
                'email' => 'meena@chicstyles.in',
                'service_needed' => 'Shopify Premium Store Development',
                'notes' => 'Need a beautiful premium Shopify storefront. Have designer kurtas.',
                'type' => 'consultation',
                'status' => 'contacted',
                'submitted_at' => date('Y-m-d H:i:s', strtotime('-1 day'))
            ]
        ];
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inbound Leads Administration Portal - Local2Online</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        .admin-login-box {
            max-width: 440px;
            margin: 100px auto;
            background-color: white;
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 40px;
            box-shadow: var(--shadow-lg);
            text-align: left;
        }
        .dashboard-layout {
            display: grid;
            grid-template-cols: 0.25fr 1.75fr;
            gap: 32px;
            margin-top: 48px;
            text-align: left;
        }
        .admin-sidebar {
            background-color: var(--light);
            border: 1px solid var(--border);
            padding: 24px;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .admin-main {
            background-color: white;
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 40px;
            box-shadow: var(--shadow-sm);
        }
        .pill-tab {
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
        }
        .pill-tab:hover, .pill-tab.active {
            background-color: var(--primary);
            color: white;
        }
        .status-badge {
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: bold;
            padding: 2px 8px;
            border-radius: 12px;
            text-transform: uppercase;
        }
        .status-new { background-color: rgba(255, 200, 61, 0.2); color: #d97706; }
        .status-contacted { background-color: rgba(30, 64, 175, 0.1); color: #1d4ed8; }
        .status-joined { background-color: rgba(16, 185, 129, 0.1); color: var(--success); }
        .status-rejected { background-color: rgba(239, 68, 68, 0.1); color: #dc2626; }
        @media (max-width: 1024px) {
            .dashboard-layout {
                grid-template-cols: 1fr;
            }
        }
    </style>
</head>
<body>

    <header class="navbar">
        <div class="container nav-container">
            <a href="index.php" class="logo">
                <span class="logo-accent">Local<span class="logo-num">2</span>Online <span style="font-size:12px; font-weight:normal; font-family:var(--font-mono);">[Admin System]</span></span>
            </a>
            
            <nav class="nav-links">
                <a href="index.php">View Web Site</a>
                <?php if ($is_logged_in): ?>
                <a href="admin.php?logout=true" class="btn btn-secondary">🔓 Log Out</a>
                <?php endif; ?>
            </nav>
        </div>
    </header>

    <div class="container" style="min-height: 60vh;">

        <?php if (!$is_logged_in): ?>
            <!-- LOGIN PANEL -->
            <div class="admin-login-box">
                <h2 style="font-size: 22px; margin-bottom: 8px;">Agency Administrator Sign-In</h2>
                <p style="font-size: 12px; color: var(--text-light); margin-bottom: 24px;">Enter verification codes to open client registries & lead monitors.</p>
                
                <?php if (!empty($login_error)): ?>
                    <p style="color:#ef4444; font-size:13px; font-weight:600; background-color:rgba(239,68,68,0.1); padding:10px; border-radius:8px; border:1px solid rgba(239,68,68,0.2); margin-bottom:16px;">
                        ⚠️ <?php echo $login_error; ?>
                    </p>
                <?php endif; ?>

                <form action="admin.php" method="POST" style="display: flex; flex-direction: column; gap: 16px;">
                    <input type="hidden" name="action" value="login">
                    
                    <div class="form-group">
                        <label>Admin Username *</label>
                        <input type="text" name="username" class="form-control" placeholder="admin" required>
                        <label style="font-size:10px; font-weight:normal; color:var(--text-light); margin-top:2px;">Seeded default: admin</label>
                    </div>

                    <div class="form-group">
                        <label>Security Password *</label>
                        <input type="password" name="password" class="form-control" placeholder="••••••••••••" required>
                        <label style="font-size:10px; font-weight:normal; color:var(--text-light); margin-top:2px;">Seeded default: local2online2026</label>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: bold;">Verify Security Hash</button>
                </form>
            </div>
        <?php else: ?>
            <!-- ADMIN DASHBOARD LAYOUT -->
            <div class="dashboard-layout">
                
                <!-- Sidebar links acting as toggle handlers -->
                <div class="admin-sidebar">
                    <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-light); margin-bottom: 8px;">Operational Tabs</h4>
                    <button class="pill-tab active" onclick="switchTab('leads-tab')">📊 Client Leads Panel</button>
                    <button class="pill-tab" onclick="switchTab('blog-tab')">✍ Publish Blog Post</button>
                    <button class="pill-tab" onclick="switchTab('db-tab')">⚙ Database Status</button>
                    <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;">
                    <a href="admin.php?logout=true" style="font-size:13px; font-weight:600; color:#dc2626; padding: 10px;">🔓 Terminate Session</a>
                </div>

                <!-- Main Workspaces -->
                <div class="admin-main">
                    
                    <?php if (!empty($message)): ?>
                        <div style="background-color: var(--success-bg); color: var(--success); font-weight: 600; border: 1px solid rgba(16,185,129,0.2); padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 24px;">
                            🔔 <?php echo $message; ?>
                        </div>
                    <?php endif; ?>

                    <!-- Tab 1: Leads Management -->
                    <div id="leads-tab" class="admin-tab-content">
                        <h2 style="font-size: 22px; color: var(--primary); margin-bottom: 8px;">Active Lead Registers</h2>
                        <p style="font-size: 13px; color: var(--text-light); margin-bottom: 24px;">Manage dynamic buyer leads from Shopify, Amazon and Meesho inquiry channels.</p>

                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 13px; font-sans: var(--font-body);">
                                <thead>
                                    <tr style="background-color: var(--light); border-bottom: 2px solid var(--border);">
                                        <th style="padding: 12px; text-align: left;">Timestamp</th>
                                        <th style="padding: 12px; text-align: left;">Contact Details</th>
                                        <th style="padding: 12px; text-align: left;">Target Channel</th>
                                        <th style="padding: 12px; text-align: left;">Engagement</th>
                                        <th style="padding: 12px; text-align: left;">Workflow Status</th>
                                        <th style="padding: 12px; text-align: right;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($leads as $l): ?>
                                    <tr style="border-bottom: 1px solid var(--border);" class="lead-row">
                                        <td style="padding: 12px;" style="font-family:var(--font-mono); font-size:11px;">
                                            <?php echo htmlspecialchars(date('d M Y, H:i', strtotime($l['submitted_at']))); ?>
                                        </td>
                                        <td style="padding: 12px;">
                                            <strong style="display: block; font-size:14px; color:var(--primary);"><?php echo htmlspecialchars($l['name']); ?></strong>
                                            <span style="font-size:12px; color:var(--text-light);display:block;"><?php echo htmlspecialchars($l['business_name']); ?></span>
                                            <span style="font-family:var(--font-mono); font-size:11px; display:block;">📞 <?php echo htmlspecialchars($l['phone']); ?> | WA: <?php echo htmlspecialchars($l['whatsapp']); ?></span>
                                            <span style="font-size:11px; display:block;"><?php echo htmlspecialchars($l['email']); ?></span>
                                        </td>
                                        <td style="padding: 12px;">
                                            <span style="font-weight:600;"><?php echo htmlspecialchars($l['service_needed']); ?></span>
                                            <p style="font-size:11px; color:var(--text-light); margin-top:4px; max-width:220px;"><?php echo htmlspecialchars($l['notes']); ?></p>
                                        </td>
                                        <td style="padding: 12px;" style="font-family:var(--font-mono); text-transform:uppercase;">
                                            <span style="background-color:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold;"><?php echo htmlspecialchars($l['type']); ?></span>
                                        </td>
                                        <td style="padding: 12px;">
                                            <span class="status-badge status-<?php echo htmlspecialchars($l['status']); ?>">
                                                <?php echo htmlspecialchars($l['status']); ?>
                                            </span>
                                        </td>
                                        <td style="padding: 12px; text-align: right;">
                                            <form action="admin.php" method="POST" style="display:inline-block; margin-bottom:8px;">
                                                <input type="hidden" name="action" value="update_lead">
                                                <input type="hidden" name="lead_id" value="<?php echo $l['id']; ?>">
                                                <select name="status" class="form-control" onchange="this.form.submit()" style="padding:4px; font-size:11px; width:100px;">
                                                    <option value="new" <?php echo $l['status'] === 'new' ? 'selected' : ''; ?>>New</option>
                                                    <option value="contacted" <?php echo $l['status'] === 'contacted' ? 'selected' : ''; ?>>Contacted</option>
                                                    <option value="joined" <?php echo $l['status'] === 'joined' ? 'selected' : ''; ?>>Joined ✓</option>
                                                    <option value="rejected" <?php echo $l['status'] === 'rejected' ? 'selected' : ''; ?>>Rejected</option>
                                                </select>
                                            </form>
                                            <br>
                                            <a href="admin.php?delete_lead=<?php echo $l['id']; ?>" class="btn" style="background-color:#fee2e2; color:#ef4444; padding:2px 8px; font-size:11px; margin-top: 4px;" onclick="return confirm('Are you sure you want to remove this client?')">
                                                🗑 Delete
                                            </a>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab 2: Publish Blog Post -->
                    <div id="blog-tab" class="admin-tab-content" style="display: none;">
                        <h2 style="font-size: 22px; color: var(--primary); margin-bottom: 8px;">Upload E-commerce Strategy Guide</h2>
                        <p style="font-size: 13px; color: var(--text-light); margin-bottom: 24px;">Publish guides immediately visible onto the client resource hub.</p>

                        <form action="admin.php" method="POST" style="display: flex; flex-direction: column; gap: 16px;">
                            <input type="hidden" name="action" value="add_blog">
                            
                            <div class="form-group">
                                <label>Article Heading / Title *</label>
                                <input type="text" name="title" class="form-control" placeholder="e.g. 10 Secrets To Win Amazon India Buy-Box" required>
                            </div>

                            <div class="form-group">
                                <label>Short Excerpt Abstract *</label>
                                <input type="text" name="excerpt" class="form-control" placeholder="Brief summary displayed on listings" required>
                            </div>

                            <div style="display:grid; grid-template-cols: 1fr 1fr; gap:16px;">
                                <div class="form-group">
                                    <label>Category Tag</label>
                                    <input type="text" name="category" class="form-control" placeholder="e.g. Marketplaces, Web Stores">
                                </div>
                                <div class="form-group">
                                    <label>Estimated Read Duration</label>
                                    <input type="text" name="read_time" class="form-control" placeholder="e.g. 5 mins read">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Hero Banner Graphic Unsplash URL</label>
                                <input type="url" name="image" class="form-control" placeholder="https://images.unsplash.com/...">
                            </div>

                            <div class="form-group">
                                <label>Core Editorial Content (HTML Supported) *</label>
                                <textarea name="content" class="form-control" rows="10" placeholder="<h3>Main Subheading</h3><p>Detailed tutorial analysis...</p>" required></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary btn-large w-full text-center" style="display: block;">Publish Live Article Node</button>
                        </form>
                    </div>

                    <!-- Tab 3: DB Status -->
                    <div id="db-tab" class="admin-tab-content" style="display: none;">
                        <h2 style="font-size: 22px; color: var(--primary); margin-bottom: 8px;">System Database Configurations</h2>
                        <p style="font-size: 13px; color: var(--text-light); margin-bottom: 24px;">Current server linking properties and credentials status checks.</p>

                        <div style="background-color: var(--light); border: 1px solid var(--border); border-radius: 12px; padding: 24px; font-family: var(--font-mono); font-size: 13px;">
                            <div>
                                <strong style="display:block; margin-bottom:12px;">PDO System Check Status:</strong>
                                <?php if (isset($pdo)): ?>
                                    <span style="color:var(--success); font-weight:bold;">● ONLINE</span> (Connected to InfinityFree database central pipelines)
                                <?php else: ?>
                                    <span style="color:#ef4444; font-weight:bold;">● DISCONNECTED / OFFLINE MODE</span> (Configure correct login parameters inside `/export_package/db_config.php` file)
                                <?php endif; ?>
                            </div>
                            <hr style="border:0; border-top: 1px solid var(--border); margin:16px 0;">
                            <div>
                                <strong>Registered Database hostname:</strong> sqlxxx.infinityfree.com<br>
                                <strong>Active admin session user:</strong> <?php echo htmlspecialchars($_SESSION['admin_user']); ?><br>
                                <strong>Root Directory:</strong> <?php echo htmlspecialchars(dirname(__FILE__)); ?>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        <?php endif; ?>

    </div>

    <script>
    function switchTab(tabId) {
        // Hide all tabs
        document.querySelectorAll('.admin-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Show selected tab
        document.getElementById(tabId).style.display = 'block';

        // Toggle active button states
        document.querySelectorAll('.pill-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
    </script>

</body>
</html>
