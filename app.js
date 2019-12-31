const container = document.getElementById('container');
const sort = document.getElementById('sort');
const shuffle = document.getElementById('shuffle');
let isSorted = false;

function createBlocks(number){
    for (let i = 0; i < number; ++i) {
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

function swap(el1, el2) {
    return new Promise(resolve => {
      const style1 = window.getComputedStyle(el1);
      const style2 = window.getComputedStyle(el2);
  
      const transform1 = style1.getPropertyValue("transform");
      const transform2 = style2.getPropertyValue("transform");
  
      el1.style.transform = transform2;
      el2.style.transform = transform1;
  
      // Wait for the transition to end!
      window.requestAnimationFrame(function() {
        setTimeout(() => {
          container.insertBefore(el2, el1);
          resolve();
        }, 250);
      });
    });
}

function shuffleIt(){
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < 25; ++i) {
        const value = Math.floor(Math.random() * 500);
        blocks[i].style.backgroundColor = '#00a8ff';
        blocks[i].childNodes[0].innerHTML = value;
        blocks[i].style.height = `${value}px`;
    }
    isSorted = false;
}

async function bubbleSort(delay = 100){
    
    if(isSorted)
        return;

    let blocks = document.querySelectorAll(".block");
	flag = false;
	n = blocks.length;
	for (let i = 0; i < n; ++i){
		for (let j = 0 ; j < n - i - 1; ++j){
            blocks[j].style.backgroundColor = "#e84118";
            blocks[j + 1].style.backgroundColor = "#e84118";

            await new Promise(resolve =>
                setTimeout(() => {
                resolve();
                }, delay)
            );

            let value1 = parseInt(blocks[j].childNodes[0].innerHTML, 10);
            let value2 = parseInt(blocks[j + 1].childNodes[0].innerHTML, 10);
			if( value2 < value1 ){
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
                flag = true;
            }
            blocks[j].style.backgroundColor = "#00a8ff";
            blocks[j + 1].style.backgroundColor = "#00a8ff";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#4cd137";

		if(!flag)
			break;
    }
    isSorted = true;
}

sort.addEventListener('click', bubbleSort);
shuffle.addEventListener('click', shuffleIt);

createBlocks(25);