import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, logout, selectUser } from '../redux/store/userSlice';
import { TAlogin, TAsignup } from '../services/authAPI';
import React from 'react';
import UserProfile from '../components/UserProfile';
import { TAfindUser, TAfindApprovalUser } from '../services/userAPI';
import { WaitingApprovalUserData } from '../types/waitingApprovalUserData';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../redux/store/themeConfigSlice';

const phoneNumberFixer = (phoneNumber: string) => {
  const fixedPhoneNumber = phoneNumber.slice(0, 13);
  return fixedPhoneNumber;
};

const instaAverageLikeFixer = (instaAverageLike: number) => {
  if (!instaAverageLike) return 0;
  const roundedNumber = Math.round(instaAverageLike * 10) / 10; // Sayıyı son basamağa göre yuvarlar
  return roundedNumber;
};

const tiktokAverageLikeFixer = (tiktokAverageLike: number) => {
  if (!tiktokAverageLike) return 0;
  const roundedNumber = Math.round(tiktokAverageLike * 10) / 10; // Sayıyı son basamağa göre yuvarlar
  return roundedNumber;
};

const engagementRateFixer = (engagementRate: number) => {
  if (!engagementRate) return 0;
  const roundedNumber = Math.round(engagementRate * 1000) / 1000; // Sayıyı üç basamağa göre yuvarlar
  return roundedNumber;
};

const tiktokFollowersFixer = (tiktokEngagementRate: number) => {
  if (!tiktokEngagementRate) return 0;
  return tiktokEngagementRate;
};

