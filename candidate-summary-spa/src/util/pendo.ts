import { AnalyticInfo } from '../types/types';

let initialized = false;

export const setInitialized = (value: boolean) => {
	initialized = value;
}

export const pendoScript = () => {
	const script = document.createElement(`script`);
	const text = document.createTextNode(`(function(apiKey){
	(function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
	v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){
		o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
		y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
		z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
	})('209ceb10-1bd9-4d46-604f-d0b32469b5e3');`);
	script.appendChild(text);
	script.async = true;

	document.body.appendChild(script);
};

export const initPendo = (analyticInfo: AnalyticInfo) => {
	/*
		need to get the user info either
		in an API call to platform
		body or from API call
		
		The commented out meta data is not yet available from calling the, so for now it is commented out. Teams will have to uncomment these lines once [this ticket](https://jira.icims.net/browse/IGN-418) is complete.
		*/
	if (typeof pendo === 'undefined') {
		return;
	}

	pendo.initialize({
		visitor: {
			id: analyticInfo.id,
			userId: analyticInfo.userId,
			groupId: analyticInfo.groupId,
			groupNickName: analyticInfo.groupNickName,
			topParentGroupNickName: analyticInfo.topParentGroupNickName
		},
		account: {
			id: analyticInfo.accountId,
			customer_name: analyticInfo.customerName,
			releasePhase: analyticInfo.releasePhase,
			salesforceAccountId: analyticInfo.salesforceAccountId
		}
	});
	initialized = true;
};

export const updatePendo = (analyticInfo: AnalyticInfo) => {
	/*
				need to get the user info either
				in an API call to platform
				body or from API call
		*/

	if (initialized) {
		pendo.updateOptions({
			visitor: {
				id: analyticInfo.id,
				userId: analyticInfo.userId,
				groupId: analyticInfo.groupId,
				groupNickName: analyticInfo.groupNickName,
				topParentGroupNickName: analyticInfo.topParentGroupNickName
			},
			account: {
				id: analyticInfo.accountId,
				customer_name: analyticInfo.customerName,
				releasePhase: analyticInfo.releasePhase
			}
		});
	}
};

export const track = (trackType: string, metadata: unknown) => {
	if (initialized) {
		pendo.track(trackType, metadata);
	}
};
