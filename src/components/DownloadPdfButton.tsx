import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import WaitingApprovalUserPDF from './WaitingApprovalUserPDF';

//.csv

const DownloadPdfButton = ({ className, userData }: any) => (
  <div className={className}>
    <PDFDownloadLink document={<WaitingApprovalUserPDF userData={userData} />} fileName="deneme.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Export PDF')}
    </PDFDownloadLink>
  </div>
);

export default DownloadPdfButton;
