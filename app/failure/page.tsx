import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className="pb-28">
      <span>Failed to submit transaction. Please try again.</span>
      <Link
        className="bg-cinereous rounded-lg text-white px-2.5 py-1.5"
        href={`/checkout/${parseInt(id)}`}
      >
        Checkout
      </Link>
    </div>
  );
}
