'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DownloadButtonProps {
  blobUrl: string;
  filename?: string;
}

export function DownloadButton({ blobUrl, filename = 'reviewpost.png' }: DownloadButtonProps) {
  return (
    <a href={blobUrl} download={filename} className="contents">
      <Button variant="secondary" size="md" className="gap-2">
        <Download size={16} />
        Download Image
      </Button>
    </a>
  );
}
