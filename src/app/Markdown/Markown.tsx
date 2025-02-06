import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { theme } from "flowbite-react";

// const theme = localStorage.getItem("vite-ui-theme");
const CheckMd = () => {
  const [value, setValue] = useState<any>("# This is your markdown");

  const [itemValue, setItemValue] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch the value from localStorage
    const fetchLocalStorageValue = () => {
      const value = localStorage.getItem("vite-ui-theme"); 
      setItemValue(value);
    };

    fetchLocalStorageValue();
    const intervalId = setInterval(fetchLocalStorageValue, 100);

    return () => clearInterval(intervalId);
  },[]);

  console.log(itemValue);

  return (
    <div
      data-color-mode={itemValue}
      style={{
        backgroundColor: itemValue === "dark" ? "#1e1e1e" : "#ffffff",
      }}
      className="container"
    >
      <MDEditor
        value={value}
        onChange={setValue}
        height={"250px"}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
};

export default CheckMd;
