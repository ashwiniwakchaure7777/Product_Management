import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const InventoryDashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const navigate = useNavigate();

  // Fetch products data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/product/getAllProducts"
        );
        setProducts(response.data.products || []); // Ensure `products` is always an array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const gotoAddProduct = () => {
    navigate("/addnewproduct"); // Adjust the route here if needed
  };

  // Check if `products` is an array; fallback to empty array if not
  const productsArray = Array.isArray(products) ? products : [];

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = productsArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(productsArray.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render loading state if products are still being fetched
  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

   // Handle click on a row
   const handleRowClick = (_id) => {
    navigate(`/getproductdetails/${_id}`); // Navigate to product details page
  };
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-[1352px] left-[88px] bg-slate-100">
        <Topbar />
        {/* Inventory summary */}
        <div className="w-[1311px] absolute top-[107px] left-[109px] flex-col">
          <div className="h-[36px] w-[100%] flex justify-between mb-[20px]">
            <div className="text-[16px] font-[500] text-[#45464E]">
              <p>Inventory Summary</p>
            </div>
            <button
              onClick={gotoAddProduct}
              className="w-[205px] h-[36px] rounded-[12px] text-[14px] font-[400] text-center text-white bg-[#5570F1] flex justify-center items-center gap-[10px]"
            >
              <div className="h-[24px] w-[24px]">
                <img src="./plus.png" />
              </div>
              <div>Add a New Product</div>
            </button>
          </div>

          {/* All Products */}
          <div className="w-[100%] h-[145px] flex gap-[19px] mb-[20px]">
            {/* All Products Container */}
            <div className="bg-[#5570F1] w-[646px] flex flex-col justify-between rounded-[12px] pt-[11px] pr-[15px] pb-[11px] pl-[15px]">
              <div className="flex justify-between">
                <img
                  src="./folder.png"
                  alt="folder"
                  className="w-[30px] h-[30px]"
                />
              </div>

              <div className="text-white flex justify-between">
                <div className="flex flex-col gap-[8px] w-[50%]">
                  <p className="text-[14px] font-[400]">All Products</p>
                  <p className="text-[20px] font-[500]">350</p>
                </div>

                <div className="flex flex-col gap-[8px] w-[50%]">
                  <p className="text-[14px] font-[400]">Active</p>
                  <div className="flex gap-[10px]">
                    <p className="text-[20px] font-[500]">316</p>
                    <p className="text-[12px] font-[400] mt-[5px]">86%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Low Stock and Expired Products */}
            <div className=" bg-white w-[646px] flex flex-col justify-between rounded-[12px] pt-[11px] pr-[15px] pb-[11px] pl-[15px]">
              <div className="flex justify-between">
                <img
                  src="./Menubar_3.svg"
                  alt="folder"
                  className="w-[30px] h-[30px]"
                />
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400] text-red-600">
                    Low Stock Alert
                  </p>
                  <p className="text-[20px] font-[500]">23</p>
                </div>

                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400]">Expired</p>
                  <p className="text-[20px] font-[500]">3</p>
                </div>

                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400]">1 Star Rating</p>
                  <p className="text-[20px] font-[500]">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="w-[100%] h-[650px] gap-[20px] bg-white rounded-[12px]">
            <div className="w-[1262px] h-[621px] relative top-[22px] left-[21px] ">
              <div className="flex justify-between items-center h-[29px] mb-[20px]">
                <div className="text-[16px] font-[500]">
                  <p>Inventory Items</p>
                </div>
                <div className="w-[523px] text-[11px] font-[400] h-[29px] flex gap-[19px] text-[#ABAFB1]">
                  <div className="w-[176px] flex items-center gap-[16px] rounded-[4px] border border-black p-[8px]">
                    <div>
                      <img src="./search.png" className="h-[20px] w-[20px]" />
                    </div>
                    <div>Search</div>
                  </div>
                  <div className="w-[340px] flex justify-center items-center gap-[12px] text-[#53545C]">
                    <div className=" flex gap-[10px] justify-center items-center rounded-[4px] border border-black p-[6px]">
                      <div>
                        <img src="./filter.png" className="h-[16px] w-[16px]" />
                      </div>
                      <div className="text-[11px] font-[400]">Filter</div>
                    </div>
                    <div className="flex gap-[10px] justify-center items-center rounded-[4px] border border-black p-[6px]">
                      <div>
                        <img
                          src="./calender.png"
                          className="h-[16px] w-[16px"
                        />
                      </div>
                      <div className="text-[11px] font-[400]">Filter</div>
                    </div>
                    <div className="flex gap-[10px] justify-center items-center rounded-[4px] border border-black p-[6px]">
                      <div>
                        <img src="./share.png" className="h-[16px] w-[16px" />
                      </div>
                      <div className="text-[11px] font-[400]">Share</div>
                    </div>
                    <div className="flex flex-nowrap w-[99px] gap-[10px] justify-center items-center rounded-[4px] border border-black p-[6px]">
                      <div className="text-[11px] font-[400]">Bulk Action</div>
                      <div>
                        <img
                          src="./dropdown-50.png"
                          className="h-[6px] w-[6px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 h-[572px]">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Product Id
                      </th>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Product Image
                      </th>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Unit Price (in Rs)
                      </th>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        In-Stock
                      </th>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Total Value (in Rs)
                      </th>

                      <th className="px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product) => (
                      <tr key={product._id}  onClick={() => handleRowClick(product._id)}>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.productId}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.productName}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          <img
                            src={product.mainImage.url}
                            alt={`${product.productName} image`}
                            className="w-[50px] h-[50px] object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.productCategory}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.sellingPrice}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.quantityInStock}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.discount}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.quantityInStock * product.sellingPrice}
                        </td>

                        <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                          {product.publishedStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 mx-1 rounded ${
                        currentPage === index + 1
                          ? "bg-blue-700 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
