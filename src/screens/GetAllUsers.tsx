import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, logout, selectUser } from '../redux/store/userSlice';
import { TAlogin, TAsignup } from '../services/authAPI';
import React from 'react';
import UserProfile from '../components/UserProfile';
import { TAfindUser, TAfindApprovalUser, TAfindAllUser } from '../services/userAPI';
import { WaitingApprovalUserData } from '../types/waitingApprovalUserData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { Filters, FilterValue, FilterType, CountryFilterValue } from '../types/waitingApprovalUserData';
import DownloadPdfButton from '../components/DownloadPdfButton';
import DownloadCSVButton from '../components/DownloadCSVButton';

const phoneNumberFixer = (phoneNumber: string) => {
  const fixedPhoneNumber = phoneNumber.slice(0, 13);
  return fixedPhoneNumber;
};

const instaAverageLikeFixer = (instaAverageLike: number) => {
  if (!instaAverageLike) return 0;
  const roundedNumber = Math.round(instaAverageLike * 10) / 10;
  return roundedNumber;
};

const tiktokAverageLikeFixer = (tiktokAverageLike: number) => {
  if (!tiktokAverageLike) return 0;
  const roundedNumber = Math.round(tiktokAverageLike * 10) / 10;
  return roundedNumber;
};

const engagementRateFixer = (engagementRate: number) => {
  if (!engagementRate) return 0;
  const roundedNumber = Math.round(engagementRate * 1000) / 1000;
  return roundedNumber;
};

const tiktokFollowersFixer = (tiktokEngagementRate: number) => {
  if (!tiktokEngagementRate) return 0;
  return tiktokEngagementRate;
};

