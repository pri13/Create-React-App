import React from "react";    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Loader = () => {
    return (
    <div className="d-flex justify-content-center align-items-center loaderDiv">
      <FontAwesomeIcon icon={faSpinner} spin size="6x" />
    </div>
  );
};



export default Loader;