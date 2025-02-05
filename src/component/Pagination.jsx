
const Pagination = ({ postsPerPage }) => {
    let length = 100

    const paginationNumbers = [];
  
  
  
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
  
      paginationNumbers.push(i);
  
    }
  
  
  
  return (
  
      <div className='pagination text-center py-10' >
  
        {paginationNumbers.map((pageNumber) => (
  
          <button className="border p-3 rounded-full text-center" key={pageNumber} 
          >{pageNumber}</button>
  
        ))}
  
      </div>
  
    );
  
  };
  
  
  
  export default Pagination;
  
  