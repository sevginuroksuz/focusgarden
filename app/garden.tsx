import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { BarChart } from 'react-native-chart-kit';
import styles from '../styles/garden.styles';

type Period = 'day' | 'week' | 'month' | 'year';

export default function GardenScreen() {
  const navigation = useNavigation();
  const [period, setPeriod] = useState<Period>('day');

  // ① Stage boyutlarını tutacak
  const [stageLayout, setStageLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // ② Responsive sabitler
  const { width: screenW } = Dimensions.get('window');
  const GARDEN_SIZE = screenW * 0.9;
  const GRID_COLS = 6;
  const GRID_ROWS = 6;
  const ICON_SIZE = 28;

  // ③ onLayout sonrası gerçek hücre ölçüleri
  const isoW = stageLayout.width / GRID_COLS;
  const isoH = stageLayout.height / GRID_ROWS;

  // ④ İzometrik dönüşüm
  function gridToIso(col: number, row: number) {
    const centerX = stageLayout.width / 2;
    const startY = isoH * 0.5;
    const x = centerX + (col - row) * (isoW / 2);
    const y = startY + (col + row) * (isoH / 2);
    return { x, y };
  }

  // Veri çekme
  const totals = useQuery(api.flower.getFlowerStats);
  const breakdownRaw = useQuery(api.flower.getFlowerBreakdown, { period });
  if (!totals || !breakdownRaw) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  // Tarih label
  const today = new Date();
  const monthNamesShort = [
    'Oca',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ];
  const monthNamesLong = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];
  let dateLabel = '';
  switch (period) {
    case 'day':
      dateLabel = `${today.getDate()} ${monthNamesShort[today.getMonth()]} ${today.getFullYear()} (Bugün)`;
      break;
    case 'week': {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      dateLabel = `${start.getDate()}–${end.getDate()} ${monthNamesShort[today.getMonth()]} ${today.getFullYear()}`;
      break;
    }
    case 'month':
      dateLabel = `${monthNamesLong[today.getMonth()]} ${today.getFullYear()}`;
      break;
    case 'year':
      dateLabel = `${today.getFullYear()}`;
      break;
  }

  // Sadece aktif olanları al
  const itemsToRender = breakdownRaw.filter(
  (i) => i.count > 0 && i.unit >= 0 && i.unit < GRID_COLS * GRID_ROWS
);


  // Grafik verisi
  const axisLabels = ['Gün', 'Hafta', 'Ay', 'Yıl'];
  const axisValues = [totals.day, totals.week, totals.month, totals.year];
  const chartData = { labels: axisLabels, datasets: [{ data: axisValues }] };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Genel Görünüm</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Period seçimi */}
      <View style={styles.periodRow}>
        {(['day', 'week', 'month', 'year'] as Period[]).map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.periodBtn, period === key && styles.periodBtnActive]}
            onPress={() => setPeriod(key)}
          >
            <Text
              style={[
                styles.periodBtnText,
                period === key && styles.periodBtnTextActive,
              ]}
            >
              {key === 'day'
                ? 'Gün'
                : key === 'week'
                ? 'Hafta'
                : key === 'month'
                ? 'Ay'
                : 'Yıl'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.dateText}>{dateLabel}</Text>

      {/* Bahçe */}
      <View style={styles.gardenWrapper}>
        <ImageBackground
          source={require('../assets/images/stage0.png')}
          style={styles.gardenBg}
          onLayout={(e) => {
            const { x, y, width, height } = e.nativeEvent.layout;
            console.log('Stage layout:', { x, y, width, height });
            setStageLayout({ x, y, width, height });
          }}
        >
          {stageLayout.width > 0 &&
            itemsToRender.map((item, idx) => {
              const col = item.unit % GRID_COLS;
              const row = Math.floor(item.unit / GRID_COLS);
              const { x, y } = gridToIso(col, row);
              console.log(`Item ${idx} at col=${col}, row=${row} → x,y=`, x, y);

              return (
                <Image
                  key={idx}
                  source={require('../assets/images/flower_icon.png' )}
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      left: x - ICON_SIZE / 2,
                      top: y - ICON_SIZE / 2,
                    },
                  ]}
                />
              );
            })}
        </ImageBackground>
      </View>

      {/* Grafik */}
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={GARDEN_SIZE}
          height={200}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix=" dk"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76,172,80,${opacity})`,
            labelColor: () => '#333',
          }}
          style={styles.chart}
        />
      </View>
    </SafeAreaView>
  );
}
