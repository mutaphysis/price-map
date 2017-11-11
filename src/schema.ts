import SimpleSchema from 'simpl-schema';

// zero? cost string wrapper to make string types typesafe
export namespace IdHelper {
    export function make<T extends String>(s: string): T {
        // tslint:disable-next-line:no-any
        return (s as any as T);
    }
    export function take<T extends String>(s: T): string {
        // tslint:disable-next-line:no-any
        return (s as any as string);
    }
}

export interface UserId extends String {
    // used to differentiate between the other id implementations, ensure the name of the property is unique
    _UserId: never;
}
export interface ProductId extends String {
    // used to differentiate between the other id implementations, ensure the name of the property is unique
    _ProductId: never;
}
export interface PlaceId extends String {
    // used to differentiate between the other id implementations, ensure the name of the property is unique
    _PlaceId: never;
}

export type Price = {
    product: ProductId,
    place: PlaceId,
    creator: UserId,
    price: { value: number, unit: 'EUR' },
    collectedAt: number,
};

export type Product = {
    creator: UserId,
    name: string,
    amount: { value: number, unit: 'liter' | 'gram' },
};

export type Place = {
    creator: UserId,
    address: string,
    name: string,
    latitude: number,
    longitude: number,
};

export const PriceSchema = new SimpleSchema({
    product: String,
    place: String,
    creator: String,
    price: Object,
    'price.$.value': Number, 
    'price.$.unit': {
        type: String,
        allowedValues: ['EUR']
    },
    collectedAt: SimpleSchema.Integer
});

export const ProductsSchema = new SimpleSchema({
    creator: String,
    name: String,
    'amount.$.value': Number, 
    'amount.$.unit': {
        type: String,
        allowedValues: ['liter', 'gram']
    },
});

export const PlacesSchema = new SimpleSchema({
    creator: String,
    address: String,
    name: String,
    latitude: Number,
    longitude: Number,
});