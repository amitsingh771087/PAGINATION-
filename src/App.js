import React, { useState, useEffect } from "react";
import "./Style.css";

const App = () => {
  const [products, SetPoducts] = useState([]);
  const [pages, setPages] = useState(2);
  const [totalPages , SetTotalPages] = useState(0)

  const fetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");

    const data = await res.json();
    console.log(data)

    if (data && data.products) {
      SetPoducts(data.products);
      SetTotalPages(data.total/10)
    }

    console.log(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const selectedPageHandeler = (selectedPage)=>{
    if(selectedPage >= 1 && selectedPage <= products.length/10 && selectedPage !== pages){
      setPages(selectedPage)
    }
   
  }

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pages * 10 - 10, pages * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt="img not available" />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span 
          className={pages > 1 ? "": "pagination__disable"}
          onClick={()=> selectedPageHandeler(pages - 1)}>◀</span>

          {[...Array(products.length / 10)].map((_, i) => {
            return <span className={pages === i+1 ? "pagination__selected" : ""} onClick={()=> selectedPageHandeler(i+1)} key={i}>{i+1}</span>;
          })}

          <span
           className={pages < products.length / 10  ? "": "pagination__disable"}
          onClick={()=> selectedPageHandeler(pages + 1)}>▶</span>
        </div>
      )}
    </>
  );
};

export default App;
