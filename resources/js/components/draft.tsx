import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">MyApp</div>

        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="hover:text-blue-600 text-gray-800">Home</a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-600 text-gray-800">About</a>
          </li>

          {/* Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="hover:text-blue-600 text-gray-800 cursor-pointer">
              Resources <span className="ml-1">▼</span>
            </span>
            
            {showDropdown && (
              <ul className="absolute top-full mt-2 left-0 bg-white border rounded shadow-lg w-40 z-10">
                <li>
                  <a href="#blog" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">Blog</a>
                </li>
                <li>
                  <a href="#docs" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">Docs</a>
                </li>
                <li>
                  <a href="#tutorials" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">Tutorials</a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="#contact" className="hover:text-blue-600 text-gray-800">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
