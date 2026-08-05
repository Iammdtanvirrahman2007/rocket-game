import { navigateTo } from '../core/router.js';

// এই ফাংশনটি হোম পেজের HTML ডিজাইন রিটার্ন করবে
export function getHTML() {
    return `
        <div class="home-container">
            <h1>Space Exploration Program</h1>
            <div class="menu-buttons">
                <button id="btn-build" class="primary-btn">Build Rocket</button>
                <button id="btn-load" class="secondary-btn">Load Save</button>
                <button id="btn-settings" class="secondary-btn">Settings</button>
            </div>
        </div>
    `;
}

// এই ফাংশনটি হোম পেজের বাটনগুলোর কাজ কন্ট্রোল করবে
export function init() {
    // Build বাটনে ক্লিক করলে 'build' পেজে চলে যাবে
    const buildBtn = document.getElementById('btn-build');
    if (buildBtn) {
        buildBtn.addEventListener('click', () => {
            console.log("Navigating to Builder...");
            navigateTo('build'); // এখানে পরে আমরা build.js বানাবো
        });
    }

    // Settings বাটন
    const settingsBtn = document.getElementById('btn-settings');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert("Settings module will be added later!");
        });
    }
}
