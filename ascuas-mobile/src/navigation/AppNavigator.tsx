import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Sparkles, Flower2, Users, BookOpen, Settings } from 'lucide-react-native';

import type { BottomTabParamList, RootStackParamList } from './types';
import { Colors } from '../theme/colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import PracticesScreen from '../screens/PracticesScreen';
import PeopleScreen from '../screens/PeopleScreen';
import JourneyScreen from '../screens/JourneyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ReflectScreen from '../screens/ReflectScreen';
import PracticeDetailScreen from '../screens/PracticeDetailScreen';
import PersonDetailScreen from '../screens/PersonDetailScreen';

// ── Bottom Tabs ──────────────────────────────────────────────
const Tab = createBottomTabNavigator < BottomTabParamList > ();

const BottomTabs = () => (
    <Tab.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.amber200, height: 100 },
            headerTintColor: Colors.amber900,
            headerTitleStyle: { fontWeight: '700', fontSize: 20, paddingBottom: 15 },
            headerShadowVisible: false,
            tabBarActiveTintColor: Colors.amber600,
            tabBarInactiveTintColor: Colors.amber300,
            tabBarStyle: {
                backgroundColor: Colors.white,
                borderTopColor: Colors.amber100,
                paddingBottom: 4,
                paddingTop: 10,
                height: 80,
            },
            tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '500',
            },
        }}
    >
        <Tab.Screen
            name="HomeTab"
            component={HomeScreen}
            options={{
                title: 'Ascuas',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color} />,
            }}
        />
        <Tab.Screen
            name="PracticeTab"
            component={PracticesScreen}
            options={{
                title: 'Practices',
                tabBarLabel: 'Practice',
                tabBarIcon: ({ color, size }) => <Flower2 size={size} color={color} />,
            }}
        />
        <Tab.Screen
            name="PeopleTab"
            component={PeopleScreen}
            options={{
                title: 'People',
                tabBarLabel: 'People',
                tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
            }}
        />
        <Tab.Screen
            name="JourneyTab"
            component={JourneyScreen}
            options={{
                title: 'Journey',
                tabBarLabel: 'Journey',
                tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
            }}
        />
        <Tab.Screen
            name="SettingsTab"
            component={SettingsScreen}
            options={{
                title: 'Settings',
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                    <Settings size={size} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
);

// ── Root Stack ───────────────────────────────────────────────
const Stack = createNativeStackNavigator < RootStackParamList > ();

const AppNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.amber200 },
            headerTintColor: Colors.amber900,
            headerTitleStyle: { fontWeight: '600' },
            contentStyle: { backgroundColor: Colors.amber50 },
        }}
    >
        <Stack.Screen
            name="Tabs"
            component={BottomTabs}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Challenge"
            component={ChallengeScreen}
            options={{ title: 'Challenge' }}
        />
        <Stack.Screen
            name="Reflect"
            component={ReflectScreen}
            options={{ title: 'Reflect' }}
        />
        <Stack.Screen
            name="PracticeDetail"
            component={PracticeDetailScreen}
            options={{ title: 'Practice Details' }}
        />
        <Stack.Screen
            name="PersonDetail"
            component={PersonDetailScreen}
            options={{ title: 'Person Details' }}
        />
    </Stack.Navigator>
);

export default AppNavigator;
