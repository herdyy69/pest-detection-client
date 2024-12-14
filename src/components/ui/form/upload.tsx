import Image from 'next/image'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AxiosRequestConfig } from 'axios'
import { Accept, useDropzone } from 'react-dropzone'

import { cn } from '@/lib/utils'
import { fileExtensionReader, getNameFromUrl, numberToBytes } from '@/lib/file'
import { UploadFieldProps, UploadProps } from '@/interfaces/form'

import { FormLabel, FormMessage } from './form'
import DownloadLink from '../common/downloadLink'
import Icons from '@/components/ui/icons'

type FileValue = {
  name: string
  url: string
  path: string
  progress?: number
  type?: string
}

interface IUpload {
  maxFiles: number
  maxSize: number
  placeholder?: string
  fileRejections?: any[]
  disabled?: boolean
  onCancel?: (index: number) => void
  files: File[] | FileValue[]
}

interface UploadItemProps {
  filename: string
  href?: string
  type?: string
  status: string
  progress?: number
  size?: string | number
  onCancel?: () => void
  disabled?: boolean
}

function parseValues({ input, keyPairs }: { input: any; keyPairs?: any }): any {
  if (!input) {
    return
  }

  if (input instanceof File) {
    return input
  }

  if (Array.isArray(input) && input.every((item) => item instanceof File)) {
    return input
  }

  // Helper function to process a single value object
  const processValue = (value: any) => {
    const url = value[keyPairs?.url] || value?.url || ''
    const name = value[keyPairs?.name] || value?.name || getNameFromUrl(url)

    return { name, url, ...value }
  }

  // Normalize input to ensure consistent processing
  const normalizeValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.flat().map((item) => (typeof item === 'string' ? { url: item } : item))
    }
    if (typeof value === 'string') {
      return [{ url: value }]
    }
    if (typeof value === 'object' && value !== null) {
      return [value]
    }
    return []
  }

  const values = normalizeValue(input)

  const processedValues = values.map(processValue)

  return processedValues
}

async function onUpload({ file, config }: { file: File; config?: AxiosRequestConfig<any> | undefined }) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', file.name)

  const apiConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  }

  return {
    data: {
      data: {
        name: file.name,
        url: URL.createObjectURL(file),
      },
    },
  }
}

const UploadContext = createContext<any>({})

const useUpload = () => {
  const context = useContext<IUpload>(UploadContext)
  if (!context) {
    throw new Error('Upload compound components must be rendered within the Upload component')
  }
  return context
}

export const Upload = ({
  className,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024,
  disabled,
  accept,
  placeholder,
  children,
  onChange,
  keyPairs,
  values,
  status,
  message,
  isServerSide = false,
}: UploadProps & { accept?: Accept }) => {
  const [files, setFiles] = useState<File[] | FileValue[]>()
  const [fileRejections, setFileRejections] = useState<any[]>([])

  const handleDropServer = async (files: File[]) => {
    setFiles(files.map((file) => ({ name: file.name, path: '', url: URL.createObjectURL(file), progress: 0 })))

    const dataFiles = await Promise.all(
      files.map(async (file, index) => {
        const response = await onUpload({
          file,
          config: {
            onUploadProgress: function (progressEvent: any) {
              let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

              setFiles((prevVal: any) => {
                const newVal = [...prevVal]
                newVal[index].progress = percentCompleted
                return newVal
              })
            },
          },
        })

        return response?.data
      }),
    )

    const mappedDataFiles = dataFiles.map((dataFile: any) => ({
      name: dataFile?.data?.name,
      url: dataFile?.data?.url,
      path: dataFile?.data?.path,
      type: dataFile?.data?.mimetype,
      progress: 100,
    }))

    setFiles(mappedDataFiles)
    onChange && onChange(maxFiles === 1 ? mappedDataFiles[0] : mappedDataFiles)
  }

  const handleDropClient = (files: File[]) => {
    setFiles(files)
    onChange && onChange(maxFiles === 1 ? files[0] : files)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: isServerSide ? handleDropServer : handleDropClient,
    disabled:
      disabled ||
      (maxFiles === 1 && files && files?.length > 0) ||
      (files instanceof File && !!files && maxFiles === 1),
    onDropRejected: (fileRejections) => setFileRejections(fileRejections),
    onFileDialogOpen: () => setFileRejections([]),
    onDragEnter: () => setFileRejections([]),
    maxFiles,
    maxSize,
    accept,
  })

  const onCancel = (index: number) => {
    setFileRejections([])
    if (files && Array.isArray(files)) {
      const filteredFiles: any = files?.filter((_: any, i: number) => i !== index)
      setFiles(maxFiles === 1 ? undefined : filteredFiles)
      onChange && onChange(maxFiles === 1 ? undefined : filteredFiles)
    } else {
      setFiles(maxFiles === 1 ? undefined : [])
      onChange && onChange(null)
    }
  }

  const contextValues = useMemo(() => {
    return {
      files,
      placeholder,
      maxFiles,
      maxSize,
      disabled,
      fileRejections,
      onCancel,
    }
  }, [files, placeholder, maxFiles, maxSize, fileRejections, onCancel, disabled])

  useEffect(() => {
    const defaultValues = parseValues({ input: values, keyPairs })

    setFiles(defaultValues)
  }, [values])

  return (
    <UploadContext.Provider value={contextValues}>
      <div className='w-full flex flex-col gap-2'>
        {maxFiles === 1 && ((files instanceof File && !!files) || (files instanceof Array && files?.length > 0)) ? (
          <SingleItem />
        ) : (
          <div
            {...getRootProps({
              className: cn(
                'h-full flex items-center justify-center min-h-[136px] px-6 py-4 bg-white border border-input rounded-md ease-in-out transition-colors duration-150 form-input',
                isDragActive && 'border-blue-base shadow-borderGlow',
                disabled
                  ? 'cursor-not-allowed border-text-stroke bg-[#F9FAFB]'
                  : 'cursor-pointer hover:border-blue-base hover:shadow-borderGlow',
                fileRejections?.length > 0 && 'error',
                status,
                className,
              ),
            })}
          >
            <input {...getInputProps({})} />
            <UploadContent />
          </div>
        )}
        <UploadItems />
        <FormMessage>{message}</FormMessage>
        {children}
      </div>
    </UploadContext.Provider>
  )
}

