import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import LoginPage from "./page/login";
import FullLayout from "./Layout/layout";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // ฟังก์ชันสำหรับอัพเดต token หลัง login สำเร็จ
  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);  // อัพเดต state ทันที
  };


  return (
    <BrowserRouter>
      {!token ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <FullLayout />
      )}
    </BrowserRouter>
  );
}

export default App;
