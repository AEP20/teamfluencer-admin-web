import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindAllApprovalUser, TAfindCountry } from '../services/userAPI';
import { WaitingApprovalUserData } from '../types/waitingApprovalUserData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { Filters, FilterValue, FilterType, CountryFilterValue } from '../types/waitingApprovalUserData';
// import DownloadPdfButton from '../components/DownloadPdfButton';
import DownloadCSVButton from '../components/DownloadCSVButton';
import { selectToken } from '../redux/store/userSlice';
import KeywordData from '../JSON/KEYWORDS.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars, faEye } from '@fortawesome/free-solid-svg-icons';
import {
  selectWaitingApprovalUserFilters,
  setWaitingApprovalUserFilters,
} from '../redux/store/waitingApprovalUserFilterSlice';

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

const fetchData = async (page: number, perPage: number, token: string) => {
  try {
    const response = await TAfindAllApprovalUser(page, perPage, token);
    const totalPages = response.totalPages;
    if (response && Array.isArray(response.verifiedUsers)) {
      const data = response.verifiedUsers.map((item: any, index: any) => ({
        id: index + 1,
        _id: item.id,
        name: item.name,
        email: item.email,
        age: item.age,
        city: item.city,
        country: item.country,
        keyword: item.keywords,
        phone: phoneNumberFixer(item.phone),
        gender: item.gender,
        profile_complete: item.profile_complete,
        followers: item.followers,
        insta_post_number: item.post_number,
        average_like: instaAverageLikeFixer(item.average_likes),
        tiktok_followers: tiktokFollowersFixer(item.tiktok_followers),
        tiktok_videos: item.videos,
        tiktok_average_like: tiktokAverageLikeFixer(item.tiktok_average_like),
        tiktok_engagement_rate: engagementRateFixer(item.tiktok_engagement_rate),
      }));
      return { data, totalPages };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const WaitingApprovalUser = () => {
  const token = useSelector(selectToken);
  const waitingApprovalUserFilters = useSelector(selectWaitingApprovalUserFilters);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Range Search Table'));
    const initialFilters = waitingApprovalUserFilters;
    setFilters(initialFilters);
  });

  const [userData, setUserData] = useState([] as WaitingApprovalUserData[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [totalPages, setTotalPages] = useState(0);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [keyword, setKeyword] = useState('');
  const [autofillCountries, setAutofillCountries] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    const getUserData = async () => {
      try {
        const data = await fetchData(page, pageSize, token);
        if (data !== undefined) {
          const filteredData = applyFilters(data.data);
          setInitialRecords(filteredData);
          setUserData(filteredData);
          setTotalPages(data.totalPages);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('No data found');
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [page, pageSize, token]);

  const applyFilters = (data: WaitingApprovalUserData[]): WaitingApprovalUserData[] => {
    return data.filter((item) => {
      const ageFilter = filters.age;
      if (
        (ageFilter.min !== '' && Number(item.age) < Number(ageFilter.min)) ||
        (ageFilter.max !== '' && Number(item.age) > Number(ageFilter.max))
      ) {
        return false;
      }

      const followersFilter = filters.followers;
      if (
        (followersFilter.min !== '' && Number(item.followers) < Number(followersFilter.min)) ||
        (followersFilter.max !== '' && Number(item.followers) > Number(followersFilter.max))
      ) {
        return false;
      }

      const averageLikeFilter = filters.average_like;
      if (
        (averageLikeFilter.min !== '' && Number(item.average_like) < Number(averageLikeFilter.min)) ||
        (averageLikeFilter.max !== '' && Number(item.average_like) > Number(averageLikeFilter.max))
      ) {
        return false;
      }

      const tiktokFollowersFilter = filters.tiktok_followers;
      if (
        (tiktokFollowersFilter.min !== '' && Number(item.tiktok_followers) < Number(tiktokFollowersFilter.min)) ||
        (tiktokFollowersFilter.max !== '' && Number(item.tiktok_followers) > Number(tiktokFollowersFilter.max))
      ) {
        return false;
      }

      const tiktokAverageLikeFilter = filters.tiktok_average_like;
      if (
        (tiktokAverageLikeFilter.min !== '' &&
          Number(item.tiktok_average_like) < Number(tiktokAverageLikeFilter.min)) ||
        (tiktokAverageLikeFilter.max !== '' && Number(item.tiktok_average_like) > Number(tiktokAverageLikeFilter.max))
      ) {
        return false;
      }

      const tiktokEngagementRateFilter = filters.tiktok_engagement_rate;
      if (
        (tiktokEngagementRateFilter.min !== '' &&
          Number(item.tiktok_engagement_rate) < Number(tiktokEngagementRateFilter.min)) ||
        (tiktokEngagementRateFilter.max !== '' &&
          Number(item.tiktok_engagement_rate) > Number(tiktokEngagementRateFilter.max))
      ) {
        return false;
      }

      const countryFilter = filters.country;
      if (countryFilter.value !== '') {
        if (countryFilter.value === 'TR' && item.country !== 'TR') {
          return false;
        }
        if (countryFilter.value === 'Other' && item.country === 'TR') {
          return false;
        }
        if (countryFilter.value !== 'TR' && countryFilter.value !== 'Other' && item.country !== countryFilter.value) {
          return false;
        }
      }

      const keywordFilter = filters.keyword;
      if (keywordFilter.length > 0) {
        const allKeywordsIncluded = keywordFilter.every((filterKeyword) => item.keyword.includes(filterKeyword));

        if (!allKeywordsIncluded) {
          return false;
        }
      }

      return true;
    });
  };

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
    keyword: [],
  };

  const [filters, setFilters] = useState<Filters>(defaultState);

  const setFilter = (key: keyof Filters, type: FilterType, value: string | string[]) => {
    if (key === 'keyword') {
      setFilters((prev) => ({ ...prev, [key]: value as string[] }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value } }));
    }
    var newFilters = { ...filters, [key]: { ...filters[key], [type]: value } };
    if (key === 'keyword') {
      newFilters[key] = value as string[];
    }
    dispatch(setWaitingApprovalUserFilters(newFilters));
  };

  useEffect(() => {
    setPage(1);
  }, [pageSize, filters]);

  useEffect(() => {
    let dt = userData;
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'country') {
        const countryValue = value as CountryFilterValue;
        if (countryValue.value) {
          if (countryValue.value === 'TR') {
            dt = dt.filter((d) => d[key as keyof typeof d] === 'TR');
          } else if (countryValue.value === 'Other') {
            dt = dt.filter((d) => d[key as keyof typeof d] !== 'TR');
          } else {
            dt = dt.filter((d) => d[key as keyof typeof d] === countryValue.value);
          }
        }
      } else if (key === 'keyword') {
        const keywordValue = value as string[];
        if (keywordValue.length > 0) {
          dt = dt.filter((d) => {
            const itemKeywords = d[key as keyof typeof d];
            if (Array.isArray(itemKeywords)) {
              return keywordValue.every((keyword) => itemKeywords.includes(keyword));
            }
            return false;
          });
        }
      } else {
        const { min, max } = value as FilterValue;

        if (min !== '' && min !== null) {
          dt = dt.filter((d) => Number(d[key as keyof typeof d]) >= Number(min));
        }

        if (max !== '' && max !== null) {
          dt = dt.filter((d) => Number(d[key as keyof typeof d]) <= Number(max));
        }
      }
    });
    setInitialRecords(dt);
  }, [filters]);

  const filterKeys: (keyof Filters)[] = [
    'age',
    'followers',
    'average_like',
    'tiktok_followers',
    'tiktok_average_like',
    'tiktok_engagement_rate',
    'country',
    'keyword',
  ];

  const formatKey = (key: string) => {
    switch (key) {
      case 'age':
        return 'Age';
      case 'followers':
        return 'Followers';
      case 'average_like':
        return 'Average Like';
      case 'tiktok_followers':
        return 'TikTok Followers';
      case 'tiktok_average_like':
        return 'TikTok Average Like';
      case 'tiktok_engagement_rate':
        return 'TikTok Engagement Rate';
      case 'country':
        return 'Country';
      case 'keyword':
        return 'Keyword';
      default:
        return key;
    }
  };

  const renderBrandId = (record: any, index: number) => {
    const itemsPerPage = page * pageSize;
    const recordIndex = itemsPerPage + index;
    const brandId = recordIndex - pageSize + 1;
    return <div>{brandId}</div>;
  };

  const autofillCountry = async () => {
    try {
      const response = await TAfindCountry(country, token);
      setAutofillCountries(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (country.length > 0) {
      autofillCountry();
    }
  }, [country]);

  const handleCountrySuggestionClick = (key: any, selectedCountry: any) => {
    setFilter(key, 'value', selectedCountry);
    setAutofillCountries([]);
  };

  const handleInputChange = (e: any) => {
    const inputKeywords = e.target.value
      .split(' ')
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setKeyword(inputKeywords);

    if (inputKeywords.length === 0) {
      setIsDropdownOpen(false);
      setFilter('keyword', 'value', []);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const autoCompleteKeywords = keyword.split(',').map((keyword) => keyword.trim());

  const lastKeyword = autoCompleteKeywords[autoCompleteKeywords.length - 1];

  const uniqueKeywords = [...new Set(KeywordData.keywords)];
  const filteredKeywords = uniqueKeywords
    .filter((keyword: string) => keyword.toLowerCase().startsWith(lastKeyword.toLowerCase()))
    .slice(0, 4);

  const autoCompleteKeyword: string[] = autoCompleteKeywords.length === 0 ? [] : filteredKeywords;

  return (
    <div className="panel">
      <div className=" flex md:items-center md:flex-row flex-col gap-5">
        <div className="md:flex md:flex-row w-full">
          {filterKeys.map((key) => {
            if (key !== 'country' && key !== 'keyword') {
              return (
                <div key={key} className="md:flex md:flex-col flex-1 mb-1 mr-2">
                  <h2 className="text-sm font-bold ml-2 mb-1">{formatKey(key)}</h2>
                  <input
                    type="text"
                    value={filters[key].min}
                    onChange={(e) => {
                      setFilter(key, 'min', e.target.value);
                    }}
                    className="form-input w-full mb-2"
                    placeholder={`min. ${key}`}
                  />

                  <input
                    type="text"
                    value={filters[key].max}
                    onChange={(e) => {
                      setFilter(key, 'max', e.target.value);
                    }}
                    className="form-input w-full"
                    placeholder={`max. ${key}`}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="flex w-full justify-between flex-end">
        <div className="flex flex-row items-center w-1/3">
          <div className="md:flex md:flex-row w-3/4">
            {filterKeys.map((key) => {
              if (key === 'country') {
                return (
                  <div key={key} className="md:flex md:flex-col flex-1 mb-4 mt-3">
                    <div>
                      <h2 className="text-sm font-bold ml-2 mb-1">Country Name</h2>
                      <input
                        type="text"
                        value={filters[key].value}
                        onChange={(e) => {
                          setFilter(key, 'value', e.target.value);
                          setCountry(e.target.value);
                        }}
                        className="form-input w-full"
                        placeholder={`Country name`}
                      />
                    </div>
                    {autofillCountries.length > 0 && country.length > 0 && (
                      <ul className="suggestion-list mt-16 ml-2" style={{ position: 'absolute', zIndex: 9999 }}>
                        {[...new Set(autofillCountries)].slice(0, 5).map((autofillCountry, index) => (
                          <li
                            key={index}
                            className="bg-white p-2 text-black cursor-pointer hover:bg-gray-200"
                            onClick={() => handleCountrySuggestionClick(key, autofillCountry)}
                          >
                            {autofillCountry}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              } else if (key === 'keyword') {
                return (
                  <div key={key} className="md:flex md:flex-col flex-1 mb-4 mt-3 ml-2">
                    <div>
                      <h2 className="text-sm font-bold ml-2 mb-1">Keywords</h2>
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
                        placeholder={`keyword1, keyword2..`}
                      />
                    </div>
                    {isDropdownOpen && keyword.length > 0 && (
                      <div>
                        <ul className="suggestion-list" style={{ position: 'absolute', zIndex: 9999 }}>
                          {autoCompleteKeyword.map((keyword, index) => (
                            <li
                              key={index}
                              className="bg-white p-2 text-black cursor-pointer hover:bg-gray-200"
                              onClick={() => {
                                const currentInput = filters[key].join(', ');

                                if (currentInput.includes(',')) {
                                  const parts = currentInput.split(',');
                                  parts[parts.length - 1] = keyword;
                                  setFilter(
                                    key,
                                    'value',
                                    parts.map((part) => part.trim()),
                                  );
                                } else {
                                  setFilter(key, 'value', [keyword]);
                                }
                                setIsDropdownOpen(false);
                              }}
                            >
                              {keyword}
                            </li>
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

        <div className="flex flex-row justify-end text-center w-1/3 mt-2 mb-6 mr-2">
          {/* <DownloadPdfButton
            className=" inline-flex items-center justify-center px-2 py-2 mt-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
            userData={initialRecords}
          /> */}
          <DownloadCSVButton
            className=" inline-flex items-center justify-center ml-2 px-2 py-2 mt-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
            userData={initialRecords}
          />
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
              {
                accessor: 'details',
                title: 'Details',
                sortable: false,
                render: ({ _id }: any) => (
                  <Link to={`/user/find/${_id}`}>
                    <div className="text-center items-center">
                      <FontAwesomeIcon icon={faEye} style={{ color: '#005eff' }} />
                    </div>
                  </Link>
                ),
              },
              { accessor: 'id', title: 'Id', sortable: true, render: renderBrandId },
              {
                accessor: 'firstName',
                title: 'Name',
                sortable: true,
                render: ({ name }) => <div>{name}</div>,
              },
              { accessor: 'email', title: 'Email', sortable: true },
              { accessor: 'age', title: 'Age', sortable: true },
              {
                accessor: 'gender',
                title: 'Gender',
                sortable: false,
                render: ({ gender }) => (
                  <div className="text-center items-center">
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
              { accessor: 'tiktok_average_like', title: 'Tiktok Average Like', sortable: true },
              { accessor: 'tiktok_engagement_rate', title: 'Tiktok Engagement Rate', sortable: true },
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

export default WaitingApprovalUser;
