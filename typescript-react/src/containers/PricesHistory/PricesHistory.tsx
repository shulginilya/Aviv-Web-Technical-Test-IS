import { Link, useParams } from 'react-router-dom';
import PricesHistoryCard from '@components/PriceHistoryCard';

import styles from './prices-history.module.scss';

const PricesHistory: React.FC = () => {
	const { id } = useParams();
	console.log('id: ', id);
	return (
		<div className={styles['container']}>
			<h1>Prices History</h1>
			<PricesHistoryCard />
			<Link to='/' className={styles['link']}>
				&larr;	Back Home
			</Link>
		</div>
	);
};
export default PricesHistory;
