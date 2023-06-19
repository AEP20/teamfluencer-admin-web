import React from 'react';

function APIdocsScreen() {
  const rows = [
    { path: '/campaigns', get: true, post: false, delete: false, put: false, summary: 'List all campaigns' },
    {
      path: '/campaigns/:brandId',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'Get a specific campaign',
    },
    { path: '/brands', get: true, post: false, delete: false, put: false, summary: 'List all brands' },
    { path: '/brands/:brandId', get: true, post: false, delete: false, put: false, summary: 'Get a specific brand' },
    { path: '/signin', get: false, post: true, delete: false, put: false, summary: 'Admin user sign in' },
    { path: '/signup', get: false, post: true, delete: false, put: false, summary: 'Admin user sign up' },
    { path: '/users/:id', get: true, post: false, delete: false, put: false, summary: 'Get a specific user with id' },
    { path: '/users', get: true, post: false, delete: false, put: false, summary: 'Get a specific user with email and phone' },
    {
      path: '/verification-profiles',
      get: true,
      post: false,
      delete: false,
      put: false,
      summary: 'List all verification profiles',
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
