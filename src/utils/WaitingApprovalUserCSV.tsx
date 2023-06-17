const convertToCSV = (data: any): any => {
  if (!data || data.length === 0) return ''; // data undefined, null veya boş bir dizi ise boş bir string döndür

  const header = Object.keys(data[0]).join(',');
  const values = data.map((obj: any) => Object.values(obj).join(',')).join('\n');

  return `${header}\n${values}`;
};

export default convertToCSV;