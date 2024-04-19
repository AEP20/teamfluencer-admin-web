import Dropdown from '../components/Dropdown';
import { TAstatistics, TAtcNoControl } from '../services/statisticsAPI';
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
  const [tcNo, setTcNo] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [tcControl, setTcControl] = useState<string>('');
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

  const testIdentifierNumber = async (
    tcNo: string,
    firstName: string,
    lastName: string,
    birthYear: string,
    token: string,
  ) => {
    try {
      const response = await TAtcNoControl(tcNo, firstName, lastName, birthYear, token);
      if (!response) {
        throw new Error('No Data Found');
      }
      if (response.response === true) {
        setTcControl('true');
      } else if (response.response === false) {
        setTcControl('false');
      }
      return response.response;
    } catch (error: any) {
      console.log('error', error);
      throw new Error(error);
    }
  };
  const convertToCSV = (data: any[]) => {
    const csvContent = [];
    const headers = Object.keys(data[0]);
    csvContent.push('sep=,' + '\n' + headers.map((header) => `"${header}"`).join(','));

    for (const item of data) {
      const row = [];
      for (const header of headers) {
        let cell = item[header];
        if (cell === null || cell === undefined) {
          cell = '';
        } else if (typeof cell !== 'string') {
          cell = cell.toString();
        }
        cell = cell.replace(/"/g, '""');
        cell = `"${cell}"`;
        row.push(cell);
      }
      csvContent.push(row.join(','));
    }

    return '\ufeff' + csvContent.join('\n');
  };

  const downloadCSV = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const checkTcNoFromCSV = async () => {
    const CSVFile = await chooseFile();

    for (const excelContents of CSVFile) {
      let tcNo = excelContents.TcNo;
      let firstName = excelContents.Firstname;
      let lastName = excelContents.Lastname;
      let birthYear = excelContents.BirthYear;
      const checkTcNo = await testIdentifierNumber(tcNo, firstName, lastName, birthYear, token);
      excelContents.alidity = checkTcNo;
    }
    console.log('CSV File: ', CSVFile);
    const csvContent = convertToCSV(CSVFile);
    downloadCSV(csvContent, 'processed_data.csv');
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
        </div>

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

            <div className="panel sm:col-span-2 xl:col-span-1 mb-2">
              <div className="flex justify-between mb-3">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Kimlik No Control</h5>
                <button
                  className="btn"
                  onClick={() => testIdentifierNumber(tcNo, firstName, lastName, birthYear, token)}
                >
                  Send Request
                </button>
              </div>
              <div className="text-sm cursor-pointer">
                <label htmlFor="tcNo" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  TC No
                </label>
                <input
                  type="text"
                  id="tcNo"
                  name="tcNo"
                  value={tcNo}
                  onChange={(e) => setTcNo(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                />

                <label htmlFor="firstName" className="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                />

                <label htmlFor="lastName" className="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                />

                <label htmlFor="birthYear" className="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Birth Year
                </label>
                <input
                  type="text"
                  id="birthYear"
                  name="birthYear"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                />
                <div className="flex items-center py-1.5 relative group mt-5">
                  {tcControl === 'true' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-green-500 text-center text-sm font-medium">
                      True
                    </span>
                  ) : tcControl === 'false' ? (
                    <span className="badge absolute ltr:right-0 rtl:left-0 text-xs bg-red-500 text-center text-sm font-medium">
                      False
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="btn bg-green-500" onClick={() => checkTcNoFromCSV()}>
                  Upload CSV
                </button>
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
