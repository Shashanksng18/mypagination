import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const App = () => {

  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
      const getComments = async () => {
         const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10`);

         const result = await res.json();

        

         let total = res.headers.get('x-total-count');
         setPageCount(Math.ceil(total/10));
         console.log(result);
      }
      
       getComments();
  }, []);

  const fetchComments =async (currentPage) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=10`);
      const result = await res.json();
      return result;
  }
  const handleChange =async (data) => {
    const currentPage = data.selected + 1;
    console.log(currentPage);
    const result = await fetchComments(currentPage);
    setItems(result);
  }
  return(
    <>
       {items.map((item) => (
        <article id={item.id}>
            <h1>Id : {item.id}</h1>
            <h2>{item.name}</h2>
            <p>{item.body}</p>
        </article>
       ))}
      <ReactPaginate
        nextLabel={"next"}
        previousLabel={"previous"}
        breakLabel={"..."}
        marginPagesDisplayed={4}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={handleChange}
        nextClassName="next"
        nextLinkClassName="next-link"
        previousClassName="prev"
      />
    </>
  )
}

export default App;