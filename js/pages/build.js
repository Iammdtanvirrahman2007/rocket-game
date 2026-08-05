import { navigateTo } from '../core/router.js';

export function getHTML() {
    return `
        <div class="builder-layout">
            <!-- Left Sidebar (Parts Library) -->
            <aside class="sidebar">
                <div class="sidebar-header">
                    <h2>Components</h2>
                </div>
                <div id="part-loader" class="part-list">
                    <p>Loading parts...</p>
                    <!-- Parts will be dynamically injected here later -->
                </div>
            </aside>

            <!-- Main Blueprint Canvas -->
            <main class="workspace">
                <header class="toolbar">
                    <button id="btn-back" class="secondary-btn">← Back to Menu</button>
                    <h2>Vehicle Assembly</h2>
                    <div>
                        <button id="btn-save" class="secondary-btn">Save</button>
                        <button id="btn-launch" class="primary-btn">LAUNCH 🚀</button>
                    </div>
                </header>

                <section class="assembly-area" id="drop-zone">
                    <p style="opacity: 0.5; font-style: italic;">Drag rocket components here</p>
                </section>
            </main>
        </div>

        <!-- Bottom Status Bar -->
        <footer class="statusbar">
            <div>Parts: <span id="stat-parts">0</span></div>
            <div>Mass: <span id="stat-mass">0.0t</span></div>
            <div>Stages: <span id="stat-stages">0</span></div>
        </footer>
    `;
}

export function init() {
    console.log("🛠️ Builder Module Initialized");

    // Back to Home Logic
    const backBtn = document.getElementById('btn-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            navigateTo('home');
        });
    }

    // Launch Button Logic (Placeholder for future)
    const launchBtn = document.getElementById('btn-launch');
    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            alert("Launch sequence initiated! (Launch module coming soon)");
        });
    }
}
