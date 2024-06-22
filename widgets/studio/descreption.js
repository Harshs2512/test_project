// import node module libraries
const Description = ({description}) => {
  return (
    <div>
      <h1 className="">Description</h1>
        <div>
          <h4 dangerouslySetInnerHTML={{__html: description}}></h4>
        </div>
    </div>
  );
};


export default Description;
