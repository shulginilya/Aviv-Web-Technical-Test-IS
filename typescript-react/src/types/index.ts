export interface ListingFormState {
	name: string;
	description: string;
	building_type: 'STUDIO' | 'APARTMENT' | 'HOUSE';
	latest_price_eur: number | '';
	surface_area_m2: number | '',
	rooms_count: number | '',
	bedrooms_count: number | '',
	contact_phone_number: string;
	postal_address: {
		street_address: string;
		postal_code: string;
		city: string;
		country: string
	}
};

export interface ListingItem extends ListingFormState {
	id: number;
	created_date: string;
	updated_date: string;
	ref?: string;
}