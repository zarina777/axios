import { createContext, useState } from "react";

const GeneralContext = createContext();

function ContextProvide(props) {
  const { children } = props;

  let [showAddModal, setShowAddModal] = useState(false);
  let [data, setData] = useState([]);
  let [showEditModal, setShowEditModal] = useState(false);
  let [obj, setObj] = useState(null);
  let [user, setUser] = useState(null);
  let [table, setTable] = useState(false);
  let [copyData, setCopyData] = useState([]);
  let [productCat, setProductCat] = useState("all");

  function Logout(input) {
    setUser(input);
  }
  return (
    <GeneralContext.Provider
      value={{
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        table,
        setTable,
        obj,
        setObj,
        setData,
        data,
        user,
        setUser,
        Logout,
        copyData,
        setCopyData,
        productCat,
        setProductCat,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}
export { ContextProvide, GeneralContext };
