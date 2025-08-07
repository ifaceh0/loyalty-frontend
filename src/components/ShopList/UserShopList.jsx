import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faIdBadge, faPhoneAlt, faFilter } from '@fortawesome/free-solid-svg-icons';

// Constants
const ITEMS_PER_PAGE = 8;

// Hardcoded shop data (30 shops)
const hardcodedShops = [
  { shopId: 1, shopName: "Blue Horizon Store", shopPhone: "123-456-7890", country: "USA", city: "New York", pincode: "10001" },
  { shopId: 2, shopName: "Sunny Mart", shopPhone: "234-567-8901", country: "Canada", city: "Toronto", pincode: "M5V2T6" },
  { shopId: 3, shopName: "Green Valley Shop", shopPhone: "345-678-9012", country: "India", city: "Mumbai", pincode: "400001" },
  { shopId: 4, shopName: "Starlight Boutique", shopPhone: "456-789-0123", country: "USA", city: "Los Angeles", pincode: "90001" },
  { shopId: 5, shopName: "Maple Grocery", shopPhone: "567-890-1234", country: "Canada", city: "Vancouver", pincode: "V6B1G1" },
  { shopId: 6, shopName: "Golden Emporium", shopPhone: "678-901-2345", country: "India", city: "Delhi", pincode: "110001" },
  { shopId: 7, shopName: "Ocean Breeze Store", shopPhone: "789-012-3456", country: "USA", city: "Miami", pincode: "33101" },
  { shopId: 8, shopName: "Pinewood Market", shopPhone: "890-123-4567", country: "Canada", city: "Ottawa", pincode: "K1P5G3" },
  { shopId: 9, shopName: "Silver Plaza", shopPhone: "901-234-5678", country: "India", city: "Bangalore", pincode: "560001" },
  { shopId: 10, shopName: "Crystal Corner", shopPhone: "012-345-6789", country: "USA", city: "Chicago", pincode: "60601" },
  { shopId: 11, shopName: "Ruby Outlet", shopPhone: "123-456-7891", country: "Canada", city: "Montreal", pincode: "H3B2Y5" },
  { shopId: 12, shopName: "Emerald Hub", shopPhone: "234-567-8902", country: "India", city: "Chennai", pincode: "600001" },
  { shopId: 13, shopName: "Skyline Shop", shopPhone: "345-678-9013", country: "USA", city: "Houston", pincode: "77001" },
  { shopId: 14, shopName: "Maple Leaf Store", shopPhone: "456-789-0124", country: "Canada", city: "Calgary", pincode: "T2P4K9" },
  { shopId: 15, shopName: "Lotus Mart", shopPhone: "567-890-1235", country: "India", city: "Hyderabad", pincode: "500001" },
  { shopId: 16, shopName: "Sunrise Boutique", shopPhone: "678-901-2346", country: "USA", city: "Seattle", pincode: "98101" },
  { shopId: 17, shopName: "Northern Lights Shop", shopPhone: "789-012-3457", country: "Canada", city: "Edmonton", pincode: "T5J2G8" },
  { shopId: 18, shopName: "Spice Market", shopPhone: "890-123-4568", country: "India", city: "Kolkata", pincode: "700001" },
  { shopId: 19, shopName: "Desert Rose Store", shopPhone: "901-234-5679", country: "USA", city: "Phoenix", pincode: "85001" },
  { shopId: 20, shopName: "Frosty Plaza", shopPhone: "012-345-6790", country: "Canada", city: "Quebec City", pincode: "G1R4P5" },
  { shopId: 21, shopName: "Mango Grove Shop", shopPhone: "123-456-7892", country: "India", city: "Pune", pincode: "411001" },
  { shopId: 22, shopName: "Urban Hub", shopPhone: "234-567-8903", country: "USA", city: "Boston", pincode: "02101" },
  { shopId: 23, shopName: "Polar Star Market", shopPhone: "345-678-9014", country: "Canada", city: "Winnipeg", pincode: "R3B0Y3" },
  { shopId: 24, shopName: "Saffron Store", shopPhone: "456-789-0125", country: "India", city: "Ahmedabad", pincode: "380001" },
  { shopId: 25, shopName: "Coastal Corner", shopPhone: "567-890-1236", country: "USA", city: "San Francisco", pincode: "94101" },
  { shopId: 26, shopName: "Riverfront Shop", shopPhone: "678-901-2347", country: "Canada", city: "Halifax", pincode: "B3J1S9" },
  { shopId: 27, shopName: "Peacock Plaza", shopPhone: "789-012-3458", country: "India", city: "Jaipur", pincode: "302001" },
  { shopId: 28, shopName: "Cityscape Mart", shopPhone: "890-123-4569", country: "USA", city: "Denver", pincode: "80201" },
  { shopId: 29, shopName: "Aurora Outlet", shopPhone: "901-234-5680", country: "Canada", city: "Regina", pincode: "S4P3Y2" },
  { shopId: 30, shopName: "Tulip Emporium", shopPhone: "012-345-6791", country: "India", city: "Lucknow", pincode: "226001" },
];

