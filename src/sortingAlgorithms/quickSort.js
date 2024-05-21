// export function quickSortAnimations(array){
//     const animations = [];
//     if(array.length <= 1) return array;
//     const auxiliaryArray = array.slice();
//     quickSortHelper(array, 0, array.length-1,auxiliaryArray, animations);
//     array = auxiliaryArray;
//     return animations;
// }

// function quickSortHelper(
//   mainArray,
//   startId,
//   endId,
//   auxiliaryArray,
//   animations
// ){
  
//   if(startId >= endId || endId === mainArray.length || startId-1 === mainArray.length) return;
//   const pivotId = partition(mainArray, startId, endId, auxiliaryArray, animations);
//   quickSortHelper(mainArray, startId, pivotId-1, auxiliaryArray, animations);
//   quickSortHelper(mainArray, pivotId+1, endId, auxiliaryArray, animations);
// }

// function partition(
//   mainArray,
//   startId,
//   endId,
//   auxiliaryArray,
//   animations
// ){
//   let pivot = startId,
//       left = startId + 1,
//       right = endId+1;
//   animations.push([left, right]);
//   while (right > left) {
//     if (auxiliaryArray[right] < auxiliaryArray[pivot] && auxiliaryArray[left] > auxiliaryArray[pivot]) {
//       animations.push([left, right]);
//       animations.push([left, right]);
//     }
//     while (auxiliaryArray[right] >= auxiliaryArray[pivot]) {
//       right--;
//     }
//     while (auxiliaryArray[left] <= auxiliaryArray[pivot]) {
//       left++;
//     }
//     if (right > left){ 
//       animations.push([left, auxiliaryArray[right]]);
//       swap(mainArray, left, right);
//     }
//   }
//   if (pivot !== right) {
//     animations.push([pivot, right]);
//     animations.push([pivot, right]);
//     animations.push([pivot, mainArray[right]]);
//     swap(mainArray, pivot, right);
//   }
//   return right;
// }

// function swap(array, i, j) {
//   const temp = array[i];
//   array[i] = array[j];
//   array[j] = temp;
// }

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
      const pivotIndex = partition(array, low, high, animations);
      quickSortHelper(array, low, pivotIndex - 1, animations);
      quickSortHelper(array, pivotIndex + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  let pivot = low;
  animations.push(["comparison1", pivot, high]);
  animations.push(["swap", pivot, array[high]]);
  animations.push(["swap", high, array[pivot]]);
  animations.push(["comparison2", pivot, high]);
  swap(array, pivot, high);

  let lti = low;

  for (let i = low; i < high; ++i) {
    animations.push(["comparison1", i, high]);
    animations.push(["comparison2", i, high]);
    if (array[i] <= array[high]) {
      animations.push(["comparison1", i, lti]);
      animations.push(["swap", i, array[lti]]);
      animations.push(["swap", lti, array[i]]);
      animations.push(["comparison2", i, lti]);
      swap(array, i, lti);
      lti++;
    }
  }
  animations.push(["comparison1", lti, high]);
  animations.push(["swap", high, array[lti]]);
  animations.push(["swap", lti, array[high]]);
  animations.push(["comparison2", lti, high]);

  swap(array, lti, high);
  return lti;
  
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
