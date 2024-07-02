import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import React, { FunctionComponent } from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { Dashboard } from '@uppy/react';
import Button from '../../components/button';

interface IProps {
  className?: string;
  title?: string;
  subTitle?: string;
  buttonsArray?: any[];
  fileKey: string;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  onComplete: () => void;
  handleUppyUpload: (fileKey: string, file: any) => void;
  uppy: any;
  uploderDocSizeText: string;
}

const UppyUploader: FunctionComponent<IProps> = ({
  className,
  title,
  subTitle,
  buttonsArray,
  fileKey,
  maxFileSize = 10,
  allowedFileTypes,
  onComplete,
  handleUppyUpload,
  uppy,
  uploderDocSizeText
}) => {
  return (
    <div className={className}>
      {title && <h4 className="mb-3 text-left">{title}</h4>}
      {subTitle && <p className="mb-3 text-sm text-left">{subTitle}</p>}
      <div className="flex items-center justify-center w-full">
        <Dashboard
          uppy={uppy}
          plugins={['FileType']}
          width={400}
          height={260}
          metaFields={[
            { id: 'name', name: 'Name', placeholder: 'file name' },
            {
              id: 'caption',
              name: 'Caption',
              placeholder: 'describe what the image is about'
            }
          ]}
          proudlyDisplayPoweredByUppy={false}
          className="border border-neutral-300 dark:border-neutral-600 rounded-lg resize-none text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 w-full"
          locale={{
            strings: {}
          }}
        />
      </div>
      <div className="flex justify-between text-slate-500 pt-5 pb-2 px-3 text-xs">
        <p>
          {uploderDocSizeText},{maxFileSize}
        </p>
      </div>
      <div className="flex justify-between pt-2">
        {buttonsArray?.map((item: any, i: number) => {
          return (
            <Button
              type="button"
              onClick={item.onClick}
              className={item.btnClass}
              key={`button-uppy-uploader-${String(i)}`}
            >
              <p className="text-sm">{item.btnLabel}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

UppyUploader.defaultProps = {
  className: 'rounded-xl bg-light-800 default-shadow'
};

export default UppyUploader;