export default function ExploreShops() {
  // State
  const [shops] = useState(hardcodedShops);
  const [filteredShops, setFilteredShops] = useState(hardcodedShops);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ country: '', city: '', pincode: '' });
  const filterRef = useRef(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter shops based on search term and filters
  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = hardcodedShops.filter(shop =>
      shop.shopName.toLowerCase().includes(lowerSearchTerm) &&
      (filters.country === '' || shop.country.toLowerCase() === filters.country.toLowerCase()) &&
      (filters.city === '' || shop.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (filters.pincode === '' || shop.pincode.toLowerCase().includes(filters.pincode.toLowerCase()))
    );
    setFilteredShops(filtered);
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Handle Visit Shop button click
  const handleVisitShop = (shop) => {
    console.log(`Visiting shop: ${shop.shopName} (ID: ${shop.shopId})`);
    // Example: Navigate to shop page (uncomment if using react-router-dom)
    // navigate(`/shop/${shop.shopId}`);
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Pagination
  const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
  const currentShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 sm:p-6 rounded-xl shadow-inner min-h-screen">
      {/* Header */}
      <motion.h1
        className="text-2xl sm:text-3xl font-extrabold text-center text-blue-700 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🛍️ Explore Loyalty Shops
      </motion.h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-center mb-8 sm:mb-10 gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search shops by name..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-colors"
          aria-label="Search shops by name"
        />
        <div className="relative" ref={filterRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-expanded={isFilterOpen}
            aria-controls="filter-dropdown"
          >
            <FontAwesomeIcon icon={faFilter} />
            Filter
          </motion.button>
          {isFilterOpen && (
            <motion.div
              id="filter-dropdown"
              className="absolute right-0 mt-2 w-full sm:w-72 bg-white rounded-lg shadow-xl p-5 z-10 border border-gray-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <label htmlFor="country-filter" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  id="country-filter"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  aria-label="Filter by country"
                >
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  id="city-filter"
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  placeholder="Enter city"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  aria-label="Filter by city"
                />
              </div>
              <div>
                <label htmlFor="pincode-filter" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  id="pincode-filter"
                  type="text"
                  name="pincode"
                  value={filters.pincode}
                  onChange={handleFilterChange}
                  placeholder="Enter pincode"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  aria-label="Filter by pincode"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Shop Grid */}
      {filteredShops.length === 0 ? (
        <p className="text-center text-gray-600 font-medium mt-10 text-lg">
          No shops found matching your search or filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-14">
          {currentShops.map((shop, index) => (
            <motion.div
              key={shop.shopId}
              className="bg-white shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition w-full max-w-sm min-h-[360px] flex flex-col rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faStore} className="text-xl" />
                <h3 className="text-lg font-semibold truncate" title={shop.shopName}>{shop.shopName}</h3>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                  <p className="text-gray-800 text-sm">
                    <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-blue-600" />
                    <strong>Shop ID:</strong> {shop.shopId}
                  </p>
                  <p className="text-gray-800 text-sm">
                    <strong>Country:</strong> {shop.country}
                  </p>
                  <p className="text-gray-800 text-sm">
                    <strong>City:</strong> {shop.city}
                  </p>
                  <p className="text-gray-800 text-sm">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-600" />
                    <strong>Phone:</strong> {shop.shopPhone}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm bg-blue-600 hover:bg-blue-700 transition shadow-sm"
                  onClick={() => handleVisitShop(shop)}
                  aria-label={`Visit ${shop.shopName}`}
                >
                  Visit Shop
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 sm:mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full text-sm font-semibold border-2 bg-white text-blue-600 border-blue-300 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'
              }`}
              aria-label={`Page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-full text-sm font-semibold border-2 bg-white text-blue-600 border-blue-300 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}