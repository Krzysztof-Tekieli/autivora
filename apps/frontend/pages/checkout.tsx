import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const { adId, package: pkg } = router.query;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Ad ID: {adId}</p>
      <p>Package: {pkg}</p>
      <p>Tutaj będzie Stripe Checkout</p>
    </div>
  );
}
