/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */

import {
  ToggleSelectorMock
} from "generated";

import { sendEmail } from "./email";
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


  let protocolMsg = '';
  const protocolNum = Number(entity.protocol);
  if (protocolNum === 0) {
    protocolMsg = 'You should move your funds to Aave.';
  } else if (protocolNum === 1) {
    protocolMsg = 'You should move your funds to Morpho.';
  } else {
    protocolMsg = 'Unknown protocol.';
  }

  // Convert timestamp (assumed seconds) to human-readable string
  const date = new Date(Number(entity.timestamp) * 1000);
  const dateStr = date.toLocaleString();

  if (!context.isPreload) {
    await sendEmail({
      to: process.env.NOTIFY_EMAIL!,
      subject: 'Better protocol detected on Upcent',
      text: `Timestamp: ${dateStr}\n${protocolMsg}`
    });
  }

  console.log(`Best protocol selected: ${protocolMsg} at ${dateStr}`);
});
