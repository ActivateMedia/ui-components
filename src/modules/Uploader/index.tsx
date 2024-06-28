import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import React, { FunctionComponent } from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { Dashboard } from '@uppy/react';
import { get } from 'lodash';
import { useStore } from 'react-redux';
import { useTranslation } from 'next-i18next';
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
  handleUppyUpload
}) => {
  const { t } = useTranslation('common');
  const store: any = useStore();
  const { token } = store.getState().auth;

  const uppy = new Uppy({
    autoProceed: false,
    restrictions: {
      allowedFileTypes: allowedFileTypes || [
        '.pdf',
        '.PDF',
        '.doc',
        '.docx',
        '.DOCX'
      ],
      maxFileSize: maxFileSize * 1024 * 1024 // in bytes
    },
    locale: {
      strings: {
        chooseFiles: 'Select a file'
      }
    }
  });

  uppy
    .use(AwsS3, {
      getUploadParameters(file: any): any {
        return fetch(
          `${process.env.ImApiUrl}/v1/user/upload/generatePresignedUrl`,
          {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              filename: file.name,
              namespace: 'files'
            })
          }
        )
          .then((response: any) => {
            return response.json();
          })
          .then((data: any) => {
            return {
              method: 'PUT',
              url: `${data.data.signedUrl}`,
              fields: [],
              headers: {
                'Content-Type': file.type
              }
            };
          });
      }
    })
    .on('complete', (result) => {
      const uploadURL = result.successful?.[0]?.uploadURL;
      const fileUrl = uploadURL.substring(uploadURL.lastIndexOf('/') + 1);
      const fileName = get(result, 'successful[0].data.name', '');

      handleUppyUpload(fileKey, {
        fileName: fileName,
        fileUrl: fileUrl,
        uploadURL: uploadURL
      });
      onComplete();
    });

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
        <p>{t('UPLOADER.DOCS_SIZE_INFO', { maxFileSize })}</p>
        {/* <p>{t('UPLOADER.DOCS_PRIVACY')}</p> */}
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
