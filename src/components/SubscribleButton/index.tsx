import styles from "./styles.module.scss";

interface SubsCribleButtonProps {
  priceId: string;
}

export function SubscribleButton({ priceId }: SubsCribleButtonProps) {
  return (
    <button type="button" className={styles.SubsCribleButton}>
      SubsCrible now
    </button>
  );
}
