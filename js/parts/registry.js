import { Mk1Capsule } from './modules/mk1Capsule.js';
import { FuelTank } from './modules/fuelTank.js';
import { BasicEngine } from './modules/basicEngine.js';

// সব পার্টস একটি লিস্টে রাখা হলো
export const PARTS_LIST = [
    Mk1Capsule,
    FuelTank,
    BasicEngine
];

// পার্টসের ডেটা খুঁজে পাওয়ার ফাংশন
export function getPartById(id) {
    return PARTS_LIST.find(part => part.id === id);
}

// সাইডবারে পার্টসগুলো রেন্ডার করার ফাংশন
export function loadPartsToSidebar() {
    const loader = document.getElementById('part-loader');
    if (!loader) return;
    
    loader.innerHTML = ''; // "Loading parts..." লেখা মুছে ফেলা
    
    PARTS_LIST.forEach(part => {
        const element = part.createSidebarItem();
        loader.appendChild(element);
    });
}
