import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

export function SubscribleButton() {
  const { data: session } = useSession();

  const router = useRouter();

  async function handleSubscrible() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscrible}
      className={styles.SubsCribleButton}
    >
      SubsCrible now
    </button>
  );
}
