
export interface ProductItem {
    productoid: number;
    name: string;
    description: string;
    categoryId: number;
    categotyName: string;
    brandId: number;
    brandName: string;
    price: number;
    stock: number;
    discount: number;
    active: boolean;
    sku: string;
    sales: number;
    Tags: Tags[];
    Images : ImageItem[];
    // Variants: [Image][];
}

export interface ImageItem {
    idImage: number;
    url: string;
    order: number;
}

export interface Tags{
    idTag: number;
    name: string;
    idProduct: number;
}

