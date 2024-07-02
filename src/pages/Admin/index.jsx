import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import AddModal from "../../components/AddModal";
import Products from "../../components/Products";
import instance from "../../api";
import cn from "./style.module.scss";
import { GeneralContext } from "../../context";
import { ToastContainer } from "react-toastify";
import Instance from "../../api";
import { Outlet } from "react-router-dom";
import Table from "../../components/table";
import { useRef } from "react";
const Admin = () => {
  let [load, setLoad] = useState(true);
  const { setShowAddModal, table, setTable, setData, copyData, setCopyData } =
    useContext(GeneralContext);
  let [categories, setCategories] = useState([]);
  let selection = useRef();
  useEffect(() => {
    instance
      .get("/products")
      .then((data) => {
        setData(data.data);
        setCopyData(data.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    Instance.get("/category")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((prob) => console.error(prob));
  });

  function selecting(e) {
    if (e.target.value == "all") {
      setData(copyData);
    } else {
      let newData = copyData.filter((el) => {
        return el.category == e.target.value;
      });
      setData(newData);
    }
  }
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
