import Header from "@/components/ui/Header";
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabs from "../navigation/BottomTabs";

export default function Home() {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <Header />

                <BottomTabs />
            </PaperProvider>
        </SafeAreaProvider>
    );
};

