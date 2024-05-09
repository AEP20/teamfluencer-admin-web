import Dropdown from '../components/Dropdown';
import { TAstatistics} from '../services/statisticsAPI';
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
  TAinstaGraph,
  TAinstaHashtagSearch,
  // TAinstaUserAnalysis,
} from '../services/testAPI';
import { TAgetPopularHashtagSearchPost } from '../services/hashtagSearchAPI';
import HashtagSearchPostProfile from '../components/HashtagSearchPostProfile';
import { PostData } from '../types/hashtagSearchPostData';
import PostPicture from '../components/HashtagSearchPostPicture';
import { chooseFile } from '../components/ReadCSVFile';

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(setPageTitle('Dashboard'));
  });

  const fetchData = async (token: string) => {
    try {
      const statistics_response = await TAstatistics(token);
      const hashtag_search_response = await TAgetPopularHashtagSearchPost(token);
      if (statistics_response && hashtag_search_response) {
        setPostData(hashtag_search_response[0]);
        return { statistics_response, hashtag_search_response };
      } else {
        throw new Error('Statistics not found');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

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
  const [notificate, setNotificate] = useState<string>('');
  const [forBrand3, setForBrand3] = useState<string>('');
  const [applicationKeywords, setApplicationKeywords] = useState<string>('');
  const [postData, setPostData] = useState<PostData | null>(null);
  const [instaGraph, setInstaGraph] = useState<string>('');
  const [hashtahSearch, setHashtahSearch] = useState<string>('');
  // const [instaUserAnalysis, setInstaUserAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadStatistics = async () => {
      try {
        const response = await fetchData(token);
        if (response !== undefined) {
          setTotalBrands(response.statistics_response.totalBrands);
          setActiveBrands30(response.statistics_response.activeBrands30);
          setActiveBrands15(response.statistics_response.activeBrands15);
          setActiveBrands7(response.statistics_response.activeBrands7);
          setPaidBrands(response.statistics_response.paidBrands);
          setInTurkeys(response.statistics_response.inTurkey);
          setOutOfTurkeys(response.statistics_response.outOfTurkey);
          setTotalCampaigns(response.statistics_response.totalCampaigns);
          setActiveCampaigns(response.statistics_response.activeCampaigns);
          setWaitingApprovalCampaigns(response.statistics_response.waitingApprovalCampaigns);
          setTotalUsers(response.statistics_response.totalUsers);
          setWaitingApprovalUsers(response.statistics_response.waitingApprovalUsers);
          setApprovedUsers(response.statistics_response.approvedUsers);
          setDeletedUsers(response.statistics_response.deletedUsers);
          setTotalCooperations(response.statistics_response.totalCooperations);
          setLoading(false);
        } else {
          setError('No Data Found');
        }
      } catch (error) {
        setError('Error Fetching Data!');
      }
    };
    loadStatistics();
  }, [token]);

  const testActivities = async () => {
    const apiCalls = [
      { func: TAbrandLogin, state: setBrandLogin },
      { func: TAbrandEmailPassword, state: setBrandEmailPassword },
      { func: TAuserAuth, state: setUserLogin },
      { func: () => TAnotificate('5f60785e7791232717414ab3'), state: setNotificate },
      {
        func: () =>
          TAforBrand('first_application', '5f940af6ef292463c341dd1b', 'male', 'highschool', 'swim', 'Clothing'),
        state: setForBrand3,
      },
      { func: () => TAapplicationKeywords('people', '5fa5395050ffdc662efb0ace'), state: setApplicationKeywords },
      { func: TAinstaGraph, state: setInstaGraph },
      { func: TAinstaHashtagSearch, state: setHashtahSearch },
      // { func: TAinstaUserAnalysis, state: setInstaUserAnalysis },
    ];

    for (const { func, state } of apiCalls) {
      state('pending');
      try {
        const response = await func();
        state(response ? 'done' : 'failed');
      } catch (error: any) {
        state('failed');
        throw new Error(error);
      }
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
        {error && <div className="text-red-500">{error}</div>}
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-pink-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
            {/* Total Brands */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Total Brands</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{totalBrands}</div>
              </div>
            </div>

            {/* Paid Brands */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Paid Brands</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{paidBrands}</div>
              </div>
            </div>

            {/*  Brands in TR / out of TR  */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex justify-between">
                {buttonClicked === false ? (
                  <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-indigo-600">Brands in TR</div>
                ) : (
                  <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-indigo-600">Brands out of TR</div>
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
                  <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{inTurkeys}</div>
                </div>
              ) : (
                <div className="flex justify-center mt-7">
                  <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{outOfTurkeys}</div>
                </div>
              )}
            </div>

            {/* Active Brands */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex justify-between text-indigo-600">
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
                  <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{activeBrands30}</div>
                </div>
              ) : buttonClicked2 === 1 ? (
                <div className="flex justify-center mt-7">
                  <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{activeBrands15}</div>
                </div>
              ) : (
                <div className="flex justify-center mt-7">
                  <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{activeBrands7}</div>
                </div>
              )}
            </div>

            {/* Total Campaigns */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Total Campaigns</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{totalCampaigns}</div>
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Active Campaigns</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{activeCampaigns}</div>
              </div>
            </div>

            {/* Waiting Approval Campaigns */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Waiting Approval Campaigns</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{waitingApprovalCampaigns}</div>
              </div>
            </div>

            {/* Total Cooperations */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Total Cooperations (done)</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{totalCooperations}</div>
              </div>
            </div>

            {/* Total Users */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Total Users</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{totalUsers}</div>
              </div>
            </div>

            {/* Approved Users */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Approved Users</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{approvedUsers}</div>
              </div>
            </div>

            {/* Waiting Approval Users */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Waiting Approval Users</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{waitingApprovalUsers}</div>
              </div>
            </div>

            {/* Deleted Users */}
            <div className="flex flex-col panel bg-indigo-100">
              <div className="flex">
                <div className="ltr:mr-1 rtl:ml-1 text-md font-bold text-indigo-600">Deleted Users</div>
              </div>
              <div className="flex justify-center mt-7">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-indigo-600">{deletedUsers}</div>
              </div>
            </div>
          </div>
        )}
        <div className="pt-5">
          {/*  Test Activities  */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <div className="panel sm:col-span-2 xl:col-span-1 mb-2">
              <div className="flex justify-between mb-3">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Test Activities</h5>
                <button className="btn" onClick={testActivities}>
                  Send Request
                </button>
              </div>
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
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Instagram Graph Api</div>
                  {instaGraph === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : instaGraph === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    instaGraph === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Instagram Hashtag Search</div>
                  {hashtahSearch === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : hashtahSearch === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    hashtahSearch === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div>
                {/* <div className="flex items-center py-1.5 relative group">
                  <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Instagram User Analysis</div>
                  {instaUserAnalysis === 'pending' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-yellow-500">Pending</span>
                  ) : instaUserAnalysis === 'done' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500">Done</span>
                  ) : (
                    instaUserAnalysis === 'failed' && (
                      <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500">Failed</span>
                    )
                  )}
                </div> */}
              </div>
            </div>
          </div>
          {/*  Popular Post  */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <div className="panel h-full sm:col-span-2 xl:col-span-1 mb-2">
              <h5 className="font-semibold text-lg dark:text-white-light mb-5">Popular Post</h5>
              <div className="flex flex-row items-center mr-16">
                <PostPicture postData={postData} />
              </div>
              <div className="w-full">{postData && <HashtagSearchPostProfile {...postData} />}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
