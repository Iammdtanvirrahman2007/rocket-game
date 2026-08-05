import { getPartById } from '../parts/registry.js';

// রকেটের বর্তমান স্টেট ধরে রাখার জন্য একটি Array
export let currentRocket = [];

export function initDragAndDrop() {
    const loader = document.getElementById('part-loader');
    const dropZone = document.getElementById('drop-zone');

    // Sidebar থেকে Drag শুরু
    loader.addEventListener('dragstart', (e) => {
        const partItem = e.target.closest('.part-item');
        if (!partItem) return;

        e.dataTransfer.setData('part-id', partItem.dataset.id);
        e.dataTransfer.effectAllowed = 'copy';
    });

    // Drop Zone Highlight
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropZone.style.backgroundColor = 'rgba(216,228,255,0.5)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = 'transparent';
    });

    // Part Drop
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = 'transparent';

        const partId = e.dataTransfer.getData('part-id');
        const partData = getPartById(partId);

        if (partData) {
            assemblePart(partData);
        }
    });
}

function assemblePart(partData) {

    const dropZone = document.getElementById('drop-zone');

    // Placeholder Hide
    const placeholder = dropZone.querySelector('p');
    if (placeholder) placeholder.style.display = 'none';

    const uniqueId = 'part_' + Date.now();

    currentRocket.push({
        uid: uniqueId,
        id: partData.id,
        name: partData.name,
        image: partData.image,
        stats: partData.stats
    });

    // Rocket Part
    const assembledPart = document.createElement('div');
    assembledPart.className = `assembled-part ${partData.id}`;
    assembledPart.id = uniqueId;

    assembledPart.innerHTML = `
        <div class="assembled-image">
            <img src="${partData.image}" alt="${partData.name}">
        </div>

        <div class="assembled-name">
            ${partData.name}
        </div>

        <button class="delete-btn" title="Remove Part">
            ✖
        </button>
    `;

    // Delete
    assembledPart
        .querySelector('.delete-btn')
        .addEventListener('click', () => {
            removePart(uniqueId, assembledPart);
        });

    dropZone.appendChild(assembledPart);

    updateStats();
}

function removePart(uniqueId, element) {

    element.remove();

    currentRocket = currentRocket.filter(
        part => part.uid !== uniqueId
    );

    updateStats();

    if (currentRocket.length === 0) {
        const dropZone = document.getElementById('drop-zone');
        const placeholder = dropZone.querySelector('p');

        if (placeholder) {
            placeholder.style.display = 'block';
        }
    }
}

function updateStats() {

    let mass = 0;

    currentRocket.forEach(part => {
        mass += part.stats.mass;
    });

    document.getElementById('stat-parts').innerText =
        currentRocket.length;

    document.getElementById('stat-mass').innerText =
        mass.toFixed(1) + 't';
}

// Cloud Save
export function getRocketData() {
    return {
        name: "Untitled Rocket",
        totalMass: parseFloat(
            document.getElementById('stat-mass').innerText
        ),
        parts: currentRocket
    };
}
