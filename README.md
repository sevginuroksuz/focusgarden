# FocusGarden

React Native tabanlı bir verimlilik uygulaması: Pomodoro tekniğini oyunlaştırarak kullanıcıların odaklandıkları süreyi kaydeder ve sanal bir çiçek bahçesine dönüştürerek motivasyon sağlar.

---

## İçindekiler

* [Proje](#proje)
* [Özellikler](#özellikler)
* [Ekran Açıklamaları](#ekran-açıklamaları)
* [Kurulum](#kurulum)
* [Kullanım](#kullanım)
* [Linkler](#linkler)
* [Lisans](#lisans)
* [Katkıda Bulunanlar](#katkıda-bulunanlar)
* [İletişim](#iletişim)

---

## Proje

**FocusGarden**, kullanıcıların odak sürelerini artırmayı hedefleyen, Pomodoro temelli bir mobil uygulamadır. Her çalışma seansı sonunda sanal bahçenize çiçekler eklenir veya kuruyan çiçekler görünür; böylece görsel ilerleme motivasyonunuzu pekiştirir.

---

## Mimari ve Akış Şeması

* **Mimari Diyagram**
  ![Mimari Diyagram](diagrams/architecture.png)

* **Algoritma Akış Şeması**
  ![Akış Şeması](diagrams/algorithm.drawio.png)

---

## Özellikler

* **Zamanlayıcı**: Öntanımlı 15/25/45 dakikalık seanslar.
* **Çiçek Bahçesi**: Seans sonuçlarına göre çiçek ekleme animasyonları.
* **Beyaz Gürültü Desteği**: Odağa odaklanmayı kolaylaştıran ses oynatıcı.
* **İlerleme Görselleştirme**: Günlük/haftalık/aylık çalışma grafikleri.
* **Profil ve Yer İşaretleri**: Kullanıcı bilgileri, kaydedilen gönderiler ve paylaşımlar.

---

## Ekran Açıklamaları

### 0. Açılış Ekranı (Splash)

![Splash Ekranı](screenshots/splash.jpg)

* Uygulama ilk açıldığında görünen ekran.
* Logo animasyonu ve yükleniyor göstergesi ile kullanıcı deneyimini zenginleştirir.
* Yükleme tamamlandığında otomatik olarak Ana Ekran’a yönlendirir.

### 1. Ana Ekran (Home)

![Ana Ekran](screenshots/feed.jpg)

* Görsel özet paneli: günlük toplam çalışma süresi, tamamlanan seans sayısı ve başarı yüzdesini gösterir.
* Hızlı başlat makroları: 15, 25 veya 45 dakikalık varsayılan seansları tek dokunuşla başlatma.
* Alt navigasyon çubuğu: Oluştur, Zamanlayıcı, Bahçe, Profil sekmeleri arası hızlı geçiş.
* Animasyonlu rozet animasyonu: Seans hedefine ulaşıldığında görsel geribildirim sağlar.

### 2. Zamanlayıcı (Timer)

![Zamanlayıcı](screenshots/work.jpg)

* Büyük fontta kalan süre sayacı ve çevresinde dolan progres halkası.
* Başlat/Durdur/Pas geç (skip) butonları; durumlara göre renk ve ikon değişimi.
* Sol alt köşede beyaz gürültü ses kontrolü: aç/kapat butonu ve ses seviyesi slider’ı.
* Seans tamamlandığında titreşim, bildirim ve otomatik bahçe güncelleme tetiklenir.

### 3. Oluştur (Create)

![Oluştur Ekranı](screenshots/create.jpg)

* Seans başlığı (isteğe bağlı) ve süre seçimi için form alanları (dropdown veya slider).
* Ses tercihi: beyaz gürültü, doğa sesleri veya sessiz mod seçenekleri.
* “Başlat” butonu: form validasyonu tamamlandıktan sonra aktif hale gelir.
* Kayıt ön izleme: oluşturulan seans detaylarını gösteren küçük kart sunar.

### 4. Profil (Profile)

![Profil](screenshots/profile.jpg)

* Kullanıcı profili: avatar, kullanıcı adı, toplam odak süresi ve tamamlanan seans sayısı kartı.
* Hedef takibi: günlük ve haftalık hedef yüzdesi donut grafiği ile görselleştirilir.
* Ayarlar: tema (açık/karanlık), bildirim tercihleri, ses ayarları sekmesi.
* Paylaşım paneli: seans özeti veya başarı rozeti sosyal medyada paylaşma butonu.

### 5. Yer İşaretleri (Bookmarks)

![Yer İşaretleri](screenshots/bookmark.jpg)

* Kaydedilen seanslar ve notlar listesi; her kartta tarih, süre ve kısa açıklama.
* Filtreleme ve sıralama: tarih, etiket veya başarı yüzdesine göre düzenleme.
* Hızlı silme/düzenleme ikonları: kart üzerinden işlem yapma imkânı.
* Alt kısımda popüler seans etiketlerini gösteren küçük bir şerit grafik.

### 6. Profil Bahçesi (Profile Garden)

![Profil Bahçesi](screenshots/garden.jpg)

* Yıllık ızgara görünümü: 365 hücrede her gün tamamlanan seans çiçekle gösterilir.
* Heatmap görünümü: seans sürelerine göre koyuluk seviyesi değiştiren renk skalası.
* Detaylı modal: hücreye dokununca tarih, süre ve çiçek çeşidi bilgilerini gösterir.
* Haftalık/aylık filtre: üstteki dropdown ile farklı zaman aralıklarını inceleyin.

---

## Kurulum

1. Depoyu klonlayın:

   ```bash
   git clone https://github.com/sevginuroksuz/focusgarden.git
   cd focusgarden
   ```
2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```
3. Uygulamayı başlatın:

   ```bash
   npm start
   # veya Expo ile
   expo start
   ```

---

## Kullanım

Aşağıdaki adımlar ile tüm özellikleri kullanabilirsiniz:

1. **Zamanlayıcı Kontrolü**

   * Seans ilerledikçe sanal çiçeğiniz kademeli olarak açılır; animasyonla tomurcuktan tam çiçeğe dönüşüm izlenir.
   * Sayısal gösterge, geçen süreyi net şekilde gösterir.
   * Seans başında seçilmiş beyaz gürültü veya kullanıcı ses dosyası otomatik oynatılır; ses kontrol butonuyla açma/kapatma ve ses düzeyi ayarlanabilir.

2. **Çiçek Bahçesi**

   * Seans tamamlandığında otomatik olarak bahçenize çiçek eklenir.
   * **Bahçe** sekmesinde günlük, haftalık ve aylık ilerlemenizi inceleyin.

3. **Profil Yönetimi**

   * **Profil** sekmesinden kullanıcı adı, toplam odak süresi, tamamlanan seans sayısı ve hedef ilerlemenizi görüntüleyin.
   * Çubuk grafik ile günlük, haftalık, aylık ve yıllık hedef takibini yapın.

4. **Yer İşaretleri (Bookmarks)**

   * Önemli veya beğendiğiniz gönderileri kaydedip **Yer İşaretleri** sekmesinde listeleyin.

5. **Paylaşım**

   * Seans özetlerinizi veya kazandığınız rozetleri uygulamada gönderi olarak paylaşabilirsiniz.

---

## Linkler

* **GitHub Depo:** [https://github.com/sevginuroksuz/focusgarden](https://github.com/sevginuroksuz/focusgarden)
* **YouTube Tanıtım Videosu:** [https://youtu.be/YOUR\_VIDEO\_ID](https://youtu.be/YOUR_VIDEO_ID)

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---

## Katkıda Bulunanlar
* Sevgi Nur Öksüz (Proje sahibi ve baş geliştirici)
* Katkılarınız için pull request ve issue’ları bekliyoruz.

---

## İletişim

Sevgi Nur Öksüz – GitHub: [sevginuroksuz](https://github.com/sevginuroksuz)
