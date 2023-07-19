import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindAllBrands, TAupdateBrand, TAfindBrand } from '../services/brandAPI';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { AllBrandType, BrandType, MoneyExchanges } from '../types/brandData';
import { selectToken } from '../redux/store/userSlice';
import BrandProfile from '../components/BrandProfile';

const fetchData = async (token: string) => {
  try {
    const response = await TAfindAllBrands(token);
    if (response && Array.isArray(response.brands)) {
      const totalLength = response.brands.length;
      const data = response.brands
        .map((item: any, index: any) => {
          return {
            id: totalLength - index,
            ...item,
          };
        })
        .reverse();
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

// const updateBrand = async (id: any, data: any, token: string) => {
//   try {
//     const response = await TAupdateBrand(id, data, token);
//     if (response && Array.isArray(response.brands)) {
//       const totalLength = response.brands.length;
//       const data = response.brands
//         .map((item: any, index: any) => {
//           const formattedDate = new Date(item.last_login).toISOString().split('T')[0];
//           return {
//             id: totalLength - index,
//             brand_name: item.brand_name,
//             first_name: item.first_name,
//             last_name: item.last_name,
//             email: item.email,
//             phone: item.phone,
//             last_login: formattedDate,
//           };
//         })
//         .reverse();
//       return data;
//     }
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

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
  const [brandData, setBrandData] = useState<BrandType | null>(null);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const response = await fetchData(token);
        if (response !== undefined) {
          setSearch(response.data);
          setBrandData(response);
          setInitialRecords(response);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('No data found');
      }
    };
    loadBrands();
  }, []);

  const searchBrands = (text: string) => {
    let matches = userData.filter((brand: AllBrandType) => {
      const regex = new RegExp(`^${text}`, 'gi');

      if (text === '') {
        setShowBrand(false);
        return null;
      }
      return brand.brand_name.match(regex);
    });
    if (matches.length === 0) {
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
        <div className="flex flex-col w-full">
          {showBrand &&
            searchMatches.map((brand) => (
              <BrandProfile
                balance={0}
                country={''}
                currency={''}
                language={''}
                brand_logo={''}
                job_title={''}
                billing_address={{
                  type: '',
                  firm_name: '',
                  contactName: '',
                  id: '',
                  city: '',
                  country: '',
                  address: '',
                  zipCode: '',
                }}
                money_exchanges={[]}
                key={brand.first_name}
                {...brand}
              />
            ))}
        </div>
        <div className="ltr:ml-auto rtl:mr-auto flex">
          <input
            type="text"
            className="form-input w-auto"
            placeholder="Search Brand Name"
            value={search}
            onChange={(e) => {
              const text = e.target.value;
              searchBrands(text);
            }}
          />
          {isDropdownOpen && searchMatches.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded mt-10 z-10">
              {searchMatches.slice(0, 4).map((match: AllBrandType) => (
                <div className="p-2 border-b border-gray-300 hover:bg-gray-100" key={match.id}>
                  {match.brand_name}
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center">
            <button type="button" onClick={() => setShowBrand(true)} className="btn btn-primary ml-3">
              Submit
            </button>
          </div>
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
              render: ({ first_name, last_name }) => <div>{`${first_name} ${last_name}`}</div>,
            },
            { accessor: 'brand_name', title: 'Brand Name', sortable: true },
            { accessor: 'first_name', title: 'First Name', sortable: true },
            { accessor: 'last_name', title: 'Last Name', sortable: true },
            { accessor: 'email', title: 'Email', sortable: true },
            { accessor: 'phone', title: 'Phone', sortable: true },
            {
              accessor: 'last_login',
              title: 'Last Login',
              sortable: true,
              render: ({ last_login }: any) => <div>{new Date(last_login).toLocaleDateString()}</div>,
            },
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
