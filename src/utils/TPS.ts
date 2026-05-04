import { system } from "@minecraft/server";

export default class TPS {
  private static tps = 0;
  private static tickTimes: number[] = [];

  public constructor() {
    this.Loop();
  }

  public static GetTPS(): number {
    return TPS.tps > 20 ? 20 : Math.floor(TPS.tps);
  }

  private Loop(): void {
    system.runInterval(() => {
      const now = Date.now();

      TPS.tickTimes.push(now);

      if (TPS.tickTimes.length > 20) {
        TPS.tickTimes.shift();
      }
      if (TPS.tickTimes.length < 2) {
        return;
      }

      const delta = (now - TPS.tickTimes[0]!) / (TPS.tickTimes.length - 1);
      TPS.tps = 1000 / delta;
    });
  }
}
