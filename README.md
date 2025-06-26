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

<p align="center">
  <img src="diagrams/architecture.png" alt="Mimari Diyagram" width="80%" style="max-width:800px; height:auto;"/>
</p>

<p align="center">
  <img src="diagrams/algorithm.drawio.png" alt="Algoritma Akış Şeması" width="80%" style="max-width:800px; height:auto;"/>
</p>

---

## Özellikler

* **Zamanlayıcı**: Öntanımlı 15/25/45 dakikalık seanslar.
* **Çiçek Bahçesi**: Seans sonuçlarına göre çiçek ekleme animasyonları.
* **Beyaz Gürültü Desteği**: Odağa odaklanmayı kolaylaştıran ses oynatıcı.
* **İlerleme Görselleştirme**: Günlük/haftalık/aylık çalışma grafikleri.
* **Profil ve Yer İşaretleri**: Kullanıcı bilgileri, kaydedilen gönderiler ve paylaşımlar.

---

## Ekran Açıklamaları

---
| No | Ekran                 | Görsel                                                                                               | Açıklama                                                                                                                                                                                                                         |
|----|-----------------------|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0  | Açılış Ekranı (Splash) | <p align="center"><img src="screenshots/splash.jpg" alt="Splash" width="200" /></p>                  | - Uygulama ilk açıldığında görünen ekran.<br>- Logo animasyonu ve yükleniyor göstergesi ile kullanıcı deneyimini zenginleştirir.<br>- Yükleme tamamlandığında otomatik olarak Ana Ekran’a yönlendirir.                                 |
| 1  | Ana Ekran (Home)      | <p align="center"><img src="screenshots/feed.jpg" alt="Ana Ekran" width="200" /></p>                 | - Görsel özet paneli: günlük toplam çalışma süresi, tamamlanan seans sayısı ve başarı yüzdesi.<br>- Hızlı başlat makroları: 15, 25 veya 45 dakikalık varsayılan seansları tek dokunuşla başlatma.<br>- Alt navigasyon çubuğu.<br>- Animasyonlu rozet animasyonu. |
| 2  | Zamanlayıcı (Timer)   | <p align="center"><img src="screenshots/work.jpg" alt="Çalışma Ekranı" width="200" /></p>            | - Büyük fontta kalan süre sayacı ve çevresinde dolan progres halkası.<br>- Başlat/Durdur/Pas geç (skip) butonları; durumlara göre renk ve ikon değişimi.<br>- Sol alt köşede beyaz gürültü ses kontrolü.<br>- Seans tamamlandığında titreşim, bildirim ve bahçe güncelleme. |
| 3  | Oluştur (Create)      | <p align="center"><img src="screenshots/create.jpg" alt="Gönderi Oluşturma" width="200" /></p>       | - Seans başlığı ve süre seçimi için form alanları (dropdown/slider).<br>- Ses tercihi: beyaz gürültü, doğa sesleri veya sessiz mod.<br>- “Başlat” butonu aktifleşince seans başlar.<br>- Kayıt ön izleme kartı.                                |
| 4  | Profil (Profile)      | <p align="center"><img src="screenshots/profile.jpg" alt="Profil Ekranı" width="200" /></p>          | - Avatar, kullanıcı adı, toplam odak süresi ve tamamlanan seans sayısı kartı.<br>- Günlük/haftalık hedef takibi için donut grafiği.<br>- Ayarlar: tema, bildirim ve ses seçenekleri.<br>- Sosyal medyada paylaşım butonu.                    |
| 5  | Yer İşaretleri (Bookmarks) | <p align="center"><img src="screenshots/bookmark.jpg" alt="Yer İşaretleri" width="200" /></p>     | - Kaydedilen seanslar ve notlar listesi; tarih, süre ve kısa açıklama.<br>- Filtreleme/sıralama: tarih, etiket, başarı yüzdesi.<br>- Hızlı silme/düzenleme ikonları.<br>- Popüler seans etiketlerini gösteren şerit grafik.        |
| 6  | Profil Bahçesi (Garden)    | <p align="center"><img src="screenshots/garden.jpg" alt="Profil Bahçesi" width="200" /></p>        | - 365 hücreli yıllık ızgara: her gün çiçek ile gösterilir.<br>- Heatmap görünümü: seans sürelerine göre renk skalası.<br>- Hücreye dokununca detaylı modal.<br>- Haftalık/aylık filtre dropdown’u.                                             |

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
