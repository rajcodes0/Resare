import React, { useState } from "react";
import toast from "react-hot-toast"

function Upload() {
  const [file, setFile] = useState(null);
  const [active, setActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first ❌");
      return;
    }

    console.log(file.name);

    setActive(true);
   toast.success("Upload Complete", {
  style: {
    borderRadius: "10px",
    background: "#22c55e",
    color: "#fff",
  },
});
  };

  return (
    <form
      className="text-xl rounded-2xl text-center flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        className="mb-10 mt-20 rounded-xl p-4 bg-sky-700 text-white"
        onChange={handleFileChange}
      />

      <button
        type="submit"
        className={`px-6 py-2 rounded-2xl hover:opacity-80 text-white transition ${
          active ? "bg-green-600" : "bg-blue-600"
        }`}
      >
        {active ? "Uploaded ✅" : "Submit"}
      </button>
    </form>
  );
}

export default Upload;