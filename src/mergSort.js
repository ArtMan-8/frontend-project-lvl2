export default function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const pivot = Math.floor(array.length / 2);
  let less = [];
  let greater = [];

  for (const el of array) {
    if (el < array[pivot]) {
      less = less.concat(el);
    }

    if (el > array[pivot]) {
      greater = greater.concat(el);
    }
  }

  const sortedArray = [];
  return sortedArray.concat(mergeSort(less), array[pivot], mergeSort(greater));
}
