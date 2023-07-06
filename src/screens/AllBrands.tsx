import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindAllBrands } from '../services/brandAPI';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { AllBrandType } from '../types/brandData';
import { selectToken } from '../redux/store/userSlice';

const fetchData = async (token: string) => {
  try {
    const response = await TAfindAllBrands(token);
    if (response && Array.isArray(response.brands)) {
      const totalLength = response.brands.length;
      const data = response.brands
        .map((item: any, index: any) => {
          const formattedDate = new Date(item.last_login).toISOString().split('T')[0];
          return {
            id: totalLength - index,
            brand_name: item.brand_name,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            phone: item.phone,
            last_login: formattedDate,
          };
        })
        .reverse();
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const AllBrands = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('Range Search Table'));
  });
  const [userData, setUserData] = useState([] as AllBrandType[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100, 500];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[3]);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [tempData, setTempData] = useState(initialRecords);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchMatches, setSearchMatches] = useState<AllBrandType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadBrands = async () => {
      const response = await fetchData(token);
      setSearch(response.data);
    };

    loadBrands();
  }, []);

  const searchBrands = (text: string) => {
    let matches = userData.filter((brand: AllBrandType) => {
      const regex = new RegExp(`^${text}`, 'gi');
      return brand.brand_name.match(regex);
    });
    if (searchMatches.length === 0) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
    setSearchMatches(matches);
  };

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchData(token);
        if (data !== undefined) {
          setInitialRecords(data);
          setUserData(data);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('No data found');
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    const handleClick = () => {
      setIsDropdownOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="panel">
      <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
        {error && <div className="bg-red-200 text-red-800 border border-red-600 p-2 rounded">{error}</div>}
        <div className="ltr:ml-auto rtl:mr-auto">
          <input
            type="text"
            className="form-input w-auto"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              searchBrands(e.target.value);
            }}
          />
          {isDropdownOpen && searchMatches.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded mt-2 z-10">
              {searchMatches.slice(0, 4).map((match: AllBrandType) => (
                <div className="p-2 border-b border-gray-300 hover:bg-gray-100" key={match.id}>
                  {match.brand_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="datatables">
        <DataTable
          highlightOnHover
          className="whitespace-nowrap table-hover"
          records={recordsData}
          columns={[
            { accessor: 'id', title: 'Id', sortable: true },
            {
              accessor: 'firstName',
              title: 'Name',
              sortable: true,
              render: ({ brand_name }) => <div>{brand_name}</div>,
            },
            { accessor: 'brand_name', title: 'Brand Name', sortable: true },
            { accessor: 'first_name', title: 'First Name', sortable: true },
            { accessor: 'last_name', title: 'Last Name', sortable: true },
            { accessor: 'email', title: 'Email', sortable: true },
            { accessor: 'phone', title: 'Phone', sortable: true },
            { accessor: 'last_login', title: 'Last Login', sortable: true },
          ]}
          totalRecords={initialRecords.length}
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
      </div>
    </div>
  );
};

export default AllBrands;
