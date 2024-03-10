import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAgetMostContentUsernames } from '../services/statisticsAPI';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { AllBrandType } from '../types/brandData';
import { selectToken } from '../redux/store/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const fetchData = async (page: number, perPage: number, token: string) => {
  try {
    const response = await TAgetMostContentUsernames(perPage, page, token);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

const MostContentUsernames = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('Range Search Table'));
  });
  const [userData, setUserData] = useState([] as AllBrandType[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadBrands = async () => {
      try {
        const response = await fetchData(page, pageSize, token);
        if (response !== undefined) {
          console.log('response', response);
          setInitialRecords(response.response);
          setTotalPages(response.totalPages);
          setLoading(false);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };
    loadBrands();
  }, [page, pageSize, token]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  // useEffect(() => {
  //   const handleClick = () => {
  //     setIsDropdownOpen(false);
  //   };
  //   document.addEventListener('click', handleClick);
  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, []);

  const renderBrandId = (record: any, index: number) => {
    const itemsPerPage = page * pageSize;
    const recordIndex = itemsPerPage + index;
    const brandId = recordIndex - pageSize + 1;
    return <div>{brandId}</div>;
  };

  return (
    <div className="panel">
      <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
        {error && <div className="bg-red-200 text-red-800 border border-red-600 p-2 rounded">{error}</div>}
      </div>
      <div className="datatables">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-pink-600"></div>
          </div>
        ) : (
          <DataTable
            highlightOnHover
            className="whitespace-nowrap table-hover"
            records={initialRecords}
            columns={[
              {
                accessor: 'user',
                title: 'Details',
                sortable: false,
                render: ({ username }: any) => (
                  <a href={`https://www.instagram.com/${username}/`} target="_blank" rel="noopener noreferrer">
                    <div className="text-center items-center mr-4">
                      <FontAwesomeIcon icon={faEye} style={{ color: '#005eff' }} />
                    </div>
                  </a>
                ),
              },
              { accessor: 'id', title: 'Id', sortable: true, render: renderBrandId },
              { accessor: 'user.username', title: 'Username' },
              { accessor: 'count', title: 'Content Count' },
              { accessor: 'user.full_name', title: 'Full Name' },
              {
                accessor: 'user.is_private',
                title: 'Is Private',
                sortable: true,
                render: (record: any, index: number) => (record.user.is_private ? 'Yes' : 'No'),
              },
              
            ]}
            totalRecords={totalPages * pageSize}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
          />
        )}
      </div>
    </div>
  );
};

export default MostContentUsernames;
