// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EvidenceRegistry {

    struct Evidence {
        string caseId;
        string officerName;
        address uploader;
        uint256 timestamp;
    }

    mapping(string => Evidence) private evidences;

    event EvidenceRegistered(
        string fileHash,
        address indexed uploader,
        uint256 timestamp
    );

    function registerEvidence(
        string memory fileHash,
        string memory caseId,
        string memory officerName
    ) public {

        require(
            evidences[fileHash].timestamp == 0,
            "Evidence already registered"
        );

        evidences[fileHash] = Evidence({
            caseId: caseId,
            officerName: officerName,
            uploader: msg.sender,
            timestamp: block.timestamp
        });

        emit EvidenceRegistered(fileHash, msg.sender, block.timestamp);
    }

    function getEvidence(string memory fileHash)
        public
        view
        returns (
            string memory,
            string memory,
            address,
            uint256
        )
    {
        Evidence memory e = evidences[fileHash];

        return (
            e.caseId,
            e.officerName,
            e.uploader,
            e.timestamp
        );
    }
}
