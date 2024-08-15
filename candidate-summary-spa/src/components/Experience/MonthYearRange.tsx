// stolen from resume-spa
import React, { useMemo } from 'react';
import * as PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { formatDate } from '@icims-design-system/i18next';

const MonthYearRange = ({ startDate, endDate, dateDifference, typographyProps }) => {
	const { t } = useTranslation('resume');

	const formatMonthYearRange = useMemo(
		() => {
			if (endDate && startDate) {
				return `${t('parsed_resume.date_range', {
					startDate: formatDate(startDate, 'monthAndYear'),
					endDate: formatDate(endDate, 'monthAndYear')
				})}`;
			} else if (startDate) {
				if (new Date(startDate) > new Date()) {
					return `${t('parsed_resume.date_range_no_end_ongoing', {
						startDate: formatDate(startDate, 'monthAndYear')
					})}`;
				}
				return `${t('parsed_resume.date_range_no_end', {
					startDate: formatDate(startDate, 'monthAndYear')
				})}`;
			} else if (endDate) {
				if (new Date(endDate) > new Date()) {
					return `${t('parsed_resume.date_range_no_start_ongoing', {
						endDate: formatDate(endDate, 'monthAndYear')
					})}`;
				}
				return `${t('parsed_resume.date_range_no_start', {
					endDate: formatDate(endDate, 'monthAndYear')
				})}`;
			}
			return '';
		},
		[t, startDate, endDate]
	);

	const formatDateDifference = useMemo(
		() => {
			if (
				typeof dateDifference === 'undefined' ||
				dateDifference === null ||
				(dateDifference.years === 0 && dateDifference.months === 0)
			) {
				return '';
			}

			let result = '';
			if (dateDifference.years !== 0) {
				result = t('parsed_resume.year', { count: dateDifference.years });
			}

			if (dateDifference.months !== 0) {
				if (result !== '') {
					result = `${result} `;
				}
				result = `${result}${t('parsed_resume.month', { count: dateDifference.months })}`;
			}
			return result;
		},
		[dateDifference, t]
	);

	return (
		<Typography {...typographyProps}>
			{formatMonthYearRange}
			{formatDateDifference === '' ? '' : ' \u2022 '}
			{formatDateDifference}
		</Typography>
	);
};

MonthYearRange.propTypes = {
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	typographyProps: PropTypes.shape({}),
	dateDifference: PropTypes.shape({
		years: PropTypes.number,
		months: PropTypes.number
	})
};

export default MonthYearRange;
