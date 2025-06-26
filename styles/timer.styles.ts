import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4FAC50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  soundButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
  },
  treeWrapper: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  timerText: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 24,
  },
  plantButton: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  plantButtonText: {
    fontSize: 16,
    color: '#fff',
  },

  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
  whiteNoiseButton: {
    marginVertical: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  whiteNoiseButtonText: {
    fontSize: 16,
    color: '#444',
  },
  modalFooter: {
    marginTop: 12,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
