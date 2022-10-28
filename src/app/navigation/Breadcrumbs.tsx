import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { ROUTE } from "../contant/Contant";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const ActiveBreadcrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href={`${ROUTE.HOME}`} onClick={handleClick}>
        Home
      </Link>
      <Link color="inherit" href={`${ROUTE.PRODUCT}`} onClick={handleClick}>
        Product
      </Link>
      <Link
        color="textPrimary"
        href={`${ROUTE.PRODUCT_DETAIL}`}
        onClick={handleClick}
        aria-current="page"
      >
        Product Detail
      </Link>
    </Breadcrumbs>
  );
};
export default ActiveBreadcrumbs;
