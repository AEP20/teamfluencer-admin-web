import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { TAfindAllCampaigns } from '../services/campaigns';
import { Campaign, campaignFilters, campaignFilterType } from '../types/campaignsData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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

  const [campaignData, setCampaignData] = useState([] as Campaign[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100, 500];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[3]);
  const [initialRecords, setInitialRecords] = useState(sortBy(campaignData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const response = await fetchData(token);
        setCampaignData(response);
        setInitialRecords(response);
      } catch (error) {
        setError('No data found');
      }
    };

    loadCampaigns();
  }, [token]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  const verifiedİcon = (is_verified: boolean) => {
    if (is_verified) {
      return <FontAwesomeIcon icon={faCheck} color="green" />;
    } else {
      return <FontAwesomeIcon icon={faTimes} color="red" />;
    }
  };

  const renderDescriptionCell = ({ description, _id }: Campaign) => {
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

  type campaignFilters = {
    country: string | '';
    platform: 'insta-post' | 'insta-story' | 'insta-reels' | 'tiktok' | '';
    is_verified: 'true' | 'false' | '';
    gender: 'male' | 'female' | '';
    min_followers: number | '';
    min_age: number | '';
    max_age: number | '';
  };

  const defaultState: campaignFilters = {
    country: '',
    platform: '',
    is_verified: '',
    gender: '',
    min_followers: 0,
    min_age: 0,
    max_age: 0,
  };

  const [filters, setFilters] = useState<campaignFilters>(defaultState);

  const setFilter = (key: keyof campaignFilters, type: campaignFilterType, value: string | boolean | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filterKeys: (keyof campaignFilters)[] = [
    'country',
    'platform',
    'is_verified',
    'gender',
    'min_followers',
    'min_age',
    'max_age',
  ];

  return (
    <div className="panel">
      {error && <div className="alert alert-danger">{error}</div>}
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
          <div >
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
              Insta Post
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
                  {verifiedİcon(is_verified)}
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
          sortStatus={{} as DataTableSortStatus} // Sort fonksiyonunu etkinleştirmek için gereken değişiklikler yapmanız gerekmektedir.
          onSortStatusChange={() => {}}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
        />
      </div>
    </div>
  );
}

export default AllCampaign;
