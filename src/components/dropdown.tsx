import React from "react";
import { FaChevronDown,  FaChevronUp } from "react-icons/fa";

type DropDown = {
  defaultValue : string;
  options: string[];
};

const Dropdown: React.FC<DropDown> = ({options , defaultValue}) => {

    const [isCreateClicked, setCreateClicked] = React.useState(false);
    const clickCreate = () => {
        setCreateClicked(!isCreateClicked);
    };

    return (
          <div className="relative px-2 w-full">
        
        <button className="bg-[#F2F3FA] border-[1px] border-[#C3C6CF]  rounded-[8px]  h-[32px] text-[#43474E] flex items-center justify-between  px-2 gap-2 " onClick={clickCreate}>
          {defaultValue && defaultValue}
          {
              isCreateClicked ? <FaChevronUp className="text-[14px] text-[#49454F]"/> :  <FaChevronDown className="text-[14px] text-[#49454F] "/>
          }
         
  
          </button>
          {
              isCreateClicked && (
                  <div className="bg-white absolute z-10 w-4/5 left-2 px-1 py-2 border-[1px] border-[#C3C6CF] rounded-[8px]   ">
                      <ul className="w-full text-[12px] text-[#334155] ">
                        {
                            options.map((option, index) => (
                                <li key={index} className="p-1 px-1 group flex items-center justify-between hover:bg-[#ECEDF4]">
                                    {option}
                                   
                                    
                                </li>
                            ))
                        }
                     
  
                       
                      
                      </ul>
                  </div>
              )
          }
        </div>

    )


};


export default Dropdown;