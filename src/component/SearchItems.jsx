import React, { useContext } from "react";
import newItem from "../context/itemData";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ProductContext from "../context/ProductProvider";
import { useNavigate } from "react-router-dom";

function SearchItems() {
  const { setFocusItem } = useContext(ProductContext);
  const navigate = useNavigate();
  // note: the id field is mandatory

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    // setFocusItem(result);
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setFocusItem(item);
    navigate("/details");
    console.log(item);
  };

  const handleOnFocus = () => {
    // setFocusItem(item);
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 250 }}>
          <ReactSearchAutocomplete
            items={newItem}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  );
}

export default SearchItems;
