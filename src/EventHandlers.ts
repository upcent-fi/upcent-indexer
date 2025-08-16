/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  ToggleSelectorMock,
  ToggleSelectorMock_BestProtocolSelected,
} from "generated";

ToggleSelectorMock.BestProtocolSelected.handler(async ({ event, context }) => {
  const entity: ToggleSelectorMock_BestProtocolSelected = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    timestamp: event.params.timestamp,
    protocol: event.params.protocol,
  };

  context.ToggleSelectorMock_BestProtocolSelected.set(entity);
});
