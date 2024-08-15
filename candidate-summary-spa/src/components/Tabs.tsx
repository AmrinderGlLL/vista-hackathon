import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';
import { Tab as TabType } from '../types/types';
import { SyntheticEvent } from 'react';

export interface TabsProps {
	readonly data: TabType[];
	readonly value: TabType['id'] | false;
	readonly onChange: (tabId: TabType['id']) => void;
}

export default function Tabs({ data, value = false, onChange }: TabsProps) {
	const handleChange = (_event: SyntheticEvent<Element, Event>, newValue: string) => {
		onChange(newValue);
	};

	return (
		<MuiTabs value={value} onChange={handleChange}>
			{data.map((tab) => (
				<MuiTab key={tab.id} label={tab.name} value={tab.id} id={`tab-${tab.id}`} aria-controls={`tabpanel-${tab.id}`} />
			))}
		</MuiTabs>
	);
}
