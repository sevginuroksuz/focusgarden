import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import styles from '../../styles/timer.styles';

const MAX_DURATION = 3600;       // 1 saat (saniye)
const MIN_DURATION = 60;        // 15 dk (saniye)

export default function TimerScreen() {
  // Ses ve event mutasyonu
  const addFlowerEvent = useMutation(api.flower.addFlowerEvent);

  // iOS sessiz modda da çalması için audio modu ayarla
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: false,
    }).catch(e => console.warn('Audio mode ayarlanamadı', e));
  }, []);

  // Sayaç ve kontrol state’leri
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  // Ses oynatıcı referansları
  const [soundObj, setSoundObj] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Convex ses query & mutation
  const listSounds = useQuery(api.sounds.listSounds) || [];
  const generateUploadUrl = useMutation(api.sounds.generateUploadUrl);
  const saveSound = useMutation(api.sounds.saveSound);

  // Seçili ses URL’i ve modal durumu
  const [selectedSoundUrl, setSelectedSoundUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // İlk yüklemede default ses seçimi
  useEffect(() => {
    if (listSounds.length > 0 && !selectedSoundUrl) {
      setSelectedSoundUrl(listSounds[0].url);
    }
  }, [listSounds]);

  // Sayaç mekanizması
  useEffect(() => {
    let iv: NodeJS.Timeout;
    if (running) {
      iv = setInterval(() => {
        setElapsed(e => {
          if (e >= MAX_DURATION) {
            clearInterval(iv);
            handleStop();
            return MAX_DURATION;
          }
          return e + 1;
        });
      }, 1000);
    }
    return () => clearInterval(iv);
  }, [running]);

  // Ses oynatma
  const playSound = async () => {
    if (!selectedSoundUrl) return;
    const { sound } = await Audio.Sound.createAsync(
      { uri: selectedSoundUrl },
      { shouldPlay: true, isLooping: true }
    );
    setSoundObj(sound);
    setIsPlaying(true);
  };

  // Ses durdurma
  const stopSound = async () => {
    if (!soundObj) return;
    await soundObj.stopAsync();
    await soundObj.unloadAsync();
    setSoundObj(null);
    setIsPlaying(false);
  };

  // Sayaç durdurma ve event ekleme mantığı
  const handleStop = () => {
    setRunning(false);
    stopSound();
    if (elapsed >= MIN_DURATION) {
      addFlowerEvent()
        .catch(e => console.error('Flower event ekleme hatası:', e));
    } else {
      Alert.alert(
        'Süre yetersiz',
        'En az 15 dakika çalışmalısın.',
        [{ text: 'Tamam' }]
      );
    }
  };

  // Timer butonuna basma
  const onPressTimer = () => {
    if (!running) {
      setElapsed(0);
      setRunning(true);
      playSound();
    } else {
      handleStop();
    }
  };

  // Modal kontrolleri
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Ses seçme
  const onSelectSound = async (url: string) => {
    if (isPlaying) await stopSound();
    setSelectedSoundUrl(url);
    closeModal();
  };

  // Yeni ses ekleme
  const onAddUserSound = async () => {
    try {
      const pick = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });
      if (pick.canceled) {
        Alert.alert(
          'Ses ekleme iptal edildi',
          'Ses yüklemek istemiyor musunuz?',
          [
            { text: 'Hayır', style: 'cancel' },
            { text: 'Evet', style: 'destructive', onPress: closeModal },
          ]
        );
        return;
      }
      if (!pick.assets || pick.assets.length === 0) {
        Alert.alert('Hata', 'Ses dosyası alınamadı.');
        return;
      }
      let uri = pick.assets[0].uri;
      if (Platform.OS === 'android' && !uri.startsWith('file://')) {
        uri = 'file://' + uri;
      }
      const postUrl = await generateUploadUrl();
      const uploadRes = await FileSystem.uploadAsync(postUrl, uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        headers: { 'Content-Type': pick.assets[0].mimeType || 'audio/mpeg' },
      });
      const { storageId } = JSON.parse(uploadRes.body as string);
      await saveSound({ title: pick.assets[0].name, storageId });
      Alert.alert('Başarılı', `${pick.assets[0].name} eklendi.`);
    } catch (e: any) {
      console.error('Ses ekleme hatası:', e);
      Alert.alert('Hata', e.message);
    }
  };

  // Animasyon progress ve formatlanmış sayaç
  const progress = Math.min(elapsed / MAX_DURATION, 1);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openModal} style={styles.soundButton}>
          <Ionicons name="headset-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {running ? 'Telefonu bırak!' : 'Çiçeği büyüt!'}
        </Text>
        <View style={styles.treeWrapper}>
          <LottieView
            source={require('../../assets/animations/flower_growth.json')}
            progress={progress}
            style={styles.animation}
          />
        </View>
        <Text style={styles.timerText}>
          {minutes}:{seconds}
        </Text>
        <TouchableOpacity style={styles.plantButton} onPress={onPressTimer}>
          <Text style={styles.plantButtonText}>
            {running ? 'Durdur' : 'Başlat'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
        <Pressable style={styles.modalBackdrop} onPress={closeModal} />
        <View style={styles.modalSheet}>
          <FlatList
            data={listSounds}
            keyExtractor={i => i.id}
            ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => onSelectSound(item.url)}>
                <Text style={styles.modalItemText}>{item.title}</Text>
                {item.url === selectedSoundUrl && <Ionicons name="checkmark" size={20} color="#0a84ff" />}              
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.whiteNoiseButton} onPress={onAddUserSound}>
            <Text style={styles.whiteNoiseButtonText}>Ses Ekle</Text>
          </TouchableOpacity>
          <Text style={styles.modalFooter}>
            * Mağaza sayfasında kilidi açılacak daha fazla ses var.
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
