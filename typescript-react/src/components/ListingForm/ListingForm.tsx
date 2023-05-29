import { useReducer  } from 'react';
import { makeRequest } from '../../utils/requestUtil';
import { ListingItem, ListingFormState } from '../../types';
import styles from './listing-form.module.scss';

interface ListingFormType {
	listingItemCreateCallback: (item: ListingItem) => void
};

interface ListingFormActions {
	type: string;
	payload: {
		[key: string]: string | number;
	}
};

const deepMergeNestedObjects = (...objects: any): ListingFormState | {} => {
	const merge = (target: any, source: any) => {
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				if (source[key] instanceof Object && key in target) {
					merge(target[key], source[key]);
				} else {
					target[key] = source[key];
				}
			}
		}
	};
	const mergedObject = {} as ListingFormState;
	for (const obj of objects) {
		merge(mergedObject, obj);
	}
	return mergedObject;
}

const listingFormReducer = (state: ListingItem, action: ListingFormActions): ListingItem | {} => {
	const { type, payload } = action;
	switch (type) {
		case 'UPDATE_LISTING_FORM': {
			return deepMergeNestedObjects(state, payload);
		}
		default: return state;
	}
};

const ListingForm: React.FC<ListingFormType> = ({
	listingItemCreateCallback
}) => {
	const initState: ListingFormState = {
		name: '',
		description: '',
		building_type: 'STUDIO',
		latest_price_eur: '',
		surface_area_m2: '',
		rooms_count: '',
		bedrooms_count: '',
		contact_phone_number: '',
		postal_address: {
			street_address: '',
			postal_code: '',
			city: '',
			country: ''
		}
	};
	// @ts-ignore
	const [state, dispatch] = useReducer(listingFormReducer, initState);

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await makeRequest({
			url: 'listings',
			params: state,
			method: 'POST'
		});
		if (response) {
			listingItemCreateCallback(response);
			// @ts-ignore
			dispatch({ type: 'UPDATE_LISTING_FORM', payload: initState});
		}
	};

	const updateForm = (field: string, event: React.SyntheticEvent) => {
		const targetElement = event.target as HTMLFormElement;
		// we build the object tree out of 'field' string which determine the hierarchy
		const fieldObject: any = {};
		function addToTree(obj: any, path: any, value: any) {
			if (path.length === 1) {
				obj[path[0]] = value;
			} else {
				const [current, ...rest] = path;
				obj[current] = obj[current] || {};
				addToTree(obj[current], rest, value);
			}
		}
		const path = field.split('.');
    	addToTree(fieldObject, path, targetElement.value);
		// we dispatch action tu update state
		// @ts-ignore
		dispatch({ type: 'UPDATE_LISTING_FORM', payload: fieldObject});
	};

	return (
		<form className={styles['listing-form']} onSubmit={submit}>
			<div className={styles['listing-form__card']}>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="name">Name:</label>
					<input
						pattern="[A-Za-z]+"
						required
						type="text"
						value={state.name}
						name="name"
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('name', e)}
					/>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="description">Description:</label>
					<textarea
						value={state.description}
						name="description"
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('description', e)}
					/>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="building_type">Building type:</label>
					<select
						name="building_type"
						className={styles['listing-form__select']}
						onChange={(e) => updateForm('building_type', e)}
					>
						<option value="STUDIO">Studio</option>
						<option value="APARTMENT">Apartment</option>
						<option value="HOUSE">House</option>
					</select>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="latest_price_eur">Price:</label>
					<input
						pattern="[0-9]+"
						required
						type="text"
						value={state.latest_price_eur}
						name="latest_price_eur"
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('latest_price_eur', e)}
					/>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="surface_area_m2">Area:</label>
					<input
						pattern="[0-9]+"
						required
						type="text"
						value={state.surface_area_m2}
						name="surface_area_m2"
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('surface_area_m2', e)}
					/>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="rooms_count">Rooms Count:</label>
					<input
						pattern="[0-9]+"
						required
						type="text"
						value={state.rooms_count}
						name="rooms_count"
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('rooms_count', e)}
					/>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="bedrooms_count">Bedrooms Count:</label>
					<input
						pattern="[0-9]+"
						required
						type="text"
						value={state.bedrooms_count}
						name="bedrooms_count"
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('bedrooms_count', e)}
					/>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="contact_phone_number">Contact Phone Number:</label>
					<input
						pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
						required
						type="tel"
						value={state.contact_phone_number}
						name="contact_phone_number"
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('contact_phone_number', e)}
					/>
				</div>
				<div className={styles['listing-form__input-group']}>
					<label htmlFor="street_address">Postal address:</label>
					<input
						type="text"
						name="street_address"
						placeholder="Street address"
						value={state.postal_address.street_address}
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('postal_address.street_address', e)}
					/>
					<input
						type="text"
						name="postal_code"
						placeholder="Postal code"
						value={state.postal_address.postal_code}
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('postal_address.postal_code', e)}
					/>
					<input
						type="text"
						name="city"
						placeholder="City"
						value={state.postal_address.city}
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('postal_address.city', e)}
					/>
					<input
						type="text"
						name="country"
						placeholder="Country"
						value={state.postal_address.country}
						className={styles['listing-form__input-text']}
						onChange={(e) => updateForm('postal_address.country', e)}
					/>
				</div>
				<button
					type="submit"
					className={styles['listing-form__button--submit']}
				>
					Create
				</button>
			</div>
		</form>
	);
};

export default ListingForm;
