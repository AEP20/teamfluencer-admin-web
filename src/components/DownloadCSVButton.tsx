import React, { useEffect, useState } from 'react';
import convertToCSV from '../utils/WaitingApprovalUserCSV';

const DownloadCSVButton = ({ className, userData }: any) => {
  if (userData && userData.length > 0) {
    userData.map((user: any) => {
      delete user.keywords;
    });

    userData.map((user: any) => {
      delete user.profile_complete;
    });
  }

  const [url, setUrl] = useState('');

  useEffect(() => {
    const csvData = convertToCSV(userData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    setUrl(url);
  }, [userData]);

  return (
    <div className={className}>
      <a href={url} download="deneme.csv">
        Export CSV
      </a>
    </div>
  );
};

export default DownloadCSVButton;
