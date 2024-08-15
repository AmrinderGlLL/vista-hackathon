import { useTranslation } from 'react-i18next';
import { EmptyState } from '@icims-design-system/mui-lab';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const { t } = useTranslation('common');
	const error = useRouteError();

	console.error(error);

	let description = '';
	if (isRouteErrorResponse(error)) {
		description = error.statusText;
	} else {
		description = t('errorCodes.0');
	}

	return (
		<EmptyState
			title={t('error')}
			description={description}
		/>
	)
}
