export const fileExtensionReader = (fileName: string) => {
  if (!fileName) return "unknown";
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "pdf":
      return "pdf";
    case "doc":
    case "docx":
      return "word";
    case "xls":
    case "xlsx":
      return "excel";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "tiff":
    case "tif":
    case "webp":
    case "heif":
    case "heic":
    case "raw":
    case "svg":
    case "eps":
    case "ai":
    case "cdr":
    case "ico":
    case "psd":
    case "xcf":
      return "image";
    default:
      return "unknown";
  }
};

export const numberToBytes = (num: number, precision: number = 2) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let unitIndex = 0;
  while (num >= 1024) {
    num /= 1024;
    unitIndex++;
  }
  return `${num.toFixed(precision)} ${units[unitIndex]}`;
};

export const getNameFromUrl = (url: string) => {
  try {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split("/");
    const filename = parts[parts.length - 1];
    return filename || "unknown";
  } catch (error) {
    return "unknown";
  }
};

export const base64ToBlob = (base64: string) => {
  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return blob;
};
