import Link from "next/link";
import { ImageContainer, ImagesContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
  }[]
}

export default function Product({ customerName, products }: SuccessProps) {

  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [])

  return(
    <>
      <Head>
        <title>Purchase made | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImagesContainer>
          {
            products.map(product => (
              <ImageContainer key={product.id}>
                <Image src={product.imageUrl} width={130} height={133} alt="" />
              </ImageContainer>
            ))
          }
        </ImagesContainer>
        <h1>Purchase made!</h1>
        <p>
          Uhuul, <strong>{customerName}</strong>, your purcharse of {products.length} T-shirts is already on the way to your house.
        </p>

        <Link href="/">
          Go back to catalog
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id){
    return{
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name;
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return{
    props: {
      customerName,
      products
    }
  }
}