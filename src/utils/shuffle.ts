/**
 * Generates a random number between 0 and specified number
 * @param number - Specify the endLimit
 */
export const randomNumberGenerator = (number: number) => {
  return Math.floor(Math.random() * number);
};

/**
 * Fisher-Yates Array shuffling algorithm
 * @param array
 */
export const shuffle = <T extends any>(array: T[]): T[] => {
  let arrayCopy = [...array];
  let n = arrayCopy.length;

  while (n) {
    let i = randomNumberGenerator(n--);
    [arrayCopy[i], arrayCopy[n]] = [arrayCopy[n], arrayCopy[i]];
  }
  return arrayCopy;
};
