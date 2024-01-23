import React from 'react';
import { useNavigate, Link, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindAllUser, TAfindCity, TAfindCountry, TAfindHobbies, TAfindJob } from '../services/userAPI';
import { WaitingApprovalUserData } from '../types/waitingApprovalUserData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import {
  Filters,
  FilterValue,
  FilterType,
  CountryFilterValue,
  CityFilterValue,
  JobFilterValue,
} from '../types/getAllUsersData';
import { selectToken } from '../redux/store/userSlice';
import DownloadPdfButton from '../components/DownloadPdfButton';
import DownloadCSVButton from '../components/DownloadCSVButton';
import KeywordData from '../JSON/KEYWORDS.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars, faEye, faStar } from '@fortawesome/free-solid-svg-icons';

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

const fetchData = async (page: number, query: any, token: string) => {
  try {
    const response = await TAfindAllUser(page, query, token);
    if (response && Array.isArray(response.users)) {
      const totalPages = response.totalPages;
      const data = response.users.map((item: any, index: any) => {
        return {
          id: index + 1,
          name: item.name,
          email: item.email,
          age: item.age,
          job: item.job,
          city: item.city,
          country: item.country,
          hobbies: item.hobbies,
          phone: phoneNumberFixer(item.phone),
          gender: item.gender,
          profile_complete: item.profile_complete,
          instaUsername: item.insta?.username,
          tiktokUsername: item.tiktok?.username,
          followers: item.insta?.followers,
          insta_post_number: item.post_number,
          average_like: instaAverageLikeFixer(item.insta?.average_like),
          tiktok_followers: tiktokFollowersFixer(item.tiktok?.followers),
          tiktok_videos: item.videos,
          tiktok_average_like: tiktokAverageLikeFixer(item.tiktok?.tiktok_average_like),
          tiktok_engagement_rate: engagementRateFixer(item.tiktok?.tiktok_engagement_rate),
          keywords: item.insta?.keywords,
          _id: item._id,
          verification: item.verification,
          ...item,
        };
      });
      return { data, totalPages };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const GetAllUsers = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Range Search Table'));
  });
  const [userData, setUserData] = useState([] as WaitingApprovalUserData[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [totalPages, setTotalPages] = useState(0);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autofillCountries, setAutofillCountries] = useState<string[]>([]);
  const [country, setCountry] = useState('');
  const [autofillCities, setAutofillCities] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [autofillJobs, setAutofillJobs] = useState<string[]>([]);
  const [job, setJob] = useState('');
  const [autofillHobbies, setAutofillHobbies] = useState<string[]>([]);
  const [hobby, setHobby] = useState<string[]>([]);

  const defaultState: Filters = {
    age: { min: '', max: '' },
    followers: { min: '', max: '' },
    average_like: { min: '', max: '' },
    tiktok_followers: { min: '', max: '' },
    tiktok_average_like: { min: '', max: '' },
    tiktok_engagement_rate: { min: '', max: '' },
    country: { value: '' },
    city: { value: '' },
    job: { value: '' },
    hobbies: [],
    keywords: [],
    gender: '',
    verification: '',
  };
  const [filters, setFilterss] = useState<Filters>(defaultState);

  const setFilter = (
    key: keyof Filters,
    type: FilterType,
    value: string | string[] | ('male' | 'female' | '' | 'true' | 'false'),
  ) => {
    if (key === 'keywords' || key === 'hobbies') {
      setFilterss((prev) => ({ ...prev, [key]: value as string[] }));
    } else if (key === 'verification') {
      setFilterss((prev) => ({ ...prev, [key]: value as 'true' | 'false' | '' }));
    } else if (key === 'gender') {
      setFilterss((prev) => ({ ...prev, [key]: value as 'male' | 'female' | '' }));
    } else if (key === 'city') {
      setFilterss((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value as string } }));
    } else if (key === 'country') {
      setFilterss((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value as string } }));
    } else if (key === 'job') {
      setFilterss((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value as string } }));
    } else {
      setFilterss((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value as string } }));
    }
  };

  const handleFetchData = async () => {
    setLoading(true);

    const flattenFilters = Object.entries(filters).reduce((acc, [key, filter]) => {
      if (key === 'keywords' || key === 'hobbies') {
      } else if (key === 'gender' && typeof filter === 'string') {
        acc[key] = filter;
      } else if (key === 'verification' && typeof filter === 'string') {
        acc[key] = filter;
      } else if (key === 'country') {
        acc[key] = (filter as CountryFilterValue).value;
      } else if (key === 'city') {
        acc[key] = (filter as CityFilterValue).value;
      } else if (key === 'job') {
        acc[key] = (filter as JobFilterValue).value;
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

    const hobbies = (filters.hobbies as string[]).map((hobby) => hobby.charAt(0) + hobby.slice(1));
    hobbies.forEach((hobbies) => {
      params.append('hobbies', hobbies);
    });
    try {
      const data: any = await fetchData(page, params, token);
      if (data !== undefined) {
        setUserData(data.data);
        setInitialRecords(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError('No data found');
      }
      setLoading(false);
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
    'city',
    'job',
    'hobbies',
    'keywords',
    'gender',
    'verification',
  ];

  const handleInputChange = (e: any) => {
    const inputKeywords = e.target.value
      .split(' ')
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setKeywords(inputKeywords);

    if (inputKeywords.length === 0) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const autoCompleteKeywords = keywords.split(',').map((keyword) => keyword.trim());

  const lastKeyword = autoCompleteKeywords[autoCompleteKeywords.length - 1];

  const uniqueKeywords = [...new Set(KeywordData.keywords)];
  const filteredKeywords = uniqueKeywords
    .filter((keyword: string) => keyword.toLowerCase().startsWith(lastKeyword.toLowerCase()))
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
      default:
        return key;
    }
  };

  const renderBrandId = (record: any, index: any) => {
    const itemsPerPage = page * pageSize;
    const recordIndex = itemsPerPage + index;
    const brandId = recordIndex - pageSize + 1;
    return <div>{brandId}</div>;
  };

  const phoneNumberFix = (phone: string) => {
    if (phone.length >= 7) {
      const hiddenPart = '*'.repeat(7);
      const visiblePart = phone.slice(0, 6);
      return visiblePart + hiddenPart;
    } else {
      return phone;
    }
  };

  const renderPhone = (record: any) => {
    return <div>{phoneNumberFix(record.phone)}</div>;
  };

  const autofillCountry = async () => {
    try {
      const response = await TAfindCountry(country, token);
      setAutofillCountries(response);
    } catch (error) {
      throw error;
    }
  };
  const autofillCity = async () => {
    try {
      const response = await TAfindCity(city, token);
      setAutofillCities(response);
    } catch (error) {
      throw error;
    }
  };
  const autofillJob = async () => {
    try {
      const response = await TAfindJob(job, token);
      setAutofillJobs(response);
    } catch (error) {
      throw error;
    }
  };
  const autofillHobby = async () => {
    try {
      const response = await TAfindHobbies(hobby, token);
      setAutofillHobbies(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (country.length > 0) {
      autofillCountry();
    }
  }, [country]);

  useEffect(() => {
    if (city.length > 0) {
      autofillCity();
    }
  }, [city]);

  useEffect(() => {
    if (job.length > 0) {
      autofillJob();
    }
  }, [job]);

  useEffect(() => {
    if (hobby) {
      autofillHobby();
    }
  }, [hobby]);

  const handleCountrySuggestionClick = (key: any, selectedCountry: any) => {
    setFilter(key, 'value', selectedCountry);
    setAutofillCountries([]);
  };
  const handleCitySuggestionClick = (key: any, selectedCity: any) => {
    setFilter(key, 'value', selectedCity);
    setAutofillCities([]);
  };
  const handleJobSuggestionClick = (key: any, selectedJob: any) => {
    setFilter(key, 'value', selectedJob);
    setAutofillJobs([]);
  };
  const handleHobbySuggestionClick = (key: any, selectedHobby: string[]) => {
    if (hobby.length > 1) {
      setHobby([...hobby.slice(0, -1), selectedHobby[0]]);
    } else {
      setHobby([selectedHobby[0]]);
    }
    setFilter('hobbies', 'value', hobby);
  };

  return (
    <div className="panel">
      <div className="flex md:items-center md:flex-row flex-col">
        <div className="flex flex-col justify-center text-center"></div>
        <div className="md:flex md:flex-row w-full">
          {filterKeys.map((key) => {
            if (key === 'gender') {
              return (
                <div key={key} className="md:flex md:flex-col mr-2 ml-2">
                  <h2 className="text-sm font-bold mb-2">Gender</h2>
                  <label>
                    <input
                      type="radio"
                      value="male"
                      checked={filters.gender === 'male'}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="form-radio text-pink-600 mr-2"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="female"
                      checked={filters.gender === 'female'}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="form-radio text-pink-600 mr-2"
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      value=""
                      checked={filters.gender === ''}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="form-radio text-pink-600 mr-2"
                    />
                    Any
                  </label>
                </div>
              );
            } else if (key === 'verification') {
              return (
                <div key={key} className="md:flex md:flex-col mr-2 ml-2">
                  <h2 className="text-sm font-bold mb-2">Verification</h2>
                  <label>
                    <input
                      type="radio"
                      value="true"
                      checked={filters.verification === 'true'}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="form-radio text-pink-600 mr-2"
                    />
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="false"
                      checked={filters.verification === 'false'}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="form-radio text-pink-600 mr-2"
                    />
                    False
                  </label>
                  <label>
                    <input
                      type="radio"
                      value=""
                      checked={filters.verification === ''}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value);
                      }}
                      className="form-radio text-pink-600 mr-2"
                    />
                    Any
                  </label>
                </div>
              );
            } else if (
              key !== 'country' &&
              key !== 'keywords' &&
              key !== 'city' &&
              key !== 'hobbies' &&
              key !== 'job'
            ) {
              return (
                <div key={key} className="md:flex md:flex-col flex-1 mr-2">
                  <h2 className="text-sm font-bold mb-2 ml-2">{formatKey(key)}</h2>
                  <input
                    type="text"
                    value={(filters[key] as FilterValue).min}
                    onChange={(e) => {
                      setFilter(key, 'min', e.target.value);
                    }}
                    className="form-input w-full mb-2"
                    placeholder={`min. ${key}`}
                  />

                  <input
                    type="text"
                    value={(filters[key] as FilterValue).max}
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
        <div className="flex flex-row w-2/3 items-center">
          <div className="md:flex md:flex-row">
            {filterKeys.map((key) => {
              if (key === 'country') {
                return (
                  <div key={key}>
                    <div className="md:flex md:flex-col flex-1 mb-4">
                      <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Country Name</h2>
                      <input
                        type="text"
                        value={filters[key].value}
                        onChange={(e) => {
                          setFilter(key, 'value', e.target.value);
                          setCountry(e.target.value);
                        }}
                        className="form-input"
                        placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} name`}
                      />
                    </div>
                    {autofillCountries.length > 0 && country.length > 0 && (
                      <ul className="suggestion-list" style={{ position: 'absolute', zIndex: 9999 }}>
                        {[...new Set(autofillCountries)].slice(0, 5).map((autofillCountry, index) => (
                          <li
                            key={index}
                            className="bg-white p-2 text-black cursor-pointer hover:bg-gray-200"
                            onClick={() => handleCountrySuggestionClick('country', autofillCountry)}
                          >
                            {autofillCountry}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              } else if (key === 'city') {
                return (
                  <div key={key}>
                    <div className="md:flex md:flex-col flex-1 mb-4 ml-5">
                      <h2 className="text-sm font-bold mb-1 mt-3 ml-2">City Name</h2>
                      <input
                        type="text"
                        value={filters[key].value}
                        onChange={(e) => {
                          setFilter(key, 'value', e.target.value);
                          setCity(e.target.value);
                        }}
                        className="form-input"
                        placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} name`}
                      />
                    </div>
                    {autofillCities.length > 0 && city.length > 0 && (
                      <ul className="suggestion-list" style={{ position: 'absolute', zIndex: 9999 }}>
                        {[...new Set(autofillCities)].slice(0, 5).map((autofillCity, index) => (
                          <li
                            key={index}
                            className="bg-white ml-4 p-2 text-black cursor-pointer hover:bg-gray-200"
                            onClick={() => handleCitySuggestionClick('city', autofillCity)}
                          >
                            {autofillCity}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              } else if (key === 'job') {
                return (
                  <div key={key}>
                    <div className="md:flex md:flex-col flex-1 mb-4 ml-5">
                      <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Job Name</h2>
                      <input
                        type="text"
                        value={filters[key].value}
                        onChange={(e) => {
                          setFilter(key, 'value', e.target.value);
                          setJob(e.target.value);
                        }}
                        className="form-input"
                        placeholder={`Job name`}
                      />
                    </div>
                    {autofillJobs.length > 0 && job.length > 0 && (
                      <ul className="suggestion-list" style={{ position: 'absolute', zIndex: 9999 }}>
                        {[...new Set(autofillJobs)].slice(0, 5).map((autofillJob, index) => (
                          <li
                            key={index}
                            className="bg-white p-2 ml-6 text-black cursor-pointer hover:bg-gray-200"
                            onClick={() => handleJobSuggestionClick('job', autofillJob)}
                          >
                            {autofillJob}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              } else if (key === 'hobbies') {
                return (
                  <div key={key}>
                    <div className="md:flex md:flex-col flex-1 mb-4 mr-2 ml-5">
                      <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Hobbies</h2>
                      <input
                        type="text"
                        value={hobby}
                        onChange={(e) => {
                          const hobbies = e.target.value.split(',').map((word) => {
                            const trimmedWord = word.trim();
                            return trimmedWord.charAt(0) + trimmedWord.slice(1).toLowerCase();
                          });
                          setFilter('hobbies', 'value', hobbies);
                          setHobby(hobbies);
                        }}
                        className="form-input"
                        placeholder={`hobby1, hobby2, ...`}
                      />
                    </div>
                    {autofillHobbies.length > 0 && hobby[0] && (
                      <ul className="suggestion-list" style={{ position: 'absolute', zIndex: 9999 }}>
                        {[...new Set(autofillHobbies)].slice(0, 5).map((autofillHobby, index) => (
                          <li
                            key={index}
                            className="bg-white p-2 ml-6 text-black cursor-pointer hover:bg-gray-200"
                            onClick={() => handleHobbySuggestionClick('hobbies', [autofillHobby])}
                          >
                            {[autofillHobby]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              } else if (key === 'keywords') {
                return (
                  <div key={key}>
                    <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Keywords</h2>
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
                      className="form-input"
                      placeholder={`Keyword1, Keyword2, ...`}
                    />
                    {isDropdownOpen && keywords.length > 0 && (
                      <div>
                        <ul className="suggestion-list" style={{ position: 'absolute', zIndex: 9999 }}>
                          {autoCompleteKeyword.map((keyword, index) => (
                            <li
                              key={index}
                              className="bg-white p-2 mt-4 text-black cursor-pointer hover:bg-gray-200"
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

        <div className="flex flex-row justify-end text-center w-1/3 mb-4 mr-2">
          <button
            className=" inline-flex items-center justify-center mr-2 px-2 py-2 mt-6 mb-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 "
            onClick={handleFetchData}
          >
            Fetch Data
          </button>
          <DownloadPdfButton
            className=" inline-flex items-center justify-center px-2 py-2 mt-6 mb-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
            userData={initialRecords}
          />
          <DownloadCSVButton
            className=" inline-flex items-center justify-center ml-2 px-2 py-2 mt-6 mb-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
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
            records={initialRecords.slice((page - 1) * pageSize, page * pageSize)}
            columns={[
              { accessor: 'id', title: 'Id', sortable: true, render: renderBrandId },
              {
                accessor: 'verification',
                title: 'Verified',
                sortable: false,
                render: ({ verification }: any) => (
                  <div className="text-center items-center">
                    {verification ? <FontAwesomeIcon icon={faStar} style={{ color: '#ffba00' }} /> : null}
                  </div>
                ),
              },
              {
                accessor: 'details',
                title: 'Details',
                sortable: false,
                render: ({ _id }: any) => (
                  <a href={`/user/find/${_id}`} target="_blank" rel="noopener noreferrer">
                    <div className="text-center items-center">
                      <FontAwesomeIcon icon={faEye} style={{ color: '#005eff' }} />
                    </div>
                  </a>
                ),
              },
              {
                accessor: 'firstName',
                title: 'Name',
                sortable: true,
                render: ({ name }) => <div>{name}</div>,
              },
              { accessor: 'phone', title: 'Phone', sortable: true, render: renderPhone },
              { accessor: 'age', title: 'Age', sortable: true },
              { accessor: 'job', title: 'Job', sortable: true },
              { accessor: 'instaUsername', title: 'Insta Username', sortable: true },
              { accessor: 'tiktokUsername', title: 'Tiktok Username', sortable: true },
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
              { accessor: 'average_like', title: 'Insta Average Like', sortable: true },
              { accessor: 'tiktok_followers', title: 'Tiktok Followers', sortable: true },
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
        )}
      </div>
    </div>
  );
};

export default GetAllUsers;
