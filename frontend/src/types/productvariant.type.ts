
export interface ProductVariant {
    id: number;
    productId: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    colorHex: string;
    createdAt: string;
    discountedPrice: number;
    priceFinal: number;
    largo?: string;
    alto?: string;
    ancho?: string;
    peso?: string;
    Images?: ProductVariantImage[];
}

export interface ProductVariantImage {
    id: number;
    variantId: number;
    imageUrl: string;
    Order: number;
    file :File
}

