export interface Icart {
  _id: string;
  product: {
    _id?: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

export interface CartResponse {
  cart: {
    items: Icart[];
    totalPrice: number;
  };
}
