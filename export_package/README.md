# Local2Online - InfinityFree Deployment & Custom Domain Guide

This package contains the complete, lightweight, and high-performance PHP + MySQL codebase for **Local2Online** designed specifically for your custom domain **`local2online.com`** hosted on **InfinityFree**.

---

## 🚀 Step 1: Fix the InfinityFree 404 Error (The Directory Trap)

On InfinityFree, custom domains have their own sandboxed folders. If you upload your files to the wrong folder, you will see a `404 Not Found` error.

1. Connect to your InfinityFree account via FTP (using FileZilla) or use the **Online File Manager** in your Control Panel.
2. Look at your root directory structure. You will see:
   - `/htdocs/` (This belongs to your default `.infinityfreeapp.com` subdomain. **Do NOT upload files here**)
   - `/local2online.com/` (Our custom domain folder)
3. Open the **`/local2online.com/`** folder.
4. Inside it, you will find an **`htdocs`** folder (`/local2online.com/htdocs/`).
5. **UPLOAD ALL CODE FILES HERE** (Everything from your downloaded ZIP's folder, maintaining file paths like `style.css`, `index.php`, etc.).

---

## 🗄️ Step 2: Set Up Your MySQL Database

Your website operates with seamless database support for capturing client inquiries, dynamically editing site parameters, and uploading blog guides.

1. Log into your **InfinityFree Client Area** and click **Manage** on your account.
2. Navigate to **MySQL Databases** under the Database section.
3. Create a new database named **`local2online`** (or let it append your username default, e.g., `if0_xxxxxxx_local2online`).
4. Click **Admin** next to the database to open **phpMyAdmin**.
5. Select your database, click the **Import** tab at the top menu.
6. Choose the **`schema.sql`** file provided in this export package and click **Go** at the bottom to build the tables and pre-populate default services and testimonials.

---

## 🔧 Step 3: Link Database Configurations

Open **`db_config.php`** using any text editor or the online file manager and enter your authentic database credentials provided by InfinityFree:

```php
define('DB_HOST', 'sqlxxx.infinityfree.com'); // Your MySQL Hostname from InfinityFree panel
define('DB_USER', 'if0_xxxxxxx');            // Your Database Username
define('DB_PASS', 'xxxxxxxxxxxxx');          // Your Database password
define('DB_NAME', 'if0_xxxxxxx_local2online'); // Your complete Database Name
```

---

## 🔒 Step 4: Access Your Admin Panel

To look at inbound lead dashboards, update services, or write new e-commerce tutorial logs, simply visit:
**`https://local2online.com/admin.php`**

- **Username**: `admin`
- **Password**: `local2online2026`

You can change these credentials or delete test leads directly in the admin dashboard!

---

## ⚡ Step 5: Premium Single-Page Performance (Built-in)

We have consolidated the entire client-facing front-end into a single, ultra-high-performance dynamic page (`index.php`) utilizing client-side hash routing. Navigation is instantaneous, completely reload-free, and URLs look clean (such as `local2online.com/#services` or `local2online.com/#pricing`) out of the box. Setup is now incredibly easy since you have fewer files to manage!
