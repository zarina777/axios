import clsx from "clsx";
import cn from "./style.module.scss";

const Container = (props) => {
  const { children, className } = props;
  return <div className={clsx(cn.Container, className)}>{children}</div>;
};

export default Container;
