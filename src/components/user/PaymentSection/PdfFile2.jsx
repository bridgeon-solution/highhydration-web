import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const PdfFile2 = ({ ProductIds, month, total, userData, billno }) => {
    // console.log(userData, "kannappan");
    
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            backgroundColor: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontFamily: 'Helvetica',
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
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: 'bold',
        },
        subHeader: {
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 20,
            color: '#666',
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
            fontSize: 12,
            lineHeight: 1.5,
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
        totalContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 20,
            paddingRight: 10,
        },
        totalText: {
            fontSize: 14,
            fontWeight: 'bold',
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.section}>
                    <Text style={styles.header}>Invoice</Text>
                    <Text style={styles.subHeader}>Invoice No: {billno}</Text>
                    <Text style={styles.subHeader}>{month}</Text>
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
                        <Text style={styles.boldText}>Customer Name: {userData?.first_name + ' ' + userData?.last_name}</Text>
                        <Text style={styles.text}>Address: {userData?.address_line1}</Text>
                        <Text style={styles.text}>Pincode: {userData?.pin_number}</Text>
                        <Text style={styles.text}>Phone Number: {userData?.phone_number}</Text>
                        <Text style={styles.text}>Email: {userData?.email}</Text>
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

                    {ProductIds?.map((product, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{product.productname}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{product.price}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Total Amount */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Amount: {total}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PdfFile2;
