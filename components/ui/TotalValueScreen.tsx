import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    value: string;
}

const TotalValueScreen: React.FC<Props> = ({ value }) => {
    return (
        <View style={styles.containerValue}>
            <Text style={styles.text}>Saldo:</Text>
            <Text style={styles.text}>R$ {value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  containerValue: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderTopColor: Colors.light.shadow, 
    borderTopWidth: 1
  },
  text: {
    fontSize: 12,
    fontWeight: 'normal'
  }
});

export default TotalValueScreen;