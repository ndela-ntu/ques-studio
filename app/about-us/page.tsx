export default function Page() {
  return (
    <div className="flex flex-col space-y-4 text-center">
      <h1 className="text-4xl text-cinereous font-bold">About Us</h1>
      <p>
        Welcome to Ques Studio, where creativity meets craftsmanship. We are a
        dynamic design studio dedicated to turning your ideas into beautifully
        printed products. Whether it's a custom phone case, a personalized mug,
        a unique t-shirt, or even a jigsaw puzzle, we specialize in transforming
        your vision into high-quality, one-of-a-kind items. At Ques, we believe
        in the power of personalization. Our talented team works with you to
        bring your designs to life, using state-of-the-art printing technology
        and the best materials available. From vibrant colors and sharp details
        to durable finishes, every product we create is a reflection of your
        personal style and creativity. We offer a wide range of customizable
        products, including:
      </p>
      <ul className="list-disc flex flex-col space-y-2.5">
        <li className="">
          <strong>Phone Cases</strong>
          <p>Protect your device with a design that's as unique as you are.</p>
        </li>
        <li className="">
          <strong>Mugs</strong>
          <p>
            Enjoy your favorite drink in a mug that speaks to your personality.
          </p>
        </li>
        <li className="">
          <strong>T-shirts</strong>
          <p>Wear your creativity with custom prints that turn heads.</p>
        </li>
        <li className="">
          <strong>Caps</strong>
          <p>Top off your look with personalized headwear.</p>
        </li>
        <li className="">
          <strong>Jigsaws</strong>
          <p>
            Challenge your mind with custom jigsaw puzzles featuring your
            favorite images.
          </p>
        </li>
        <li className="">
          <strong>Photo Prints</strong>
          <p>Turn your best memories into stunning wall art.</p>
        </li>
      </ul>
      <p>
        At Ques Studio, we are passionate about delivering products that not
        only meet but exceed your expectations. Our mission is simple: to help
        you express yourself through custom prints, with impeccable quality and
        exceptional service every step of the way. Let us bring your ideas to
        life—one print at a time.
      </p>
    </div>
  );
}
