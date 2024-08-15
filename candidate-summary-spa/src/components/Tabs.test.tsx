import { render, screen, waitFor } from 'test-utils';

import Tabs from './Tabs';

const createTabsData = () => {
	return [{ id: '1', name: 'Tab 1' }, { id: '2', name: 'Tab 2' }];
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => { };

it('renders Tabs', async () => {
	const data = createTabsData();

	render(<Tabs data={data} value={'1'} onChange={noop} />);

	expect(await screen.findByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
	expect(await screen.findByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
});

it('calls onChange with the tab id when a tab is clicked', async () => {
	const data = createTabsData();
	const onChange = vi.fn();

	const { user } = render(<Tabs data={data} value={false} onChange={onChange} />);

	const tab1 = await screen.findByRole('tab', { name: 'Tab 1' });
	const tab2 = await screen.findByRole('tab', { name: 'Tab 2' });

	await user.click(tab1);
	await waitFor(() => expect(onChange).toHaveBeenCalledWith('1'));

	await user.click(tab2);
	await waitFor(() => expect(onChange).toHaveBeenCalledWith('2'));
});
