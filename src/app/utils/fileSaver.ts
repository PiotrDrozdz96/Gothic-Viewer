export const saveAs = (fileName: string, blob: Blob) => {
  const a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
