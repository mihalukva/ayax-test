import moment from "moment";
export function idGenerator() {
  return moment().valueOf()+getRandomIntInclusive(1,999999);
}
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