const fetchData = async (query: any) => {
  try {
    const response = await TAfindAllUser(query);
    console.log(response.data)
    if (response.data && Array.isArray(response.data)) {
      const data = response.data.map((item: any, index: any) => ({
        id: index + 1,
        name: item.name,
        email: item.email,
        age: item.age,
        city: item.city,
        country: item.country,
        phone: phoneNumberFixer(item.phone),
        gender: item.gender,
        profile_complete: item.profile_complete,
        followers: item.insta.followers,
        insta_post_number: item.post_number,
        average_like: instaAverageLikeFixer(item.insta.average_like),
        tiktok_followers: tiktokFollowersFixer(item.tiktok.followers),
        tiktok_videos: item.videos,
        tiktok_average_like: tiktokAverageLikeFixer(item.tiktok.tiktok_average_like),
        tiktok_engagement_rate: engagementRateFixer(item.tiktok.tiktok_engagement_rate),
      }));
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const GetAllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Range Search Table'));
  });
  const [userData, setUserData] = useState([] as WaitingApprovalUserData[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100, 500];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [tempData, setTempData] = useState(initialRecords);
  const [keyword, setKeyword] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    const data = sortBy(initialRecords, sortStatus.columnAccessor);
    setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    setPage(1);
  }, [sortStatus]);

  const defaultState: Filters = {
    age: { min: '', max: '' },
    followers: { min: '', max: '' },
    average_like: { min: '', max: '' },
    tiktok_followers: { min: '', max: '' },
    tiktok_average_like: { min: '', max: '' },
    tiktok_engagement_rate: { min: '', max: '' },
    country: { value: '' },
  };

  const [filters, setFilters] = useState<Filters>(defaultState);

  const flattenFilters = Object.entries(filters).reduce((acc, [key, filter]) => {
    Object.entries(filter).forEach(([subKey, subValue]) => {
      acc[`${subKey}_${key}`] = subValue;
    });
    return acc;
  }, {} as { [key: string]: string });

  const params = new URLSearchParams(flattenFilters);

  const setFilter = (key: keyof Filters, type: FilterType, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value } }));
  };

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const data = await fetchData(params);
  //       if (data !== undefined) {
  //         setInitialRecords(data);
  //         setUserData(data);
  //       } else {
  //         setError('No data found');
  //       }
  //     } catch (error) {
  //       setError('No data found');
  //     }
  //   };
  //   getUserData();
  // }, []);

  useEffect(() => {
    let dt = userData;
    console.log("aynen")

    Object.entries(filters).forEach(([key, value]) => {
      if (key.endsWith('country')) {
        const countryValue = value as CountryFilterValue;
        console.log("countryValue", countryValue.value)
        if (countryValue.value) {
          if (countryValue.value === 'TR') {
            dt = dt.filter((d) => d[key as keyof typeof d] === 'TR');
          } else if (countryValue.value === 'Other') {
            dt = dt.filter((d) => d[key as keyof typeof d] !== 'TR');
          } else {
            dt = dt.filter((d) => d[key as keyof typeof d] === countryValue.value);
          }
        }
      } else {
        const actualKey = key.replace('min_', '').replace('max_', '');
        if (key.startsWith('min')) {
          dt = dt.filter((d) => Number(d[actualKey as keyof typeof d]) >= Number(value));
        } else if (key.startsWith('max')) {
          dt = dt.filter((d) => Number(d[actualKey as keyof typeof d]) <= Number(value));
        }
      }
    });

    setInitialRecords(dt);
    setTempData(dt);
  }, [filters]);

  const handleFetchData = async () => {
    try {
      const data = await fetchData(params);
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

  const filterKeys: (keyof Filters)[] = [
    'age',
    'followers',
    'average_like',
    'tiktok_followers',
    'tiktok_average_like',
    'tiktok_engagement_rate',
    'country',
  ];

  return (
    <div className="panel">
      <div className="flex md:items-center md:flex-row flex-col gap-5">
        <div className="flex flex-col justify-center text-center">
          <p className="mb-7 font-bold">MIN</p>
          <p className="mb-2 font-bold">MAX</p>
        </div>
        <div className="md:flex md:flex-row w-full">
          {filterKeys.map((key) => {
            if (key !== 'country') {
              return (
                <div key={key} className="md:flex md:flex-col flex-1 mb-1 mr-2">
                  <input
                    type="text"
                    value={filters[key].min}
                    onChange={(e) => {
                      setFilter(key, 'min', e.target.value);
                    }}
                    className="form-input w-full mb-2"
                    placeholder={`${key} min`}
                  />

                  <input
                    type="text"
                    value={filters[key].max}
                    onChange={(e) => {
                      setFilter(key, 'max', e.target.value);
                    }}
                    className="form-input w-full"
                    placeholder={`${key} max`}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="flex w-full justify-between text-center flex-end">
        <div className="flex flex-row w-1/3 items-center">
          <div className="ltr:ml-auto rtl:mr-auto mr-2">
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Keywords"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="md:flex md:flex-row w-3/4">
            {filterKeys.map((key) => {
              if (key === 'country') {
                return (
                  <div key={key} className="md:flex md:flex-col flex-1">
                    <input
                      type="text"
                      value={filters[key].value}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="form-input w-full"
                      placeholder={`${key} value`}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="flex flex-row justify-end text-center w-1/3 mb-4 mr-2">
          <button
            className=" inline-flex items-center justify-center mr-2 px-2 py-2 mt-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 "
            onClick={handleFetchData}
          >
            Fetch Data
          </button>
          <DownloadPdfButton
            className=" inline-flex items-center justify-center px-2 py-2 mt-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
            userData={initialRecords}
          />
          <DownloadCSVButton
            className=" inline-flex items-center justify-center ml-2 px-2 py-2 mt-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
            userData={initialRecords}
          />
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
              render: ({ name }) => <div>{name}</div>,
            },
            // { accessor: 'email', title: 'Email', sortable: true },
            { accessor: 'phone', title: 'Phone', sortable: true },
            { accessor: 'age', title: 'Age', sortable: true },
            { accessor: 'country', title: 'Country', sortable: true },
            { accessor: 'followers', title: 'Insta Followers', sortable: true },
            { accessor: 'insta_post_number', title: 'Insta Post Number', sortable: true },
            { accessor: 'average_like', title: 'Insta Average Like', sortable: true },
            { accessor: 'tiktok_followers', title: 'Tiktok Followers', sortable: true },
            { accessor: 'tiktok_videos', title: 'Tiktok Videos', sortable: true },
            { accessor: 'tiktok_average_like', title: 'Tiktok Average Like', sortable: true },
            { accessor: 'tiktok_engagement_rate', title: 'Tiktok Engagement Rate', sortable: true },
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

export default GetAllUsers;
