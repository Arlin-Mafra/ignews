/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { SubscribleButton } from "../components/SubscribleButton";

import styles from "./home.module.scss";
export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome</span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for $9,90 month</span>
          </p>

          <SubscribleButton />
        </section>
        <img src="/images/avatar.svg" alt="girl in conde" />
      </main>
    </>
  );
}
