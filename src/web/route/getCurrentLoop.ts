import { Manager } from "../../manager.js";
import Fastify from "fastify";

export async function getCurrentLoop(client: Manager, req: Fastify.FastifyRequest, res: Fastify.FastifyReply) {
  client.logger.info(import.meta.url, `${req.method} ${req.routeOptions.url}`);
  const guildId = (req.params as Record<string, string>)["guildId"];
  const player = client.rainlink.players.get(guildId);
  if (!player) {
    res.code(404);
    res.send({ error: "Current player not found!" });
    return;
  }
  res.send({ data: player.loop });
}