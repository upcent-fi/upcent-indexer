/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */


import {
  ToggleSelectorMock
} from "generated";

ToggleSelectorMock.BestProtocolSelected.handler(async ({ event, context }) => {
  // Always index all events in time
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    timestamp: event.params.timestamp,
    protocol: event.params.protocol,
    blockNumber: BigInt(event.block.number),
  };
  context.bestProtocolSelected.set(entity);

  // Index or update the lastBestProtocolSelected only if this event is after the last block
  const last = await context.lastBestProtocolSelected.get("last");
  const currentBlock = BigInt(event.block.number);
  if (!last || currentBlock > BigInt(last.blockNumber)) {
    const lastEntity = {
      id: "last",
      timestamp: event.params.timestamp,
      protocol: event.params.protocol,
      blockNumber: currentBlock,
    };
    context.lastBestProtocolSelected.set(lastEntity);
  }
});
