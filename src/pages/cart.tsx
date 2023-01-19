import { FC } from "react";
import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface CartProps {}

const Cart: FC<CartProps> = ({}) => {
  const { cartItems } = useShoppingCart();
  return (
    <div>
      <h1 className="text-center text-2xl">Cart</h1>
      <div className="border-4 border-red-500">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
