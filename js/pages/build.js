import { navigateTo } from '../core/router.js';
import { loadPartsToSidebar } from '../parts/registry.js';
import { initDragAndDrop, getRocketData } from '../core/dragManager.js';
import { saveRocketToCloud } from '../core/firebaseConfig.js';

// ======================================
// HTML
// ======================================

export function getHTML() {

    return `
        <div class="builder-layout">

            <!-- ==================================
                 SIDEBAR
            =================================== -->

            <aside class="sidebar">

                <div class="sidebar-header">
                    <h2>Components</h2>
                </div>

                <div id="part-loader" class="part-list">
                    <p>Loading parts...</p>
                </div>

            </aside>

            <!-- ==================================
                 WORKSPACE
            =================================== -->

            <main class="workspace">

                <header class="toolbar">

                    <button id="btn-back"
                            class="secondary-btn">
                        ← Back to Menu
                    </button>

                    <h2>Vehicle Assembly</h2>

                    <div class="toolbar-actions">

                        <button id="btn-save"
                                class="secondary-btn">
                            Save to Cloud ☁️
                        </button>

                        <button id="btn-launch"
                                class="primary-btn">
                            LAUNCH 🚀
                        </button>

                    </div>

                </header>

                <!-- ==================================
                     ASSEMBLY AREA
                =================================== -->

                <section class="assembly-area">

                    <div id="drop-zone">

                        <!-- 2D Rocket Blueprint Body -->
                        <div id="rocket-body"></div>

                        <!-- Placeholder -->
                        <p class="placeholder">
                            Drag rocket components here
                        </p>

                    </div>

                </section>

            </main>

        </div>

        <!-- ==================================
             STATUS BAR
        =================================== -->

        <footer class="statusbar">

            <div>
                Parts:
                <span id="stat-parts">0</span>
            </div>

            <div>
                Mass:
                <span id="stat-mass">0.0t</span>
            </div>

            <div>
                Stages:
                <span id="stat-stages">0</span>
            </div>

        </footer>
    `;
}

// ======================================
// INIT
// ======================================

export function init() {

    console.log('🛠️ Builder Module Initialized');

    // Back Button
    document.getElementById('btn-back')
        ?.addEventListener('click', () => {

            navigateTo('home');

        });

    // Load Parts
    loadPartsToSidebar();

    // Enable Drag & Drop
    initDragAndDrop();

    // ==================================
    // SAVE BUTTON
    // ==================================

    const saveBtn = document.getElementById('btn-save');

    if (saveBtn) {

        saveBtn.addEventListener('click', async () => {

            const rocketData = getRocketData();

            // Empty Rocket Check
            if (rocketData.parts.length === 0) {

                alert(
                    'Cannot save an empty rocket! Add some parts first.'
                );

                return;
            }

            // Loading State
            saveBtn.innerText = 'Saving...';
            saveBtn.disabled = true;

            try {

                const result = await saveRocketToCloud(rocketData);

                if (result.success) {

                    alert(
                        `🎉 Rocket successfully saved! ID: ${result.id}`
                    );

                } else {

                    alert(
                        `❌ Failed to save: ${result.error}`
                    );
                }

            } catch (error) {

                console.error(error);

                alert('❌ Unexpected error while saving rocket');

            }

            // Restore Button
            saveBtn.innerText = 'Save to Cloud ☁️';
            saveBtn.disabled = false;
        });
    }

    // ==================================
    // LAUNCH BUTTON (Future)
    // ==================================

    document.getElementById('btn-launch')
        ?.addEventListener('click', () => {

            const rocketData = getRocketData();

            if (rocketData.parts.length === 0) {
                alert('Build a rocket first!');
                return;
            }

            console.log('🚀 Launching Rocket:', rocketData);

            // Future: navigateTo('flight');
        });
}
