import React, { useEffect, useState } from 'react';
import { TAfindApprovedCampaigns } from '../services/campaignsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { CampaignType } from '../types/campaignsData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

const fetchData = async (page: number, perPage: number, token: string) => {
  try {
    const response = await TAfindApprovedCampaigns(page, perPage, token);
    console.log('response', response);
    const totalPages = response.totalPages;
    console.log('totalPages', totalPages);
    if (response && Array.isArray(response.campaign)) {
      const totalLength = response.campaign.length;
      const data = response.campaign.map((item: any, index: any) => {
        return {
          ...item,
          id: totalLength - index,
        };
      });
      console.log('data', data);
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
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[3]);
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
              { accessor: 'id', title: 'Id', sortable: true },
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
