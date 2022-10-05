const SearchResults = ({ result }) => {
  return (
    <>
      <div>main results</div>
      {result.results.map((element) => (
        <div key={element.set_num}>
          <div>{element.set_num}</div>
          <div>{element.name}</div>
          <div>{element.year}</div>
          <div>{element.num_parts}</div>
          <div>{element.set_img_url}</div>
          <br />
        </div>
      ))}
    </>
  );
};

export default SearchResults;