const UploadItem = ({
  filename,
  href,
  type,
  status,
  progress = 0,
  size,
  disabled = false,
  onCancel,
}: UploadItemProps) => {
  const currentProgress = status === 'finished' ? 100 : progress

  return (
    <div className='flex items-start border border-greyscale-4 rounded-xl w-full p-4 gap-3'>
      <Icons.File className='w-4 h-4' />
      <div className='flex flex-col items-center justify-center gap-1 flex-1'>
        <div className='flex w-full flex-col items-start gap-1 relative pr-6'>
          <DownloadLink href={href ?? '#'} name={filename ?? 'Unknown File'} />
          {size && <div className='plabs-caption-regular-14 text-greyscale-6'>{size}</div>}
          <button
            className='w-5 h-5 absolute right-0'
            type='button'
            onClick={onCancel}
            disabled={disabled || status === 'uploading'}
          >
            <Icons.Trash className='w-4 h-4 text-red-base' />
          </button>
        </div>
        <div className={cn('flex items-center gap-3 w-full', !size && 'mt-2')}>
          <div className='w-full h-2 rounded-md flex-1 bg-greyscale-4 relative'>
            <div
              style={{
                width: `${currentProgress}%`,
              }}
              className={`absolute h-full transition-all ease-in bg-blue-base rounded-md`}
            ></div>
          </div>
          <div className='plabs-caption-medium-sm text-greyscale-6'>{currentProgress}%</div>
        </div>
      </div>
    </div>
  )
}

const SingleItem = () => {
  const { files, placeholder, maxFiles, maxSize, disabled, onCancel } = useUpload()

  if (((files instanceof File && !!files) || (files instanceof Array && files?.length > 0)) && maxFiles === 1) {
    let file = Array.isArray(files) ? files[0] : files

    let href = file instanceof File ? URL.createObjectURL(file) : file?.url

    const type = file?.type?.includes('image') ? 'image' : fileExtensionReader(file?.name ?? '')
    //@ts-ignore
    const size = file?.size ? numberToBytes(file?.size) : ''
    //@ts-ignore
    const status =
      file instanceof File ? 'finished' : file?.progress === 100 ? 'finished' : !!file ? 'finished' : 'uploading'
    const progress = file instanceof File ? 100 : file?.progress

    // if (type === 'image') {
    return (
      <div className='relative w-full h-full overflow-hidden border rounded-lg py-4'>
        <Image
          className='w-full max-h-[200px] object-contain'
          src={href}
          width={200}
          height={200}
          sizes='100vw'
          alt='image'
        />
        {!disabled && (
          <div className='absolute top-3 right-3 z-20'>
            <button
              onClick={() => onCancel && onCancel(0)}
              disabled={disabled}
              className='absolute top-0 right-0 cursor-pointer rounded-full bg-greyscale-8 w-5 h-5 flex items-center justify-center'
            >
              <Icons.X className='w-3 h-3 text-greyscale-0' />
            </button>
          </div>
        )}
      </div>
    )
    // }

    // return (
    //   <UploadItem
    //     filename={file?.name}
    //     status={status}
    //     href={href}
    //     type={type}
    //     size={size}
    //     progress={progress}
    //     onCancel={() => onCancel && onCancel(0)}
    //     disabled={disabled}
    //   />
    // )
  } else {
    return <></>
  }
}

