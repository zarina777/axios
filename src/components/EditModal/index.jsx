import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import Instance from "../../api";
import { GeneralContext } from "../../context";
import cn from "./style.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditModal = () => {
  let title = useRef();
  let price = useRef();
  let image = useRef();
  let category = useRef();
  let [categories, setCategories] = useState([]);
  let { showEditModal, setShowEditModal, obj, setData } =
    useContext(GeneralContext);

  useEffect(() => {
    title.current.value = obj?.title;
    price.current.value = obj?.price;
    category.current.value = obj?.category;
    image.current.value = obj?.image;
  }, [obj]);

  useEffect(() => {
    Instance.get("/category")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((prob) => console.error(prob));
  });

  function close(event) {
    event.stopPropagation();
    if (event.target.tagName == "DIV") {
      setShowEditModal(false);
    }
  }

  function editProduct(e, id) {
    e.preventDefault();
    let editedProduct = {
      title: title.current.value,
      price: price.current.value,
      category: category.current.value,
      image: image.current.value,
    };
    setShowEditModal(false);

    Instance.patch(`products/${id}`, editedProduct)
      .then(() => {
        setData((prev) => {
          let newdata = prev.map((el) => {
            if (el.id == obj.id) {
              (el.title = title.current.value),
                (el.price = price.current.value),
                (el.category = category.current.value),
                (el.image = image.current.value);
            }
            return el;
          });
          return newdata;
        });
        toast.success("Product is edited");
      })
      .catch((er) => console.log(er.message));
  }

  return (
    <div
      style={showEditModal ? { right: "0" } : { right: "-100%" }}
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
            editProduct(e, obj?.id);
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditModal;
