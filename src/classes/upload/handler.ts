import { system, world } from "@minecraft/server";
import UploaderConfig from "../../lib/uploader";
import ServersRoute from "../../utils/API/routes/servers/route";
import TPS from "../../utils/TPS";

export default class UploadHandler {
  private static serverID: number;

  public constructor() {
    system.run(() => this.Init());
  }

  private async Init(): Promise<void> {
    const { status, data } = await ServersRoute.GetSelf();

    if (status !== 200) {
      console.error(`Failed to get server ID! Status: ${status}`);
      return;
    }

    UploadHandler.serverID = data.id;

    console.log(`Got server ID, running upload loop...`);

    system.runInterval(() => {
      ServersRoute.UpdateState(UploadHandler.serverID, {
        tps: TPS.GetTPS(),
        players: world.getAllPlayers().map((player) => {
          return {
            username: player.name,
          };
        }),
      });
    }, UploaderConfig.Speed);
  }
}
