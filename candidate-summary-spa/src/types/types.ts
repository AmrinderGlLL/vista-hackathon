import {
	ProfileCardEmail,
	ProfileCardPhone,
	ProfileCardAddress,
	ProfileCardUrl
} from "@icims-design-system/mui-core/build/es/ProfileCard/ProfileCard";

export interface AnalyticInfo {
	id: string;
	userId: string;
	groupId: string;
	groupNickName: string;
	topParentGroupNickName: string;
	accountId: string;
	customerName: string;
	releasePhase: string;
	salesforceAccountId: string;
}

export interface Tab {
	id: string;
	name: string;
	component?: JSX.Element;
}

export interface Person {
	id: string;
	name: {
		givenName: string;
		surname: string;
		displayName: string
	};
	title: string;
	org: string;
	email: ProfileCardEmail[];
	phone: ProfileCardPhone[];
	address: ProfileCardAddress[];
	url: ProfileCardUrl[];
}

export type Summary = string
