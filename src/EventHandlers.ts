/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */

import {
  ToggleSelectorMock
} from "generated";

import { sendWebhook } from "./webhook";
import dotenv from "dotenv";

dotenv.config();

ToggleSelectorMock.BestProtocolSelected.handler(async ({ event, context }) => {
  // Always index all events in time
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    timestamp: event.params.timestamp,
    protocol: event.params.protocol,
    blockNumber: BigInt(event.block.number),
  };
  context.bestProtocolSelected.set(entity);

  const lastEntity = {
    id: "last",
    timestamp: event.params.timestamp,
    protocol: event.params.protocol,
    blockNumber: BigInt(event.block.number),
  };
  context.lastBestProtocolSelected.set(lastEntity);


  await sendWebhook(process.env.WEBHOOK_URL!, {
    id: entity.id,
    timestamp: entity.timestamp,
    protocol: entity.protocol,
    blockNumber: entity.blockNumber,
  });
});
