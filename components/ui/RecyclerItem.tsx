import FinancialItem from '@/app/layout/FinancialItem';
import { useEffect } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

interface FinancialIte {
    uniqueId: string;
    category: string;
    dueDate: string;
    filterDueDate: string;
    filterStartDate: string;
    packageID: string;
    startDate: string;
    isPaid: boolean;
    studentName: string;
    isIncome: boolean;
    value: number;
}

interface ItemRecyclerProps {
    list: FinancialIte[];
    dateFilter?: string;
    isStatusFilteringEnabled: boolean;
    statusFilter?: boolean;
    onTotalValueChange?: (total: number) => void;
}

const RecyclerItem: React.FC<ItemRecyclerProps> = ({
    list,
    dateFilter,
    isStatusFilteringEnabled,
    statusFilter,
    onTotalValueChange
}) => {
    const { width } = useWindowDimensions();

    // Filtrando os itens
    const filteredList = list.filter(item => {
        const isDifferentDates = item.filterStartDate !== dateFilter;
        //const isDifferentStatuses = item.isPaid !== statusFilter;
        //const statusFilterIsEnabled = isDifferentStatuses && isStatusFilteringEnabled;
        return (isDifferentDates);
    });

    // Somando os valores
    const totalValue = filteredList.reduce((sum, item) => sum + item.value, 0);

    // Enviando o valor somado para o componente pai
    useEffect(() => {
        if (onTotalValueChange) {
            onTotalValueChange(totalValue);
        }

        console.log('FilteredList: ', list);
    }, [totalValue, onTotalValueChange]);

    const renderItem = ({ item }: { item: FinancialIte }) => (
        <FinancialItem
            item={item}
            itemWidth={width}
            height={100}
        />
    );

    return (
        <FlatList
            data={filteredList}
            keyExtractor={(item) => item.uniqueId}
            renderItem={renderItem}
            ListHeaderComponent={<View style={styles.headerSpacer} />}
            ListFooterComponent={<View style={styles.footerSpacer} />}
        />
    );
};

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        height: 300,
        flex: 1,
        backgroundColor: 'orange',
    },
    scrollContent: {
        width: 400,
        height: 200,
        paddingHorizontal: 16,
        paddingBottom: 24,

        backgroundColor: 'grey'
    },
    card: {
        width: '100%',

        alignSelf: 'center',
        backgroundColor: 'yellow',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    bold: {
        fontWeight: 'bold',
    },
    headerSpacer: {
        height: 8,
    },
    footerSpacer: {
        height: 24,
    },
});

export default RecyclerItem;
