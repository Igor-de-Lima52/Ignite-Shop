import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg"
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { Handbag } from "phosphor-react";
import { useState } from "react";
import { CartItem } from "./cartItem";
import { CartProvider } from "use-shopping-cart";
import { usePathname } from "next/navigation";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()

  const isSuccessRoute = pathname === '/success'  

  function toggleCart(){
    setIsOpen(prev => !prev)
  }

  return (
    <Container>
      <CartProvider
        cartMode="checkout-session"
        stripe={String(process.env.STRIPE_PUBLIC_KEY)}
        currency="USD"
        shouldPersist={true}
      >
        <Header data-issuccess={isSuccessRoute}>
          <Image src={logoImg} alt="" />
          <button onClick={toggleCart}>
            <Handbag size={20}/>
          </button>
        </Header>
        <Component {...pageProps} />
        <CartItem isOpen={isOpen} closeCart={toggleCart}/>
      </CartProvider>
    </Container>
  )
}
