const pluckDeep = key => obj =>
  key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res =>
  fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  // LANGKAH 1: Import semua yang dibutuhkan
}

// import library
import React, { useState, useEffect, useRef } from "react"; //  useEffect, useRef (untuk Animated)

// import components
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,  
  Animated,             
} from 'react-native';

const go = (f, seed, acc) => {
  const res = f(seed);
  return res ? go(f, res[1], acc.concat([res[0]])) : acc
};

const PROFILE = {
  name: 'Khajizatu Sidqiyah',
  title: 'Full Stack Mobile Developer',
  email: 'khajizatusidqiyahh@gmail.com',
  phone: '083825248419',
  location: 'Kalibuntu, Jawa Barat',
  bio: ' Pengembangan Aplikasi Mobile yang berfokus pada teknologi React Native dan Flutter',
  avatarOffline: 'asset/jijahhh.jpg'
}

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript', level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 82, color: '#FFCA28' },
  { id: '7', name: 'HTML', level: 80, color: '#69ff28' },
  { id: '8', name: 'CSS', level: 80, color: '#28bfff' },
  { id: '9', name: 'PHP', level: 80, color: '#a928ff' },
];

const SECTIONS = [
  {
    title: '📋 Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Senior Mobile Developer',
        company: 'PT. TechVision Indonesia',
        period: '2029 – Sekarang',
        desc: 'Memimpin tim 5 developer dalam pengembangan aplikasi e-commerce mobile.',
      },
      {
        id: 'e2',
        role: 'Mobile Developer',
        company: 'Startup Fintech – PayEasy',
        period: '2020 – 2022',
        desc: 'Mengembangkan fitur pembayaran digital menggunakan React Native & Redux.',
      },
      {
        id: 'e3',
        role: 'Sposnsorship',
        company: 'Bakti Desa Ikmawati',
        period: '3 Bulan',
        desc: 'Mencari dana atau pun media patner untuk kegiatan dari bakti desa ikmawati',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 – 2029',
        desc: 'IPK 3.72 / 4.00 • Skripsi: Implementasi ML pada Aplikasi Mobile.',
      },
      {
        id: 'd2',
        role: 'SMA Negeri 1 Losari',
        company: 'Losari',
        period: '2021 – 2024',
        desc: 'Jurusan saya sewaktu SMA yaitu Matematika dan Ilmu Pengetahuan Alam. ',
      },
    ],
  },
];

// ===================================================
// DATA SOSIAL MEDIA
// ===================================================

const SOCIAL = [

  { id: 's1', label: 'GitHub', icon: '👨‍💻', url: 'https://github.com/khajizatu-sidqiyah' },
  { id: 's2', label: 'Intagram', icon: '💼', url: 'https://instagram.com/jijah_sdqyh' },
  { id: 's3', label: 'Portfolio', icon: '🌐', url: 'https://jijah.dev' },
];

// ================================
// SUB-COMPONENT: SkillCard
// Dipakai oleh FlatList untuk render tiap skill
// Props: item → { name, level, color }
// ================================

