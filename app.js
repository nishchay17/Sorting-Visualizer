const container = document.getElementById('container');
const sort = document.getElementById('sort');
const shuffle = document.getElementById('shuffle');
const sortName = document.getElementById('sortName');
const selectionbtn = document.getElementById('selection');
const bubblebtn = document.getElementById('bubble');
let isSorted = false;
let isSorting = false;
let speed = 250;
const green = "#4cd137";
const blue = "#00a8ff";
const red = "#e84118";

function createBlocks(number){
    for (let i = 0; i < number; ++i){
        const value = Math.floor(Math.random() * 500);
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.width = `${screen.width/(number + 10)}px`;
        block.style.height = value + 'px';
        block.style.transform = `translateX(${i*3}px)`;

        const blockLabel = document.createElement("label");
        blockLabel.classList.add("blockId");
        blockLabel.innerHTML = value;

        block.appendChild(blockLabel);
        container.appendChild(block);
    }
    isSorted = false;
}

function swap(el1, el2, from, to, delay = speed){
    return new Promise(resolve => {
        let val1 =  parseInt(el1.childNodes[0].innerHTML, 10);
        let val2 =  parseInt(el2.childNodes[0].innerHTML, 10);

        el1.childNodes[0].innerHTML = val2;
        el2.childNodes[0].innerHTML = val1;

        window.requestAnimationFrame(function() {
            setTimeout(() => {
            el1.style.height = val2 + 'px';
            el2.style.height = val1 + 'px';
            resolve();
            }, delay);
        });
    });
}

function shuffleIt(){
    
    if(isSorting)   return;

    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < 25; ++i) {
        const value = Math.floor(Math.random() * 500);
        blocks[i].style.backgroundColor = blue;
        blocks[i].childNodes[0].innerHTML = value;
        blocks[i].style.height = `${value}px`;
    }
    isSorted = false;
}

async function bubbleSort(delay = 100){  
    if(isSorted && isSorting)
        return;

    isSorting = true;
    let blocks = document.querySelectorAll(".block");
	flag = false;
	n = blocks.length;
	for (let i = 0; i < n; ++i){
		for (let j = 0 ; j < n - i - 1; ++j){
            blocks[j].style.backgroundColor = red;
            blocks[j + 1].style.backgroundColor = red;

            let value1 = parseInt(blocks[j].childNodes[0].innerHTML, 10);
            let value2 = parseInt(blocks[j + 1].childNodes[0].innerHTML, 10);
			if( value2 < value1 ){
                await swap(blocks[j], blocks[j + 1], j, j + 1);
                blocks = document.querySelectorAll(".block");
                flag = true;
            }
            blocks[j].style.backgroundColor = blue;
            blocks[j + 1].style.backgroundColor = blue;
        }
        blocks[n - i - 1].style.backgroundColor = green;

		if(!flag)
			break;
    }
    isSorted = true;
    isSorting = false;
}

async function selectionSort(delay = 100){

    if(isSorted && isSorting)    return;

    isSorting = true;
    let array = document.querySelectorAll(".block");
    n = array.length;
    let minIndex;

	for(let i = 0; i < n ; ++i){
        minIndex = i;
        array[minIndex].style.backgroundColor = red;
		for(let j = i + 1; j < n; ++j){
            array[j].style.backgroundColor = red;
            let value1 = parseInt(array[j].childNodes[0].innerHTML, 10);
            let value2 = parseInt(array[minIndex].childNodes[0].innerHTML, 10);
            if(value1 < value2)  
                minIndex = j;

            array[j].style.backgroundColor = blue;
        }
        array[minIndex].style.backgroundColor = red;
        await swap(array[minIndex], array[i], minIndex, i);
        array[minIndex].style.backgroundColor = blue;
        array[i].style.backgroundColor = green;
        array = document.querySelectorAll(".block");
    }
    isSorted = true;
    isSorting = false;
}

function sortFunction(){
    speed = document.querySelector('input[name="speed"]:checked').value;
    if(sortName.innerHTML == "Selection Sort")
        selectionSort();
    else if(sortName.innerHTML == "Bubble Sort")
        bubbleSort();
}


selectionbtn.addEventListener('click', () => {
    sortName.innerHTML = "Selection Sort";
});

bubblebtn.addEventListener('click', () => {
    sortName.innerHTML = "Bubble Sort";
});

sort.addEventListener('click', sortFunction);
shuffle.addEventListener('click', shuffleIt);

createBlocks(25);