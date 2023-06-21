import { StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

Font.register({
  family: 'Noto Serif',
  src: require('../assets/fonts/RobotoSlab-Regular.ttf'),
});

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'Noto Serif',
  },
  header: {
    borderTop: 'none',
  },
  headerText: {
    fontSize: 6,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  row1: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row2: {
    width: '12%',
    fontSize: 6,
    marginHorizontal: 12,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row3: {
    width: '12%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row4: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row5: {
    width: '5%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row6: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row7: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row8: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row9: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row10: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row11: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row12: {
    width: '8%',
    fontSize: 6,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

//en son marka ilk basa gelicek

const ItemsTable = ({ data }: any) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={[styles.row1, styles.headerText]}>Name</Text>
        <Text style={[styles.row2, styles.headerText]}>Email</Text>
        <Text style={[styles.row3, styles.headerText]}>Phone</Text>
        <Text style={[styles.row4, styles.headerText]}>Gender</Text>
        <Text style={[styles.row5, styles.headerText]}>Country</Text>
        <Text style={[styles.row6, styles.headerText]}>City</Text>
        <Text style={[styles.row7, styles.headerText]}>Insta Takipçi</Text>
        <Text style={[styles.row8, styles.headerText]}>Insta Beğeni</Text>
        <Text style={[styles.row9, styles.headerText]}>Tiktok Takipçi</Text>
        <Text style={[styles.row10, styles.headerText]}>Tiktok Beğeni</Text>
        <Text style={[styles.row11, styles.headerText]}>Tiktok Etkileşim</Text>
      </View>
      {data.map((row: any, i: any) => (
        <View key={i} style={styles.row} wrap={false}>
          <Text style={styles.row1}>{row.name}</Text>
          <Text style={styles.row2}>{row.email}</Text>
          <Text style={styles.row3}>{row.phone}</Text>
          <Text style={styles.row4}>{row.gender}</Text>
          <Text style={styles.row5}>{row.country}</Text>
          <Text style={styles.row6}>{row.city}</Text>
          <Text style={styles.row8}>{row.followers}</Text>
          <Text style={styles.row9}>{row.average_like}</Text>
          <Text style={styles.row10}>{row.tiktok_followers}</Text>
          <Text style={styles.row11}>{row.tiktok_average_like}</Text>
          <Text style={styles.row12}>{row.tiktok_engagement_rate}</Text>
        </View>
      ))}
    </View>
  );
};

ItemsTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ItemsTable;
