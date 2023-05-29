import { render } from '@testing-library/react';
import ListingCard from './ListingCard';

describe('<ListingCard /> test suite', () => {
	it('Should render the <ListingCard /> component', () => {
		const itemSample = {
			bedrooms_count: 4,
			building_type: 'STUDIO',
			contact_phone_number: "+917403760588",
			created_date: "2023-01-17T16:33:36.136174",
			description: "",
			id: 6,
			latest_price_eur: 935000,
			name: "Willy Goossens",
			postal_address: {
				city: "Tervuren",
				country: "BE",
				postal_code: "3154",
				street_address: "Hannesring 34"
			},
			rooms_count: 6,
			surface_area_m2: 436,
			updated_date: "2023-01-17T16:33:36.136179"
		}
		// @ts-ignore
		render(<ListingCard item={itemSample} />);
	});
});
