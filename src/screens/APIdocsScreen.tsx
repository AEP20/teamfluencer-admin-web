import React from 'react';

function APIdocsScreen() {
  const rows = [
    ///AUTH
    { path: '/admin/signin', get: false, post: true, delete: false, put: false, summary: 'Admin user sign in' },
    { path: '/admin/signup', get: false, post: true, delete: false, put: false, summary: 'Admin user sign up' },
    ///HEALTH
    { path: '/health', get: true, post: false, delete: false, put: false, summary: 'Check server health' },
    ///STATISTICS
    { path: '/statistics/statisticsnum', get: true, post: false, delete: false, put: false, summary: 'Get statistics' },
    ///USER
    { path: '/user/getall', get: true, post: false, delete: false, put: false, summary: 'Get all filtered users' },
    {
      path: '/user/getuser',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get a specific user with _email and _phone',
    },
    {
      path: '/user/getverificationprofiles',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get filtered profiles awaiting approval',
    },
    { path: '/user/:id', get: true, post: false, delete: false, put: false, summary: 'Get a specific user with id' },
    {
      path: '/user/getallverificationprofiles',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get all profiles awaiting approval',
    },
    {
      path: '/user/verificateuser/:id/:status',
      get: false,
      post: false,
      delete: false,
      put: true,
      summary: 'Verificate profile awaiting approval',
    },
    {
      path: '/user/getverifiedprofiles',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get all verified profiles',
    },
    {
      path: '/user/recoveraccount/:id/:phone',
      get: false,
      post: true,
      delete: false,
      put: false,
      summary: 'Recover user account',
    },
    {
      path: '/user/changephone/:id/:phone',
      get: false,
      post: true,
      delete: false,
      put: false,
      summary: 'Change user phone number',
    },
    ///BRAND
    { path: '/brand/getall', get: true, post: false, delete: false, put: false, summary: 'Get all brands' },
    {
      path: '/brand/get',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get a specific brand using brand_name, email and phone',
    },
    {
      path: '/brand/get/:id',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get brand by id',
    },
    {
      path: '/brand/updatenote/:id/:notes',
      get: false,
      post: false,
      delete: false,
      put: true,
      summary: 'Update brand notes',
    },
    {
      path: '/brand/deletenote/:id',
      get: false,
      post: false,
      delete: true,
      put: false,
      summary: 'Delete brand notes',
    },
    {
      path: '/brand/addbalance/:id/:balance',
      get: false,
      post: true,
      delete: false,
      put: false,
      summary: 'Add balance to brand',
    },
    ///CAMPAIGN
    { path: '/campaign/get', get: true, post: false, delete: false, put: false, summary: 'Get campaign by name' },
    { path: '/campaign/getall', get: true, post: false, delete: false, put: false, summary: 'Get all campaigns' },
    {
      path: '/campaign/getverifiedcampaign',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get verified campaign',
    },
    {
      path: '/campaign/set-visibilty',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Change visibility of campaign',
    },
    {
      path: '/campaign/get/:brand_id',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get a specific campaign with id',
    },
    {
      path: '/campaign/getverificationcampaign',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get all campaigns awaiting approval',
    },
    {
      path: '/campaign/verificate',
      get: false,
      post: false,
      delete: false,
      put: true,
      summary: 'Verificate campaigns',
    },
    {
      path: '/campaign/visible',
      get: false,
      post: true,
      delete: false,
      put: false,
      summary: 'Do visible campaigns',
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Path</th>
          <th>GET</th>
          <th>POST</th>
          <th>DELETE</th>
          <th>PUT</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.path}</td>
            <td>{row.get ? '✔️' : ''}</td>
            <td>{row.post ? '✔️' : ''}</td>
            <td>{row.delete ? '✔️' : ''}</td>
            <td>{row.put ? '✔️' : ''}</td>
            <td>{row.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default APIdocsScreen;
