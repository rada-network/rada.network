export default function(num, place) {
  return +(Math.round(Number(num + "e+" + place)) + "e-" + place);
}
