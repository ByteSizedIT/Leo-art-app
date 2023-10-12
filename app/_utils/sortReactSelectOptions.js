export default function sortReactSelectOptions(arr) {
  arr.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > a.value) {
      return 1;
    }
    return 0; // Names are equal
  });
}
