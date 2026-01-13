import React from "react";
import CollectionBanner from "./CollectionBanner";

const NewCollectionBanner = () => {
  return (
    <CollectionBanner
      label="| NEW COLLECTION"
      title={"HANG OUT\n& PARTY"}
      image={require("../../../assets/products/newgirl.png")}
    />
  );
};

export default NewCollectionBanner;
