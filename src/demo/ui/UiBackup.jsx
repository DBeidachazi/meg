import React from 'react';
import "../upload/upload.css"

const UiBackup = () => {
  function goToRoot() {
    window.location.href = "/";
  }

  return (
      <div onClick={goToRoot} >

          <img id={ "backupImg" } src="http://image.kypeople.cn/bUR49G.png" alt="backup black" style={{ width: "2rem", height: "1.5rem",
                                                        position: "relative", bottom: "2px", cursor: "pointer" }}/>
      </div>
  );
};

export default UiBackup;