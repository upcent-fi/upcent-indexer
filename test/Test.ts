import assert from "assert";
import { 
  TestHelpers,
  ToggleSelectorMock_BestProtocolSelected
} from "generated";
const { MockDb, ToggleSelectorMock } = TestHelpers;

describe("ToggleSelectorMock contract BestProtocolSelected event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for ToggleSelectorMock contract BestProtocolSelected event
  const event = ToggleSelectorMock.BestProtocolSelected.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("ToggleSelectorMock_BestProtocolSelected is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await ToggleSelectorMock.BestProtocolSelected.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualToggleSelectorMockBestProtocolSelected = mockDbUpdated.entities.ToggleSelectorMock_BestProtocolSelected.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedToggleSelectorMockBestProtocolSelected: ToggleSelectorMock_BestProtocolSelected = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      timestamp: event.params.timestamp,
      protocol: event.params.protocol,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualToggleSelectorMockBestProtocolSelected, expectedToggleSelectorMockBestProtocolSelected, "Actual ToggleSelectorMockBestProtocolSelected should be the same as the expectedToggleSelectorMockBestProtocolSelected");
  });
});
