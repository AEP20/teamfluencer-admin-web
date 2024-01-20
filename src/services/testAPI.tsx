const apiClient = {
  baseURL: `${process.env.REACT_APP_AUTH_API_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const rapidOptions = {
  baseURL: `${process.env.SCRAPE_SERVER_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const email = 'ogokcekoca1@gmail.com';
const password = '123456789';

export const TAbrandLogin = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}/brand/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: apiClient.headers,
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const TAbrandEmailPassword = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}/brand/auth/passwordEmail`, {
      method: 'POST',
      credentials: 'include',
      headers: apiClient.headers,
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const TAuserAuth = async () => {
  const user = {
    phone: '+905516321224',
    firebase_id: 'wGgYYpfPSjPB2jV1IkkBhQr6dZD3',
    language: 'tr',
  };
  try {
    const response = await fetch(`${apiClient.baseURL}/user/auth`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

// export const TAcreateCampaign = async () => {
//   const country = 'turkey';
//   const name = 'Kampanya adı';
//   const cover_photo = 'https://image.com';
//   const description = 'Kampanya açıklaması';
//   const platform = 'insta-post';
//   const currency = 'TRY';

//   try {
//     const response = await fetch(`${apiClient.baseURL}/campaign/create-new`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ country, currency, name, cover_photo, description, platform }),
//     });
//     const data = await response.json();

//     if (response.status === 200) {
//       return data;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// export const TAdeleteCampaign = async (campaign_id: string) => {
//   try {
//     const response = await fetch(`${apiClient.baseURL}/campaign/delete`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ campaign_id }),
//     });
//     const data = await response.json();

//     if (response.status === 200) {
//       return data;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// export const TAalterState = async (applicationData: string, new_state: string, new_state_payload: string) => {
//   try {
//     const response = await fetch(`${apiClient.baseURL}/application/alterState`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         // Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify({ applicationData, new_state, new_state_payload }),
//     });
//     const data = await response.json();

//     if (response.status === 200) return data;
//   } catch (error) {
//     throw error;
//   }
// };

export const TAnotificate = async (applications: string) => {
  try {
    const response = await fetch(`${apiClient.baseURL}/application/notificate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ applications }),
    });

    if (response.status === 200) return response;
  } catch (error) {
    throw error;
  }
};

export const TAforBrand = async (
  state: string,
  campaign_id: string,
  gender: string,
  schooltype: string,
  hobbies: string,
  keywords: string,
) => {
  try {
    const response = await fetch(
      `${apiClient.baseURL}/application/forBrand3/?state=${state}&campaign_id=${campaign_id}&gender=${gender}&schooltype=${schooltype}&hobbies=${hobbies}&keywords=${keywords}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();

    if (response.status === 200) return data;
  } catch (error) {
    throw error;
  }
};

export const TAapplicationKeywords = async (q: string, campaign_id: string) => {
  try {
    const response = await fetch(
      `${apiClient.baseURL}/application/applicationkeywords/?q=${q}&campaign_id=${campaign_id}`,
      {
        method: 'get',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) return response.json();
  } catch (error) {
    throw error;
  }
};

// export const TAaddApplicationAddress = async (address: object) => {
//   try {
//     const response = await fetch(`${apiClient.baseURL}/application/addApplicationAddress`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         // Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify({ address }),
//     });
//     const data = await response.json();

//     if (response.status === 200) return data;
//   } catch (error) {
//     throw error;
//   }
// };

export const TAinstaGraph = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}/insta/insta-graph?username=danlabilic`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) return response.json();
  } catch (error) {
    throw error;
  }
};

export const TAinstaHashtagSearch = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}/insta/insta-hashtag-search?search_hashtag=işbirliği`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) return response.json();
  } catch (error) {
    throw error;
  }
};

// export const TAinstaUserAnalysis = async () => {
//   try {
//     const response = await fetch(`${rapidOptions.baseURL}/user-analysis?username=danlabilic`, {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 200) return response.json();
//   } catch (error) {
//     throw error;
//   }
// };
