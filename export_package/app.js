/**
 * Local2Online - Unified Core UX & Interactive SPA Engine
 * Implements smooth scroll animations, mobile nav drawers, instant hash routing,
 * reactive portfolio filter metrics, dynamic pricing calculator, and a premium Overlay CMS blog reader.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 1. LUCIDE ICONS CONFIGURATION ====================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==================== 2. MOBILE NAVIGATION DRAWERS ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
                menuToggle.style.color = 'var(--accent)';
            } else {
                menuToggle.innerHTML = '☰';
                menuToggle.style.color = '#ffffff';
            }
        });

        // Close menu drawer if clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(l => {
            l.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.style.color = '#ffffff';
            });
        });

        // Close menu drawer if clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.style.color = '#ffffff';
            }
        });
    }

    // ==================== 3. SINGLE-PAGE ARCHITECTURE (ROUTE SWITCHERS) ====================
    function handleViewSwitching() {
        const hash = window.location.hash || '#';
        let tabName = hash.substring(1).split('/')[0] || 'home';
        
        // Handle standard tabs
        const views = document.querySelectorAll('.app-view');
        let viewFound = false;
        
        views.forEach(view => {
            const viewId = view.id.replace('view_', '');
            if (viewId === tabName) {
                view.classList.add('active-view');
                viewFound = true;
            } else {
                view.classList.remove('active-view');
            }
        });

        // Fallback to home layout if hash is empty or untracked
        if (!viewFound) {
            const homeView = document.getElementById('view_home');
            if (homeView) homeView.classList.add('active-view');
            tabName = 'home';
        }

        // Highlight active navbar indicator link
        const navAnchorLinks = document.querySelectorAll('.nav-links a');
        navAnchorLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + tabName || (tabName === 'home' && (linkHref === '#' || linkHref === '#home'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Scroll gracefully back to top upon switching context
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    window.addEventListener('hashchange', handleViewSwitching);
    window.addEventListener('load', handleViewSwitching);
    // Boot immediate setup
    handleViewSwitching();

    // ==================== 4. REACTIVE CALCULATOR CODES (PRICING INDEX) ====================
    const platforms = document.querySelectorAll('.platform-choice');
    const basePriceSpan = document.getElementById('calc_base');
    const discountDiv = document.getElementById('div_discount');
    const discountSpan = document.getElementById('calc_discount');
    const gstSpan = document.getElementById('calc_gst');
    const finalSpan = document.getElementById('calc_final');
    const submitBtn = document.getElementById('btn_submit_calc');
    const receiptItemized = document.getElementById('receipt_itemized');
    const tipContainer = document.getElementById('calc_tip_container');

    function calculateInteractiveSetupEstimates() {
        if (!basePriceSpan) return; // Guard clause if navigation elsewhere

        let baseSum = 0;
        let countSelected = 0;
        const selectedNames = [];

        if (receiptItemized) {
            receiptItemized.innerHTML = '';
        }

        platforms.forEach(p => {
            const chk = p.querySelector('input[type="checkbox"]');
            if (chk && chk.checked) {
                const price = parseInt(p.dataset.price || 0);
                baseSum += price;
                countSelected++;
                p.classList.add('selected');
                
                const title = p.querySelector('h4').textContent;
                selectedNames.push(title);

                if (receiptItemized) {
                    const row = document.createElement('div');
                    row.style.display = 'flex';
                    row.style.justify = 'space-between';
                    row.style.fontSize = '12px';
                    row.style.color = '#334155';
                    row.style.lineHeight = '1.4';
                    row.innerHTML = `<span>${title}</span><span style="font-family: var(--font-mono); color: #0f172a; font-weight: 500;">₹${price.toLocaleString('en-IN')}</span>`;
                    receiptItemized.appendChild(row);
                }
            } else if (p) {
                p.classList.remove('selected');
            }
        });

        // Bundle discounts: 15% discount for 3 or more channels selected simultaneously
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

        if (tipContainer) {
            if (isEligible) {
                tipContainer.style.backgroundColor = '#ecfdf5';
                tipContainer.style.color = '#065f46';
                tipContainer.style.border = '1px solid #a7f3d0';
                tipContainer.innerHTML = '<strong>✓ Combo launch applied!</strong> You received a 15% setup discount because you chose 3 or more online channels to publish!';
            } else {
                tipContainer.style.backgroundColor = '#fffbeb';
                tipContainer.style.color = '#92400e';
                tipContainer.style.border = '1px solid #fde68a';
                tipContainer.innerHTML = '<strong>💡 Power Tip:</strong> Choose 3 or more channels (e.g., Amazon + Flipkart + Meesho) to instantly unlock a <strong>15% Combo setup discount</strong> automatically.';
            }
        }

        if (submitBtn) {
            submitBtn.dataset.list = selectedNames.join(', ');
        }
    }

    if (platforms.length > 0) {
        platforms.forEach(p => {
            p.addEventListener('click', function(e) {
                const chk = p.querySelector('input[type="checkbox"]');
                if (!chk) return;

                // Find out how many are currently checked
                let checkedCount = 0;
                platforms.forEach(p2 => {
                    const c = p2.querySelector('input[type="checkbox"]');
                    if (c && c.checked) checkedCount++;
                });

                if (e.target !== chk) {
                    if (chk.checked && checkedCount <= 1) {
                        // Prevent unchecking the last item
                        return;
                    }
                    chk.checked = !chk.checked;
                } else {
                    // Clicking checkbox directly. Stop check cancellation if it's the last active checkbox
                    if (!chk.checked && checkedCount === 0) {
                        chk.checked = true;
                    }
                }
                calculateInteractiveSetupEstimates();
            });
        });

        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                let itemsListText = submitBtn.dataset.list || '';
                prefillContactForm('consultation', 'Custom Cost Bundle: ' + itemsListText);
                window.location.hash = '#contact';
            });
        }

        // Standard Default state: preset Amazon FBA selected
        const amazonChk = document.getElementById('chk_amazon');
        const shopifyChk = document.getElementById('chk_shopify');
        const meeshoChk = document.getElementById('chk_meesho');
        if (amazonChk) {
            amazonChk.checked = true;
            if (shopifyChk) shopifyChk.checked = true;
            if (meeshoChk) meeshoChk.checked = true;
            calculateInteractiveSetupEstimates();
        }
    }

    // ==================== 5. CUSTOMER INQUIRY PREFILL CONFIGURATORS ====================
    window.prefillContactForm = function(formType, serviceTitle) {
        const typeField = document.getElementById('form_lead_type');
        const serviceSelector = document.getElementById('form_service_needed');
        
        if (typeField) {
            typeField.value = formType;
        }
        
        if (serviceSelector && serviceTitle) {
            let foundOption = false;
            for (let i = 0; i < serviceSelector.options.length; i++) {
                if (serviceSelector.options[i].value === serviceTitle) {
                    serviceSelector.selectedIndex = i;
                    foundOption = true;
                    break;
                }
            }
            if (!foundOption) {
                // If the dynamic list hasn't finished rendering, inject standard custom placeholder
                const newOpt = new Option(serviceTitle, serviceTitle, true, true);
                serviceSelector.add(newOpt);
            }
        }
    };

    // Auto-prefill routing check on loads if context has GET queries conceptually mapped to hashes
    const urlParams = new URLSearchParams(window.location.search);
    const getService = urlParams.get('service');
    const getType = urlParams.get('type') || 'contact';
    const getPackage = urlParams.get('package');

    if (getService || getPackage) {
        let textPrefill = getService;
        if (getPackage) textPrefill = "E-Commerce Launch Plans: " + getPackage;
        prefillContactForm(getType, textPrefill);
        window.location.hash = '#contact';
    }

    // ==================== 6. CASE STUDIES (PORTFOLIO FILTERBAR MATRIX) ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('#portfolio_grid_container .portfolio-card');

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active styling on keys
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                portfolioCards.forEach(card => {
                    const cardChannel = card.dataset.channel;
                    if (filterValue === 'all' || cardChannel === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==================== 7. CMS OVERLAY BLOG READER MODALS ====================
    window.openBlogPostModal = function(slug) {
        const modal = document.getElementById('blog_detail_modal');
        const modalBody = document.getElementById('blog_modal_body_content');
        
        if (!modal || !modalBody) return;

        // Retrieve index record from script dynamic JSON arrays
        const activeArticle = DYNAMIC_BLOGS_SEED.find(b => b.slug === slug);
        if (!activeArticle) return;

        // Parse formatted outputs in detail panel layouts
        const formattedDate = new Date(activeArticle.date).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        modalBody.innerHTML = `
            <span style="font-family: var(--font-mono); color: var(--primary-light); font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; display: block;">
                ${activeArticle.category} • ${activeArticle.read_time}
            </span>
            <h1 style="color: var(--primary); font-family: var(--font-heading); font-size: 28px; line-height: 1.3; margin-bottom: 16px;">
                ${activeArticle.title}
            </h1>
            
            <div style="display: flex; gap: 16px; align-items: center; font-size: 13px; color: var(--text-light); border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 24px;">
                <strong>By ${activeArticle.author}</strong>
                <span>•</span>
                <span>Published ${formattedDate}</span>
            </div>

            <img src="${activeArticle.image}" alt="${activeArticle.title}" style="width:100%; max-height: 350px; object-fit: cover; border-radius: 16px; margin-bottom: 32px; box-shadow: var(--shadow-sm);">

            <div class="article-main" style="line-height: 1.8; font-size: 15px; color: var(--text);">
                ${activeArticle.content}
            </div>

            <div style="border-top: 1px solid var(--border); padding-top: 32px; margin-top: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div>
                    <h4 style="font-size: 14px; margin: 0; color: var(--primary);">Want to build a similar high-revenue channel?</h4>
                    <p style="font-size: 12px; color: var(--text-light); margin: 0;">Get high-volume catalogs & organic SEO pipelines designed by Ahmed.</p>
                </div>
                <a href="#contact" onclick="closeBlogPostModal(); prefillContactForm('contact', 'Strategy Consultation related to: ${activeArticle.category}')" class="btn btn-primary">Book Consultation Advisory</a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    };

    window.closeBlogPostModal = function() {
        const modal = document.getElementById('blog_detail_modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable background scrolling
        }
    };

    // Close modal via Escape keyboard key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeBlogPostModal();
        }
    });

    // ==================== 8. INTERSECTION MOVING EFFECTS ====================
    const entranceElements = document.querySelectorAll(
        '.service-card, .benefit-card, .advantage-card, .pricing-card, .testimonial-card, .timeline-step, .why-online h2, .why-online p, .team-card'
    );
    
    entranceElements.forEach(el => {
        el.classList.add('scroll-hidden');
    });

    const scrollObserverOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const coreEntranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    entranceElements.forEach(el => {
        coreEntranceObserver.observe(el);
    });

});
