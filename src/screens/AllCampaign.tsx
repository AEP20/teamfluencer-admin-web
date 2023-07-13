import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { TAfindAllCampaigns, TAfindCampaign } from '../services/campaignsAPI';
import { CampaignType, campaignFilters, campaignFilterType, Campaign } from '../types/campaignsData';
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
      const data = response.campaigns
        .map((item: any, index: any) => {
          return {
            id: totalLength - index,
            name: item.name,
            description: item.description,
            country: item.country,
            platform: item.platform,
            is_verified: item.is_verified,
          };
        })
        .reverse();
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
  const [pageSize, setPageSize] = useState(PAGE_SIZES[3]);
  const [initialRecords, setInitialRecords] = useState(sortBy(campaignData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [searchMatches, setSearchMatches] = useState<Campaign[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCampaign, setShowCampaign] = useState(false);

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

  const searchCampaign = (text: string) => {
    let matches = userData.filter((campaign: Campaign) => {
      const regex = new RegExp(`^${text}`, 'gi');
      if (text === '') {
        setShowCampaign(false);
        return null;
      }
      return campaign.name.match(regex);
    });
    if (matches.length === 0) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
    setSearchMatches(matches);
  };

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
    const handleClick = () => {
      setIsDropdownOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // const handleForm = async (e: any) => {
  //   e.preventDefault();

  //   if (!searchCampaign) {
  //     setError('Please provide campaign name');
  //     return;
  //   }
  //   try {
  //     const response = await TAfindCampaign(searchCampaign, token);
  //     const object: CampaignType = {
  //       currency: response.currency,
  //       country: response.country,
  //       name: response.name,
  //       cover_photo: response.cover_photo,
  //       description: response.description,
  //       platform: response.platform,
  //       is_verified: response.is_verified,
  //       verification: response.verification,
  //       rejected_reason: response.rejected_reason,
  //       visibility: false,
  //       content_offered: false,
  //       limitations: {
  //         gender: response.limitations?.gender ?? '',
  //         min_follower: response.limitations?.min_follower ?? 0,
  //         max_follower: response.limitations?.max_follower ?? 0,
  //         min_age: response.limitations?.min_age ?? 0,
  //         max_age: response.limitations?.max_age ?? 0,
  //         school: response.limitations?.school ?? '',
  //         city: response.limitations?.city ?? '',
  //       },
  //       max_cost: 0,
  //       total_cost: 0,
  //       details: {
  //         photo: [],
  //         link: '',
  //         description: '',
  //       },
  //       _id: '',
  //     };
  //     setShowCampaign(true);
  //     setCampaignData([object]);
  //   } catch (error: any) {
  //     setError(error.response.message);
  //   }
  // };

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  const verifiedIcon = (is_verified: boolean) => {
    if (is_verified) {
      return <FontAwesomeIcon icon={faCheck} color="green" />;
    } else {
      return <FontAwesomeIcon icon={faTimes} color="red" />;
    }
  };

  const renderDescriptionCell = ({ description }: CampaignType) => {
    const toggleExpandedRow = () => {
      setIsExpanded(!isExpanded);
    };

    if (isExpanded) {
      return (
        <div>
          {description}
          <button type="button" onClick={toggleExpandedRow} className="text-blue-500 hover:underline">
            Less
          </button>
        </div>
      );
    } else if (description.length > 50) {
      return (
        <div>
          {`${description.slice(0, 50)}... `}
          <button type="button" onClick={toggleExpandedRow} className="text-blue-500 hover:underline">
            More
          </button>
        </div>
      );
    } else {
      return <div>{description}</div>;
    }
  };

  const defaultState: campaignFilters = {
    country: '',
    platform: '',
    is_verified: '',
    gender: '',
    min_followers: 0,
    max_followers: 0,
    min_age: 0,
    max_age: 0,
  };

  const [filters, setFilters] = useState<campaignFilters>(defaultState);

  const setFilter = (key: keyof campaignFilters, _type: campaignFilterType, value: string | boolean | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="panel">
      {error && <div className="alert alert-danger">{error}</div>}
      {showCampaign && searchMatches.map((campaign) => <CampaignProfile key={campaign._id} {...campaign} />)}
      <div className="flex md:flex-row flex-row gap-10">
        <div className="flex flex-row gap-24 items-center items-row">
          <div>
            <div className="filter-item">
              <label htmlFor="min_followers" className="filter-label">
                Min Followers:
              </label>
              <input
                className="form-input w-full mb-2"
                type="text"
                id="min_followers"
                value={filters.min_followers}
                onChange={(e) => setFilter('min_followers', 'value', parseInt(e.target.value))}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="max_followers" className="filter-label">
                Max Followers:
              </label>
              <input
                className="form-input w-full mb-2"
                type="text"
                id="max_followers"
                value={filters.max_followers}
                onChange={(e) => setFilter('max_followers', 'value', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <div className="filter-item">
              <label htmlFor="min_age" className="filter-label">
                Min Age:
              </label>
              <input
                className="form-input w-full mb-2"
                type="text"
                id="min_age"
                value={filters.min_age}
                onChange={(e) => setFilter('min_age', 'value', parseInt(e.target.value))}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="max_age" className="filter-label">
                Max Age:
              </label>
              <input
                className="form-input w-full mb-2"
                type="text"
                id="max_age"
                value={filters.max_age}
                onChange={(e) => setFilter('max_age', 'value', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-24 align-start">
          <div className="filter-item">
            <label htmlFor="platform" className="filter-label">
              Platform:
            </label>
            <label>
              <input
                type="radio"
                id="platform"
                value="insta-post"
                checked={filters.platform === 'insta-post'}
                onChange={(e) => {
                  setFilter('platform', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Insta Post
            </label>
            <label>
              <input
                type="radio"
                id="platform"
                value="insta-story"
                checked={filters.platform === 'insta-story'}
                onChange={(e) => {
                  setFilter('platform', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Insta Story
            </label>
            <label>
              <input
                type="radio"
                id="platform"
                value="insta-reels"
                checked={filters.platform === 'insta-reels'}
                onChange={(e) => {
                  setFilter('platform', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Insta Reels
            </label>
            <label>
              <input
                type="radio"
                id="platform"
                value="tiktok"
                checked={filters.platform === 'tiktok'}
                onChange={(e) => {
                  setFilter('platform', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Tiktok
            </label>
            <label>
              <input
                type="radio"
                id="platform"
                value=""
                checked={filters.platform === ''}
                onChange={(e) => {
                  setFilter('platform', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Any
            </label>
          </div>
          <div className="md:flex md:flex-col mr-2 ml-2">
            <h2 className="text-sm font-bold mb-2">Verification</h2>
            <label>
              <input
                type="radio"
                id="is_verified"
                value="true"
                checked={filters.is_verified === 'true'}
                onChange={(e) => {
                  setFilter('is_verified', 'value', e.target.value);
                }}
                className="mr-2"
              />
              True
            </label>
            <label>
              <input
                type="radio"
                id="is_verified"
                value="false"
                checked={filters.is_verified === 'false'}
                onChange={(e) => {
                  setFilter('is_verified', 'value', e.target.value);
                }}
                className="mr-2"
              />
              False
            </label>
            <label>
              <input
                type="radio"
                id="is_verified"
                value=""
                checked={filters.is_verified === ''}
                onChange={(e) => {
                  setFilter('is_verified', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Any
            </label>
          </div>

          <div className="md:flex md:flex-col mr-2 ml-2">
            <h2 className="text-sm font-bold mb-2">Gender</h2>
            <label>
              <input
                type="radio"
                id="gender"
                value="male"
                checked={filters.gender === 'male'}
                onChange={(e) => {
                  setFilter('gender', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                id="gender"
                value="female"
                checked={filters.gender === 'female'}
                onChange={(e) => {
                  setFilter('gender', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value=""
                checked={filters.gender === ''}
                onChange={(e) => {
                  setFilter('gender', 'value', e.target.value);
                }}
                className="mr-2"
              />
              Any
            </label>
          </div>
          <div className="flex flex-col gap-6">
            <div className="ltr:ml-auto rtl:mr-auto flex mt-12 h-10">
              <input
                type="text"
                className="form-input w-auto"
                placeholder="Search Campaign Name"
                value={search}
                onChange={(e) => {
                  const text = e.target.value;
                  searchCampaign(text);
                }}
              />
              {isDropdownOpen && searchMatches.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded mt-10 z-10">
                  {searchMatches.slice(0, 4).map((match: Campaign) => (
                    <div className="p-2 border-b border-gray-300 hover:bg-gray-100" key={match._id}>
                      {match.name}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-center">
                <button type="button" onClick={() => setShowCampaign(true)} className="btn btn-primary ml-3">
                  Submit
                </button>
              </div>
            </div>
            <div className="filter-item">
              <label htmlFor="country" className="filter-label">
                Country:
              </label>
              <input
                className="form-input w-full mb-2"
                type="text"
                id="country"
                value={filters.country}
                onChange={(e) => setFilter('country', 'value', e.target.value)}
              />
            </div>
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
            { accessor: 'visibility', title: 'Visibility', sortable: true,  render: ({ visibility }) => (
              <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {verifiedIcon(visibility)}
              </div>
            ),},
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