const fetchData = async () => {
  try {
    const response = await TAfindApprovalUser();
    if (response.data && Array.isArray(response.data)) {
      const data = response.data.map((item, index) => ({
        id: index + 1,
        name: item.name,
        email: item.email,
        age: item.age,
        city: item.city,
        country: item.country,
        phone: phoneNumberFixer(item.phone),
        gender: item.gender,
        profile_complete: item.profile_complete,
        insta_followers: item.followers,
        insta_post_number: item.post_number,
        insta_average_like: instaAverageLikeFixer(item.average_likes),
        tiktok_followers: tiktokFollowersFixer(item.tiktok_followers),
        tiktok_videos: item.videos,
        tiktok_average_like: tiktokAverageLikeFixer(item.tiktok_average_like),
        tiktok_engagement_rate: engagementRateFixer(item.tiktok_engagement_rate),
      }));
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const WaitingApprovalUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Range Search Table'));
  });
  const [userData, setUserData] = useState([] as WaitingApprovalUserData[]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100, 500];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [initialRecords, setInitialRecords] = useState(sortBy(userData, 'id'));
  console.log('initialRecordsssssssss', initialRecords);
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [tempData, setTempData] = useState(initialRecords);
  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchData();
        if (data !== undefined) {
          console.log('denemedeneme', data);
          setInitialRecords(data);
          setUserData(data);
          console.log('userDatttttta', userData);
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
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return tempData.filter((item) => {
        return (
          //   item.id.toString().includes(search.toLowerCase()) ||
          //   item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          //   item.company.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
          //   item.dob.toLowerCase().includes(search.toLowerCase()) ||
          item.phone.toLowerCase().includes(search.toLowerCase())
          //   item.profile_complete.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const data = sortBy(initialRecords, sortStatus.columnAccessor);
    console.log('dataaaa', data);
    setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortStatus]);

  const [minAge, setMinAge] = useState<any>('');
  const [maxAge, setMaxAge] = useState<any>('');

  const [minInstaFollowers, setMinInstaFollowers] = useState<any>('');
  const [maxInstaFollowers, setMaxInstaFollowers] = useState<any>('');

  const [minInstaAverageLike, setMinInstaAverageLike] = useState<any>('');
  const [maxInstaAverageLike, setMaxInstaAverageLike] = useState<any>('');

  const [minTiktokFollowers, setMinTiktokFollowers] = useState<any>('');
  const [maxTiktokFollowers, setMaxTiktokFollowers] = useState<any>('');

  useEffect(() => {
    let dt = userData;
    if (minAge !== '' && minAge !== null) {
      dt = dt.filter((d) => d.age >= Number(minAge));
    }
    if (maxAge !== '' && maxAge !== null) {
      dt = dt.filter((d) => d.age <= Number(maxAge));
    }
    if (minAge || maxAge) {
      setInitialRecords(dt);
      setTempData(dt);
    }
  }, [minAge, maxAge]);

  useEffect(() => {
    let dt = userData;
    if (minInstaFollowers !== '' && minInstaFollowers !== null) {
      dt = dt.filter((d) => d.insta_followers >= Number(minInstaFollowers));
    }
    if (maxInstaFollowers !== '' && maxInstaFollowers !== null) {
      dt = dt.filter((d) => d.insta_followers <= Number(maxInstaFollowers));
    }
    if (minInstaFollowers || maxInstaFollowers) {
      setInitialRecords(dt);
      setTempData(dt);
    }
  }, [minInstaFollowers, maxInstaFollowers]);

  useEffect(() => {
    let dt = userData;
    if (minInstaAverageLike !== '' && minInstaAverageLike !== null) {
      dt = dt.filter((d) => d.insta_average_like >= Number(minInstaAverageLike));
    }
    if (maxInstaAverageLike !== '' && maxInstaAverageLike !== null) {
      dt = dt.filter((d) => d.insta_average_like <= Number(maxInstaAverageLike));
    }
    if (minInstaAverageLike || maxInstaAverageLike) {
      setInitialRecords(dt);
      setTempData(dt);
    }
  }, [minInstaAverageLike, maxInstaAverageLike]);

  useEffect(() => {
    let dt = userData;
    if (minTiktokFollowers !== '' && minTiktokFollowers !== null) {
      dt = dt.filter((d) => d.tiktok_followers >= Number(minTiktokFollowers));
    }
    if (maxTiktokFollowers !== '' && maxTiktokFollowers !== null) {
      dt = dt.filter((d) => d.tiktok_followers <= Number(maxTiktokFollowers));
    }
    if (minTiktokFollowers || maxTiktokFollowers) {
      setInitialRecords(dt);
      setTempData(dt);
    }
  }, [minTiktokFollowers, maxTiktokFollowers]);

  const formatDate = (date: any) => {
    if (date) {
      const dt = new Date(date);
      const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
      return day + '/' + month + '/' + dt.getFullYear();
    }
    return '';
  };

  return (
    <div className="panel">
      <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
        <div className="md:flex md:flex-col w-2/3">
          <div className="md:flex">
            <div className="md:flex md:flex-col flex-1 mb-2 mr-2 justify-center items-center text-center">
              <p>MIN</p>
              <p>MAX</p>
            </div>

            <div className="md:flex md:flex-col flex-1 mb-2 mr-2">
              <input
                type="text"
                value={minAge}
                onChange={(e) => {
                  setMinAge(e.target.value);
                }}
                className="form-input w-full mb-2"
                placeholder="age"
              />

              <input
                type="text"
                value={maxAge}
                onChange={(e) => {
                  setMaxAge(e.target.value);
                }}
                className="form-input w-full"
                placeholder="age"
              />
            </div>

            <div className="md:flex md:flex-col flex-1 mb-2 mr-2">
              <input
                type="text"
                value={minInstaFollowers}
                onChange={(e) => {
                  setMinInstaFollowers(e.target.value);
                }}
                className="form-input w-full mb-2"
                placeholder="insta followers"
              />

              <input
                type="text"
                value={maxInstaFollowers}
                onChange={(e) => {
                  setMaxInstaFollowers(e.target.value);
                }}
                className="form-input w-full"
                placeholder="insta followers"
              />
            </div>

            <div className="md:flex md:flex-col flex-1 mb-2 mr-2">
              <input
                type="text"
                value={minInstaAverageLike}
                onChange={(e) => {
                  setMinInstaAverageLike(e.target.value);
                }}
                className="form-input w-full mb-2"
                placeholder="insta average likes"
              />

              <input
                type="text"
                value={maxInstaAverageLike}
                onChange={(e) => {
                  setMaxInstaAverageLike(e.target.value);
                }}
                className="form-input w-full"
                placeholder="insta average likes"
              />
            </div>

            <div className="md:flex md:flex-col flex-1 mb-2 mr-2">
              <input
                type="text"
                value={minTiktokFollowers}
                onChange={(e) => {
                  setMinTiktokFollowers(e.target.value);
                }}
                className="form-input w-full mb-2"
                placeholder="tiktok followers"
              />

              <input
                type="text"
                value={maxTiktokFollowers}
                onChange={(e) => {
                  setMaxTiktokFollowers(e.target.value);
                }}
                className="form-input w-full"
                placeholder="tiktok followers"
              />
            </div>
          </div>
        </div>
        <div className="ltr:ml-auto rtl:mr-auto">
          <input
            type="text"
            className="form-input w-auto"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            // { accessor: 'phone', title: 'Phone No.', sortable: true },
            { accessor: 'email', title: 'Email', sortable: true },
            { accessor: 'age', title: 'Age', sortable: true },
            { accessor: 'insta_followers', title: 'Insta Followers', sortable: true },
            { accessor: 'insta_post_number', title: 'Insta Post Number', sortable: true },
            { accessor: 'insta_average_like', title: 'Insta Average Like', sortable: true },
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
        />
      </div>
    </div>
  );
};

export default WaitingApprovalUser;
