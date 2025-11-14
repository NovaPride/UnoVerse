function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateCard() {
  const id = getRandomInt(10, 99999);
  const color = ["red", "green", "blue", "yellow"][getRandomInt(0, 4)];
  const content = getRandomInt(1, 10);

  return {
    id,
    type: "digit",
    color,
    content,
  };
}
