import Dropdown from '../components/Dropdown';
import { TAstatistics } from '../services/statisticsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/store/userSlice';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import {
  TAbrandLogin,
  TAbrandEmailPassword,
  TAuserAuth,
  TAnotificate,
  TAforBrand,
  TAapplicationKeywords,
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
  const [brandLogin, setBrandLogin] = useState<string>('');
  const [brandEmailPassword, setBrandEmailPassword] = useState<string>('');
  const [userLogin, setUserLogin] = useState<string>('');
  const [deleteCampaign, setDeleteCampaign] = useState<string>('');
  const [notificate, setNotificate] = useState<string>('');
  const [forBrand3, setForBrand3] = useState<string>('');
  const [applicationKeywords, setApplicationKeywords] = useState<string>('');

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
    setBrandLogin('pending');
    setBrandEmailPassword('pending');
    setUserLogin('pending');
    setDeleteCampaign('pending');
    setNotificate('pending');
    setForBrand3('pending');
    setApplicationKeywords('pending');

    try {
      const response1 = await TAbrandLogin();
      const response2 = await TAbrandEmailPassword();
      const response3 = await TAuserAuth();
      const response10 = await TAnotificate('5f60785e7791232717414ab3');
      const response11 = await TAforBrand(
        'first_application',
        '5f940af6ef292463c341dd1b',
        'male',
        'highschool',
        'swim',
        'Clothing',
      );
      const response12 = await TAapplicationKeywords('people', '5fa5395050ffdc662efb0ace');

      if (response1) {
        setBrandLogin('done');
      } else {
        setBrandLogin('failed');
      }
      if (response2) {
        setBrandEmailPassword('done');
      } else {
        setBrandEmailPassword('failed');
      }
      if (response3) {
        setUserLogin('done');
      } else {
        setUserLogin('failed');
      }
      if (response10) {
        setNotificate('done');
      } else {
        setNotificate('failed');
      }
      if (response11) {
        setForBrand3('done');
      } else {
        setForBrand3('failed');
      }
      if (response12) {
        setApplicationKeywords('done');
      } else {
        setApplicationKeywords('failed');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li className="font-extrabold">Dashboard</li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Statistics</span>
        </li>
      </ul>
      <div className="pt-5">
        {error && <div className="text-red-500">{error}</div>}
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
            <div className="panel h-full sm:col-span-2 xl:col-span-1 mb-2">
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
                  <div className="flex-1">Notificate</div>
                  {notificate === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : notificate === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    notificate === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">For Brand</div>
                  {forBrand3 === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : forBrand3 === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    forBrand3 === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Application Keywords</div>
                  {applicationKeywords === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : applicationKeywords === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    applicationKeywords === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
