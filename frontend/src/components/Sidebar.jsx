import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[88px] h-[1024px]">
      <img
        src="/Phatasma_logo.png"
        className="w-[49px] h-[49px] absolute top-[24px] left-[18px]"
        alt="logo"
      />
      <div className="absolute top-[128px] left-[16px]">
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center">
          <img
            src="/Menubar_1.svg"
            className="w-[24px] h-[24px]"
            alt="menu1"
          />
        </div>
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center">
          <img
            src="/Menubar_2.svg"
            className="w-[24px] h-[24px]"
            alt="menu2"
          />
        </div>
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center">
          <img
            src="/Menubar_3.svg"
            className="w-[24px] h-[24px]"
            alt="menu3"
          />
        </div>
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center bg-[#5570F1]">
          <img
            src="/Menubar_4.svg"
            className="w-[24px] h-[24px]"
            alt="menu4"
          />
        </div>
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center">
          <img
            src="/Menubar_5.svg"
            className="w-[24px] h-[24px]"
            alt="menu5"
          />
        </div>
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center">
          <img
            src="/Menubar_6.svg"
            className="w-[24px] h-[24px]"
            alt="menu6"
          />
        </div>
      </div>
      <div className="absolute top-[776px] left-[16px] ">
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center">
          <img
            src="/headphones.svg"
            className="w-[24px] h-[24px]"
            alt="menu5"
          />
        </div>
        <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center">
          <img src="/gift.svg" className="w-[24px] h-[24px]" alt="menu5" />
        </div>
      </div>
      <div className="absolute top-[941px] left-[21px]">
        <div className="w-[46px] h-[46px] flex items-center justify-center ">
          <img src="/logout.svg" className="w-[24px] h-[24px]" alt="menu5" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
