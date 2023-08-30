import { ChangeEvent, useState } from "react";
import axios from "axios";
import requestDeprecated from "../../lib/requestDeprecated.ts";
import DownloadList from "./DownloadList.tsx";

const lawsuitId = 1;

function TestPage() {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChanges = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    const { files } = e.target;
    if (!files) {
      return;
    }
    const fileArr = Array.from(files);
    console.dir(fileArr);
    setSelectedFiles(fileArr);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (const selectedFile of selectedFiles) {
      formData.append("files", selectedFile);
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Save-Directory": "animal",
          },
        },
      );

      const body: {
        isSaved: boolean;
        originalFileName: string;
        path: string;
      }[] = response.data;

      console.dir(body);

      const filteredBody = body.filter((item) => item.isSaved);

      for (const item of filteredBody) {
        requestDeprecated("POST", "/lawsuit-files", {
          body: {
            lawsuitId,
            path: item.path,
            type: "타입",
          },
        });
      }
    } catch (e) {
      console.error("에러");
      console.dir(e);
    }
  };

  const handleDownload = () => {};

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input type="file" multiple onChange={handleFileChanges} />
      <button onClick={handleUpload}>업로드</button>
      {!open && <button onClick={() => setOpen(true)}>열기</button>}
      {open && (
        <>
          <button onClick={() => setOpen(false)}>닫기</button>
          <DownloadList />
          <button onClick={handleDownload}>다운로드</button>
        </>
      )}
    </div>
  );
}

export default TestPage;
