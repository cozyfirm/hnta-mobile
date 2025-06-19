import React, { useRef, useState } from 'react';

import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useProgramStore } from '@/store';

interface Program {
  id: number;
  title: string;
  icon: any;
}

const programs: Program[] = [
  {
    id: 8,
    title: 'Muzička produkcija',
    icon: require('../assets/images/muzika.png'),
  },
  {
    id: 6,
    title: 'Pisanje komedije',
    icon: require('../assets/images/pisanje.png'),
  },
  {
    id: 7,
    title: 'Novinarstvo i dokumentarni film',
    icon: require('../assets/images/novinarstvo.png'),
  },
  {
    id: 9,
    title: 'Razvoj računarskih igara',
    icon: require('../assets/images/gamedev.png'),
  },
  {
    id: 10,
    title: 'Grafički dizajn i animacija',
    icon: require('../assets/images/graficki-dizajn.png'),
  },
];

const ProgramSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProgram, setSelectedProgram } = useProgramStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleSelect = (program: Program) => {
    setSelectedProgram(program);
    toggleDropdown();
  };

  return (
    <View className="relative z-10">
      <TouchableOpacity
        className="bg-primary p-5 flex-row items-center justify-between"
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center flex-1">
          <View className="w-6 h-6 mr-3 items-center justify-center">
            <Image
              source={selectedProgram.icon}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
          <Text className="text-lg font-gimlet-semibold text-background">
            {selectedProgram.title}
          </Text>
        </View>
        <Ionicons
          name="chevron-down"
          size={24}
          color="#333366"
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
        />
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          className="absolute top-full left-0 right-0 bg-primary overflow-hidden"
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          }}
        >
          {programs.map(
            (program) =>
              program.id !== selectedProgram.id && (
                <TouchableOpacity
                  key={program.id}
                  className="p-5 border-t border-background/10 flex-row items-center"
                  onPress={() => handleSelect(program)}
                  activeOpacity={0.8}
                >
                  <View className="w-6 h-6 mr-3 items-center justify-center">
                    <Image
                      source={program.icon}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="text-lg font-gimlet-semibold text-background">
                    {program.title}
                  </Text>
                </TouchableOpacity>
              )
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default ProgramSwitcher;
