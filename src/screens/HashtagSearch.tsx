import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { selectToken } from '../redux/store/userSlice';
import { TAgetHashtagPostsLastThreeMonths } from '../services/hashtagSearchAPI';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { sortBy } from 'lodash';
import { PostData } from '../types/hashtagSearchPostData';

const fetchData = async (page: number, perPage: number, description: string, token: string) => {
  try {
    const response = await TAgetHashtagPostsLastThreeMonths(page, perPage, description, token);
    if (response.posts && response.posts.length > 0) {
      const totalLength = response.posts.length;
      const totalPages = response.totalPages;
      const data = response.posts.map((item: any, index: any) => {
        return {
          id: totalLength - index,
          ...item,
        };
      });
      return { data, totalPages };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const HashtagSearch = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('Hashtag Search'));
  });
  const [userData, setUserData] = useState([] as PostData[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setLoading(true);
    const loadBrands = async () => {
      try {
        const response = await fetchData(page, pageSize, description, token);
        if (response !== undefined) {
          setInitialRecords(response.data);
          setTotalPages(response.totalPages);
          setLoading(false);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };
    loadBrands();
  }, [page, pageSize, description, token]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const renderPostId = (record: any, index: number) => {
    const itemsPerPage = page * pageSize;
    const recordIndex = itemsPerPage + index;
    const postId = recordIndex - pageSize + 1;
    return <div>{postId}</div>;
  };

  return (
    <div className="panel">
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li className="font-extrabold">Dashboard</li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Hashtag Posts</span>
        </li>
      </ul>
      <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
        {error && <div className="bg-red-200 text-red-800 border border-red-600 p-2 rounded">{error}</div>}
      </div>
      <div className="datatables">
        <div>
          <div className="md:flex md:flex-col flex-1 mb-4">
            <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Search Description</h2>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                console.log(e.target.value);
              }}
              className="form-input"
              placeholder={`Description`}
            />
          </div>
        </div>
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
                accessor: 'id',
                title: 'Id',
                sortable: true,
                render: renderPostId,
              },
              {
                accessor: 'user.full_name',
                title: 'Full name',
              },
              {
                accessor: 'user.is_private',
                title: 'User Is Private',
                render: (value: any) => {
                  const isPrivate = value === 'true' ? true : false;
                  return isPrivate ? 'True' : 'False';
                },
              },
              {
                accessor: 'user.username',
                title: 'Username',
                render: (rowData) => {
                  const username = rowData.user.username;
                  return (
                    <a href={`https://www.instagram.com/${username}`} target="_blank" rel="noopener noreferrer">
                      {username}
                    </a>
                  );
                },
              },
              {
                accessor: 's3_url',
                title: 'S3 URL',
                render: (rowData) => {
                  const s3_url: string = rowData.s3_url as string;
                  return (
                    <a href={s3_url} target="_blank" rel="noopener noreferrer">
                      {s3_url}
                    </a>
                  );
                },
              },

              {
                accessor: 'owner.full_name',
                title: 'Owner Full Name',
              },
              {
                accessor: 'owner.is_private',
                title: 'Owner Is Private',
                render: (value: any) => {
                  const isPrivate = value === 'true' ? true : false;
                  return isPrivate ? 'True' : 'False';
                },
              },
              {
                accessor: 'media_id',
                title: 'Media ID',
              },
              {
                accessor: 'like_and_view_counts_disabled',
                title: 'Like And View Counts Disabled',
                render: (value: any) => {
                  const isDisabled = value === 'true' ? true : false;
                  return isDisabled ? 'True' : 'False';
                },
              },
              {
                accessor: 'commerciality_status',
                title: 'Commerciality Status',
                render: (value: any) => {
                  const isStatus = value === 'true' ? true : false;
                  return isStatus ? 'True' : 'False';
                },
              },
              {
                accessor: 'like_count',
                title: 'Like Count',
              },
              {
                accessor: 'media_type',
                title: 'Media Type',
              },

              {
                accessor: 'is_paid_partnership',
                title: 'Is Paid Partnership',
                render: (value: any) => {
                  const isPaid = value === 'true' ? true : false;
                  return isPaid ? 'True' : 'False';
                },
              },
              {
                accessor: 'comment_count',
                title: 'Comment Count',
              },
              {
                accessor: 'caption_created_at',
                title: 'Created At',
              },
              {
                accessor: 'description',
                title: 'Description',
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
};

export default HashtagSearch;
