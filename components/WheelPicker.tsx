import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';

const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 3;
const SCROLL_THRESHOLD = ITEM_HEIGHT / 2;

interface WheelPickerProps {
  data: Array<{
    label: string;
    sublabel?: string;
  }>;
  selectedIndex: number;
  onValueChange: (index: number) => void;
  isCollapsed?: boolean;
}

export const WheelPicker: React.FC<WheelPickerProps> = ({
  data,
  selectedIndex,
  onValueChange,
  isCollapsed = false,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [isScrolling, setIsScrolling] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  // Calculate total height for proper padding
  const totalHeight = ITEM_HEIGHT * (isCollapsed ? 1 : VISIBLE_ITEMS);
  const paddingVertical = isCollapsed ? 0 : (totalHeight - ITEM_HEIGHT) / 2;

  // Update current index when selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== currentIndex) {
      setCurrentIndex(selectedIndex);
      scrollToIndex(selectedIndex, false);
    }
  }, [selectedIndex]);

  const scrollToIndex = useCallback((index: number, animated: boolean = true) => {
    if (isCollapsed || !scrollViewRef.current) return;
    
    scrollViewRef.current.scrollTo({
      y: index * ITEM_HEIGHT,
      animated,
    });
  }, [isCollapsed]);

  const snapToIndex = useCallback(
    (index: number) => {
      if (isCollapsed) return;
      
      const maxIndex = data.length - 1;
      const safeIndex = Math.max(0, Math.min(index, maxIndex));
      
      scrollToIndex(safeIndex);
      setCurrentIndex(safeIndex);
      onValueChange(safeIndex);
    },
    [data.length, onValueChange, isCollapsed, scrollToIndex]
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCollapsed) return;
    
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    
    if (!isScrolling && Math.abs(offsetY - index * ITEM_HEIGHT) < SCROLL_THRESHOLD) {
      const maxIndex = data.length - 1;
      const safeIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(safeIndex);
    }
  };

  const handleMomentumScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (isCollapsed) return;
    
    setIsScrolling(false);
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    snapToIndex(index);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  // Initial scroll position
  useEffect(() => {
    if (!isCollapsed && scrollViewRef.current) {
      // Small delay to ensure layout is complete
      const timer = setTimeout(() => {
        scrollToIndex(selectedIndex, false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed, selectedIndex, scrollToIndex]);

  return (
    <View className="relative" onLayout={handleLayout}>
      {/* Selected item indicator */}
      {!isCollapsed && (
        <View
          className="absolute left-0 right-0 bg-primary/10 rounded-lg"
          style={{
            top: paddingVertical,
            height: ITEM_HEIGHT,
          }}
        />
      )}
      
      {/* Arrow indicator */}
      <View
        className="absolute left-4 top-1/2 -translate-y-1/2"
        style={{ marginTop: -2 }}
      >
        <Text className="text-primary text-2xl">→</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        scrollEnabled={!isCollapsed}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={{
          paddingVertical,
        }}
        style={{ 
          maxHeight: totalHeight,
          height: totalHeight,
        }}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => snapToIndex(index)}
            activeOpacity={0.8}
            className="flex-row items-center px-12"
            style={{ height: ITEM_HEIGHT }}
          >
            <View>
              <Text
                className={`text-xl ${
                  currentIndex === index
                    ? 'text-primary font-gimlet-bold'
                    : 'text-primary/60 font-gimlet-regular'
                }`}
              >
                {item.label}
              </Text>
              {item.sublabel && (
                <Text
                  className={`text-lg ${
                    currentIndex === index
                      ? 'text-primary font-gimlet-medium'
                      : 'text-primary/40 font-gimlet-regular'
                  }`}
                >
                  {item.sublabel}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}; 