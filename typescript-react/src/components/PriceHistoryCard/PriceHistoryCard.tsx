import { useState, useEffect } from 'react';
import { makeRequest } from '../../utils/requestUtil';
import { formatDate, formatPrice } from '../../utils/commons';

import styles from './price-history-card.module.scss';

interface PriceHistoryCard {
	itemId: number;
};

interface HistoryItemsType {
	created_date: string;
	price_eur: number;
};

const PriceHistoryCard: React.FC<PriceHistoryCard> = ({
	itemId
}) => {

	const [localHistoryItems, setLocalHistoryItems] = useState<HistoryItemsType[] | []>([]);

	const getListingItemsFromServer = async () => {
		const historyListingItems = await makeRequest({
			url: `listings/${itemId}/prices`
		});
		setLocalHistoryItems(historyListingItems);
	};

	useEffect(() => {
		getListingItemsFromServer();
	}, []);

	return (
		<div className={styles['container']}>
			<table className={styles['price-card']}>
				<tbody>
					<tr className={styles['price-card__header']}>
						<th scope="col">Date</th>
						<th scope="col">Price (eur)</th>
					</tr>
					{
						localHistoryItems.length > 0 ? (
							localHistoryItems.map((item, index) => (
								<tr key={index}>
									<td>{formatDate(item.created_date, true)}</td>
									<td>{formatPrice(item.price_eur)}</td>
								</tr>
							))	
						) : (
							<tr>
								<td colSpan={2}>
									No data available
								</td>
							</tr>
						)
					}
				</tbody>
			</table>
		</div>
	);
};
export default PriceHistoryCard;
