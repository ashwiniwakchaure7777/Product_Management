import React from 'react';
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const gotohome = () =>{
    navigate("/");
  }
  return (
    <div className="w-[1352px] left-[88px] h-[84px] bg-white">
          <div className="w-[100%] h-[60px] pt-[14px] pr-[21px] pb-[14px] pl-[21px] flex justify-between">
            <div className="w-[95px] h-[30px]">
              <h3 className="font-[500] leading-[30px]">Inventory</h3>
            </div>
            {/* Inventrory right */}
            <div className="w-[246px] h-[32px] gap-[20px] flex justify-center items-center">
              <div className="w-[154px] pt-[5px] pr-[12px] pb-[5px] pl-[12px] gap-[10px] rounded-[8px] bg-[#FEF5EA] flex justify-between items-center">
                <div className="text-[14px] font-[400]">Nanny's Shop</div>
                <div><img src="/dropdown-50.png" className='w-[15px] h-[15px]' alt="dropdown" /></div>
              </div>
              <div>
                <img src="/notification.svg" className='w-[20px] h-[20px]' alt="notification" />
              </div>
              <div>
                <img src="/profile.jfif" className='w-[32px] h-[32px] rounded-[8px]' alt="profile"/>
              </div>
            </div>
          </div>
          {/* Home INventory */}
          <div className="flex justify-between w-[1310px] pt-[4px] pr-[20px] pb-[4px] gap-[10px] pl-[20px]">
              <div className="flex justify-start items-center gap-[11px]">
              <div><img onClick={gotohome} src="/home.svg" className="h-[16px] w-[16px]" alt="home"/></div>
              <div className="text-[12px] font-[400]">/ Inventory</div>
              </div>
          </div>
        </div>
  )
}

export default Topbar