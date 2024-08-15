declare let pendo: {
	initialize: (metadata: unknown) => void;
	updateOptions: (metadata: unknown) => void;
	track: (trackType: string, metadata: unknown) => void;
};

interface PendoMetadata {
	visitor: {
		id: string;
		userId: string;
		groupId: string;
		groupNickName: string;
		topParentGroupNickName: string;
	},
	account: {
		id: string;
		customer_name: string;
		releasePhase: string;
		salesforceAccountId: string;
	}
}
