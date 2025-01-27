import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://payments.yoco.com/api/webhooks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    const subscriptions = data.subscriptions;
    const hookExists =
      subscriptions.find(
        (subscription: { name: string }) =>
          subscription.name === "Await-Webhook"
      ) !== undefined;
      
    return NextResponse.json({ hookExists, subscriptions });
  } catch (error) {
    console.error(error);
  }
}
