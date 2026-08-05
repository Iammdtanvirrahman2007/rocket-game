import { navigateTo } from '../core/router.js';
import { loadPartsToSidebar } from '../parts/registry.js';
import { initDragAndDrop, getRocketData } from '../core/dragManager.js'; // getRocketData এখানেই ইম্পোর্ট করা হয়েছে

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

    // ১. সাইডবারে পার্টস লোড করা
    loadPartsToSidebar();

    // ২. ড্র্যাগ অ্যান্ড ড্রপ অ্যাক্টিভ করা
    initDragAndDrop();

    // ৩. Save Button Logic
    const saveBtn = document.getElementById('btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const rocketData = getRocketData();
            
            if (rocketData.parts.length === 0) {
                alert("Cannot save an empty rocket! Add some parts first.");
                return;
            }

            console.log("💾 Saving Rocket Data:", JSON.stringify(rocketData, null, 2));
            alert("Rocket data generated! (Check console for JSON).");
        });
    }
}
