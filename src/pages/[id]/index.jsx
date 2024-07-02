import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Instance from "../../api";
import Container from "../../components/Container";
import cn from "./style.module.scss";

const Productinfo = () => {
  let [data, setData] = useState(null);
  let { id } = useParams();
  Instance.get(`/products/${id}`).then((res) => {
    setData(res.data);
  });
  return (
    <Container className={cn.productinfo}>
      <div className={cn.product}>
        <div className={cn.img_wrap}>
          <img src={data?.image} />
        </div>
        <h1>{data?.title}</h1>
        <span>{data?.category}</span>
        <p>{data?.price}$</p>
      </div>
    </Container>
  );
};

export default Productinfo;
