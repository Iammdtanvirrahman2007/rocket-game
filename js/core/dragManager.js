import { getPartById } from '../parts/registry.js';
import {
    addPart,
    removePart,
    getRocket,
    getTotalMass
} from './rocketBuilder.js';

export function initDragAndDrop() {

    const loader = document.getElementById('part-loader');
    const dropZone = document.getElementById('drop-zone');

    // Drag Start
    loader.addEventListener('dragstart', (e) => {

        const partItem = e.target.closest('.part-item');

        if (!partItem) return;

        e.dataTransfer.setData(
            'part-id',
            partItem.dataset.id
        );

        e.dataTransfer.effectAllowed = 'copy';

    });

    // Drag Over
    dropZone.addEventListener('dragover', (e) => {

        e.preventDefault();

        dropZone.style.backgroundColor =
            'rgba(216,228,255,.35)';

    });

    // Drag Leave
    dropZone.addEventListener('dragleave', () => {

        dropZone.style.backgroundColor = '';

    });

    // Drop
    dropZone.addEventListener('drop', (e) => {

        e.preventDefault();

        dropZone.style.backgroundColor = '';

        const id =
            e.dataTransfer.getData('part-id');

        const part =
            getPartById(id);

        if (!part) return;

        assemblePart(part);

    });

}

function assemblePart(partData){

    const dropZone =
        document.getElementById('drop-zone');

    const placeholder =
        dropZone.querySelector('p');

    if(placeholder){

        placeholder.style.display='none';

    }

    // Data Save
    const rocketPart =
        addPart(partData);

    // UI
    const part =
        document.createElement('div');

    part.className='assembled-part';

    part.dataset.uid=rocketPart.uid;

    part.innerHTML=`

        <div class="assembled-image">

            <img
                src="${rocketPart.image}"
                alt="${rocketPart.name}"
            >

        </div>

        <div class="assembled-name">

            ${rocketPart.name}

        </div>

        <button
            class="delete-btn">

            ✖

        </button>

    `;

    part
    .querySelector('.delete-btn')
    .addEventListener('click',()=>{

        removeRocketPart(
            rocketPart.uid,
            part
        );

    });

    dropZone.appendChild(part);

    updateStats();

}

function removeRocketPart(uid,element){

    removePart(uid);

    element.remove();

    if(getRocket().length===0){

        const placeholder=
            document
            .querySelector('#drop-zone p');

        if(placeholder){

            placeholder.style.display='block';

        }

    }

    updateStats();

}

function updateStats(){

    document
    .getElementById('stat-parts')
    .innerText=getRocket().length;

    document
    .getElementById('stat-mass')
    .innerText=
    getTotalMass().toFixed(1)+'t';

}

export function getRocketData(){

    return{

        name:'Untitled Rocket',

        totalMass:getTotalMass(),

        parts:getRocket()

    };

}
