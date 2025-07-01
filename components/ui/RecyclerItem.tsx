import FinancialItem from '@/app/layout/FinancialItem';
import Finance from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface ItemRecyclerProps {
    list: Finance[];
    dateFilter?: string;
    isStatusFilteringEnabled: boolean;
    statusFilter?: boolean;
    onTotalValueChange?: (total: number) => void;
    adjustMarginBottom?: (number);
};

const RecyclerItem: React.FC<ItemRecyclerProps> = ({
    list,
    dateFilter,
    isStatusFilteringEnabled,
    statusFilter,
    onTotalValueChange,
    adjustMarginBottom,
}) => {

    // Filtrando os itens
    const filteredList = list.filter(item => {
        const isDifferentDates = item.startDate !== dateFilter;
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

    const renderItem = ({ item }: { item: Finance }) => (
        <FinancialItem
            item={item}
            onPress={(selectedItem) => (console.log('selectedItem: ', selectedItem))}
        />
    );

    return (
        <FlatList
            data={filteredList}
            keyExtractor={(item) => item.id}
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
