import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useShoppingCart } from "src/context/ShoppingCartContex";
import { formatCurrency } from "src/utilities/FormatCurrency";

import type { CreateOrderLine, Product } from "Src/api/Dto";

import "src/css/CartItem.css";

interface CartItemProps {
  quantity: number;
  id: number;
}

export function CartItem({ quantity, id }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [, setOrder] = useState<CreateOrderLine[]>([]);
  const [, setOrderIsLoading] = useState(false);
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [, setProductIsLoading] = useState(false);

  React.useEffect(() => {
    setOrderIsLoading(true);
    const path = `/api/Order/`;
    axios.get(path).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    setProductIsLoading(true);
    const path = `/api/Product/`;
    axios.get(path).then((response) => {
      setProductItem(response.data);
      setProductIsLoading(false);
    });
  }, []);

  const item = productItem.find((product) => product.productId === id);
  if (item === null) {
    return null;
  }

  return (
    <>
      <Helmet title="CartItem" />
      {item && (
        <Stack key={item.productId} className="cart-item-container" direction="horizontal" gap={2}>
          <img className="cart-item-img" src={item.imageUrl} />
          <div className="cart-item-body">
            <div className="cart-item-text-primary">
              {item.name} <br />
              {quantity > 1 && <span className="cart-item-text-secondary">{quantity}st</span>}
            </div>
            <div className="cart-item-text-secondary">{formatCurrency(item.price)}</div>
            <div className="cart-item-text-third">{formatCurrency(item.price * quantity)}</div>
          </div>
          <div className="cart-item-btn-container">
            <Button className="cart-item-btn cart-item-remove-btn" onClick={() => removeFromCart(id)}>
              &times;
            </Button>
          </div>
        </Stack>
      )}
    </>
  );
}
