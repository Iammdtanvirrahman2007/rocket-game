import { getPartById } from '../parts/registry.js';

export function initDragAndDrop() {
    const loader = document.getElementById('part-loader');
    const dropZone = document.getElementById('drop-zone');
    
    // ১. ড্র্যাগ শুরু হলে কী হবে
    loader.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('part-item')) {
            e.dataTransfer.setData('part-id', e.target.dataset.id);
            e.dataTransfer.effectAllowed = 'copy';
        }
    });

    // ২. ড্রপ জোনে পার্টস আনলে অ্যালাও করা
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); // ডিফল্ট বিহেভিয়ার বন্ধ করলে ড্রপ করা যায়
        e.dataTransfer.dropEffect = 'copy';
        dropZone.style.backgroundColor = 'rgba(216, 228, 255, 0.5)'; // হাইলাইট
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = 'transparent';
    });

    // ৩. ক্যানভাসে পার্টস ড্রপ করলে কী হবে
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

// ক্যানভাসে পার্ট যোগ করা এবং স্ট্যাটাস আপডেট করা
let totalParts = 0;
let totalMass = 0;

function assemblePart(partData) {
    const dropZone = document.getElementById('drop-zone');
    
    // ক্যানভাসের ভেতরের placeholder টেক্সট সরাতে
    const placeholder = dropZone.querySelector('p');
    if (placeholder) placeholder.remove();

    // নতুন এলিমেন্ট তৈরি করে স্ট্যাক করা
    const assembledPart = document.createElement('div');
    assembledPart.className = `assembled-part ${partData.id}`;
    assembledPart.innerHTML = partData.name;
    
    dropZone.appendChild(assembledPart);
    
    // স্ট্যাটাস বার আপডেট
    totalParts++;
    totalMass += partData.stats.mass;
    
    document.getElementById('stat-parts').innerText = totalParts;
    document.getElementById('stat-mass').innerText = totalMass.toFixed(1) + 't';
}
