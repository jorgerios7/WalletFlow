import { useFinancial } from "@/app/context/FinancialProvider";
import { PreferencesContext } from "@/app/context/PreferencesProvider";
import UpdateEntry from "@/app/services/firebase/financeService/updateEntry";
import { UpdateEntryProps, UpdateIdsProps, UpdatePaymentSteps } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import FinalStep from "../stepScreen/finalStep";
import PaymentDateStep from "./steps/paymentDateStep";
import PaymentMethodStep from "./steps/paymentMethodStep";
import PaymentStep from "./steps/paymentStep";

interface Props {
  isVisible: boolean;
  id: UpdateIdsProps;
  values: UpdateEntryProps;
  onDismiss: () => void;
}

export default function PaymentScreen({ isVisible, id, values, onDismiss }: Props) {
  if (!isVisible) return null;

  const { preferences } = useContext(PreferencesContext);

  const {
    group_id,
    refresh
  } = useFinancial();

  const [currentStep, setCurrentStep] = useState<UpdatePaymentSteps>('paymentType');

  const [entry, setEntry] = useState<UpdateEntryProps>({
    paymentType: values.paymentType,
    paymentDate: values.paymentDate,
    paymentMethod: values.paymentMethod,
    paymentBankCard: values.paymentBankCard,
    paymentBank: values.paymentBank
  });

  async function handleUpdate() {
    await UpdateEntry({
      ids: id,
      groupId: group_id,
      data: { entry: values, newEntry: entry },
      onRefresh: refresh
    });

    setCurrentStep("final");
  }

  return (
    <Modal
      visible={isVisible}
      animationType={"fade"}
      transparent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[preferences.theme.appearance].overlay
        }}
      >
        <View
          style={
            styles.container
          }
        >
          <PaymentStep
            isVisible={currentStep === 'paymentType'}
            step={{ total: 3, current: 1 }}
            value={entry.paymentType}
            onSelect={(selected) => setEntry((prev) => ({ ...prev, paymentType: selected }))}
            onConfirm={() => {
              entry.paymentType === "pending"
                ? handleUpdate()
                : setCurrentStep("paymentDate")
            }}
            onCancel={onDismiss}
          />

          <PaymentDateStep
            isVisible={currentStep === 'paymentDate'}
            step={{ total: 3, current: 2 }}
            value={entry.paymentDate}
            onSelect={(selected) => setEntry((prev) => ({ ...prev, paymentDate: selected }))}
            onConfirm={() => setCurrentStep("paymentMethod")}
            onCancel={onDismiss}
            onBack={() => setCurrentStep('paymentType')}
          />

          <PaymentMethodStep
            isVisible={currentStep === 'paymentMethod'}
            step={{ total: 3, current: 3 }}
            values={{
              paymentMethod: entry.paymentMethod as string, paymentBankCard: entry.paymentBankCard as string,
              paymentBank: entry.paymentBank as string
            }}
            onSelect={(value) => {
              setEntry((prev) => (
                { ...prev, paymentMethod: value.paymentMethod, paymentBank: value.paymentBank, paymentBankCard: value.paymentBankCard }
              ))
            }}
            onConfirm={() => handleUpdate()}
            onCancel={onDismiss}
            onBack={() => setCurrentStep('paymentDate')}
          />

          <FinalStep
            isVisible={currentStep === 'final'}
            title={"Editar transação"}
            textAbove={'Atualização concluída com sucesso!'}
            textBelow={'Toque em confirmar para sair do editor de pagamento.'}
            onConfirm={onDismiss}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
})
