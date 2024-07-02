import React, { useRef, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GeneralContext } from "../../context";
import { ToastContainer } from "react-toastify";

import instance from "../../api";

import Container from "../../components/Container";
import AddModal from "../../components/AddModal";
import Products from "../../components/Products";
import Table from "../../components/table";

import cn from "./style.module.scss";

const Admin = () => {
  let [load, setLoad] = useState(true);
  const {
    setShowAddModal,
    table,
    setTable,
    setData,
    copyData,
    setCopyData,
    productCat,
    setProductCat,
    flexData,
    data
  } = useContext(GeneralContext);
  let [categories, setCategories] = useState([]);
  let selection = useRef();
  useEffect(() => {
    instance
      .get("/products")
      .then((data) => {
        setData(data.data);
        setCopyData(data.data);
        flexData=data.data
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    instance
      .get("/category")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((prob) => console.error(prob));
  });

  function selecting(e) {
    setProductCat(e.target.value);
  }

  useEffect(() => {
    if (productCat == "all") {
      setData(data);
    } else {
      let newData = copyData.filter((el) => {
        return el.category == productCat;
      });
      setData(newData);
    }
  }, [productCat]);
  return (
    <div className={cn.admin}>
      <ToastContainer />
      <AddModal />
      <Container className={cn.container}>
        <div className={cn.Header}>
          <h1>Products</h1>
          <button onClick={() => setShowAddModal(true)}>Add product</button>
        </div>
        <div className={cn.flex}>
          <select
            ref={selection}
            onChange={selecting}
            className={cn.categories}
          >
            <option value="all">All</option>
            {categories?.map((el) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <div className={cn.typeofcard}>
            <button
              style={
                !table
                  ? { backgroundColor: "blue", color: "#fff" }
                  : { backgroundColor: "transparent", color: "black" }
              }
              onClick={() => {
                setTable(false);
              }}
            >
              card
            </button>
            <button
              onClick={() => {
                setTable(true);
              }}
              style={
                table
                  ? { backgroundColor: "blue", color: "#fff" }
                  : { backgroundColor: "transparent", color: "black" }
              }
            >
              table
            </button>
          </div>
        </div>
        {load ? (
          <div className={cn.Loader}>Loading...</div>
        ) : (
          <>{table ? <Table /> : <Products />}</>
        )}
      </Container>
      <Outlet />
    </div>
  );
};

export default Admin;
