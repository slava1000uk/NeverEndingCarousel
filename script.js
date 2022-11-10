
let slider = document.querySelector('.slider');
let images = document.querySelectorAll('.img');
let imgsSrc = [];

let count = 0; // number of pic which is now shown on the page

function init () {
  // collect pic's src in array and remove them all from the page
  // exept first one
  imgsSrc[0] = images[0].src; 

  for (let i = 1; i < images.length; i++) {
    imgsSrc[i] = images[i].src;
    images[i].remove();
    //I left first pic on the page
  }
}


function drawOnRightSide () {
  let drawImg = document.createElement('img');
  drawImg.classList.add('img');
  drawImg.src = imgsSrc[count];

  slider.appendChild(drawImg);
  drawImg.style.left = 264 + 'px';
}

function drawOnLeftSide () {
  let drawImg = document.createElement('img');
  drawImg.classList.add('img');
  drawImg.src = imgsSrc[count];

  slider.insertBefore(drawImg, slider.firstChild);
  drawImg.style.left = '-' + 264 + 'px';
}


function moveRight () {
  //switch off click buttons while mooving
  document.querySelector('.control.right').disabled = true;
  document.querySelector('.control.left').disabled = true;

  let imgsOnPage = document.querySelectorAll('.img');
  // it is everytime only 2 pics on page so imgsOnPage.length == 2
  for (let i = 0; i < imgsOnPage.length; i++) {
    imgsOnPage[i].style.left = (i - 1)*264 + 'px'; 
  }

  setTimeout(() => {
    imgsOnPage[0].remove();
    //switch on click buttons after mooving
    document.querySelector('.control.right').disabled = false;
    document.querySelector('.control.left').disabled = false;
  }, 1000);

}



function moveLeft() {
  //switch off click buttons while mooving
  document.querySelector('.control.right').disabled = true;
  document.querySelector('.control.left').disabled = true;

  let imgsOnPage = document.querySelectorAll('.img');
  // here was a problem: pictures in array imgsOnPage were
  // not in the order they appear on the page,
  // BUT in the same order as added in function drawLLeft() 
  // to the document by the method slider.appendChild(drawImg);
  // that's why code below didn't work
  // so in function drawLLeft() I change appendChild for method 
  // slider.insertBefore(drawImg, slider.firstChild);

  for (let i = 0; i < imgsOnPage.length; i++) {
    imgsOnPage[i].style.left = i * 264 + 'px';
  }

  setTimeout(() => {
    imgsOnPage[imgsOnPage.length - 1].remove();
    //switch on click buttons after mooving
    document.querySelector('.control.right').disabled = false;
    document.querySelector('.control.left').disabled = false;
  }, 1000);

}



init();

document.querySelector('.control.right').addEventListener('click', function () {
  if (count == (images.length - 1)) {
    count = 0;
  } else {
    count++;
  }

  drawOnRightSide();

  setTimeout(() => {
    moveRight();
  }, 0);
});

document.querySelector('.control.left').addEventListener('click', function () {
  if (count == 0) {
    count = images.length - 1;
  } else {
    count--;
  }

  drawOnLeftSide();

  setTimeout(() => {
    moveLeft();
  }, 0);
});
