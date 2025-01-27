import CheckoutForm from "@/components/checkout/checkout-form";

export default async function Page({params}:{params: Promise<{id: string}>}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className="flex flex-col space-y-2">
       <h1 className="text-lg">Checkout</h1>
      <CheckoutForm id={parseInt(id)} />
    </div>
  );
}
