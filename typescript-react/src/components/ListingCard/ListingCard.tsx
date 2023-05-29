import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListingItem } from '../../types';
import { formatDate, formatPrice } from '../../utils/commons';
import styles from './listing-card.module.scss';

interface ListingCardType {
	item: ListingItem
};

const ListingCard: React.FC<ListingCardType> = ({
	item
}) => {
	const buildingTypeString = (buildingType: string): string => {
		const buildingTypeStringValue = buildingType.toLowerCase();
		return `${buildingTypeStringValue.charAt(0).toUpperCase()}${buildingTypeStringValue.slice(1)}`;
	};
	return (
		<div className={styles['listing-card__wrap']}>
			<article className={styles['listing-card']}>
				{/* @ts-ignore */}
				<span className={styles['listing-card__price']}>{`${formatPrice(item.latest_price_eur)} €`}</span>
				<ul className={styles['listing-card__properties']}>
					<li className={styles['listing-card__properties-item']}>{buildingTypeString(item.building_type)}</li>
					<li className={styles['listing-card__properties-item']}>
						{item.surface_area_m2}m<sup>2</sup>
					</li>
					<li className={styles['listing-card__properties-item']}>{`${item.rooms_count} ${item.rooms_count === 1 ? 'room' : 'rooms'}`} </li>
				</ul>
				<section className={styles['listing-card__address']}>
					<address>{`${item.postal_address.street_address}, ${item.postal_address.postal_code}, ${item.postal_address.city}`}</address>
				</section>
				{item.description &&
					<Fragment>
						<h3>Property description: </h3>
						<p>{item.description}</p>
					</Fragment>
				}
				<div className={styles['listing-card__footer']}>
					<p className={styles['listing-card__reference']}>
						{item.ref &&
							<Fragment>
								Ref: {item.ref} <br />
							</Fragment>
						}
						Last update: {formatDate(item.updated_date)}
					</p>
					<Link to={`/${item.id}/prices`} className={styles['listing-card__link']}>
						See history &rarr;
					</Link>
				</div>
			</article>
		</div>
	);
};

export default ListingCard;
