import { mk1Capsule } from './modules/mk1Capsule.js';
import { fuelTank } from './modules/fuelTank.js';
import { basicEngine } from './modules/basicEngine.js';

// সব পার্টসের রেজিস্ট্রি তালিকা
const partsDatabase = {
    'mk1-capsule': mk1Capsule,
    'fuel-tank': fuelTank,
    'basic-engine': basicEngine
};

// আইডি দিয়ে নির্দিষ্ট পার্ট খুঁজে বের করার ফাংশন (dragManager.js এর জন্য জরুরি)
export function getPartById(id) {
    return partsDatabase[id];
}

// সাইডবারে পার্টসগুলো রেন্ডার করার ফাংশন
export function loadPartsToSidebar() {
    const loader = document.getElementById('part-loader');
    if (!loader) return;

    loader.innerHTML = ''; // "Loading parts..." লেখা মুছে ফেলা

    Object.values(partsDatabase).forEach(part => {
        const item = document.createElement('div');
        item.className = `part-item ${part.id}`;
        item.draggable = true;
        item.dataset.id = part.id; // dragManager এর সাথে ম্যাচ করার জন্য

        item.innerHTML = `
            <div class="part-icon">${part.icon || '🚀'}</div>
            <div class="part-details">
                <h4>${part.name}</h4>
                <p>Mass: ${part.stats.mass}t</p>
            </div>
        `;

        loader.appendChild(item);
    });
}
