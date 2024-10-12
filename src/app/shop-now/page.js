"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { BiFilter } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Image from "next/image";

const Page = () => {
  const [size, setSize] = useState(false);
  const [color, setColor] = useState(false);
  const [price, setPrice] = useState(false);
  const [sort, setSort] = useState(false);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [filePath, setFilePath] = useState({});

  const router = useRouter();

  const sizes = async () => {
    await axios
      .get("http://localhost:4000/api/frankandoak-services/sizes/get-all-sizes")
      .then((res) => {
        if (res.status === 200) setAvailableSizes(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  const colors = async () => {
    await axios
      .get(
        "http://localhost:4000/api/frankandoak-services/colors/get-all-colors"
      )
      .then((res) => {
        if (res.status === 200) setAvailableColors(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };
  const productData = async () => {
    await axios
      .get(
        "http://localhost:4000/api/frankandoak-services/products/get-all-products"
      )
      .then((res) => {
        if (res.status === 200) setProducts(res.data.data);
        setFilePath(res.data.filepath);
        // console.log(products);
        // console.log(filePath);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  const handleSortingAscending = () => {
    const AscendingSort = products.toSorted((a, b) => (a > b) - (a < b));
    setProducts(AscendingSort);
    console.log("SORTED: ", AscendingSort);
  };

  useEffect(() => {
    sizes();
    colors();
    productData();
    // console.log(products);
  }, [products]);

  return (
    <div className="w-full mt-[50px] grid grid-cols-[20%_3fr] min-h-[100vh]">
      <div className="relative h-[100vh]">
        <form>
          <div className="absolute bottom-[20%] w-full productSideNav">
            <ul className="list-none w-full p-[10px] box-sizing">
              <div className="w-full flex items-center justify-between text-[14px] my-[15px] font-bold">
                <span>Apply Filters</span>
                <span>
                  <BiFilter className="font-bold text-[20px]" />
                </span>
              </div>
              <li className="border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center">
                <input
                  type="checkbox"
                  name="men"
                  value="men"
                  className="accent-black cursor-pointer"
                />
                <span>Men</span>
              </li>
              <li className="border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center">
                <input
                  type="checkbox"
                  name="women"
                  value="women"
                  className="accent-black cursor-pointer"
                />
                <span>Women</span>
              </li>

              <li className="border-b min-h-[30px] box-sizing flex flex-col items-center justify-between">
                <div className="w-full flex justify-between items-center px-[10px]">
                  <span>Size</span>
                  <span onClick={() => setSize(!size)}>
                    {size ? (
                      <IoIosArrowUp className="cursor-pointer inline-block" />
                    ) : (
                      <IoIosArrowDown className="cursor-pointer inline-block" />
                    )}
                  </span>
                </div>
                {size ? (
                  <ul className="list-none w-[90%] p-0 mx-auto">
                    {availableSizes.map((v, i) => (
                      <li
                        className="text-[14px] w-full border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center bg-white"
                        key={i}
                      >
                        <input
                          type="checkbox"
                          name="size"
                          value={v.size}
                          className="accent-black cursor-pointer"
                        />
                        <span>{v.size}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="border-b min-h-[30px] box-sizing flex flex-col items-center justify-between bg-white">
                <div className="w-full flex justify-between items-center px-[10px]">
                  <span>Color</span>
                  <span onClick={() => setColor(!color)}>
                    {color ? (
                      <IoIosArrowUp className="cursor-pointer inline-block" />
                    ) : (
                      <IoIosArrowDown className="cursor-pointer inline-block" />
                    )}
                  </span>
                </div>
                {color ? (
                  <ul className="list-none w-[90%] p-0 mx-auto">
                    {availableColors.map((v, i) => (
                      <li
                        className="text-[14px] w-full border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center"
                        key={i}
                      >
                        <input
                          type="checkbox"
                          name="color"
                          value={v.color}
                          className="accent-black cursor-pointer"
                        />
                        <span>{v.color}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="border-b min-h-[30px] box-sizing flex flex-col items-center justify-between bg-white">
                <div className="w-full flex justify-between items-center px-[10px]">
                  <span>Price</span>
                  <span onClick={() => setPrice(!price)}>
                    {price ? (
                      <IoIosArrowUp className="cursor-pointer inline-block" />
                    ) : (
                      <IoIosArrowDown className="cursor-pointer inline-block" />
                    )}
                  </span>
                </div>
                {price ? (
                  <ul className="list-none w-[90%] p-0 mx-auto">
                    <li className="text-[14px] w-full border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center">
                      <input
                        type="checkbox"
                        name="price"
                        value="0-50"
                        className="accent-black cursor-pointer"
                      />
                      <span>$0-$50</span>
                    </li>
                    <li className="text-[14px] w-full border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center">
                      <input
                        type="checkbox"
                        name="price"
                        value="50-100"
                        className="accent-black cursor-pointer"
                      />
                      <span>$50-$100</span>
                    </li>
                    <li className="text-[14px] w-full border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center">
                      <input
                        type="checkbox"
                        name="price"
                        value="100-200"
                        className="accent-black cursor-pointer"
                      />
                      <span>$100-$200</span>
                    </li>
                    <li className="text-[14px] w-full border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center">
                      <input
                        type="checkbox"
                        name="price"
                        value="200-250"
                        className="accent-black cursor-pointer"
                      />
                      <span>$200-$250</span>
                    </li>
                    <li className="text-[14px] w-full border-b h-[30px] p-[10px] box-sizing flex gap-[20px] items-center">
                      <input
                        type="checkbox"
                        name="price"
                        value="250-500"
                        className="accent-black cursor-pointer"
                      />
                      <span>$250-$500</span>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div className="relative w-full min-h-[100vh]">
        <ul className="w-[200px] border border-black absolute right-[50px] top-[10px] z-40">
          <li className="text-[14px] w-full border-b min-h-[30px] box-sizing flex flex-col items-center">
            <div className="w-full flex items-center justify-between p-[10px] ">
              <span> sort</span>
              <span onClick={() => setSort(!sort)}>
                {sort ? (
                  <IoIosArrowUp className="inline-block cursor-pointer" />
                ) : (
                  <IoIosArrowDown className="inline-block cursor-pointer" />
                )}
              </span>
            </div>
            {sort ? (
              <ul className="list-none bg-white w-full">
                <li
                  className="p-[5px] hover:bg-[#ededed] cursor-pointer"
                  onClick={handleSortingAscending}
                >
                  Ascending
                </li>
                <li className="p-[5px] hover:bg-[#ededed] cursor-pointer">
                  Descending
                </li>
                <li className="p-[5px] hover:bg-[#ededed] cursor-pointer">
                  Price low to high
                </li>
                <li className="p-[5px] hover:bg-[#ededed] cursor-pointer">
                  Price high to low
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>
        </ul>

        <div className="w-[95%] mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-[20px] my-[55px] min-h-[100vh]">
          {products.length !== 0
            ? products.map((v, i) => {
                return (
                  <Products
                    product={v}
                    idx={i}
                    key={i}
                    filepath={filePath}
                    router={router}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Page;

function Products({ product, idx, filepath, router }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="m-[10px] h-[400px] shadow-lg relative">
      <div
        className="w-[100%] object-contain cursor-pointer overflow-hidden h-[250px]"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Image
          src={
            hover
              ? `${filepath}${product.hover_thumbnail}`
              : `${filepath}${product.thumbnail}`
          }
          alt={product.name}
          width={300}
          layout={"responsive"}
          height={180}
        />
      </div>
      <div className="w-full p-[10px] box-sizing">
        <span className="block text-[14px] my-[5px] font-bold">
          {product.name}
        </span>
        <span className="block text-[13px] my-[5px]">
          {`By ${product.brand}`}
        </span>
        <span className="block text-[13px] text-red-500 my-[5px]">{`$${product.price}`}</span>
        <button
          className="bg-black p-[5px] text-[14px] text-white hover:bg-white hover:border border-black hover:text-black cursor-pointer absolute bottom-[15px] right-[20px] hover:font-bold"
          onClick={() => router.push(`/shop-now/product/${product._id}`)}
        >
          Show More
        </button>
      </div>
    </div>
  );
}
