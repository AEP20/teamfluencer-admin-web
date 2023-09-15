import { Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { TAstatistics } from '../services/statisticsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/store/userSlice';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import { TAdoVisibleCampaign, TAdoApprovalCampaign } from '../services/campaignsAPI';
import {
  TAbrandLogin,
  TAbrandEmailPassword,
  TAuserAuth,
  TAcreateCampaign,
  TAdeleteCampaign,
  TAuserEngagementRate,
} from '../services/testAPI';

const fetchData = async (token: string) => {
  try {
    const response = await TAstatistics(token);
    if (response) {
      return response;
    } else {
      throw new Error('Statistics not found');
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('Dashboard'));
  });

  const [totalBrands, setTotalBrands] = useState<number>(0);
  const [activeBrands30, setActiveBrands30] = useState<number>(0);
  const [activeBrands15, setActiveBrands15] = useState<number>(0);
  const [activeBrands7, setActiveBrands7] = useState<number>(0);
  const [paidBrands, setPaidBrands] = useState<number>(0);
  const [inTurkeys, setInTurkeys] = useState<number>(0);
  const [outOfTurkeys, setOutOfTurkeys] = useState<number>(0);
  const [totalCampaigns, setTotalCampaigns] = useState<number>(0);
  const [activeCampaigns, setActiveCampaigns] = useState<number>(0);
  const [waitingApprovalCampaigns, setWaitingApprovalCampaigns] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [waitingApprovalUsers, setWaitingApprovalUsers] = useState<number>(0);
  const [approvedUsers, setApprovedUsers] = useState<number>(0);
  const [deletedUsers, setDeletedUsers] = useState<number>(0);
  const [totalCooperations, setTotalCooperations] = useState<number>(0);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [buttonClicked2, setButtonClicked2] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [brandLogin, setBrandLogin] = useState<string>('');
  const [brandEmailPassword, setBrandEmailPassword] = useState<string>('');
  const [userLogin, setUserLogin] = useState<string>('');
  const [engagementRate, setEngagementRate] = useState<string>('');
  const [createCampaign, setCreateCampaign] = useState<string>('');
  const [doVisibleCampaign, setDoVisibleCampaign] = useState<string>('');
  const [doApprovalCampaign, setDoApprovalCampaign] = useState<string>('');
  const [deleteCampaign, setDeleteCampaign] = useState<string>('');

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const response = await fetchData(token);
        if (response !== undefined) {
          setTotalBrands(response.totalBrands);
          setActiveBrands30(response.activeBrands30);
          setActiveBrands15(response.activeBrands15);
          setActiveBrands7(response.activeBrands7);
          setPaidBrands(response.paidBrands);
          setInTurkeys(response.inTurkey);
          setOutOfTurkeys(response.outOfTurkey);
          setTotalCampaigns(response.totalCampaigns);
          setActiveCampaigns(response.activeCampaigns);
          setWaitingApprovalCampaigns(response.waitingApprovalCampaigns);
          setTotalUsers(response.totalUsers);
          setWaitingApprovalUsers(response.waitingApprovalUsers);
          setApprovedUsers(response.approvedUsers);
          setDeletedUsers(response.deletedUsers);
          setTotalCooperations(response.totalCooperations);
        } else {
          setError('No Data Found');
        }
      } catch (error) {
        setError('Error Fetching Data!');
      }
    };
    loadStatistics();
  }, [token]);

  const sendRequest = async () => {
    setPending(true);
    setDone(false);
    setFailed(false);
    setBrandLogin('pending');
    setBrandEmailPassword('pending');
    setUserLogin('pending');
    setEngagementRate('pending');
    setCreateCampaign('pending');
    setDoVisibleCampaign('pending');
    setDoApprovalCampaign('pending');
    setDeleteCampaign('pending');

    try {
      const response1 = await TAbrandLogin();
      const response2 = await TAbrandEmailPassword();
      const response3 = await TAuserAuth();
      // const response4 = await TAuserEngagementRate(response3.token); // auth hatası alıyor düzeltilecek (middleware'i kapatınca normal çalışıyor)
      // const response5 = await TAcreateCampaign(); // auth hatası alıyor düzeltilecek (middleware'i kapatınca normal çalışıyor)
      // const response6 = await TAdoVisibleCampaign('5f5b1f3a8d1d5c1860945370', 'true', token);
      // const response7 = await TAdoApprovalCampaign('verified', undefined, '5f5b1f3a8d1d5c1860945370', token);
      // const response8 = await TAdeleteCampaign('5f84513d7848830da12984d2'); // auth hatası alıyor düzeltilecek (middleware'i kapatınca normal çalışıyor)

      if (response1.status === 200) {
        setBrandLogin('done');
      } else {
        setBrandLogin('failed');
      }
      if (response2.status === 200) {
        setBrandEmailPassword('done');
      } else {
        setBrandEmailPassword('failed');
      }
      if (response3) {
        setUserLogin('done');
      } else {
        setUserLogin('failed');
      }
      // setEngagementRate('done');
      // setCreateCampaign('done');
      // setDoVisibleCampaign('done');
      // setDoApprovalCampaign('done');
      // setDeleteCampaign('done');
      if (response1.status === 200 && response2.status === 200 && response3) {
        setDone(true);
        setPending(false);
      }
    } catch (error) {
      setFailed(true);
      setPending(false);
    }
  };

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li className="font-extrabold">Dashboard</li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Statistics</span>
        </li>
      </ul>
      <div className="pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
          {/* Total Brands */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Total Brands</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{totalBrands}</div>
            </div>
          </div>

          {/* Paid Brands */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Paid Brands</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{paidBrands}</div>
            </div>
          </div>

          {/*  Brands in TR / out of TR  */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex justify-between">
              {buttonClicked === false ? (
                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Brands in TR</div>
              ) : (
                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Brands out of TR</div>
              )}
              <div className="dropdown">
                <Dropdown
                  offset={[0, 5]}
                  btnClassName="hover:opacity-80"
                  button={
                    <svg
                      className="w-5 h-5 opacity-70"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  }
                >
                  <ul className="text-black dark:text-white-dark">
                    <li>
                      <button type="button" onClick={() => setButtonClicked(false)}>
                        in TR
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => setButtonClicked(true)}>
                        out of TR
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
            {buttonClicked === false ? (
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{inTurkeys}</div>
              </div>
            ) : (
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{outOfTurkeys}</div>
              </div>
            )}
          </div>

          {/* Active Brands */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex justify-between">
              {buttonClicked2 === 0 ? (
                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Active brands in the last 30 days</div>
              ) : buttonClicked2 === 1 ? (
                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Active brands in the last 15 days</div>
              ) : (
                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Active brands in the last 7 days</div>
              )}
              <div className="dropdown">
                <Dropdown
                  offset={[0, 5]}
                  btnClassName="hover:opacity-80"
                  button={
                    <svg
                      className="w-5 h-5 opacity-70"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  }
                >
                  <ul className="text-black dark:text-white-dark">
                    <li>
                      <button type="button" onClick={() => setButtonClicked2(0)}>
                        Last 30
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => setButtonClicked2(1)}>
                        Last 15
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => setButtonClicked2(2)}>
                        Last 7
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
            {buttonClicked2 === 0 ? (
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{activeBrands30}</div>
              </div>
            ) : buttonClicked2 === 1 ? (
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{activeBrands15}</div>
              </div>
            ) : (
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{activeBrands7}</div>
              </div>
            )}
          </div>

          {/* Total Campaigns */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Total Campaigns</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{totalCampaigns}</div>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Active Campaigns</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{activeCampaigns}</div>
            </div>
          </div>

          {/* Waiting Approval Campaigns */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Waiting Approval Campaigns</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{waitingApprovalCampaigns}</div>
            </div>
          </div>

          {/* Total Cooperations */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Total Cooperations (done)</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{totalCooperations}</div>
            </div>
          </div>

          {/* Total Users */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Total Users</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{totalUsers}</div>
            </div>
          </div>

          {/* Approved Users */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Approved Users</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{approvedUsers}</div>
            </div>
          </div>

          {/* Waiting Approval Users */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Waiting Approval Users</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{waitingApprovalUsers}</div>
            </div>
          </div>

          {/* Deleted Users */}
          <div className="flex flex-col panel bg-gray-500">
            <div className="flex">
              <div className="ltr:mr-1 rtl:ml-1 text-md font-bold">Deleted Users</div>
            </div>
            <div className="flex justify-center mt-7">
              <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{deletedUsers}</div>
            </div>
          </div>
        </div>

        {/*  Recent Activities  */}
        <div className="pt-5">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <div className="panel h-full sm:col-span-2 xl:col-span-1 pb-0">
              <h5 className="font-semibold text-lg dark:text-white-light mb-5">Test Activities</h5>
              <div className="text-sm cursor-pointer">
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Brand Login</div>
                  {brandLogin === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : brandLogin === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    brandLogin === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Brand Email Password</div>
                  {brandEmailPassword === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : brandEmailPassword === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    brandEmailPassword === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">User Login</div>
                  {userLogin === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : userLogin === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    userLogin === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Engagement Rate</div>
                  {engagementRate === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : engagementRate === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    engagementRate === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Create Campaign</div>
                  {createCampaign === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : createCampaign === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    createCampaign === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Do Visible Campaign</div>
                  {doVisibleCampaign === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : doVisibleCampaign === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    doVisibleCampaign === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Approve Campaign</div>
                  {doApprovalCampaign === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : doApprovalCampaign === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    doApprovalCampaign === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Delete Campaign</div>
                  {deleteCampaign === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : deleteCampaign === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    deleteCampaign === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <ul>
                  <li className="menu nav-item">
                    <div className="flex items-center mt-4">
                      <button
                        onClick={sendRequest}
                        className="flex ltr:pl-12 rtl:pr-6 pr-12 py-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                        style={{
                          borderRadius: 10,
                          backgroundColor: pending ? 'yellow' : done ? 'green' : failed ? 'red' : 'grey',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        {pending ? 'Pending' : done ? 'Done' : failed ? 'Failed' : 'Send Request'}
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="panel h-full">
              <div className="flex items-center justify-between dark:text-white-light mb-5">
                <h5 className="font-semibold text-lg">Transactions</h5>
                <div className="dropdown">
                  <Dropdown
                    button={
                      <svg
                        className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    }
                  >
                    <ul>
                      <li>
                        <button type="button">View Report</button>
                      </li>
                      <li>
                        <button type="button">Edit Report</button>
                      </li>
                      <li>
                        <button type="button">Mark as Done</button>
                      </li>
                    </ul>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="space-y-6">
                  <div className="flex">
                    <span className="grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                      SP
                    </span>
                    <div className="px-3 flex-1">
                      <div>Shaun Park</div>
                      <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                    </div>
                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$36.11</span>
                  </div>
                  <div className="flex">
                    <span className="grid place-content-center w-9 h-9 rounded-md bg-warning-light dark:bg-warning text-warning dark:text-warning-light">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2 10C2 7.17157 2 5.75736 2.87868 4.87868C3.75736 4 5.17157 4 8 4H13C15.8284 4 17.2426 4 18.1213 4.87868C19 5.75736 19 7.17157 19 10C19 12.8284 19 14.2426 18.1213 15.1213C17.2426 16 15.8284 16 13 16H8C5.17157 16 3.75736 16 2.87868 15.1213C2 14.2426 2 12.8284 2 10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M19.0003 7.07617C19.9754 7.17208 20.6317 7.38885 21.1216 7.87873C22.0003 8.75741 22.0003 10.1716 22.0003 13.0001C22.0003 15.8285 22.0003 17.2427 21.1216 18.1214C20.2429 19.0001 18.8287 19.0001 16.0003 19.0001H11.0003C8.17187 19.0001 6.75766 19.0001 5.87898 18.1214C5.38909 17.6315 5.17233 16.9751 5.07642 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M13 10C13 11.3807 11.8807 12.5 10.5 12.5C9.11929 12.5 8 11.3807 8 10C8 8.61929 9.11929 7.5 10.5 7.5C11.8807 7.5 13 8.61929 13 10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M16 12L16 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          opacity="0.5"
                          d="M5 12L5 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <div className="px-3 flex-1">
                      <div>Cash withdrawal</div>
                      <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                    </div>
                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$16.44</span>
                  </div>
                  <div className="flex">
                    <span className="grid place-content-center w-9 h-9 rounded-md bg-danger-light dark:bg-danger text-danger dark:text-danger-light">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          opacity="0.5"
                          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                    <div className="px-3 flex-1">
                      <div>Amy Diaz</div>
                      <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                    </div>
                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$66.44</span>
                  </div>
                  <div className="flex">
                    <span className="grid place-content-center w-9 h-9 rounded-md bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596c2.344.058 4.85.398 4.854.398c-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"
                        />
                      </svg>
                    </span>
                    <div className="px-3 flex-1">
                      <div>Netflix</div>
                      <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                    </div>
                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$32.00</span>
                  </div>
                  <div className="flex">
                    <span className="grid place-content-center text-base w-9 h-9 rounded-md bg-info-light dark:bg-info text-info dark:text-info-light">
                      DA
                    </span>
                    <div className="px-3 flex-1">
                      <div>Daisy Anderson</div>
                      <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                    </div>
                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$10.08</span>
                  </div>
                  <div className="flex">
                    <span className="grid place-content-center w-9 h-9 rounded-md bg-primary-light dark:bg-primary text-primary dark:text-primary-light">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.926 9.70541C13.5474 9.33386 13.5474 8.74151 13.5474 7.55682V7.24712C13.5474 3.96249 13.5474 2.32018 12.6241 2.03721C11.7007 1.75425 10.711 3.09327 8.73167 5.77133L5.66953 9.91436C4.3848 11.6526 3.74244 12.5217 4.09639 13.205C4.10225 13.2164 4.10829 13.2276 4.1145 13.2387C4.48945 13.9117 5.59888 13.9117 7.81775 13.9117C9.05079 13.9117 9.6673 13.9117 10.054 14.2754"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M13.9259 9.70557L13.9459 9.72481C14.3326 10.0885 14.9492 10.0885 16.1822 10.0885C18.4011 10.0885 19.5105 10.0885 19.8854 10.7615C19.8917 10.7726 19.8977 10.7838 19.9036 10.7951C20.2575 11.4785 19.6151 12.3476 18.3304 14.0858L15.2682 18.2288C13.2888 20.9069 12.2991 22.2459 11.3758 21.9629C10.4524 21.68 10.4524 20.0376 10.4525 16.753L10.4525 16.4434C10.4525 15.2587 10.4525 14.6663 10.074 14.2948L10.054 14.2755"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                    <div className="px-3 flex-1">
                      <div>Electricity Bill</div>
                      <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                    </div>
                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$22.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  Recent Transactions  */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="panel">
            <div className="mb-5 text-lg font-bold">Recent Transactions</div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                    <th>DATE</th>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                    <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold">#01</td>
                    <td className="whitespace-nowrap">Oct 08, 2021</td>
                    <td className="whitespace-nowrap">Eric Page</td>
                    <td>$1,358.75</td>
                    <td className="text-center">
                      <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">#02</td>
                    <td className="whitespace-nowrap">Dec 18, 2021</td>
                    <td className="whitespace-nowrap">Nita Parr</td>
                    <td>-$1,042.82</td>
                    <td className="text-center">
                      <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">#03</td>
                    <td className="whitespace-nowrap">Dec 25, 2021</td>
                    <td className="whitespace-nowrap">Carl Bell</td>
                    <td>$1,828.16</td>
                    <td className="text-center">
                      <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">#04</td>
                    <td className="whitespace-nowrap">Nov 29, 2021</td>
                    <td className="whitespace-nowrap">Dan Hart</td>
                    <td>$1,647.55</td>
                    <td className="text-center">
                      <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">#05</td>
                    <td className="whitespace-nowrap">Nov 24, 2021</td>
                    <td className="whitespace-nowrap">Jake Ross</td>
                    <td>$927.43</td>
                    <td className="text-center">
                      <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">#06</td>
                    <td className="whitespace-nowrap">Jan 26, 2022</td>
                    <td className="whitespace-nowrap">Anna Bell</td>
                    <td>$250.00</td>
                    <td className="text-center">
                      <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
