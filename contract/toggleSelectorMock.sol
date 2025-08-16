// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ToggleSelectorMock (Aave ↔ Morpho)
/// @notice Test-only contract: each call to `trigger()` emits the current winner
///         then switches the next call to the other protocol.
contract ToggleSelectorMock {
    enum Protocol { Aave, Morpho }

    /// @notice Emitted on every trigger.
    /// @param timestamp   Block timestamp when the decision was emitted
    /// @param protocol    The selected protocol for the upcoming period
    event BestProtocolSelected(uint256 timestamp, Protocol protocol);

    /// @dev Tracks which protocol will be emitted on the next trigger call.
    Protocol private nextProtocol;

    constructor() {
        // Start with Aave; the first call will emit Aave, then flip to Morpho.
        nextProtocol = Protocol.Aave;
    }

    /// @notice Emits the current winner and flips for the next call.
    function trigger() external {
        Protocol chosen = nextProtocol;
        emit BestProtocolSelected(block.timestamp, chosen);

        // Flip for next time
        nextProtocol = (chosen == Protocol.Aave) ? Protocol.Morpho : Protocol.Aave;
    }

    /// @notice Peek what the next trigger would emit (handy for tests).
    function previewNext() external view returns (Protocol) {
        return nextProtocol;
    }
}
