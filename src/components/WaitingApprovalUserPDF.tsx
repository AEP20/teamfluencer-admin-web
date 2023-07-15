import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import ItemsTable from './ItemsTable';

// Create styles
// const styles = StyleSheet.create({
//   section: {
//     margin: '10pt',
//     padding: '10pt',
//     flexGrow: 1,
//   },
//   userInfo: {
//     marginBottom: '10pt', // added some margin
//   },
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#E4E4E4',
//     padding: 30,
//   },
//   table: {
//     width: 'auto',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     backgroundColor: '#E4E4E4',
//     padding: '20pt', // added some padding
//     fontSize: '12pt', // make the text a bit larger
//     fontFamily: 'Helvetica', // a more readable font
//   },
//   tableRow: {
//     margin: 'auto',
//     flexDirection: 'row',
//   },
//   tableColHeader: {
//     width: '20%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCol: {
//     width: '20%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCellHeader: {
//     margin: 5,
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 10,
//   },
// });


interface User {
  id: number;
  age: number;
  name: string;
  email: string;
  phone: string;
  profile_complete: string;
  country: string;
  city: string;
  gender: string;
  followers: number;
  insta_post_number: number;
  average_like: number;
  tiktok_followers: number;
  tiktok_videos: number;
  tiktok_average_like: number;
  tiktok_engagement_rate: number;
}

interface WaitingApprovalUserPDFProps {
  userData: User[];
}

const WaitingApprovalUserPDF: React.FC<WaitingApprovalUserPDFProps> = ({ userData }) => (
  <Document>
    <Page size="A4">
      <ItemsTable data={userData} />
    </Page>
  </Document>
);

export default WaitingApprovalUserPDF;
