import React, { useEffect, useState } from 'react';
import { TAfindApprovedCampaigns } from '../services/campaignsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { CampaignType } from '../types/campaignsData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const fetchData = async (page: number, perPage: number, token: string) => {
  try {
    const response = await TAfindApprovedCampaigns(page, perPage, token);
    const totalPages = response.totalPages;
    if (response && Array.isArray(response.campaign)) {
      const data = response.campaign.map((item: any, index: any) => {
        return {
          ...item,
          id: index + 1,
        };
      });
      return { data, totalPages };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

function ApprovedCampaigns() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('Approved Campaigns'));
  }, [dispatch]);

  const [campaignData, setCampaignData] = useState<CampaignType[]>([]);
  const [initialRecords, setInitialRecords] = useState(sortBy(campaignData, 'id'));
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [totalPages, setTotalPages] = useState(0);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadCampaigns = async () => {
      try {
        const response = await fetchData(page, pageSize, token);
        if (response !== undefined) {
          setTotalPages(response.totalPages);
          setCampaignData(response.data);
          setInitialRecords(response.data);
          setError(null);
        }
      } catch (error) {
        setError('No campaign found');
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, [page, pageSize, token]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

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

  const renderBrandId = (record: any, index: any) => {
    const itemsPerPage = page * pageSize;
    const recordIndex = itemsPerPage + index;
    const brandId = recordIndex - pageSize + 1;
    return <div>{brandId}</div>;
  };

  return (
    <div className="panel">
      <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
        {error && <div className="bg-red-200 text-red-800 border border-red-600 p-2 rounded">{error}</div>}
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
              { accessor: 'id', title: 'Id', sortable: true, render: renderBrandId },
              { accessor: 'name', title: 'Name', sortable: true },
              { accessor: 'description', title: 'Description', sortable: true, render: renderDescriptionCell },
              { accessor: 'country', title: 'Country', sortable: true },
              { accessor: 'platform', title: 'Platform', sortable: true },
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

export default ApprovedCampaigns;
