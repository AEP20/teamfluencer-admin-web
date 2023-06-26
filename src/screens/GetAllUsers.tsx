import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindAllUser } from '../services/userAPI';
import { WaitingApprovalUserData } from '../types/waitingApprovalUserData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { Filters, FilterValue, FilterType, CountryFilterValue } from '../types/getAllUsersData';
import { selectToken } from '../redux/store/userSlice';
import DownloadPdfButton from '../components/DownloadPdfButton';
import DownloadCSVButton from '../components/DownloadCSVButton';
import KeywordData from '../JSON/KEYWORDS.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

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

const fetchData = async (query: any, token: string) => {
  try {
    const response = await TAfindAllUser(query, token);
    console.log('cevappp', response.data);
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
        keywords: item.insta.keywords,
        _id: item._id,
      }));
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
interface AppProps {
  keywords: string[];
}

const GetAllUsers = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
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
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    keywords: [],
    gender: '',
  };
  const [filters, setFilters] = useState<Filters>(defaultState);

  console.log('konusma', filters);

  const setFilter = (key: keyof Filters, type: FilterType, value: string | string[] | ('male' | 'female' | '')) => {
    if (key === 'keywords') {
      setFilters((prev) => ({ ...prev, [key]: value as string[] }));
    } else if (key === 'gender') {
      setFilters((prev) => ({ ...prev, [key]: value as 'male' | 'female' | '' }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value as string } }));
    }
  };

  const handleFetchData = async () => {
    const flattenFilters = Object.entries(filters).reduce((acc, [key, filter]) => {
      if (key === 'keywords') {
      } else if (key === 'country') {
        acc[key] = (filter as CountryFilterValue).value;
      } else {
        const { min, max } = filter as FilterValue;
        if (min) acc[`min_${key}`] = min;
        if (max) acc[`max_${key}`] = max;
      }

      return acc;
    }, {} as { [key: string]: string });

    const params = new URLSearchParams(flattenFilters);

    const keywords = (filters.keywords as string[]).map(
      (keyword) => keyword.charAt(0).toUpperCase() + keyword.slice(1),
    );
    keywords.forEach((keywords) => {
      params.append('keywords', keywords);
    });

    try {
      const data = await fetchData(params, token);
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
    'keywords',
    'gender',
  ];

  const handleClick = (id: string) => {
    navigate(`/user/find/${id}`);
  };

  const handleInputChange = (e: any) => {
    const inputKeywords = e.target.value
      .split(' ')
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    console.log('inputKeywords', inputKeywords);
    setKeywords(inputKeywords);

    if (inputKeywords.length === 0) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const autoCompleteKeywords = keywords.split(',').map((keyword) => keyword.trim());

  const lastKeyword = autoCompleteKeywords[autoCompleteKeywords.length - 1];

  const filteredKeywords = KeywordData.keywords
    .filter((keyword: string) => keyword.toLowerCase().includes(lastKeyword.toLowerCase()))
    .slice(0, 4);

  const autoCompleteKeyword: string[] = autoCompleteKeywords.length === 0 ? [] : filteredKeywords;

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
      <div className="flex md:items-center md:flex-row flex-col gap-5">
        <div className="flex flex-col justify-center text-center">
          <p className="mb-7 font-bold">MIN</p>
          <p className="mb-2 font-bold">MAX</p>
        </div>
        <div className="md:flex md:flex-row w-full">
          {filterKeys.map((key) => {
            if (key === 'gender') {
              return (
                <div key={key} className="md:flex md:flex-col flex-1 mb-1 mr-2">
                  <label>
                    <input
                      type="radio"
                      value="male"
                      checked={filters[key] === 'male'}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="female"
                      checked={filters[key] === 'female'}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="mr-2"
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      value=""
                      checked={filters[key] === ''}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="mr-2"
                    />
                    Any
                  </label>
                </div>
              );
            } else if (key !== 'country' && key !== 'keywords') {
              return (
                <div key={key} className="md:flex md:flex-col flex-1 mb-1 mr-2">
                  <input
                    type="text"
                    value={(filters[key] as FilterValue).min}
                    onChange={(e) => {
                      setFilter(key, 'min', e.target.value);
                    }}
                    className="form-input w-full mb-2"
                    placeholder={`${key} min`}
                  />

                  <input
                    type="text"
                    value={(filters[key] as FilterValue).max}
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
        <div className="flex flex-row w-2/3 items-center">
          <div className="md:flex md:flex-row w-full">
            {filterKeys.map((key) => {
              if (key === 'country') {
                return (
                  <div key={key} className="md:flex md:flex-col flex-1 ml-12 pl-1">
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
              } else if (key === 'keywords') {
                return (
                  <div key={key} className="md:flex md:flex-col flex-1 mb-1 mr-2 ml-5">
                    <input
                      type="text"
                      value={filters[key].join(',')}
                      onChange={(e) => {
                        const keywords = e.target.value.split(',').map((word) => {
                          const trimmedWord = word.trim();
                          return trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase();
                        });
                        setFilter(key, 'value', keywords);
                        handleInputChange(e);
                      }}
                      className="form-input w-full"
                      placeholder={`keywords`}
                    />
                    {isDropdownOpen && keywords.length > 0 && (
                      <div className="dropdown pt-10" style={{ position: 'fixed', zIndex: 999 }}>
                        <ul>
                          {autoCompleteKeyword.map((keyword, index) => (
                            <li key={index}>{keyword}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
            {
              accessor: 'gender',
              title: 'Gender',
              sortable: false,
              render: ({ gender }) => (
                <div>
                  {gender === 'male' ? (
                    <FontAwesomeIcon icon={faMars} style={{ color: '#005eff' }} />
                  ) : (
                    <FontAwesomeIcon icon={faVenus} style={{ color: '#ff00dd' }} />
                  )}
                </div>
              ),
            },
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
          onRowClick={(row) => {
            handleClick(row._id);
          }}
        />
      </div>
    </div>
  );
};

export default GetAllUsers;
