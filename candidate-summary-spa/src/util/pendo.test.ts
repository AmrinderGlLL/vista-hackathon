import { AnalyticInfo } from '../types/types';
import { initPendo, pendoScript, setInitialized, track, updatePendo } from './pendo';

const createAnalyticInfo = (): AnalyticInfo => ({
	id: 'id',
	userId: 'userId',
	groupId: 'groupId',
	groupNickName: 'groupNickName',
	topParentGroupNickName: 'topParentGroupNickName',
	accountId: 'accountId',
	customerName: 'customerName',
	releasePhase: 'releasePhase',
	salesforceAccountId: 'salesforceAccountId'
});

describe('pendoScript', () => {
	it('should append pendo script to the head', () => {
		vi.spyOn(document.body, 'appendChild');

		pendoScript();

		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(document.body.appendChild).toHaveBeenCalled();
	});
});

describe('initPendo', () => {
	it('should initialize pendo with the given analytic info', () => {
		const analyticInfo = createAnalyticInfo();

		vi.stubGlobal('pendo', { initialize: vi.fn() });

		initPendo(analyticInfo);

		expect(pendo.initialize).toHaveBeenCalledWith({
			visitor: {
				id: analyticInfo.id,
				userId: analyticInfo.userId,
				groupId: analyticInfo.groupId,
				groupNickName: analyticInfo.groupNickName,
				topParentGroupNickName: analyticInfo.topParentGroupNickName,
			},
			account: {
				id: analyticInfo.accountId,
				customer_name: analyticInfo.customerName,
				releasePhase: analyticInfo.releasePhase,
				salesforceAccountId: analyticInfo.salesforceAccountId,
			},
		});
	});

	it('does not throw error if pendo is not defined', () => {
		const analyticInfo = createAnalyticInfo();

		initPendo(analyticInfo);
	});
});

describe('updatePendo', () => {
	it('does nothing if not initialized', () => {
		setInitialized(false);

		const analyticInfo = createAnalyticInfo();

		vi.stubGlobal('pendo', { updateOptions: vi.fn() });

		updatePendo(analyticInfo);

		expect(pendo.updateOptions).not.toHaveBeenCalled();
	});

	it('calls updateOptions if initialized', () => {
		setInitialized(true);

		const analyticInfo = createAnalyticInfo();

		vi.stubGlobal('pendo', { updateOptions: vi.fn() });

		updatePendo(analyticInfo);
	});
});

describe('track', () => {
	it('calls pendo.track with the given track type and metadata', () => {
		setInitialized(true);

		vi.stubGlobal('pendo', { track: vi.fn() });

		track('trackType', { metadata: 'metadata' });

		expect(pendo.track).toHaveBeenCalledWith('trackType', { metadata: 'metadata' });
	});

	it('does nothing if not initialized', () => {
		setInitialized(false);

		vi.stubGlobal('pendo', { track: vi.fn() });

		track('trackType', { metadata: 'metadata' });

		expect(pendo.track).not.toHaveBeenCalled();
	});
});
