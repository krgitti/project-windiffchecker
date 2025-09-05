import React, { useRef, useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (content: string) => void;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, accept = ".txt" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
      setUploadedFileName(file.name);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileRead(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileRead(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
        isDragging
          ? 'border-blue-400 bg-blue-50'
          : uploadedFileName
          ? 'border-green-400 bg-green-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />
      
      {uploadedFileName ? (
        <div className="space-y-2">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
          <p className="text-green-700 font-medium">Arquivo enviado com sucesso!</p>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            <File className="h-4 w-4" />
            {uploadedFileName}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Upload className="h-8 w-8 text-gray-400 mx-auto" />
          <p className="text-gray-600 font-medium">
            {isDragging ? 'Solte seu arquivo aqui' : 'Arraste um arquivo ou clique para enviar'}
          </p>
          <p className="text-xs text-gray-500">
            Suporta: TXT, JS, HTML, CSS, JSON, MD e mais
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;