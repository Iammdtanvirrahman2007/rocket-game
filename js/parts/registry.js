import { mk1Capsule } from './modules/mk1Capsule.js';
import { fuelTank } from './modules/fuelTank.js';
import { basicEngine } from './modules/basicEngine.js';

// সব পার্টসের তালিকা
const availableParts = [
    mk1Capsule,
    fuelTank,
    basicEngine
];

export function loadPartsToSidebar() {
    const loader = document.getElementById('part-loader');
    if (!loader) return;

    loader.innerHTML = ''; // "Loading parts..." লেখাটি মুছে ফেলবে

    availableParts.forEach(part => {
        const item = document.createElement('div');
        item.className = 'part-item';
        item.draggable = true;
        item.dataset.partId = part.id;

        item.innerHTML = `
            <div class="part-icon">${part.icon || '🚀'}</div>
            <div class="part-details">
                <h4>${part.name}</h4>
                <p>Mass: ${part.mass}t</p>
            </div>
        `;

        // ড্র্যাগ ইভেন্ট যুক্ত করা
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify(part));
        });

        loader.appendChild(item);
    });
}
