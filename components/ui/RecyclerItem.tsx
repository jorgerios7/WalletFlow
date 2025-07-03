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
    bottomMargin?: number;
    onPressingItem: (datas: Finance) => void;
}

const RecyclerItem: React.FC<ItemRecyclerProps> = ({
    list,
    dateFilter,
    isStatusFilteringEnabled,
    statusFilter,
    onTotalValueChange,
    bottomMargin = 0,
    onPressingItem,
}) => {

    const filteredList = list.filter(item => {
        const isDifferentDates = item.startDate !== dateFilter;
        return !isDifferentDates;
    });

    const totalValue = filteredList.reduce((sum, item) => sum + item.value, 0);

    useEffect(() => {
        onTotalValueChange?.(totalValue);
    }, [totalValue, onTotalValueChange]);

    const renderItem = ({ item }: { item: Finance }) => (
        <FinancialItem
            item={item}
            onPress={(selectedItem) => onPressingItem(selectedItem)}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={filteredList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={[styles.scrollContent, { marginBottom: bottomMargin }]}
                ListHeaderComponent={<View style={styles.headerSpacer} />}
                ListFooterComponent={<View style={styles.footerSpacer} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        backgroundColor: Colors.light.shadow,
    },
    headerSpacer: {
        height: 10,
    },
    footerSpacer: {
        height: 0,
    },
});

export default RecyclerItem;




