import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubsCribleButtonProps {
  priceId: string;
}

export function SubscribleButton({ priceId }: SubsCribleButtonProps) {
  const { data: session } = useSession();

  async function handleSubscrible() {
    if (!session) {
      signIn("github");
      return;
    } else {
      try {
        const response = await api.post("/subscribe");

        const { sessionId } = response.data;
        console.log(sessionId);

        const stripe = await getStripeJs();

        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.log(error);
        alert(error);
      }
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
