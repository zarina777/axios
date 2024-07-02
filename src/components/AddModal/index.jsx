import { useContext, useEffect, useRef, useState } from "react";
import Instance from "../../api";
import { GeneralContext } from "../../context";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cn from "./style.module.scss";
const AddModal = () => {
  let { showAddModal, setShowAddModal, setData, setCopyData } =
    useContext(GeneralContext);
  let [categories, setCategories] = useState([]);

  let title = useRef();
  let price = useRef();
  let image = useRef();
  let category = useRef();
  function close(event) {
    event.stopPropagation();
    if (event.target.tagName == "DIV") {
      setShowAddModal(false);
    }
  }
  useEffect(() => {
    Instance.get("/category")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((prob) => console.error(prob));
  });
  function addProduct(e) {
    e.preventDefault();
    Instance.post("/products", {
      title: title.current.value,
      price: price.current.value,
      category: category.current.value,
      image: image.current.value,
    }).then((res) => {
      setData((prev) => {
        return [...prev, res.data];
      });
      setCopyData(prev=>[...prev,res.data])
      toast.success("New product is added!");
    });
    setShowAddModal(false);
    title.current.value = "";
    price.current.value = "";
    category.current.value = "women's clothing";
    image.current.value = "";
  }
  return (
    <div
      style={showAddModal ? { right: "0" } : { right: "-100%" }}
      className={cn.Modal_cover}
      onClick={(e) => {
        close(e);
      }}
    >
      <form className={cn.Modal}>
        <label>
          <span>Title:</span>
          <input ref={title} type="text" placeholder="Title" />
        </label>
        <label>
          <span>Price:</span>
          <input ref={price} type="text" placeholder="Price" />
        </label>
        <label>
          <span>Img URL:</span>
          <input ref={image} type="text" placeholder="Img url" />
        </label>

        <label>
          <span>Category:</span>
          <select ref={category}>
            {categories?.map((el) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </label>
        <button
          onClick={(e) => {
            addProduct(e);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddModal;
