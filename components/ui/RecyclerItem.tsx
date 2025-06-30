import FinancialItem from '@/app/layout/FinancialItem';
import { Colors } from '@/constants/Colors';
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
    adjustMarginBottom?: (number);
}

const RecyclerItem: React.FC<ItemRecyclerProps> = ({
    list,
    dateFilter,
    isStatusFilteringEnabled,
    statusFilter,
    onTotalValueChange,
    adjustMarginBottom,
}) => {
    const { width } = useWindowDimensions();

    // Filtrando os itens
    const filteredList = list.filter(item => {
        const isDifferentDates = item.filterStartDate !== dateFilter;
        //const isDifferentStatuses = item.isPaid !== statusFilter;
        //const statusFilterIsEnabled = isDifferentStatuses && isStatusFilteringEnabled;
        return !(isDifferentDates);
    });

    // Somando os valores
    const totalValue = filteredList.reduce((sum, item) => sum + item.value, 0);

    // Enviando o valor somado para o componente pai
    useEffect(() => {
        if (onTotalValueChange) {
            onTotalValueChange(totalValue);
        }

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
            style={[styles.scrollContent, { marginBottom: adjustMarginBottom }]}
            ListHeaderComponent={<View style={styles.headerSpacer} />}
            ListFooterComponent={<View style={styles.footerSpacer} />}
        />
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        backgroundColor: Colors.light.shadow
    },
    headerSpacer: {
        height: 10,
    },
    footerSpacer: {
        height: 0,
    },
});

export default RecyclerItem;
