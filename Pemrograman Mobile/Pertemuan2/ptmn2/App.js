import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>CURRICULUM VITAE</Text>

      <Text style={styles.label}>Nama Lengkap</Text>
      <Text style={styles.text}>Khajizatu Sidqiyah</Text>

      <Text style={styles.label}>NIM</Text>
      <Text style={styles.text}>2488010044</Text>

      <Text style={styles.label}>Asal Sekolah</Text>
      <Text style={styles.text}>SMA Negeri 1 Losari</Text>

      <Text style={styles.label}>Cita-cita</Text>
      <Text style={styles.text}>Pengusaha Sukses</Text>

      <Text style={styles.label}>Rencana Menggapai Cita-cita</Text>
      <Text style={styles.text}>
        Untuk mencapai cita-cita menjadi pengusaha sukses, saya akan memanfaatkan ilmu Informatika untuk membuat produk atau jasa yang bermanfaat. Saya juga akan terus belajar tentang bisnis, berani mencoba, dan tidak mudah menyerah. Dengan kerja keras dan konsisten, saya berharap dapat membangun usaha yang sukses di masa depan.
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    justifyContent: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  }, 

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },

  text: {
    fontSize: 16,
    marginTop: 5,
  },
});