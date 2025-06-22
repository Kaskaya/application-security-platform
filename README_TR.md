# Application Security Platform

Bu proje, uygulama güvenliği yönetimi için geliştirilmiş modern bir web platformudur. Güvenlik açıklarını izleme, analiz etme ve raporlama özellikleri sunar.

## 🚀 Canlı Demo

**Canlı URL:** url

## 🛠️ Teknoloji Seçimleri

### Frontend Framework

- **Next.js 15**: React tabanlı full-stack framework
  - Server-side rendering (SSR) ve static site generation (SSG) desteği
  - Otomatik kod bölümleme ve optimizasyon
  - App Router ile modern routing sistemi

### UI/UX Kütüphaneleri

- **Tailwind CSS**
  - Hızlı geliştirme ve tutarlı tasarım
  - Responsive tasarım desteği
- **Lucide React**: Modern ikon kütüphanesi
- **React Icons**: Geniş ikon koleksiyonu
- **Finisher.co Animations**: Finisher.co kütüphanesini kullanarak dinamik arkaplan parçacık animasyonu

#### Glassmorphism Efekti

- **Backdrop Blur**: Modern glassmorphism tasarımı ile şeffaf kartlar
- **Border Opacity**: Subtle border efektleri ile derinlik hissi
- **Shadow Sistemi**: Katmanlı gölge sistemi ile 3D görünüm

### State Management

- **Zustand**: Hafif ve performanslı state management

### Authentication

- **NextAuth.js**: Güvenli kimlik doğrulama sistemi

### Data Visualization

- **Recharts**: React için güçlü grafik kütüphanesi
  - Güvenlik metriklerini görselleştirme
  - Responsive grafikler

## 🚀 Projeyi Çalıştırma

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum

1. **Projeyi klonlayın:**

```bash
git clone https://github.com/Kaskaya/application-security-platform.git
cd application-security-platform
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın:**

```bash
npm run dev
# veya
yarn dev
```

4. **Tarayıcınızda açın:**

```
http://localhost:3000
```

## 🚀 Projeyi Nasıl çalışıyor

- Tüm proje `next-auth` ile korunmaktadır.
- İlk açılışta bir giriş (sign-in) formu görüntülenir.
- Giriş yöntemleri:
  - Credentials (kullanıcı adı ve şifre)
  - GitHub
  - Google

## Kayıt Olma

- Giriş formundaki **Sign Up** butonuna tıklayarak kayıt formuna geçebilirsiniz.
- Kayıt bilgileri `data/users.json` dosyasına kaydedilir.
- Uygulama şu anda gerçek bir veritabanı kullanmamaktadır. Local'de register çalışıyor ama Production'da veritabanı olmadığı için şu credentials'ı kullanın: Kullanıcı adı: Recep şifre:123456

## Dashboard

- Kayıt olduktan veya giriş yaptıktan sonra kullanıcı otomatik olarak **dashboard** sayfasına yönlendirilir.
- Dashboard ekranında:
  - Genel istatistikler
  - Grafikler (charts)
  - Son düzeltilmiş zaafiyetler
  - Derecesine göre zaafiyetler
- Bu panellerden zaafiyet detay sayfasına geçiş yapılabilir.

## Vulnerabilities Sayfası

- Sol menüdeki **Vulnerabilities** sekmesinden erişilir.
- Bu sayfada:
  - Zaafiyet tablosu
  - Arama, sıralama, ekleme, silme ve düzenleme işlemleri
  - JSON ve CSV dosyalarından veri içe aktarma özellikleri
- Tüm veriler `data/vulnerabilities` klasöründe saklanır.

## Zaafiyet Detay Sayfası

- Dashboard'daki panellerden veya zaafiyet tablosundan ulaşılabilir.
- Bu sayfada:
  - Zaafiyetin detaylı açıklamaları yer alır.
  - Güncelleme (edit) işlemleri yapılabilir.

## ⚠️ ÖNEMLİ NOT

> **Şu bilgilerle giriş yapabilirsiniz: kullanıcı adı: Recep şifre: 123456** > **.env.local dosyası oluşturun: .env.example dosyasını .env.local olarak kopyalayın ve kendi bilgilerinizi girin**
> 🚨 **Veritabanı henüz bağlı değil.**  
> Bu nedenle, **veri ekleme, silme, güncelleme gibi işlemler yalnızca local ortamda çalışmaktadır.**