const SkillCard = ({ item }) => (
  // 1. View → container kartu
  <View style={styles.skillCard}>
    {/* Baris atas: nama + persentase */}
    <View style={styles.skillHeader}>
      {/* 2. Text → nama skill */}
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>

    {/* Progress bar: View berlapis */}
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          // width dinamis dari data, warna dari data
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

// ================================================
// SUB-COMPONENT: TimelineCard
// Dipakai oleh SectionList
// Props: item = { role, company, period }, onPress
// ================================================

const TimelineCard = ({ item, onPress }) => (
  // 9. TouchableOpacity → tekan untuk buka Modal
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}  // opacity saat ditekan (0–1)
  >
    {/* Titik bulat di sebelah kiri (dekorasi timeline) */}
    <View style={styles.timelineDot} />

    {/* Konten teks */}
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {

  // — STATE
  // 11. Switch: apakah user "Open to Work"?
  const [openToWork, setOpenToWork] = useState(true);

  // 12. Modal: item yang dipilih & visibilitas modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 7. TextInput: nilai input form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // 13. ActivityIndicator: status loading
  const [sending, setSending] = useState(false);

  // 10. Pressable: status sedang ditekan
  const [pressing, setPressing] = useState(false);

  // state untuk popup Link (muncul saat tombol sosmed ditekan)
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);

  //  state tab aktif (untuk highlight tombol) + ref ScrollView & posisi tiap section
  const [activeTab, setActiveTab] = useState('Info');
  const scrollRef = useRef(null);
  const sectionY = useRef({ Info: 0, Skills: 0, Kontak: 0 }).current;

  //  pindah scroll ke posisi section yang sesuai saat tab ditekan
  const goToSection = (tab) => {
    setActiveTab(tab);
    scrollRef.current?.scrollTo({ y: sectionY[tab], animated: true });
  };

  //  nilai animasi untuk avatar (Animated API)
  const avatarScale = useRef(new Animated.Value(0.85)).current;

  //  jalankan animasi "denyut" berulang saat komponen pertama kali mount
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarScale, {
          toValue: 1.05,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(avatarScale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // — HANDLER FUNCTIONS
  // Dipanggil saat tombol sosial media ditekan → tampilkan popup berisi link
  const handleSocialPress = (social) => {
    setSelectedSocial(social);
    setSocialModalVisible(true);
  };

  // Dipanggil saat kartu timeline ditekan
  const handleCardPress = (item) => {
    setSelectedItem(item); // simpan item yang dipilih
    setModalVisible(true); // tampilkan modal
  };

  // Dipanggil saat tombol "Kirim Pesan" ditekan
  const handleSend = () => {
    // Validasi input tidak boleh kosong
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true); // tampilkan ActivityIndicator

    // Simulasi delay 2 detik (misal: request ke server)
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim`);
    }, 2000);
  };

  return (
    // 15. SafeAreaView → area aman dari notch & home bar
    <SafeAreaView style={styles.safeArea}>
      {/* 14. StatusBar → warna latar status bar & style teks ikon */}
      <StatusBar
        backgroundColor="#1a1a2e" // warna latar (Android)
        barStyle="light-content" // ikon putih (iOS & Android)
      />

      {/* — HEADER BAR — */}
      {/* 1. View → container header dengan flexDirection row */}
      <View style={styles.headerBar}>
        {/* 2. Text → judul header */}
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>
      </View>

      {/* Toggle “Open to Work” */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>
          {openToWork ? '🟢 Open' : '🔴 Busy'}
        </Text>
        {/* 11. Switch → toggle on/off */}
        <Switch
          value={openToWork} // nilai saat ini
          onValueChange={setOpenToWork} // callback saat diubah
          trackColor={{ false: '#555', true: '#4ade80' }}
          thumbColor={openToWork ? '#fff' : '#aaa'}
        />
      </View>

      {/*  Tab Navigasi Info / Skills / Kontak (semua konten tetap satu halaman, tab hanya scroll ke section) */}
      <View style={styles.tabBar}>
        {['Info', 'Skills', 'Kontak'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => goToSection(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === tab && styles.tabBtnTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/*  KeyboardAvoidingView membungkus ScrollView
          agar form kontak tidak tertutup keyboard saat mengetik */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ____________________________________________
          SECTION PROFIL
          Komponen: View, Text, Image
          ____________________________________________ */}
        {/*  onLayout menyimpan posisi Y section "Info" agar tab bisa scroll ke sini */}
        <View
          style={styles.profileSection}
          onLayout={(e) => { sectionY.Info = e.nativeEvent.layout.y; }}
        >

          {/* 3. Image = foto profil dari URL internet */}
          {/*  Image diganti Animated.Image + style transform scale untuk animasi */}
          <Animated.Image
             source={require('./assets/jijahhh.jpeg')} 
            style={[styles.avatar, { transform: [{ scale: avatarScale }] }]}
            // resizeMode menentukan cara gambar menyesuaikan ukuran
            // 'cover' = memenuhi area (mungkin terpotong)
            // 'contain' = semua terlihat (mungkin ada ruang kosong)
          />
          {/* Conditional rendering: badge hanya tampil jika openToWork = true */}
          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🟩 Open to Work</Text>
            </View>
          )}
          {/* 2. Text = berbagai ukuran & weight */}
          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          {/* Info kontak dalam baris horizontal */}
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
          </View>
          <Text style={styles.contactItem}>📞 {PROFILE.phone}</Text>
          
          {/* 9. TouchableOpacity - tombol sosial media */}
          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.socialBtn}
                onPress={() => handleSocialPress(s)} // ✨ TAMBAHAN: tampilkan popup link, ganti dari Alert.alert
                activeOpacity={0.8}
              >
                <Text style={styles.socialIcon}>{s.icon}</Text>
                <Text style={styles.socialLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 10. Pressable - tombol dengan efek saat ditekan */}
          <Pressable
            // style bisa berupa fungsi yang menerima { pressed }
            style={({ pressed }) => [
              styles.downloadBtn,
              pressed && styles.downloadBtnPressed, // style tambahan saat ditekan
            ]}
            onPressIn={() => setPressing(true)}
            onPressOut={() => setPressing(false)}
            onPress={() => Alert.alert('Download', 'CV sedang diunduh...')}
          >
            <Text style={styles.downloadBtnText}>
              {pressing ? '⏳ Mengunduh...' : '📄 Download CV (PDF)'}
            </Text>
          </Pressable>
        </View>
        
        {/* 11. FlatList - menampilkan daftar data secara efisien */}
        {/*  onLayout menyimpan posisi Y section "Skills" */}
        <View
          style={styles.sectionBox}
          onLayout={(e) => { sectionY.Skills = e.nativeEvent.layout.y; }}
        >
          <Text style={styles.sectionTitle}>Keahlian</Text>
          <Text style={styles.sectionSubtitle}>
            FlatList digunakan untuk menampilkan daftar data secara efisien
          </Text>
          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SkillCard item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (<View style={{ height: 8 }} />)}
          />
        </View>
        
        {/* 12. SectionList - menampilkan data per kategori */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Riwayat</Text>
          <Text style={styles.sectionSubtitle}>
            SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
          </Text>
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TimelineCard item={item} onPress={() => handleCardPress(item)} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (<View style={{ height: 8 }} />)}
            SectionSeparatorComponent={() => (<View style={{ height: 16 }} />)}
          />
        </View>
        
        {/*  onLayout menyimpan posisi Y section "Kontak" */}
        <View
          style={styles.sectionBox}
          onLayout={(e) => { sectionY.Kontak = e.nativeEvent.layout.y; }}
        >
          <Text style={styles.sectionTitle}>▸ Hubungi Saya</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ TextInput, Button, ActivityIndicator
          </Text>

          {/* 7. TextInput → input nama (single line) */}
          <TextInput
            style={styles.textInput}
            placeholder="Nama Anda"
            placeholderTextColor="#888"
            value={senderName}
            onChangeText={setSenderName}
            returnKeyType="next"
            editable={!sending}
          />

          {/* 7. TextInput → input pesan (multiline = seperti textarea) */}
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Tulis pesan Anda di sini..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!sending}
          />

          {/* Kondisi: tampilkan loading atau tombol kirim */}
          {sending ? (
            // 13. ActivityIndicator → spinner saat proses
            <View style={styles.loadingRow}>
              <ActivityIndicator size="large" color="#7c3aed" />
              <Text style={styles.loadingText}>Mengirim pesan...</Text>
            </View>
          ) : (
            // 8. Button → tombol standar React Native
            <Button
              title="Kirim Pesan"
              color="#7c3aed"        // warna tombol
              onPress={handleSend}   // handler saat ditekan
            />
          )}
        </View>

      </ScrollView>
      </KeyboardAvoidingView>
      {/* akhir pembungkus KeyboardAvoidingView  */}
      
      {/* 14. Modal - dialog pop-up */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>{selectedItem.period}</Text>
                <Text style={styles.modalDivider}>────────────</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCloseBtnText}>Tutup</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/*  Modal popup Link — muncul saat tombol sosmed (GitHub/Instagram/Portfolio) ditekan */}
      <Modal
        visible={socialModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSocialModalVisible(false)}
      >
        <View style={styles.socialModalOverlay}>
          <View style={styles.socialModalBox}>
            <Text style={styles.socialModalIcon}>🔗 Link</Text>
            <Text style={styles.socialModalUrl}>{selectedSocial?.url}</Text>
            <TouchableOpacity
              style={styles.socialModalCloseBtn}
              onPress={() => setSocialModalVisible(false)}
            >
              <Text style={styles.socialModalCloseText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );

}

const COLORS = {
  bg: '#0f0f1a',          // latar belakang
  card: '#1a1a2e',        // kartu/panel
  cardBorder: '#2d2d44',  // border kartu
  accent: '#7c3aed',      // ungu utama
  accentLight: '#a78bfa', // ungu muda
  accentGold: '#f59e0b',  // emas
  text: '#f0f0f0',        // teks utama
  textMuted: '#9ca3af',   // teks redup
  textDim: '#6b7280',     // teks sangat redup
  success: '#4ade80',     // hijau
  white: '#ffffff',
};

const styles = StyleSheet.create({
  // —— LAYOUT DASAR ——
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },


headerBar: {
  backgroundColor: '#1a1a2e',
  paddingHorizontal: 20,
  paddingVertical: 14,
  flexDirection: 'row',              // anak tersusun
  justifyContent: 'space-between',   // ujung kiri & kanan
  alignItems: 'center',              // rata tengah vertikal
  borderBottomWidth: 1,
  borderBottomColor: COLORS.cardBorder,
  elevation: 4,                      // bayangan (Android)
  shadowColor: '#000',               // bayangan (iOS)
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},
headerTitle: {
  color: COLORS.white,
  fontSize: 18,
  fontWeight: '700',
  letterSpacing: 0.5,
},
switchRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8, // jarak antar anak
},
switchLabel: {
  color: COLORS.textMuted,
  fontSize: 12,
  fontWeight: '600',
},
profileSection: {
    alignItems: 'center',              // rata tengah horizontal
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,        // sudut kiri bawah melengkung
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
},
avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,                  // lingkaran (width/2)
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
},
badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
    },
    badgeText: {
      color: COLORS.success,
      fontSize: 12,
      fontWeight: '700',
    },
    profileName: {
      color: COLORS.white,
      fontSize: 26,
      fontWeight: '800',
      textAlign: 'center',
    },
    profileTitle: {
      color: COLORS.accentLight,
      fontSize: 14,
      fontWeight: '600',
      marginTop: 4,
      marginBottom: 14,
      textAlign: 'center',
    },
    profileBio: {
      color: COLORS.textMuted,
      fontSize: 13,
      lineHeight: 20,              // tinggi tiap baris teks
      textAlign: 'center',
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 6,             // bungkus ke baris baru jika tidak muat
    },
    contactItem: {
      color: COLORS.textMuted,
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 4,
    },

    socialRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
      marginBottom: 20,
    },
    socialBtn: {
      alignItems: 'center',
      backgroundColor: '#16213e',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
    },
    socialIcon: {
      fontSize: 20,
      marginBottom: 4,
    },
    socialLabel: {
      color: COLORS.accentLight,
      fontSize: 11,
      fontWeight: '600',
    },

    downloadBtn: {
      backgroundColor: COLORS.accent,
      paddingVertical: 14,
      paddingHorizontal: 36,
      borderRadius: 50, // pill shape
      elevation: 4,
      shadowColor: COLORS.accent,
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
    },
    downloadBtnPressed: {
      backgroundColor: '#5b21b6', // lebih gelap saat ditekan
    },
    downloadBtnText: {
      color: COLORS.white,
      fontWeight: '700',
      fontSize: 14,
    },

    sectionBox: {
      marginHorizontal: 16,
      marginBottom: 16,
      backgroundColor: COLORS.card,
      borderRadius: 16,
      padding: 18,
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
    },
    sectionTitle: {
      color: COLORS.white,
      fontSize: 17,
      fontWeight: '700',
      marginBottom: 4,
    },
    sectionSubtitle: {
      color: COLORS.textDim,
      fontSize: 11,
      fontStyle: 'italic',
      marginBottom: 16,
    },
    sectionHeader: {
      backgroundColor: '#0f172a',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: COLORS.accent,
    },
    sectionHeaderText: {
      color: COLORS.accentLight,
      fontWeight: '700',
      fontSize: 13,
    },

    skillCard: {
      backgroundColor: '#16213e',
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
    },
    skillHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
    skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
    progressBg: {
      height: 6,
      backgroundColor: '#0f172a',
      borderRadius: 4,
      overflow: 'hidden', // clip anak yang melampaui batas
    },
    progressFill: {
      height: 6,
      borderRadius: 4,
      // width & backgroundColor diset secara inline (dinamis dari data)
    },
    timelineCard: {
      flexDirection: 'row',
      backgroundColor: '#16213e',
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
    },
    timelineDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: COLORS.accent,
      marginTop: 4,
      marginRight: 12,
    },
    timelineContent: { flex: 1 },
    timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
    timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
    timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
    timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },

    textInput: {
      backgroundColor: '#0f172a',
      color: COLORS.text,
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
      borderRadius: 10,
      paddingHorizontal: 14,
      // Platform.OS membedakan iOS dan Android
      paddingVertical: Platform.OS === 'ios' ? 14 : 10,
      fontSize: 14,
      marginBottom: 12,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top', // teks mulai dari atas
    },

    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 10,
    },
    loadingText: {
      color: COLORS.accentLight,
      fontSize: 14,
      fontWeight: '600',
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.75)',   // hitam transparan
      justifyContent: 'flex-end',            // konten di bawah
    },
    modalBox: {
      backgroundColor: '#1e1b4b',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 28,
      borderTopWidth: 3,
      borderColor: COLORS.accent,
    },
    modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
    modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
    modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
    modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
    modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
    modalCloseBtn: {
      backgroundColor: COLORS.accent,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

    //  style untuk Tab Bar Navigasi
    tabBar: {
      flexDirection: 'row',
      backgroundColor: COLORS.card,
      marginHorizontal: 16,
      marginTop: 12,
      borderRadius: 12,
      padding: 4,
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
    },
    tabBtn: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    tabBtnActive: {
      backgroundColor: COLORS.accent,
    },
    tabBtnText: {
      color: COLORS.textMuted,
      fontSize: 13,
      fontWeight: '600',
    },
    tabBtnTextActive: {
      color: COLORS.white,
      fontWeight: '700',
    },

    //  style untuk popup Link (saat tombol sosmed ditekan)
    socialModalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.75)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    socialModalBox: {
      backgroundColor: '#1e1b4b',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: COLORS.accent,
      padding: 24,
      alignItems: 'center',
      width: '100%',
    },
    socialModalIcon: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 14,
    },
    socialModalUrl: {
      color: COLORS.accentLight,
      fontSize: 13,
      marginBottom: 22,
      textAlign: 'center',
    },
    socialModalCloseBtn: {
      backgroundColor: COLORS.accent,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      width: '100%',
    },
    socialModalCloseText: {
      color: COLORS.white,
      fontWeight: '700',
      fontSize: 14,
    },

});