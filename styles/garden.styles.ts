import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4FAC50',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4FAC50',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    backgroundColor: '#3A6B3A',
    paddingVertical: 6,
    borderRadius: 24,
    marginHorizontal: 16,
  },
  periodBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  periodBtnActive: {
    backgroundColor: '#fff',
  },
  periodBtnText: {
    color: '#fff',
    fontSize: 14,
  },
  periodBtnTextActive: {
    color: '#4FAC50',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  gardenWrapper: {
    alignSelf: 'center',
    marginTop: 16,
    width: '90%',
    aspectRatio: 1,
  },
  gardenBg: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  gardenImage: {
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartContainer: {
  alignSelf: 'center',
  marginTop: 16,
},

});

export default styles;