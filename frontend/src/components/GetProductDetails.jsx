import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import axios from "axios";

const AddNewProduct = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const navigate = useNavigate();

  // State for storing product data
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the employee data by ID and pre-fill the form
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/product/getProductDetails/${id}`
        );
        const {
          productName,
          productCategory,
          sellingPrice,
          quantityInStock,
          discount,
          shortDescription,
          longDescription,
          dateAdded,
          mainImage,
          views,
          totalOrders,
          inStock,
          favoriteCount,
          orderStatuses,
          purchases,
          publishedStatus,
        } = response.data.product;
        setProduct(response.data.product);
        console.log(response.data.product);
      } catch (error) {
        console.error("Failed to fetch product data");
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-[1352px] left-[88px] bg-slate-100">
        <Topbar />
        {/* Inventory summary */}
        <div className="w-[1311px] absolute top-[107px] left-[109px] flex-col mb-[24px]">
          <div className="h-[36px] w-[100%] flex justify-between mb-[20px]">
            <div className="text-[16px] flex gap-[15px] font-[500] text-[#45464E]">
              <div>
                {product ? <p>{product.productName} </p> : <p>Loading...</p>}
              </div>
              <div>
                {product ? (
                  <p>
                    Date Added{" "}
                    <span className="text-[16px] text-[#45464E] font-[300]">
                      {product.dateAdded}
                    </span>
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
            <div className="flex gap-[24px]">
              <button className="w-[171px] h-[36px] rounded-[12px] text-[14px] font-[400] text-center px-[16px] text-white bg-[#1C1D22]">
                <div className="flex justify-between items-center">
                  <div>Edit Product</div>
                  <div className="h-[22px] w-[22px]">
                    <img src="/dropdown-white.png" alt="Dropdown" />
                  </div>
                </div>
              </button>
              <button className="w-[161px] h-[36px] rounded-[12px] text-[14px] font-[400] text-center text-white bg-[#CC5F5F]">
                <div>Unpublish Product</div>
              </button>
            </div>
          </div>
          <div className="w-[1311px] h-[145px] flex mb-[24px] ">
            <div className="bg-white w-[186px] h-[145px] rounded-[12px] mr-[19px]">
              <img
                className="w-[124px] h-[124px] relative top-[11px] left-[31px]"
                src={
                  product && product.mainImage
                    ? product.mainImage.url
                    : "/placeholder-image.png"
                }
                alt="Product"
              />
            </div>
            <div className="bg-white w-[410px] h-[145px] rounded-[12px] mr-[19px] flex justify-center items-center">
              <div className="w-[380px] h-[123px] flex flex-col justify-between items-center">
                <div className="h-[23px] flex flex-row items-center justify-between w-full px-2">
                  <div className="text-[12px] font-[400] text-[#45464E]">
                    <p>
                      Last Order:{" "}
                      <span className="text-black">12 Sept 2022</span>
                    </p>
                  </div>
                  <div className="h-[23px] rounded-[8px] bg-[#93d8bf] text-[#519C66] px-2 text-[10px] flex justify-center items-center">
                  publishedStatus
                  </div>
                </div>

                <div className="flex w-full px-2">
                  <div className="flex flex-col w-[50%] items-start text-[12px]">
                    <div>Price</div>
                    <div>
                      {product ? (
                        <p>{product.sellingPrice}</p>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-[50%] items-start text-[12px]">
                    <div>In-stock</div>
                    <div>
                      {product ? (
                        <p>{product.quantityInStock}</p>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white w-[300px] h-[145px] rounded-[12px] mr-[19px] flex justify-center items-center">
              <div className="w-[380px] h-[123px] flex flex-col justify-between items-center">
                <div className="h-[23px] flex flex-row items-center justify-between w-full px-2">
                  <div className="text-[12px] font-[400] text-[#45464E]">
                    <img src="/pi.png" alt="pi" className="w-[29px] h-[29px]" />
                  </div>
                  <div className="h-[23px] rounded-[8px] px-2 text-[10px] flex justify-center items-center">
                    All-time
                  </div>
                </div>

                <div className="flex w-full px-2">
                  <div className="flex flex-col w-[50%] items-start text-[12px]">
                    <div>Total Orders</div>
                    <div>
                      {product ? (
                        <p>{product.sellingPrice}</p>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white w-[380px] h-[145px] rounded-[12px] mr-[19px] flex justify-center items-center">
              <div className="w-[380px] h-[123px] flex flex-col justify-between items-center">
                <div className="h-[23px] flex flex-row items-center justify-between w-full px-2">
                  <div className="text-[12px] font-[400] text-[#45464E]">
                    <img
                      src="/eye.png"
                      alt="eye"
                      className="h-[25px] w-[25px]"
                    />
                  </div>
                  <div className="h-[23px] rounded-[8px] px-2 text-[10px] flex justify-center items-center">
                    All time
                  </div>
                </div>

                <div className="flex w-full px-2">
                  <div className="flex flex-col w-[50%] items-start text-[12px]">
                    <div>Views</div>
                    <div>
                      <p>1,200</p>
                    </div>
                  </div>
                  <div className="flex flex-col w-[50%] items-start text-[12px]">
                    <div>Favourite</div>
                    <div>
                      <p>23</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[145px] flex gap-[19px] mb-[20px]">
            {/* All Products Container */}
            <div className=" bg-white w-[616px] flex flex-col justify-between rounded-[12px] pt-[11px] pr-[15px] pb-[11px] pl-[15px]">
              <div className="flex justify-between">
                <img
                  src="/Menubar_2.svg"
                  alt="bag"
                  className="w-[30px] h-[30px]"
                />
                <p className="text-[12px] font-[400] text-[#BEC0CA]">
                  All-time
                </p>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400] text-[#BEC0CA]">
                    All Orders
                  </p>
                  <p className="text-[20px] font-[500] text-[#45464E]">23</p>
                </div>

                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400] text-[#BEC0CA]">
                    Pending
                  </p>
                  <p className="text-[20px] font-[500] text-[#45464E]">0</p>
                </div>

                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400] text-[#BEC0CA]">
                    Completed
                  </p>
                  <p className="text-[20px] font-[500] text-[#45464E]">2</p>
                </div>
              </div>
            </div>

            {/* Low Stock and Expired Products */}
            <div className=" bg-white w-[646px] flex flex-col justify-between rounded-[12px] pt-[11px] pr-[15px] pb-[11px] pl-[15px]">
              <div className="flex justify-between">
                <img
                  src="/Menubar_2.svg"
                  alt="folder"
                  className="w-[30px] h-[30px]"
                />
                <p className="text-[12px] font-[400] text-[#BEC0CA]">
                  All-time
                </p>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400] text-[#BEC0CA]">
                    Canceled
                  </p>
                  <p className="text-[20px] font-[500] text-[#45464E]">0</p>
                </div>

                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400] text-[#BEC0CA]">
                    Returned
                  </p>
                  <p className="text-[20px] font-[500] text-[#45464E]">0</p>
                </div>

                <div className="flex flex-col gap-[8px] w-[33%]">
                  <p className="text-[14px] font-[400] text-[#BEC0CA]">
                    Damaged
                  </p>
                  <p className="text-[20px] font-[500] text-[#45464E]">0</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[494px] gap-[20px] bg-white rounded-[12px]">
            <div className="w-[1262px] h-[621px] relative top-[22px] left-[21px] ">
              <div className="flex justify-between items-center h-[29px] mb-[20px]">
                <div className="text-[16px] font-[500]">
                  <p>Purchases</p>
                </div>
                <div className="w-[523px] text-[11px] font-[400] h-[29px] flex gap-[19px] text-[#ABAFB1]">
                  <div className="w-[176px] flex items-center gap-[16px] rounded-[4px] border border-[#CFD3D4] p-[8px]">
                    <div>
                      <img src="/search.png" className="h-[20px] w-[20px]" />
                    </div>
                    <div>Search</div>
                  </div>
                  <div className="w-[340px] flex justify-center items-center gap-[12px] text-[#53545C]">
                    <div className=" flex gap-[10px] justify-center items-center rounded-[4px] border border-[#53545C] p-[6px]">
                      <div>
                        <img src="/filter.png" className="h-[16px] w-[16px]" />
                      </div>
                      <div className="text-[11px] font-[400]">Filter</div>
                    </div>
                    <div className="flex gap-[10px] justify-center items-center rounded-[4px] border border-[#53545C] p-[6px]">
                      <div>
                        <img
                          src="/calender.png"
                          className="h-[16px] w-[16px"
                        />
                      </div>
                      <div className="text-[11px] font-[400]">Filter</div>
                    </div>
                    <div className="flex gap-[10px] justify-center items-center rounded-[4px] border border-[#53545C] p-[6px]">
                      <div>
                        <img src="/share.png" className="h-[16px] w-[16px" />
                      </div>
                      <div className="text-[11px] font-[400]">Share</div>
                    </div>
                    <div className="flex flex-nowrap w-[99px] gap-[10px] justify-center items-center rounded-[4px] border border-black p-[6px]">
                      <div className="text-[11px] font-[400]">Bulk Action</div>
                      <div>
                        <img
                          src="/dropdown-50.png"
                          className="h-[6px] w-[6px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 h-[572px]">
                <tbody>
                  {product && product.length > 0 ? (
                    product.map((product) => (
                      <tr key={product._id}>
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-4 text-gray-100"
                      >
                        No orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
