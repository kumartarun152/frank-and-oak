"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";

const Page = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState({});
  const [thumbnail, setThumbnail] = useState([]);

  const fetchProduct = async () => {
    await axios
      .get(
        `http://localhost:4000/api/frankandoak-services/products/get-product-by-id/${_id}`
      )
      .then((res) => {
        if (res.status === 200) {
          const { thumbnail, hover_thumbnail, images, ...data } = res.data.data;
          data.thumbnail = `${res.data.filepath}${thumbnail}`;
          data.hover_thumbnail = `${res.data.filepath}${hover_thumbnail}`;
          data.images = images.map((v) => `${res.data.filepath}${v}`);
          setProduct(data);
          setThumbnail(data.thumbnail);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };
  // console.log("Selected Product: ", product);

  useEffect(() => {
    fetchProduct();
  }, [_id]);

  return (
    <div className="w-[95%] min-h-[100vh] mx-auto mt-[50px] grid grid-cols-[2fr_2fr] gap-[20px]">
      <div className="p-[20px] box-border grid grid-cols-[20%_2fr]">
        <div className="flex flex-col gap-[20px]">
          {product.images
            ? product.images.map((v, i) => (
                <div
                  className="w-[100px] h-[100px] object contain shadow-lg overflow-hidden"
                  key={i}
                >
                  <Image
                    src={v}
                    loading="lazy"
                    layout="responsive"
                    alt={product.name}
                    width={100}
                    height={100}
                    onMouseEnter={() => setThumbnail(v)}
                    onMouseOut={() => setThumbnail(product.thumbnail)}
                    className="cursor-pointer"
                  />
                </div>
              ))
            : "Loading..."}
        </div>
        <div className="w-[300px] mx-auto h-[400px] overflow-hidden object-contain">
          <Image
            src={thumbnail}
            loading="lazy"
            layout="responsive"
            alt={product.name}
            width={200}
            height={200}
            className="ease-in-out"
          />
        </div>
      </div>
      <div className="p-[20px] box-border">
        <h1 className="text-[30px]">{product.name}</h1>
        <span className="text-[13px] text-red-400">By {product.brand}</span>
        <h2 className="text-[20px] my-[15px]">Overview</h2>
        <p className="text-[15px] text-balance">{product.description}</p>
        <p className="text-[15px] text-balance my-[5px]">
          {product.short_description}
        </p>
        <span className="text-[13px] text-red-400 my-[10px]">
          Price: $ {product.price}
        </span>
        <div className="w-full my-[10px]">
          <form method="post">
            <select
              name="size"
              className="w-full my-[10px] focus:outline-none border border-black-400 min-h-[30px] cursor-pointer"
            >
              <option
                value="default"
                disabled
                selected
                hidden
                className="text-[14px] font-bold"
              >
                Available sizes
              </option>
              {product.size
                ? product.size.map((v, i) => (
                    <option value={v._id} key={i}>
                      {v.size}
                    </option>
                  ))
                : ""}
            </select>
            <select
              name="color"
              className="w-full my-[10px] focus:outline-none border border-black-400 min-h-[30px] cursor-pointer"
            >
              <option
                value="default"
                disabled
                selected
                hidden
                className="text-[14px] font-bold"
              >
                Available Colors
              </option>
              {product.color
                ? product.color.map((v, i) => (
                    <option value={v._id} key={i}>
                      {v.color}
                    </option>
                  ))
                : ""}
            </select>
            <button
              type="submit"
              className="my-[20px] w-full cursor-pointer p-[10px] box-border block bg-black text-white hover:border border-black hover:bg-white hover:text-black hover:font-bold"
            >
              Add to WishList <BiHeart className="inline-block" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
