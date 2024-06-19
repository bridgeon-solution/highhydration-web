import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const PdfFile2 = ({ProductIds,month }) => {
    console.log(ProductIds, "kannappan");
    
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
                    {/* <View style={styles.details}>
                        <Text style={styles.boldText}>Customer Name: {paymentsMonth?.address?.name}</Text>
                        <Text style={styles.text}>Address: {paymentsMonth?.address?.address_line1}</Text>
                        <Text style={styles.text}>Pincode: {paymentsMonth?.address?.pincode}</Text>
                        <Text style={styles.text}>Phone Number: {paymentsMonth?.address?.phone_number}</Text>
                        <Text style={styles.text}>Email: {paymentsMonth?.address?.email}</Text>
                    </View> */}
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

                <View style={styles.detailsContainer}>
                    <Text style={styles.boldText}>Total Amount: paymentsMonth?.totalAmount</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PdfFile2;
