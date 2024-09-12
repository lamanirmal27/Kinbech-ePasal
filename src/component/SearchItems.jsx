import React, { useContext, useCallback } from "react";
import ProductContext from "../context/ProductProvider";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useNavigate } from "react-router-dom";

function SearchItems() {
  const {newItem} = useContext(ProductContext)
  const { setFocusItem } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleOnSelect = useCallback(
    (item) => {
      setFocusItem(item);
      navigate("/details");
      console.log(item);
    },
    [setFocusItem, navigate]
  );

  const formatResult = useCallback((item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 250 }}>
          <ReactSearchAutocomplete
            items={newItem}
            onSelect={handleOnSelect}
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  );
}

export default React.memo(SearchItems);
