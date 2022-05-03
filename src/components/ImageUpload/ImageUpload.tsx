import { Box, Image } from '@chakra-ui/react'
import { url } from 'inspector';
import { useEffect, useState } from 'react';
import Dropzone, {
  defaultClassNames,
  IDropzoneProps,
  ILayoutProps,
  IPreviewProps,
  IInputProps,
} from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

export type ImageUploadType = {
  passImageProps: any;
}

const ImageUpload = ({ passImageProps }: ImageUploadType) => {

  const [imageState, setImageState] = useState({ imageState: "", uploadState: "none" });

  const getUploadParams: IDropzoneProps['getUploadParams'] = ({ meta }) => {
    const url = 'http://localhost:4000/upload-image'
    const fileUrl = `${url}/${encodeURIComponent(meta.name)}`
    return { url, meta: { fileUrl } }
  }

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta }, status,) => {
    setImageState({
      imageState: meta.previewUrl!,
      uploadState: status
    })
    console.log("this happened");
    if (status === "done") {
      console.log(meta);
    }
    passImageProps(meta.name)

  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files) => {
    console.log(files.map(f => f.meta))
    console.log("OnSubmit called");

    setImageState({
      ...imageState,
      uploadState: "uploaded"
    })

    console.log(files)
  }

  const Preview = ({ meta }: IPreviewProps) => {
    const { name, percent, status, previewUrl } = meta
    if (status !== 'done') {
      return (
        <Box>
          <span style={{ alignSelf: 'flex-start', margin: '10px 3%' }}>
            {name}, {Math.round(percent)}%, {status}
          </span>
        </Box>
      )
    }
    else {
      return (
        <Box>
          <Image
            src={previewUrl}
            width={'300px'}
            height={'300px'}
          />
        </Box>
      )
    }
  }

  return (
    <Dropzone
      accept='image/jpg,image/png,image/jpeg'
      multiple={false}
      maxFiles={1}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      autoUpload={true}
      PreviewComponent={Preview}
      disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
      styles={{
        dropzone: { width: 450, height: 450, overflow: 'hidden' },
        dropzoneActive: { borderColor: 'green' },
        submitButton: { display: "none" }
      }}
    >
    </Dropzone>
  )
}

export default ImageUpload;