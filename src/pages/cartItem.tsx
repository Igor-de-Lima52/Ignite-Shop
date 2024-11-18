import { X } from "phosphor-react";
import { CartItemContainer, CartItemsDiv, ItemContainer, PaymentContainer, PriceContainer } from "../styles/pages/cartItem";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import axios from "axios";

interface CartItemProps{
  isOpen: boolean;
  closeCart: () => void;
}

export function CartItem({ isOpen, closeCart }: CartItemProps){
  
  const { cartDetails, totalPrice, cartCount, removeItem } = useShoppingCart()

  const formattedData = Object.entries(cartDetails!).map(([key, value]) => {
    return {
      product_id: key,
      ...value,
    }
  })

  async function handleCheckout() {
    try{
      const response = await axios.post('/api/checkout', { 
        items: formattedData
      })

      const { checkoutUrl } = await response.data

      if(!checkoutUrl){
        alert('Failed to retrieve checkout URL.')
        return
      }

      // const { sessionId } = await response.data

      window.location.href = checkoutUrl
      // redirectToCheckout(sessionId)
    } catch{
      alert('Fail redirecting to checkout')
    }
  }


  return(
        <CartItemContainer data-open={isOpen}>
              <button onClick={closeCart}>
                <X size={20}/>
              </button>
              <h4>Cart</h4>
            <CartItemsDiv>
            {formattedData && formattedData.map(item => (
              <ItemContainer key={item.product_id}>
                <div>
                  <Image src={item.image!} alt="" width={100} height={93}/>
                </div>
                <div>
                  <span>{item.name}</span>
                  <strong>${(item.price / 100).toFixed(2)}</strong>
                  <button onClick={() => removeItem(item.product_id)}>Remove</button>
                </div>
              </ItemContainer>
            ))}
            </CartItemsDiv>
            <PaymentContainer>
              <PriceContainer>
                <div>
                  <span>Quantity</span>
                  <span>
                    {cartCount === 1 ? `${cartCount} item` : `${cartCount} items`}
                  </span>
                </div>
                <div>
                  <strong>Total value</strong>
                  <strong>${(totalPrice! / 100).toFixed(2)}</strong>
                </div>
              </PriceContainer>
              <button onClick={handleCheckout}>Finish purchase</button>
            </PaymentContainer>
          </CartItemContainer>
  )
}