import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { TAtcNoControl } from '../services/statisticsAPI';
import { chooseFile } from '../components/ReadCSVFile';

const TcNoControl = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('Range Search Table'));
  });

  const [tcNo, setTcNo] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [tcControl, setTcControl] = useState<string>('');

  const testIdentifierNumber = async (
    tcNo: string,
    firstName: string,
    lastName: string,
    birthYear: string,
    token: string,
  ) => {
    try {
      const response = await TAtcNoControl(tcNo, firstName, lastName, birthYear, token);
      if (!response) {
        throw new Error('No Data Found');
      }
      if (response.response === true) {
        setTcControl('true');
      } else if (response.response === false) {
        setTcControl('false');
      }
      return response.response;
    } catch (error: any) {
      console.log('error', error);
      throw new Error(error);
    }
  };

  const convertToCSV = (data: any[]) => {
    const csvContent = [];
    const headers = Object.keys(data[0]);
    csvContent.push('sep=,' + '\n' + headers.map((header) => `"${header}"`).join(','));

    for (const item of data) {
      const row = [];
      for (const header of headers) {
        let cell = item[header];
        if (cell === null || cell === undefined) {
          cell = '';
        } else if (typeof cell !== 'string') {
          cell = cell.toString();
        }
        cell = cell.replace(/"/g, '""');
        cell = `"${cell}"`;
        row.push(cell);
      }
      csvContent.push(row.join(','));
    }

    return '\ufeff' + csvContent.join('\n');
  };

  const downloadCSV = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const checkTcNoFromCSV = async () => {
    const CSVFile = await chooseFile();

    for (const excelContents of CSVFile) {
      let tcNo = excelContents.TcNo;
      let firstName = excelContents.Firstname;
      let lastName = excelContents.Lastname;
      let birthYear = excelContents.BirthYear;
      const checkTcNo = await testIdentifierNumber(tcNo, firstName, lastName, birthYear, token);
      excelContents.alidity = checkTcNo;
    }
    const csvContent = convertToCSV(CSVFile);
    downloadCSV(csvContent, 'processed_data.csv');
  };

  return (
    <div className="panel w-96 mx-auto shadow-lg rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-lg font-semibold dark:text-white pr-28">ID No Control</h5>
          <button
            className="btn flex items-center gap-1 bg-blue-500 text-white rounded-lg px-2 py-1"
            onClick={() =>
              downloadCSV(
                'sep=,\n"TcNo","Firstname","Lastname","BirthYear"\n"1231231231","John","Doe","1990"',
                'example.csv',
              )
            }
          >
            <span className="text-xs">Download CSV Example</span>
            <i className="fas fa-paper-plane fa-xs"></i>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="tcNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              TC No
            </label>
            <input
              type="text"
              id="tcNo"
              name="tcNo"
              value={tcNo}
              onChange={(e) => setTcNo(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Birth Year
            </label>
            <input
              type="text"
              id="birthYear"
              name="birthYear"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center py-1.5 mt-5 relative group">
            {tcControl === 'true' ? (
              <span className="badge absolute right-0 text-xs bg-green-500 text-white py-1 px-3 rounded-full">
                Verified
              </span>
            ) : tcControl === 'false' ? (
              <span className="badge absolute right-0 text-xs bg-red-500 text-white py-1 px-3 rounded-full">
                Not Verified
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="btn bg-green-500 text-white rounded-lg px-4 py-2 flex items-center gap-2"
            onClick={() => checkTcNoFromCSV()}
          >
            <i className="fas fa-upload"></i>
            <span>Upload CSV</span>
          </button>
          <button
            className="btn flex items-center gap-2 ml-4 bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={() => testIdentifierNumber(tcNo, firstName, lastName, birthYear, token)}
          >
            <span>Send Request</span>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TcNoControl;
