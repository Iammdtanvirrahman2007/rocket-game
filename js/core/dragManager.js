import { getPartById } from '../parts/registry.js';

// রকেটের বর্তমান স্টেট ধরে রাখার জন্য একটি Array
export let currentRocket = [];
let totalMass = 0;

export function initDragAndDrop() {
    const loader = document.getElementById('part-loader');
    const dropZone = document.getElementById('drop-zone');
    
    // ১. সাইডবার থেকে ড্র্যাগ শুরু
    loader.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('part-item')) {
            e.dataTransfer.setData('part-id', e.target.dataset.id);
            e.dataTransfer.effectAllowed = 'copy';
        }
    });

    // ২. ড্রপ জোনের হাইলাইট
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropZone.style.backgroundColor = 'rgba(216, 228, 255, 0.5)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = 'transparent';
    });

    // ৩. ড্রপ জোন - পার্ট অ্যাসেম্বল করা
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
    
    // Placeholder সরানো
    const placeholder = dropZone.querySelector('p');
    if (placeholder) placeholder.style.display = 'none';

    // রকেটের ডাটা অ্যারেতে পুশ করা (unique ID সহ, যাতে ডিলিট করতে সুবিধা হয়)
    const uniqueId = 'part_' + Date.now(); 
    currentRocket.push({
        uid: uniqueId,
        id: partData.id,
        name: partData.name,
        stats: partData.stats
    });

    // নতুন এলিমেন্ট তৈরি করা
    const assembledPart = document.createElement('div');
    assembledPart.className = `assembled-part ${partData.id}`;
    assembledPart.id = uniqueId;
    assembledPart.innerHTML = `
        <span>${partData.name}</span>
        <button class="delete-btn" title="Remove Part">✖</button>
    `;
    
    // ডিলিট বাটনে ক্লিক ইভেন্ট যুক্ত করা
    assembledPart.querySelector('.delete-btn').addEventListener('click', () => {
        removePart(uniqueId, partData, assembledPart);
    });

    dropZone.appendChild(assembledPart);
    updateStats();
}

function removePart(uniqueId, partData, element) {
    // ১. DOM থেকে রিমুভ করা
    element.remove();
    
    // ২. রকেট ডাটাবেস (Array) থেকে রিমুভ করা
    currentRocket = currentRocket.filter(part => part.uid !== uniqueId);
    
    // ৩. স্ট্যাটাস আপডেট করা
    updateStats();

    // ৪. যদি সব পার্ট ডিলিট হয়ে যায়, তাহলে placeholder আবার দেখানো
    if (currentRocket.length === 0) {
        const dropZone = document.getElementById('drop-zone');
        const placeholder = dropZone.querySelector('p');
        if (placeholder) placeholder.style.display = 'block';
    }
}

// স্ট্যাটাস বার রিক্যালকুলেট করার ফাংশন
function updateStats() {
    let mass = 0;
    
    currentRocket.forEach(part => {
        mass += part.stats.mass;
    });

    document.getElementById('stat-parts').innerText = currentRocket.length;
    document.getElementById('stat-mass').innerText = mass.toFixed(1) + 't';
}

// সেভ করার জন্য JSON জেনারেট করার ফাংশন (অন্য ফাইল থেকে কল করা হবে)
export function getRocketData() {
    return {
        name: "Untitled Rocket",
        totalMass: parseFloat(document.getElementById('stat-mass').innerText),
        parts: currentRocket
    };
}
