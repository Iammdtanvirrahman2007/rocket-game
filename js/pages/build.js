import { navigateTo } from '../core/router.js';
import { loadPartsToSidebar } from '../parts/registry.js';
import { initDragAndDrop, getRocketData } from '../core/dragManager.js';
import { saveRocketToCloud } from '../core/firebaseConfig.js';

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
                </div>
            </aside>

            <!-- Main Blueprint Canvas -->
            <main class="workspace">
                <header class="toolbar">
                    <button id="btn-back" class="secondary-btn">← Back to Menu</button>
                    <h2>Vehicle Assembly</h2>
                    <div>
                        <button id="btn-save" class="secondary-btn">Save to Cloud ☁️</button>
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

    document.getElementById('btn-back')?.addEventListener('click', () => {
        navigateTo('home');
    });

    loadPartsToSidebar();
    initDragAndDrop();

    // Cloud Save Button Logic
    const saveBtn = document.getElementById('btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const rocketData = getRocketData();
            
            if (rocketData.parts.length === 0) {
                alert("Cannot save an empty rocket! Add some parts first.");
                return;
            }

            saveBtn.innerText = "Saving...";
            saveBtn.disabled = true;

            const result = await saveRocketToCloud(rocketData);

            if (result.success) {
                alert(`🎉 Rocket successfully saved to Cloud! ID: ${result.id}`);
            } else {
                alert(`❌ Failed to save: ${result.error}`);
            }

            saveBtn.innerText = "Save to Cloud ☁️";
            saveBtn.disabled = false;
        });
    }
}
