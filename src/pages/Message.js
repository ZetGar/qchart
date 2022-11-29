import React from "react";

function Message({ type, message }) {
  return (
    <div>
      <div className={`${type}Img`}>
        <img src={`image/${type}.png`} alt={type} />
        {message ? <div>{message}</div> : null}
        {/* {children} */}
      </div>
    </div>
  );
}

export default Message;
