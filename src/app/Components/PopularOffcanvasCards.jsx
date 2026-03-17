import Image from "next/image";
import React from "react";

const PopularOffcanvasCards = ({ img, content, price, sizes }) => {
  return (
    <div className="w-[490px] grid grid-cols-[1fr_2fr] h-[250px]">
      <div className="w-full object-contain">
        <Image src={img} alt="product thumbnail" width={170} height={250} />
      </div>
      <div className="text-[13px] flex flex-col gap-[20px] px-[10px]">
        <span className="flex items-center justify-between">
          <span>{content}</span>
          <span> {price}</span>
        </span>
        <form method="post" className="flex flex-col gap-[30px]">
          <select
            className="focus:outline-none w-[200px] border-[1px]"
            name="size"
          >
            <option value="default" selected disabled hidden>
              Select a size
            </option>
            {sizes.map((v) => (
              <option key={v} value={v} className="cursor-pointer">
                {v}
              </option>
            ))}
          </select>
          <button className="border border-black w-[120px]">Add to cart</button>
        </form>
      </div>
    </div>
  );
};

export default PopularOffcanvasCards;
