import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { useShoppingCart } from "use-shopping-cart"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product } : ProductProps) {
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  // async function handleBuyProduct(){
  //   try{
  //     setIsCreatingCheckoutSession(true)

  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId,
      
  //     })

  //     const { checkoutUrl } = response.data

  //     window.location.href = checkoutUrl
  //   } catch (err){
  //     // Connect this  with a watching tool (Datadog / Sentry)
  //     setIsCreatingCheckoutSession(false)
  //     alert('Fail redirecting to checkout')
  //   }
  // }

  const { addItem } = useShoppingCart()

  function handleAddProductToCart(product: any){
    const newPrice = parseFloat(product.price.replace('$', ''))

    addItem({
      id: product.id,	 
      name: product.name, 
      price: newPrice * 100, 
      currency: 'USD',
      image: product.imageUrl
    })
  }

  const { isFallback } = useRouter()

  if(isFallback){
    return <p>Loading...</p>
  }

  return(
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
        
          <button onClick={() => handleAddProductToCart(product)}>Put on the bag</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return{
    paths: [
      { params: { id: 'prod_RBFtBYHE6V4Zzg' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params!.id)
  
  const product = await stripe.products.retrieve(productId , {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return{
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1
  }
}