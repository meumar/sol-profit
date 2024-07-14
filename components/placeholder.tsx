const MainPlaceholder = () => {
  return (
    <div className="flex flex-row p-24">
      <div className="basis-4/12 min-w-min"></div>
      <div className="basis-4/12 items-center w-full flex flex-col justify-center">
        <div className=" bg-slate-200 rounded-md p-4 w-96">
          <div className="items-center w-full flex flex-col justify-center">
            <h1 className="text-lg font-bold">Get profit!</h1>
          </div>
          <hr className="my-2" />
          <div className="form-group flex flex-col mt-2">
            <label>From</label>
            <p className="placeholder-glow">
              <span className="placeholder col-12 h-8 rounded-md"></span>
            </p>
          </div>
          <div className="items-center w-full flex flex-col justify-center mt-2">
            <span className="placeholder"></span>
          </div>
          <div className="form-group flex flex-col">
            <label>To</label>
            <p className="placeholder-glow">
              <span className="placeholder col-12 h-8 rounded-md"></span>
            </p>
          </div>
          <div className="flex flex-col mt-3">
            <a
              className="btn btn-dark disabled placeholder"
              aria-disabled="true"
            ></a>
          </div>
        </div>
      </div>
      <div className="basis-4/12 min-w-min"></div>
    </div>
  );
};

export default MainPlaceholder;
