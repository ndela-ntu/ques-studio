export default function Page() {
  return (
    <div className="min-h-screen flex flex-col space-y-4 text-center p-2">
      <h1 className="text-4xl text-cinereous font-bold">Contact Details</h1>
      <ul className="flex flex-col">
        <li>
          <div className="flex space-x-2.5">
            <strong>Email:</strong>
            <span>email@email.com</span>
          </div>
        </li>
        <li>
          <div className="flex space-x-2.5">
            <strong>Email:</strong>
            <span>+1234567890</span>
          </div>
        </li>
        <li>
          <div className="flex space-x-2.5">
            <strong>Address</strong>
            <span>1000 Street Name, Devland, Soweto, 1811</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
