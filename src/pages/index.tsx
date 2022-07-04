/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { SubscribleButton } from "../components/SubscribleButton";
import Head from "next/head";

import styles from "./home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribleButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="girl conding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LFiUyHTfvyPUkj49gTjfz9j");
  const product = {
    priceId: price.id,
    amount: Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price.unit_amount) / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
