import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { TAfindAllCampaigns } from '../services/campaignsAPI';
import { CampaignType } from '../types/campaignsData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const fetchData = async (
  created_at: string,
  country: string,
  platform: string,
  is_verified: string,
  visibility: string,
  max_cost: string,
  gender: string,
  min_follower: string,
  max_follower: string,
  min_age: string,
  max_age: string,
  sortBy: string,
  page: number,
  perPage: number,
  campaign: string,
  token: string,
) => {
  try {
    const response = await TAfindAllCampaigns(
      created_at,
      country,
      platform,
      is_verified,
      visibility,
      max_cost,
      gender,
      min_follower,
      max_follower,
      min_age,
      max_age,
      sortBy,
      page,
      perPage,
      campaign,
      token,
    );
    if (response && Array.isArray(response.campaigns)) {
      const totalPages = response.totalPages;
      const totalLength = response.campaigns.length;
      const data = response.campaigns.map((item: any, index: any) => {
        return {
          id: totalLength - index,
          _id: item.details._id,
          ...item,
        };
      });
      return { data, totalPages };
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

  const [campaignData, setCampaignData] = useState([] as CampaignType[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [totalPages, setTotalPages] = useState(0);
  const [initialRecords, setInitialRecords] = useState(sortBy(campaignData, 'id'));
  const [error, setError] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'desc' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [created_at, setCreated_at] = useState('');
  const [country, setCountry] = useState('');
  const [platform, setPlatform] = useState('');
  const [is_verified, setIs_verified] = useState('');
  const [visibility, setVisibility] = useState('');
  const [max_cost, setMax_cost] = useState('');
  const [gender, setGender] = useState('');
  const [min_follower, setMin_follower] = useState('');
  const [max_follower, setMax_follower] = useState('');
  const [min_age, setMin_age] = useState('');
  const [max_age, setMax_age] = useState('');
  const [SortBy, setSortBy] = useState('');

  useEffect(() => {
    setLoading(true);
    setPage(1);
    const loadCampaigns = async () => {
      try {
        const response = await fetchData(
          created_at,
          country,
          platform,
          is_verified,
          visibility,
          max_cost,
          gender,
          min_follower,
          max_follower,
          min_age,
          max_age,
          SortBy,
          page,
          pageSize,
          campaignName,
          token,
        );
        if (response !== undefined) {
          setTotalPages(response.totalPages);
          setCampaignData(response.data);
          setInitialRecords(response.data);
          setError(null);
        }
      } catch (error) {
        setError('No data found');
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, [
    created_at,
    country,
    platform,
    is_verified,
    visibility,
    max_cost,
    gender,
    min_follower,
    max_follower,
    min_age,
    max_age,
    SortBy,
    page,
    pageSize,
    campaignName,
    token,
  ]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const verifiedIcon = (visibility: boolean) => {
    if (visibility) {
      return <FontAwesomeIcon size="lg" icon={faCheck} color="green" />;
    } else {
      return <FontAwesomeIcon size="lg" icon={faTimes} color="red" />;
    }
  };

  const handleCampaignSelect = (selectedCampaign: any) => {
    setCampaignName(selectedCampaign.name);
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

  const renderCampaignId = (record: any, index: any) => {
    const itemsPerPage = page * pageSize;
    const recordIndex = itemsPerPage + index;
    const brandId = recordIndex - pageSize + 1;
    return <div>{brandId}</div>;
  };

  return (
    <div className="panel">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="flex md:items-center md:flex-row flex-col">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="ml-4 py-2">
            <h3 className="font-bold">Platform</h3>
            {['', 'insta-post', 'insta-reels', 'insta-story', 'tiktok'].map((value) => (
              <div key={value} className="form-check flex flex-row">
                <input
                  type="radio"
                  id={value}
                  name="platform"
                  value={value}
                  checked={platform === value}
                  onChange={(e) => setPlatform(e.target.value)}
                />
                <label className="form-check-label ml-2 mt-2" htmlFor={value}>
                  {value === '' ? 'any' : value}
                </label>
              </div>
            ))}
          </div>
          <div className="py-2">
            <h3 className="ml-2 font-bold">Created At</h3>
            {['', 'last_3_months', 'last_month', 'last_week'].map((value) => (
              <div key={value} className="form-check flex flex-row">
                <input
                  type="radio"
                  id={value}
                  name="created_at"
                  value={value}
                  checked={created_at === value}
                  onChange={(e) => setCreated_at(e.target.value)}
                />
                <label className="form-check-label ml-2 mt-2" htmlFor={value}>
                  {value === '' ? 'any' : value}
                </label>
              </div>
            ))}
          </div>
          <div className="py-2">
            <h3 className="ml-2 font-bold">Is Verified</h3>
            {['', 'false', 'true'].map((value) => (
              <div key={value} className="form-check flex flex-row">
                <input
                  type="radio"
                  id={value}
                  name="is_verified"
                  value={value}
                  checked={is_verified === value}
                  onChange={(e) => setIs_verified(e.target.value)}
                />
                <label className="form-check-label ml-2 mt-2" htmlFor={value}>
                  {value === '' ? 'any' : value}
                </label>
              </div>
            ))}
          </div>
          <div className="py-2">
            <h3 className="ml-2 font-bold">Visibility</h3>
            {['', 'false', 'true'].map((value) => (
              <div key={value} className="form-check flex flex-row">
                <input
                  type="radio"
                  id={value}
                  name="visibility"
                  value={value}
                  checked={visibility === value}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label className="form-check-label ml-2 mt-2" htmlFor={value}>
                  {value === '' ? 'any' : value}
                </label>
              </div>
            ))}
          </div>
          <div className="py-2">
            <h3 className="ml-2 font-bold">Gender</h3>
            {['', 'female', 'male'].map((value) => (
              <div key={value} className="form-check flex flex-row">
                <input
                  type="radio"
                  id={value}
                  name="gender"
                  value={value}
                  checked={gender === value}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label ml-2 mt-2" htmlFor={value}>
                  {value === '' ? 'any' : value}
                </label>
              </div>
            ))}
          </div>
          <div className="py-2">
            <h3 className="ml-2 font-bold">Country</h3>
            {['', 'others', 'TR'].map((value) => (
              <div key={value} className="form-check flex flex-row">
                <input
                  type="radio"
                  id={value}
                  name="country"
                  value={value}
                  checked={country === value}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <label className="form-check-label ml-2 mt-2" htmlFor={value}>
                  {value === '' ? 'any' : value}
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="ml-4 py-2">
              <h3 className="font-bold">Max Followers</h3>
              <div className="flex flex-row items-center mt-2">
                <input
                  type="number"
                  className="bg-gray-100 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                  value={max_follower}
                  onChange={(e) => setMax_follower(e.target.value)}
                />
              </div>
            </div>
            <div className="ml-4 py-2">
              <h3 className="font-bold">Min Followers</h3>
              <div className="flex flex-row items-center mt-2">
                <input
                  type="number"
                  className="bg-gray-100 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                  value={min_follower}
                  onChange={(e) => setMin_follower(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="ml-4 py-2">
              <h3 className="font-bold">Max Age</h3>
              <div className="flex flex-row items-center mt-2">
                <input
                  type="number"
                  className="bg-gray-100 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                  value={max_age}
                  onChange={(e) => setMax_age(e.target.value)}
                />
              </div>
            </div>
            <div className="ml-4 py-2">
              <h3 className="font-bold">Min Age</h3>
              <div className="flex flex-row items-center mt-2">
                <input
                  type="number"
                  className="bg-gray-100 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                  value={min_age}
                  onChange={(e) => setMin_age(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="ml-4 py-2">
            <h3 className="font-bold">Max Cost</h3>
            <div className="flex flex-row items-center mt-2">
              <input
                type="number"
                className="bg-gray-100 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                value={max_cost}
                onChange={(e) => setMax_cost(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="ml-auto mb-16 mr-16">
          <div className="pt-8">
            <div className="form-check flex flex-row">
              <input
                type="text"
                className="form-input w-auto"
                name="campaignName"
                placeholder="Search Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
              <label className="form-check-label ml-2 mt-2"></label>
            </div>
          </div>
          {isDropdownOpen && initialRecords.length > 0 && (
            <div className="w-auto absolute bg-white border border-gray-300 rounded z-10">
              {initialRecords.slice(0, 4).map((match: CampaignType) => (
                <div
                  className="p-2 border-b border-gray-300 hover:bg-gray-100"
                  key={match._id}
                  onClick={() => handleCampaignSelect(match)}
                >
                  {match.name}
                </div>
              ))}
            </div>
          )}
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
                accessor: 'brand',
                title: 'Brand',
                sortable: false,
                render: ({ brand }: any) => (
                  <Link to={`/brands/find/${brand}`}>
                    <div className="text-center items-center mr-4">
                      <FontAwesomeIcon icon={faEye} style={{ color: '#005eff' }} />
                    </div>
                  </Link>
                ),
              },
              { accessor: 'id', title: 'Id', sortable: true, render: renderCampaignId },
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
                title: 'Visibility Status',
                sortable: true,
                render: ({ _id, visibility }) => (
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={faHeartPulse}
                      size="lg"
                      style={{ color: visibility ? '#009e1a' : '#ff0000' }}
                    />
                    <p className="ml-2">{visibility ? 'Aktif' : 'Görünür Değil'}</p>
                  </div>
                ),
              },
              {
                accessor: 'visibility',
                title: 'Set Visibility',
                sortable: true,
                render: ({ _id, visibility }) => {
                  // 1. Add a state to determine if the spinner is showing for each item

                  return (
                    <div className="flex">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <button
                          // onClick={() => handleToggleVisibility(_id, visibility ? 'false' : 'true', token)}
                          className="bg-blue-500 text-white rounded-md px-3 py-2 w-full hover:bg-blue-600"
                        >
                          {loading ? (
                            <span className="spinner"></span> // 4. Replace the button text with spinner if loading
                          ) : visibility ? (
                            'Yayından Kaldır'
                          ) : (
                            'Aktifleştir'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                },
              },
              {
                accessor: 'created_at',
                title: <div onClick={() => setSortBy('created_at')}>Created At</div>,
                sortable: true,
                render: ({ created_at }: any) => (
                  <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {new Date(created_at).toLocaleDateString()}
                  </div>
                ),
              },
              {
                accessor: 'max_cost',
                title: <div onClick={() => setSortBy('max_cost')}>Max Cost</div>,
                sortable: true,
                render: ({ max_cost }: any) => (
                  <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {max_cost && max_cost.toLocaleString()}
                  </div>
                ),
              },
              {
                accessor: 'application_counts.application_done',
                title: <div onClick={() => setSortBy('application_counts.application_done')}>Application Done</div>,
                sortable: true,
              },
              {
                accessor: 'application_counts.content_approved',
                title: <div onClick={() => setSortBy('application_counts.content_approved')}> Content Approved</div>,
                sortable: true,
              },
              {
                accessor: 'application_counts.content_shared',
                title: <div onClick={() => setSortBy('application_counts.content_shared')}>Content Shared</div>,
                sortable: true,
              },
              {
                accessor: 'application_counts.content_to_share',
                title: <div onClick={() => setSortBy('application_counts.content_to_share')}>Content to Share</div>,
                sortable: true,
              },
              {
                accessor: 'application_counts.first_application',
                title: <div onClick={() => setSortBy('application_counts.first_application')}>First Application</div>,
                sortable: true,
              },
              {
                accessor: 'application_counts.waiting_content',
                title: <div onClick={() => setSortBy('application_counts.waiting_content')}>Waiting Content</div>,
                sortable: true,
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
}

export default AllCampaign;
