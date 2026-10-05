/**
 * AURORE PARIS — Client Interactions & Concierge
 */

document.addEventListener('DOMContentLoaded', () => {
    // === Cookie Banner Discretion ===
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    if (cookieBanner) {
        if (!localStorage.getItem('aurore_privacy_consent')) {
            setTimeout(() => {
                cookieBanner.classList.remove('hidden');
            }, 2000);
        }
        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('aurore_privacy_consent', 'accepted');
                cookieBanner.classList.add('hidden');
            });
        }
        if (cookieReject) {
            cookieReject.addEventListener('click', () => {
                localStorage.setItem('aurore_privacy_consent', 'essential');
                cookieBanner.classList.add('hidden');
            });
        }
    }

    // === Mobile Navigation Toggle ===
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navPillLinks');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isFlex = navLinks.style.display === 'flex';
            navLinks.style.display = isFlex ? 'none' : 'flex';
            if (!isFlex) {
                navLinks.style.position = 'fixed';
                navLinks.style.top = '80px';
                navLinks.style.left = '24px';
                navLinks.style.right = '24px';
                navLinks.style.flexDirection = 'column';
                navLinks.style.background = 'rgba(14, 14, 20, 0.98)';
                navLinks.style.padding = '24px';
                navLinks.style.borderRadius = '20px';
                navLinks.style.border = '1px solid var(--border-glass)';
                navLinks.style.gap = '16px';
            }
        });
    }

    // === Smooth Scroll Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
});
