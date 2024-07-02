import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Instance from "../../api";
import { GeneralContext } from "../../context";
import EditModal from "../EditModal";
import cn from "./style.module.scss";

const Products = () => {
  let { setShowEditModal, setObj, obj, setData, data } =
    useContext(GeneralContext);
  function deleteProduct(event, id) {
    event.stopPropagation();
    Instance.delete(`/products/${id}`)
      .then(() => {
        toast("Data is deleted");
      })
      .catch((er) => console.log(er));
    setData((prev) => {
      let newData = prev.filter((el) => {
        return el.id !== id;
      });
      return newData;
    });
    console.log(data);
  }
  function editProduct(event, el) {
    event.stopPropagation();
    setShowEditModal(true);
    setObj(el);
    console.log(obj);
  }
  return (
    <div className={cn.products}>
      {obj && <EditModal />}
      {data?.map((el) => {
        return (
          <div key={el.id} className={cn.product}>
            <Link to={`product/${el.id}`}>
              <div className={cn.img_wrapper}>
                <img src={el?.image} />
              </div>
            </Link>
            <div className={cn.product_info}>
              <div className={cn.info}>
                <h3>
                  {el.title.length < 30
                    ? el.title
                    : el.title.slice(0, 30) + "..."}
                </h3>
                <div className={cn.flex}>
                  <span>{el.category}</span>
                  <span>{el.price}$</span>
                </div>
              </div>
              <div className={cn.btns}>
                <button
                  onClick={(e) => {
                    deleteProduct(e, el.id);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={(e) => {
                    editProduct(e, el);
                  }}
                >
                  edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
