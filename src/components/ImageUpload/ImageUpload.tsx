
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { useState } from "react";

export const ImageUpload = () => {

  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const updateFiles = (incommingFiles: any) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id: number) => {
    if (files[0]) {
      setFiles(files.filter((x) => x.id !== id));
    }
  };
  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files: any) => {
    console.log("list cleaned", files);
  };

  return (
    <Dropzone
      style={{ minWidth: "550px" }}
      //view={"list"}
      onChange={updateFiles}
      minHeight="195px"
      onClean={handleClean}
      value={files}
      maxFiles={1}
      //header={false}
      // footer={false}
      maxFileSize={2998000}
      //label="Drag'n drop files here or click to browse"
      //label="Suleta tus archivos aquí"
      accept=".png,image/*"
      // uploadingMessage={"Uploading..."}
      url="https://my-awsome-server/upload-my-file"
      //of course this url doens´t work, is only to make upload button visible
      //uploadOnDrop
      //clickable={false}
      fakeUploading
      //localization={"FR-fr"}
      disableScroll
    >
      {files.map((file) => (
        <FileItem
          {...file}
          key={file.id}
          onDelete={onDelete}
          onSee={handleSee}
          //localization={"ES-es"}
          resultOnTooltip
          preview
          info
          hd
        />
      ))}
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e) => handleSee(undefined)}
      />
    </Dropzone>
  );
};