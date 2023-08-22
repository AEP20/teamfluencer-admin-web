import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindAllBrands, TAfindBrand } from '../services/brandAPI';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { AllBrandType, BrandType, MoneyExchanges } from '../types/brandData';
import { selectToken } from '../redux/store/userSlice';
import BrandProfile from '../components/BrandProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const fetchData = async (page: number, perPage: number, token: string) => {
  try {
    const response = await TAfindAllBrands(page, perPage, token);
    if (response && Array.isArray(response.brands)) {
      const totalLength = response.brands.length;
      const totalPages = response.totalPages;
      const data = response.brands
        .map((item: any, index: any) => {
          return {
            id: totalLength - index,
            ...item,
          };
        })
        .reverse();
      return { data, totalPages };
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
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);
  const [brandname, setBrandname] = useState('');
  const [searchMatches, setSearchMatches] = useState<AllBrandType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [brandData, setbrandData] = useState<BrandType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadBrands = async () => {
      try {
        const response = await fetchData(page, pageSize, token);
        if (response !== undefined) {
          setInitialRecords(response.data);
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

  const handleForm = async (e: any) => {
    e.preventDefault();
    let data;
    data = { brandname };
    if (brandname === '') {
      setError('Please provide brand name!');
      return;
    }
    try {
      const res = await TAfindBrand(data, token);
      const response = Array.isArray(res) ? res[0] : res;

      const object: BrandType = {
        balance: response.balance,
        email: response.email,
        brand_name: response.brand_name,
        country: response.country,
        first_name: response.first_name,
        last_name: response.last_name,
        phone: response.phone,
        currency: response.currency,
        language: response.language,
        brand_logo: response.brand_logo,
        job_title: response.job_title,
        billing_address: {
          type: response.billing_address?.type ?? '',
          firm_name: response.billing_address?.firm_name ?? '',
          contactName: response.billing_address?.contactName ?? '',
          id: response.billing_address?.id ?? '',
          city: response.billing_address?.city ?? '',
          country: response.billing_address?.country ?? '',
          address: response.billing_address?.address ?? '',
          zipCode: response.billing_address?.zipCode ?? '',
        },

        money_exchanges: Array.isArray(response.money_exchanges)
          ? response.money_exchanges.map((exchange: MoneyExchanges) => ({
              operation: exchange?.operation ?? '',
              amount: exchange?.amount ?? 0,
              application_id: exchange?.application_id ?? '',
              action_time: exchange?.action_time ?? '',
            }))
          : [],
        notes: '',
        _id: '',
      };
      setbrandData(object);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const searchBrands = (text: string) => {
    let matches = userData.filter((brand: AllBrandType) => {
      const regex = new RegExp(`^${text}`, 'gi');
      setBrandname(text);

      return brand.brand_name.match(regex);
    });
    if (matches.length === 0 || text.length === 0) {
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
        const data = await fetchData(page, pageSize, token);
        if (data !== undefined) {
          setInitialRecords(data.data);
          setUserData(data.data);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('No data found');
      }
    };
    getUserData();
  }, [page, pageSize, token]);

  const handleBrandNameSelect = (selectedBrand: any) => {
    setBrandname(selectedBrand.brand_name);
  };

  useEffect(() => {
    const handleClick = () => {
      setIsDropdownOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
        <div className="w-full ">{brandData && <BrandProfile {...brandData} />}</div>
        <div className="ltr:ml-auto rtl:mr-auto flex">
          <input
            type="text"
            className="form-input w-auto"
            placeholder="Search Brand Name"
            value={brandname}
            onChange={(e) => {
              const text = e.target.value;
              searchBrands(text);
            }}
          />
          {isDropdownOpen && searchMatches.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded mt-10 z-10">
              {searchMatches.slice(0, 4).map((match: AllBrandType) => (
                <div
                  className="p-2 border-b border-gray-300 hover:bg-gray-100"
                  key={match.id}
                  onClick={() => handleBrandNameSelect(match)}
                >
                  {match.brand_name}
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center">
            <button type="button" onClick={handleForm} className="btn btn-primary ml-3">
              Submit
            </button>
          </div>
        </div>
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
              { accessor: 'id', title: 'Id', sortable: true, render: renderBrandId },
              {
                accessor: 'firstName',
                title: 'Name',
                render: ({ first_name, last_name }) => <div>{`${first_name} ${last_name}`}</div>,
              },
              //create a money accessor to show the balance in the table, if balance is more than 0 then show a money icon
              {
                accessor: 'balance',
                title: 'Balance',
                sortable: true,
                render: ({ balance }: any) => (
                  <div>
                    {balance > 0 ? (
                      <div>
                        <p
                          style={{
                            color: '#009e1a',
                            display: 'inline-block',
                            marginRight: '5px',
                            fontWeight: 'bold',
                          }}
                        >
                          {balance}
                        </p>
                        <FontAwesomeIcon icon={faDollarSign} style={{ color: '#009e1a' }} />
                      </div>
                    ) : (
                      <div>{balance}</div>
                    )}
                  </div>
                ),
              },
              { accessor: 'brand_name', title: 'Brand Name' },
              { accessor: 'first_name', title: 'First Name' },
              { accessor: 'last_name', title: 'Last Name' },
              { accessor: 'email', title: 'Email' },
              { accessor: 'phone', title: 'Phone' },
              {
                accessor: 'last_login',
                title: 'Last Login',
                sortable: true,
                render: ({ last_login }: any) => <div>{new Date(last_login).toLocaleDateString()}</div>,
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

export default AllBrands;
