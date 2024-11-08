import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import axios from "axios";

const AddNewProduct = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isExpiryToggled, setIsExpiryToggled] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    sellingPrice: "",
    costPrice: "",
    quantityInStock: "",
    orderType: "",
    discount: "",
    expiryDate: "",
    shortDescription: "",
    longDescription: "",
    returnPolicy: "",
    mainImage: null,
    additionalImages: [],
    publishedStatus:"",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toISOString().split("T")[0]);
    setCurrentTime(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, []);

  const handleToggle = () => setIsToggled(!isToggled);
  const handleExpiryToggle = () => setIsExpiryToggled(!isExpiryToggled);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files : value,
    }));
  };

 
  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    // Destructure values from formData state
    const {
      productName,
      productCategory,
      sellingPrice,
      costPrice,
      quantityInStock,
      orderType,
      discount,
      expiryDate,
      shortDescription,
      longDescription,
      returnPolicy,
      mainImage,
      additionalImages,
      publishedStatus,
    } = formData;
    try {
      // Prepare FormData for the API request
      const requestData = new FormData();
      requestData.append("productName", productName);
      requestData.append("productCategory", productCategory);
      requestData.append("sellingPrice", sellingPrice);
      requestData.append("costPrice", costPrice);
      requestData.append("quantityInStock", quantityInStock);
      requestData.append("orderType", orderType);
      requestData.append("discount", discount);
      requestData.append("expiryDate", expiryDate);
      requestData.append("shortDescription", shortDescription);
      requestData.append("longDescription", longDescription);
      requestData.append("returnPolicy", returnPolicy);
      requestData.append("publishedStatus", publishedStatus);
      
  
      // Add the main image file to the form data
      if (mainImage && mainImage[0]) {
        requestData.append("mainImage", mainImage[0]);
      }
  
      // Add additional images to the form data
      Array.from(additionalImages).forEach((file) => {
        requestData.append("additionalImages", file);
      });
  
      // Axios config for sending multipart/form-data
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
  
      // Send POST request to the server
      const response = await axios.post(
        "http://localhost:4000/api/v1/product/addProduct",
        requestData,
        config
      );
  
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error uploading product:", error);
    }
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
              <p>New Inventory Item</p>
            </div>
            <div className="flex gap-[24px]">
              <button className="w-[171px] h-[36px] rounded-[12px] text-[14px] font-[400] text-center px-[16px] text-white bg-[#1C1D22]">
                <div className="flex justify-between items-center">
                  <div>Save & Publish</div>
                  <div className="h-[22px] w-[22px]">
                    <img src="./dropdown-white.png" alt="Dropdown" />
                  </div>
                </div>
              </button>
              <button
                onClick={handleAddProduct}
                className="w-[161px] h-[36px] rounded-[12px] text-[14px] font-[400] text-center text-white bg-[#5570F1]"
              >
                <div>Save & Publish</div>
              </button>
            </div>
          </div>
          {/* Hero Section */}
          <div className="w-[1311px] h-[813px] rounded-[12px] bg-white flex gap-[20px]">
            {/* Left Side */}
            <div className="w-[881px] h-[813px] rounded-[12px]">
              {/* Left-left */}
              <div className="w-[375px] h-[444px] mt-[28px] ml-[30.5px] text-[16px] font-[400] text-[#ABAFB1]">
                <div className="mb-[24px]">
                  <input
                    type="text"
                    id="name"
                    className="rounded-[8px] w-[375px] h-[52px] p-[12px] bg-[#EFF1F9] text-black placeholder-[#ABAFB1]"
                    placeholder="Product Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                  />
                </div>

                <div className="rounded-[8px] w-[375px] h-[52px] mb-[24px] bg-[#EFF1F9]">
                  <select
                    id="category"
                    name="productCategory"
                    className="bg-[#EFF1F9] w-full h-full p-[12px]  text-black placeholder-[#ABAFB1]"
                    value={formData.productCategory}
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>
                      Select Product Category
                    </option>
                    <option value="Fashion">Fashion</option>
                    <option value="Gadgets">Gadgets</option>
                    <option value="Books">Books</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Toys">Toys</option>
                  </select>
                </div>

                <div className="flex w-[375px] h-[52px] gap-[12px] mb-[24px]">
                  <input
                    type="text"
                    className="rounded-[8px] w-[181.5px] p-[12px] bg-[#EFF1F9] text-black placeholder-[#ABAFB1]"
                    placeholder="Selling Price"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="rounded-[8px] w-[181.5px] p-[12px] bg-[#EFF1F9]  text-black placeholder-[#ABAFB1]"
                    placeholder="Cost Price"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-[24px]">
                  <input
                    type="text"
                    className="rounded-[8px] w-[375px] h-[52px] p-[12px] bg-[#EFF1F9]  text-black placeholder-[#ABAFB1]"
                    placeholder="Quantity in Stock"
                    name="quantityInStock"
                    value={formData.quantityInStock}
                    onChange={handleChange}
                  />
                </div>

                <div className="rounded-[8px] w-[375px] h-[52px] mb-[24px] bg-[#EFF1F9]">
                  <select
                    id="type"
                    name="orderType"
                    className="bg-[#EFF1F9] w-full h-full p-[12px]  text-black placeholder-[#ABAFB1]"
                    value={formData.orderType}
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>
                      Order Type
                    </option>
                    <option value="Home Delivery">Home Delivery</option>
                    <option value="Self Pick-up">Self Pick-up</option>
                  </select>
                </div>

                {/* Toggle Discount */}
                <div className="flex justify-between items-center mb-[12px]">
                  <div className="text-[#45464E]">Discount</div>
                  <div className="flex items-center">
                    <span className="mr-2">Add Discount</span>
                    <div
                      className={`w-14 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        isToggled ? "bg-blue-500" : "bg-gray-400"
                      }`}
                      onClick={handleToggle}
                    >
                      <div
                        className={`w-6 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          isToggled ? "translate-x-6" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Conditionally render input fields when toggle is on */}
                {isToggled && (
                  <div className="flex gap-[12px] mb-[24px]">
                    <select
                      id="type"
                      name="type"
                      className="rounded-[8px] w-[181.5px] h-[52px] p-[12px] bg-[#EFF1F9]"
                    >
                      <option value="" disabled selected>
                        Order Type
                      </option>
                      <option value="Percentage">Percentage</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                    <input
                      type="text"
                      className="rounded-[8px] w-[181.5px] h-[52px] p-[12px] bg-[#EFF1F9]"
                      placeholder="Value"
                    />
                  </div>
                )}

                {/* Expiry Date Toggle */}
                <div className="flex justify-between items-center mb-[12px]">
                  <div className="text-[#45464E]">Expiry Date</div>
                  <div className="flex items-center">
                    <span className="mr-2">Add Expiry Date</span>
                    <div
                      className={`w-14 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        isExpiryToggled ? "bg-blue-500" : "bg-gray-400"
                      }`}
                      onClick={handleExpiryToggle}
                    >
                      <div
                        className={`w-6 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          isExpiryToggled ? "translate-x-6" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                {isExpiryToggled && (
                  <div className="mb-[24px]">
                    <input
                      type="date"
                      className="rounded-[8px] w-[375px] h-[52px] p-[12px] bg-[#EFF1F9]"
                      placeholder="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              {/* Left-right/middle */}
              <div className="w-[375px] h-[539px] absolute left-[472px] top-[84px]">
                <div className="mb-[24px]">
                  <textarea
                    id="name"
                    className="rounded-[8px] w-[375px] h-[163px] pl-[20px] pt-[16px] bg-[#EFF1F9]"
                    placeholder="Short Description"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                  />
                </div>
                {/* Product Long Description */}
                <div className="209px mb-[24px]">
                  <label className="mb-[24px]">Product Long Description</label>
                  <div>
                    <textarea
                      id="name"
                      className="rounded-[8px] w-[375px] h-[163px] pl-[20px] pt-[16px] bg-[#EFF1F9]"
                      placeholder="Your test goes here"
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-[14px] font-[400] text-[#ABAFB1]">
                    Add a long description for your product
                  </div>
                </div>
                {/* Toggle Discount */}
                <div className="flex justify-between items-center mb-[12px]">
                  <div className="text-[#45464E]">Return Policy</div>
                  <div className="flex items-center">
                    <span className="mr-2">Add Discount</span>
                    <div
                      className={`w-14 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        isToggled ? "bg-blue-500" : "bg-gray-400"
                      }`}
                      onClick={handleToggle}
                    >
                      <div
                        className={`w-6 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          isToggled ? "translate-x-6" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Conditionally render input fields when toggle is on */}
                {isToggled && (
                  <div className="flex gap-[12px] mb-[24px]">
                    <select
                      id="type"
                      name="type"
                      className="rounded-[8px] w-[181.5px] h-[52px] p-[12px] bg-[#EFF1F9]"
                    >
                      <option value="" disabled selected>
                        Order Type
                      </option>
                      <option value="Percentage">Percentage</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                    <input
                      type="text"
                      className="rounded-[8px] w-[181.5px] h-[52px] p-[12px] bg-[#EFF1F9]"
                      placeholder="Value"
                    />
                  </div>
                )}

                <div className="mb-[24px]">
                  <label>Date Added</label>
                  <div className="flex w-full gap-[12px] mb-[24px]">
                    <input
                      type="date"
                      className="rounded-[8px] w-[181.5px] p-[12px] bg-[#EFF1F9]"
                      value={currentDate}
                      readOnly
                    />
                    <input
                      type="text"
                      className="rounded-[8px] w-[181.5px] p-[12px] bg-[#EFF1F9]"
                      value={currentTime}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-[430px] h-[813px] rounded-[12px] bg-gray-100">
              <div className="w-[410px] h-[813px] ml-[20px] pt-[20px] pl-[19px]  bg-white">
                <div
                  className="w-[372px] h-[302px] rounded-[12px] bg-[#F4F5FA] border border-[#E1E2E9] mb-[12px]"
                >
                  <div className=" w-[340px] h-[154px] relative top-[74px] left-[16px] flex justify-center items-center">
                    <div className="flex-col ">
                      <div className="h-[56px] w-[56px] absolute top-[5px] left-[45%] ">
                        <img src="./image.svg" className="h-[47px] w-[47px] " />
                      </div>
                      <div className="flex-col">
                        <div className="flex justify-center items-center gap-[12px] h-[20px] ">
                          <div className="w-[18.5px] h-[13px] top-[2.5px]">
                            <img src="./upload.png" />
                          </div>
                          <input
                            type="file"
                            id='mainImage'
                            name="mainImage"
                            style={{
                              fontSize: "16px",
                              fontWeight: 500,
                              color: "#5570F1",
                            }}
                            onChange={handleChange}
                            placeholder="Upload Image"
                          />
                        </div>
                        <div className="flex-col justify-center items-center gap-[12px] h-[20px] ">
                          <p className="text-[14px] font-[400] text-center text-[#8B8D97]">
                            Upload a cover image for your product{" "}
                          </p>
                          <p className="text-[12px] font-[400] text-[#8B8D97]">
                            File format{" "}
                            <span className="text-[#2C2D33]">jpeg, png</span>{" "}
                            Recommended Size{" "}
                            <span className="text-[#2C2D33]">600x600(1:1)</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[19px] text-[16px] font-[500] text-[#45464E] mb-[12px]">
                  Additional Images
                </div>
                <div className="h-[167px] flex gap-[28px]">
                  <div
                    className="rounded-[12px] w-[172px] flex-col items-center justify-center  bg-[#F4F5FA] border border-[#E1E2E9]"
                
                  >
                    <div className="relative top-[35px] left-[4px]">
                      <div className="h-[56px] w-[56px] relative top-[5px] left-[40%] ">
                        <img src="./image.svg" className="h-[47px] w-[47px] " />
                      </div>
                      <div className="flex justify-center items-center gap-[12px] h-[20px]">
                        <div className="w-[18.5px] h-[13px] top-[2.5px]">
                          <img src="./upload.png" />
                        </div>
                        <input
                          type="file"
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#5570F1",
                          }}
                          placeholder="Upload Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[12px] w-[172px] border border-[#A6A8B1] border-dotted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
