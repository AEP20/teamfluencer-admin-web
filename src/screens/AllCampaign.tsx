import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { TAfindAllCampaigns } from '../services/campaignsAPI';
import {
  CampaignType,
  Campaign,
  CampaignFilters,
  FilterValue,
  FilterType,
  CountryFilterValue,
} from '../types/campaignsData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import CampaignProfile from '../components/CampaignProfile';

const fetchData = async (token: string) => {
  try {
    const response = await TAfindAllCampaigns(token);
    if (response && Array.isArray(response.campaigns)) {
      const totalLength = response.campaigns.length;
      const data = response.campaigns.map((item: any, index: any) => {
        return {
          id: index + 1,
          ...item,
        };
      });
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

function AllCampaign() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('All Campaigns'));
  }, [dispatch]);

  const [userData, setUserData] = useState([] as Campaign[]);
  const [campaignData, setCampaignData] = useState([] as CampaignType[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100, 500];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[4]);
  const [initialRecords, setInitialRecords] = useState(sortBy(campaignData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchMatches, setSearchMatches] = useState<Campaign[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCampaign, setShowCampaign] = useState(false);
  const [tempData, setTempData] = useState(initialRecords);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const response = await fetchData(token);
        setCampaignData(response);
        setInitialRecords(response);
        setSearch(response.data);
      } catch (error) {
        setError('No data found');
      }
    };

    loadCampaigns();
  }, [token]);

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

  const defaultState: CampaignFilters = {
    is_verified: '',
    visibility: '',
    max_cost: { min: '', max: '' },
    country: { value: '' },
    created_at: '',
    active_campaigns: '',
    platform: '',
  };

  const [filters, setFilters] = useState<CampaignFilters>(defaultState);

  const setFilter = (
    key: keyof CampaignFilters,
    type: FilterType,
    value:
      | string
      | boolean
      | ('TR' | 'Other' | '')
      | ('last_week' | 'last_month' | 'last_three_months' | '')
      | ('insta-post' | 'insta-story' | 'insta-reels' | 'tiktok' | ''),
  ) => {
    if (key === 'is_verified' || key === 'visibility') {
      setFilters((prev) => ({ ...prev, [key]: value as 'true' | 'false' | '' }));
    } else if (key === 'country') {
      setFilters((prev) => ({ ...prev, [key]: { value: value as 'TR' | 'Other' | '' } }));
    } else if (key === 'created_at') {
      setFilters((prev) => ({ ...prev, [key]: value as 'last_week' | 'last_month' | 'last_three_months' | '' }));
    } else if (key === 'active_campaigns') {
      setFilters((prev) => ({ ...prev, [key]: value as boolean | '' }));
    } else if (key === 'platform') {
      setFilters((prev) => ({ ...prev, [key]: value as 'insta-post' | 'insta-story' | 'insta-reels' | 'tiktok' | '' }));
    } else if (type) {
      setFilters((prev) => ({ ...prev, [key]: { ...prev[key], [type]: value as string } }));
    }
  };

  const filterKeys: (keyof CampaignFilters)[] = [
    'is_verified',
    'visibility',
    'country',
    'created_at',
    'active_campaigns',
    'platform',
    'max_cost',
  ];

  useEffect(() => {
    const handleClick = () => {
      setIsDropdownOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

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
      } else if (key === 'is_verified' || key === 'visibility' || key === 'active_campaigns') {
        const filterValue = value as boolean | '';
        if (filterValue !== '') {
          dt = dt.filter((d) => d[key as keyof typeof d] === filterValue);
        }
      } else if (key === 'created_at') {
        const filterValue = value as 'last_week' | 'last_month' | 'last_three_months' | '';
        if (filterValue !== '') {
          const currentDate = new Date();
          let filteredDate: Date;
          if (filterValue === 'last_week') filteredDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
          else if (filterValue === 'last_month')
            filteredDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
          else if (filterValue === 'last_three_months')
            filteredDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));

          dt = dt.filter((d) => {
            const dateValue = d[key as keyof typeof d];
            if (typeof dateValue === 'string' || dateValue instanceof Date) {
              return new Date(dateValue) >= filteredDate;
            }
            return true;
          });
        }
      } else if (key === 'platform') {
        const filterValue = value as 'insta-post' | 'insta-story' | 'insta-reels' | 'tiktok' | '';
        if (filterValue !== '') {
          dt = dt.filter((d) => d[key as keyof typeof d] === filterValue);
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
    setTempData(dt);
  }, [filters]);

  const searchCampaign = (text: string) => {
    let matches = userData.filter((campaign: Campaign) => {
      const regex = new RegExp(text, 'gi');
      return campaign.name.match(regex);
    });

    setInitialRecords(matches);
  };

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  const verifiedIcon = (visibility: boolean) => {
    if (visibility) {
      return <FontAwesomeIcon icon={faCheck} color="green" />;
    } else {
      return <FontAwesomeIcon icon={faTimes} color="red" />;
    }
  };

  const renderDescriptionCell = ({ description }: CampaignType) => {
    return (
      <div className="tooltip" data-tooltip={description}>
        <div className="text-container">
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
        </div>
      </div>
    );
  };

  return (
    <div className="panel">
      {error && <div className="alert alert-danger">{error}</div>}
      {showCampaign && searchMatches.map((campaign) => <CampaignProfile key={campaign._id} {...campaign} />)}

      <input
        type="text"
        className="form-input w-auto"
        placeholder="Search Campaign Name"
        value={search}
        onChange={(e) => {
          const text = e.target.value;
          setSearch(text);
          searchCampaign(text);
        }}
      />

      <div className="flex md:items-center md:flex-row flex-col">
        <div className="flex flex-col justify-center text-center"></div>
        <div className="md:flex md:flex-row w-full">
          {filterKeys.map((key) => {
            if (key === 'is_verified' || key === 'visibility' || key === 'active_campaigns') {
              return (
                <div key={key} className="md:flex md:flex-col mr-2 ml-2">
                  <h2 className="text-sm font-bold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                  <label>
                    <input
                      type="radio"
                      value="true"
                      checked={filters[key] === true}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value === 'true');
                      }}
                      className="mr-2"
                    />
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="false"
                      checked={filters[key] === false}
                      onChange={(e) => {
                        setFilter(key, 'value', e.target.value === 'true');
                      }}
                      className="mr-2"
                    />
                    False
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
            } else if (key === 'country') {
              const countries = ['TR', 'Other', ''];
              return (
                <div key={key} className="md:flex md:flex-col mr-2 ml-2">
                  <h2 className="text-sm font-bold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                  {countries.map((country) => (
                    <label key={country}>
                      <input
                        type="radio"
                        value={country}
                        checked={filters[key].value === country}
                        onChange={(e) => {
                          setFilter(key, 'value', e.target.value);
                        }}
                        className="mr-2"
                      />
                      {country || 'Any'}
                    </label>
                  ))}
                </div>
              );
            } else if (key === 'platform') {
              const platforms = ['insta-post', 'insta-story', 'insta-reels', 'tiktok', ''];
              return (
                <div key={key} className="md:flex md:flex-col mr-2 ml-2">
                  <h2 className="text-sm font-bold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                  {platforms.map((platform) => (
                    <label key={platform}>
                      <input
                        type="radio"
                        value={platform}
                        checked={filters[key] === platform}
                        onChange={(e) => {
                          setFilter(key, 'value', e.target.value);
                        }}
                        className="mr-2"
                      />
                      {platform || 'Any'}
                    </label>
                  ))}
                </div>
              );
            } else if (key === 'created_at') {
              const creationDates = ['last_week', 'last_month', 'last_three_months', ''];
              return (
                <div key={key} className="md:flex md:flex-col mr-2 ml-2">
                  <h2 className="text-sm font-bold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                  {creationDates.map((date) => (
                    <label key={date}>
                      <input
                        type="radio"
                        value={date}
                        checked={filters[key] === date}
                        onChange={(e) => {
                          setFilter(key, 'value', e.target.value);
                        }}
                        className="mr-2"
                      />
                      {date || 'Any'}
                    </label>
                  ))}
                </div>
              );
            } else if (key === 'max_cost') {
              return (
                <div key={key} className="md:flex md:flex-col flex-1/2 mr-2">
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

      <div className="datatables">
        <DataTable
          highlightOnHover
          className="whitespace-nowrap table-hover"
          records={recordsData}
          columns={[
            { accessor: 'id', title: 'Id', sortable: true },
            {
              accessor: 'name',
              title: 'Name',
              sortable: true,
              render: ({ name }) => (
                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
              ),
            },
            { accessor: 'description', title: 'Description', sortable: true, render: renderDescriptionCell },
            { accessor: 'country', title: 'Country', sortable: true },
            { accessor: 'platform', title: 'Platform', sortable: true },
            {
              accessor: 'is_verified',
              title: 'Verified',
              sortable: true,
              render: ({ is_verified }) => (
                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {verifiedIcon(is_verified)}
                </div>
              ),
            },
            {
              accessor: 'visibility',
              title: 'Visibility',
              sortable: true,
              render: ({ visibility }) => (
                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {verifiedIcon(visibility)}
                </div>
              ),
            },
            {
              accessor: 'created_at',
              title: 'Created At',
              sortable: true,
              render: ({ created_at }: any) => (
                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {new Date(created_at).toLocaleDateString()}
                </div>
              ),
            },
            {
              accessor: 'max_cost',
              title: 'Max Cost',
              sortable: true,
              render: ({ max_cost }: any) => (
                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {max_cost && max_cost.toLocaleString()}
                </div>
              ),
            },
          ]}
          totalRecords={initialRecords.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={{} as DataTableSortStatus}
          onSortStatusChange={() => {}}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
        />
      </div>
    </div>
  );
}

export default AllCampaign;
