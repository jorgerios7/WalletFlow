import Header from "@/components/ui/Header";
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import BottomTabs from "../navigation/BottomTabs";

export default function Home() {
    return (
        <PaperProvider>
            <Header />

            <BottomTabs />
        </PaperProvider>
    );
};

