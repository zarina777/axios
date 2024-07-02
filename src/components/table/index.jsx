import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Instance from "../../api";
import { GeneralContext } from "../../context";
import Container from "../Container";
import cn from "./style.module.scss";

function Table() {
  const { data, setObj, setShowEditModal, obj } = useContext(GeneralContext);
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
  }
  function editProduct(event, el) {
    event.stopPropagation();
    setShowEditModal(true);
    console.log(el);
    setObj(el);
    console.log(obj);
  }
  const columns = [
    {
      header: "Image of product",
      accessorKey: "image",
      cell: (info) => {
        return (
          <div className={cn.img_wrap}>
            <img className={cn.img} src={`${info.getValue()}`} />
          </div>
        );
      },
    },
    {
      header: "Title of product",
      accessorKey: "title",
      cell: (info) => {
        return (
          <Link className={cn.title} to={`product/${info.row.original.id}`}>{info.getValue()}</Link>
        );
      },
    },
    {
      header: "Price of product",
      accessorKey: "price",
      cell: (info) => {
        return info.getValue() + "$";
      },
    },
    {
      header: "Category of product",
      accessorKey: "category",
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className={cn.btns}>
          <button onClick={(e) => editProduct(e, info.row.original)}>
            edit
          </button>
          <button onClick={(e) => deleteProduct(e, info.row.original.id)}>
            delete
          </button>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container className={cn.container}>
      <table border={1}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.column.columnDef.cell
                    ? cell.column.columnDef.cell(cell)
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default Table;
