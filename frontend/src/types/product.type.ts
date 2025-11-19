// CORREGIDO - interfaces con nombres consistentes
export interface Producto {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  sku: string;
  active: boolean;
  discount: string; 
  category: number; 
  brand: number;
  large: string;
  width: string;   
  height: string; 
  weight: string; 
  tags: string[];
  images?: Image[];
  faqs?: Faq[];  
}

export interface Image {
  fileImage: File;
  fileName: string;
  order?: number;
  url?: string;
}

export interface Faq {  
  pregunta: string;  
  respuesta: string;    
}