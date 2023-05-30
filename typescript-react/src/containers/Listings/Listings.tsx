import { useEffect, useState } from 'react';
import { makeRequest } from '@/utils/requestUtil';
import { ListingItem } from './types';
import ListingCard from '@components/ListingCard';
import ListingForm from '@components/ListingForm';

import styles from './listings.module.scss';

const Listings: React.FC = () => {

	const [localListingItems, setLocalListingItems] = useState<ListingItem[] | []>([]);;

	const getListingItemsFromServer = async () => {
		const listingItems = await makeRequest({
			url: 'listings'
		});
		setLocalListingItems(listingItems);
	};

	useEffect(() => {
		getListingItemsFromServer();
	}, []);

	const listingItemCreateCallback = (item: ListingItem) => {
		const localListingItemsCopy = JSON.parse(JSON.stringify(localListingItems));
		localListingItemsCopy.unshift(item);
		setLocalListingItems(localListingItemsCopy);
	};

	return (
		<main className={styles['listings']}>
			<h1 className={styles['listings__title']}>Main Listings page</h1>
			<div className={styles['listings__wrapper']}>
				<aside className={styles['listings__aside']}>
					<h2 className={styles['listings__sub-title']}>Add a listing</h2>
					<ListingForm listingItemCreateCallback={listingItemCreateCallback} />
				</aside>
				<section className={styles['listings__section']}>
					<h2 className={styles['listings__sub-title']}>Listings</h2>
					<div className={styles['listings__section__cards']}>
						{
							localListingItems.map(l => <ListingCard key={l.id} item={l} />)
						}
					</div>
				</section>
			</div>
		</main>
	);
};

export default Listings;