const UploadItems = () => {
  const { files, maxFiles, fileRejections, disabled, onCancel } = useUpload()

  return (
    <>
      {((files?.length > 0 && maxFiles !== 1) || (fileRejections && fileRejections?.length > 0)) && (
        <ul className='flex flex-col gap-2'>
          {maxFiles !== 1 &&
            files?.map((file: any, index: number) => {
              let href = file instanceof File ? URL.createObjectURL(file) : file?.url

              const finished = file?.progress === 100 || !file?.progress
              const size = file?.size ? numberToBytes(file?.size) : ''

              return (
                <UploadItem
                  key={index}
                  filename={file.name}
                  href={href}
                  type={file}
                  size={size}
                  status={finished ? 'finished' : 'uploading'}
                  progress={file?.progress}
                  onCancel={() => onCancel && onCancel(index)}
                  disabled={disabled}
                />
              )
            })}
          {fileRejections && fileRejections?.length > 0 && (
            <div className='flex flex-col gap-1 max-h-28 overflow-auto'>
              {fileRejections?.map((rejection: any, index: number) => {
                const { errors, file } = rejection
                const message = file.name + ' - ' + errors?.map((error: any) => error.message).join(', ')

                return <FormMessage key={index}>{message}</FormMessage>
              })}
            </div>
          )}
        </ul>
      )}
    </>
  )
}

const UploadContent = () => {
  const { files, placeholder, maxFiles, maxSize, disabled, onCancel } = useUpload()

  if (((files instanceof File && !!files) || (files instanceof Array && files?.length > 0)) && maxFiles === 1) {
    let file = Array.isArray(files) ? files[0] : files

    let href = file instanceof File ? URL.createObjectURL(file) : file?.url

    const type = fileExtensionReader(file?.name ?? '')

    if (type === 'image') {
      return (
        <div className='w-full h-full relative flex items-center justify-center'>
          <Image
            src={href}
            alt={file?.name ?? ''}
            width={0}
            height={0}
            className='h-full max-h-60 w-auto object-contain'
          />
          <button
            onClick={() => onCancel && onCancel(0)}
            disabled={disabled}
            className='absolute top-0 right-0 cursor-pointer rounded-full bg-greyscale-8 w-5 h-5 flex items-center justify-center'
          >
            <Icons.X className='w-3 h-3 text-greyscale-0' />
          </button>
        </div>
      )
    }

    return (
      <div className='flex flex-col max-w-[190px] items-center justify-center gap-1 text-center mx-auto plabs-caption-regular-14'>
        <div className='relative max-w-min'>
          <UploadIcon type={type} />
          <button
            onClick={() => onCancel && onCancel(0)}
            disabled={disabled}
            className='absolute top-0 right-0 cursor-pointer rounded-full bg-greyscale-8 w-5 h-5 flex items-center justify-center'
          >
            <Icons.X className='w-3 h-3 text-greyscale-0' />
          </button>
        </div>
        <DownloadLink href={href ?? '#'} name={file?.name ?? 'filename'} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-center mx-auto plabs-caption-regular-sm text-text-grey',
      )}
    >
      <div
        className='w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-text-stroke'
        style={{
          boxShadow: '0px 1px 2px 0px #1018280D',
        }}
      >
        <Icons.CloudUpload className='text-[#475467]' />
      </div>
      <div className='flex flex-col items-center justify-center gap-1'>
        {placeholder ? (
          <span>{placeholder}</span>
        ) : (
          <span>
            <span className='plabs-caption-semibold-sm text-primary-2-500'>Click to upload</span> or drag & drop
          </span>
        )}
        <span>{`Maximum file size ${numberToBytes(maxSize, 0)}`}</span>
      </div>
    </div>
  )
}

const UploadIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'pdf':
      return <Icons.CloudUpload className='w-10 h-10 text-blue-base' />
    case 'excel':
      return <Icons.CloudUpload className='w-10 h-10 text-blue-base' />
    case 'word':
      return <Icons.CloudUpload className='w-10 h-10 text-blue-base' />
    default:
      return <Icons.CloudUpload className='w-10 h-10 text-blue-base' />
  }
}

const UploadField = ({ name, control, defaultValue, message, status, required, label, ...rest }: UploadFieldProps) => {
  return (
    <div className={cn('w-full h-full flex flex-col gap-1.5')}>
      <FormLabel>{label}</FormLabel>
      <Upload {...rest} />
    </div>
  )
}

export default UploadField
