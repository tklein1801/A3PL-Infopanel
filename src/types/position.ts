/** Contains a stringified array with numbers for `x`, `y`, `z` */
export type PositionResponse = string;

export class Position {
  pos: { x: number; y: number; z: number };

  constructor(position: PositionResponse) {
    const [x, y, z] = JSON.parse(position);
    this.pos = {
      x: x.toFixed(),
      y: y.toFixed(),
      z: z.toFixed(),
    };
  }

  getMapUrl(): string {
    const { x, y } = this.pos;
    return `https://info.realliferpg.de/map?x=${x}&y=${y}`;
  }
}
