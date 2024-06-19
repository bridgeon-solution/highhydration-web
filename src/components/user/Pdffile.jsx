
import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import api from '../../axiosInterceptors';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  section: {
    marginBottom: 10,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  details: {
    width: '48%',
    textAlign: 'left',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: '0 auto',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const Pdffile = ({ productName, amount,adress,name }) => {
  // console.log(productName, amount,adress, "props");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <Text style={styles.header}>Invoice</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          {/* Company Details */}
          <View style={styles.details}>
            <Text style={styles.boldText}>High Hydration</Text>
            <Text style={styles.text}>1234 Main St.</Text>
            <Text style={styles.text}>City, State, Zip</Text>
            <Text style={styles.text}>Phone: (123) 456-7890</Text>
            <Text style={styles.text}>Email: info@company.com</Text>
          </View>

          {/* Customer Details */}
          <View style={styles.details}>
            <Text style={styles.boldText}>Customer Name:{name}</Text>
            <Text style={styles.text}>address:{adress?.address_line1}</Text>
            <Text style={styles.text}>Pincode:{adress?.pincode}</Text>
            <Text style={styles.text}>Phonenumber:{adress?.phone_number}</Text>
            <Text style={styles.text}>Email: customer@example.com</Text>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Amount</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{productName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{amount}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Pdffile;
