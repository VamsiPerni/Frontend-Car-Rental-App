import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router";
import { Footer } from "../components/footer";

const PublicLayout = () => {
  const [text, setText] = useState("");

  const handleSearchText = (value) => {
    setText(value);
  };

  return (
    <div>
      <Navbar text={text} handleSearchText={handleSearchText} />
      <Outlet context={{ text, setText, handleSearchText }} />
      <Footer />
    </div>
  );
};

export { PublicLayout };
