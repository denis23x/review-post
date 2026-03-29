'use client';

import { Download } from 'lucide-react';
import { cn } from '@/lib/cn';

interface DownloadButtonProps {
  blobUrl: string;
  filename?: string;
}

export function DownloadButton({ blobUrl, filename = 'reviewpost.png' }: DownloadButtonProps) {
  return (
    <a href={blobUrl} download={filename} className="contents">
      <button
        type="button"
        className={cn(
          'flex h-10 cursor-pointer items-center justify-center gap-3 rounded-full bg-[#4A9FD8] px-4 text-sm font-medium text-white transition-opacity hover:opacity-80',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        <Download size={16} />
        Download Image
      </button>
    </a>
  );
}
