import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import tShirt1 from '../assets/1.png'
import tShirt2 from '../assets/2.png'
// import tShirt3 from '../assets/3.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={tShirt1} width={520} height={480} alt="" />
        <footer>
          <strong>T-Shirt X</strong>
          <span>$ 19,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={tShirt2} width={520} height={480} alt="" />
        <footer>
          <strong>T-Shirt X</strong>
          <span>$ 19,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
