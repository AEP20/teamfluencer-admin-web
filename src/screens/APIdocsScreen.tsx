import React from 'react';

function APIdocsScreen() {
  const rows = [
    { path: '/health', get: true, post: false, delete: false, put: false, summary: 'Check server health' },
    { path: '/campaign/getall', get: true, post: false, delete: false, put: false, summary: 'List all campaigns' },
    {
      path: '/campaign/get/:brand_id',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get a specific campaign with id',
    },
    { path: '/brand/getall', get: true, post: false, delete: false, put: false, summary: 'List all brands' },
    {
      path: '/brand/get',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get a specific brand using brand_name, email and phone',
    },

    { path: '/admin/signin', get: false, post: true, delete: false, put: false, summary: 'Admin user sign in' },
    { path: '/admin/signup', get: false, post: true, delete: false, put: false, summary: 'Admin user sign up' },

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
