export const Footer = () => {
    return (
      <div className="text-black bg-[#f4efef] mt-8 border-t-1 border-gray-300">
        <ul className="mx-48 grid grid-cols-3">
          <div className="flex flex-col gap-2 py-4">
            <li className="font-semibold">Important Links</li>
            <a
              className="font-light text-gray-500 hover:text-blue-300 duration-200"
              href="https://www.linkedin.com/in/thads-michael-egar"
            >
              Contact Me
            </a>
            <li className="font-light text-gray-500  hover:text-blue-300 duration-200">
              Credits
            </li>
            <li className="font-light text-gray-500  hover:text-blue-300 duration-200">
              About
            </li>
            <li className="font-light text-gray-500  hover:text-blue-300 duration-200">
              Legal
            </li>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <li className="font-semibold">Hosting</li>
            <li className="font-light text-gray-500">Hosting Rules</li>
            <li className="font-light text-gray-500">Pet Info</li>
            <li className="font-light text-gray-500">Payment Options</li>
            <li className="font-light text-gray-500">Cleanliness Rules</li>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <li className="font-semibold">Minebnb</li>
            <li className="font-light text-gray-500">Minebnb your home</li>
            <li className="font-light text-gray-500">Minecarts</li>
            <li className="font-light text-gray-500">Careers</li>
            <li className="font-light text-gray-500">Iron golem support</li>
          </div>
        </ul>
      </div>
    );
  };