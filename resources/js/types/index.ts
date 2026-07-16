export type Category = {
    id: number;
    name: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categories: Category[];
};

export type ProductFilters = {
    name: string | null;
    category: string | null;
};

export type ProductsIndexProps = {
    products: Product[];
    categories: Category[];
    filters: ProductFilters;
};
