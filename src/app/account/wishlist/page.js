"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const [product, setProduct] = useState([]);
  const { wishList } = useSelector((state) => state.wishList);
  const router = useRouter();

  const wishlistProducts = async () => {
    const token = JSON.parse(Cookies.get("token"));

    await axios
      .get(
        "http://localhost:4000/api/frankandoak-services/products/get-wish-listed-products",
        {
          headers: { authorization: `Bearer ${token}` },
          params: wishList,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          const data = res.data.data;
          data.map((v, i) => {
            const { thumbnail, hover_thumbnail } = v;
            v.thumbnail = `${res.data.filepath}${thumbnail}`;
            v.hover_thumbnail = `${res.data.filepath}${hover_thumbnail}`;
          });
          setProduct(data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  useEffect(() => {
    wishlistProducts();
    // console.log(".....", product);
  }, []);

  return (
    <div className="w-[90%] p-[20px] box-border mx-auto mt-[50px] min-h-[100vh] grid md:grid-cols-3 sm:grid-cols-2">
      {product.length > 0 ? (
        product.map((v, i) => (
          <Product key={i} product={v} idx={i} router={router} />
        ))
      ) : (
        <div className="h-[200px] text-[18px] font-bold ">
          You haven&apos;t created a wish list yet...
        </div>
      )}
    </div>
  );
};

export default Page;
function Product({ product, idx, router }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="m-[10px] h-[400px] shadow-lg relative">
      <div
        className="w-[100%] object-contain cursor-pointer overflow-hidden md:h-[250px]"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Image
          src={hover ? `${product.hover_thumbnail}` : `${product.thumbnail}`}
          alt={product.name}
          width={300}
          layout={"responsive"}
          height={180}
        />
      </div>
      <div className="w-full p-[10px] box-sizing">
        <span className="block text-[14px] my-[5px] font-bold">
          {`${product.name} by `}
          <span className="text-[13px] my-[5px] text-red-500">
            {product.brand}
          </span>
        </span>

        <span className="block text-[13px] my-[5px]">
          {`Size: ${product.size[0].size}`}
        </span>
        <span className="block text-[13px] my-[5px]">
          {`Color: ${product.color[0].color}`}
        </span>
        <span className="block text-[13px] text-red-500 my-[5px]">{`$${product.price}`}</span>
        <button
          className="bg-black p-[5px] text-[14px] text-white hover:bg-white hover:border border-black hover:text-black cursor-pointer absolute bottom-[15px] right-[20px] hover:font-bold"
          onClick={() => router.push(`/shop-now/product/${product._id}`)}
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
