# Application Security Platform

Bu proje, uygulama güvenliği yönetimi için geliştirilmiş modern bir web platformudur. Güvenlik açıklarını izleme, analiz etme ve raporlama özellikleri sunar.

## 🚀 Canlı Demo

**Canlı URL:** https://application-security-platform.vercel.app/

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

### Veritabanı

- **Supabase**: PostgreSQL tabanlı backend-as-a-service
  - Gerçek zamanlı veritabanı ile otomatik API oluşturma
  - Dahili kimlik doğrulama ve yetkilendirme
  - Veri koruması için Row Level Security (RLS)

### Data Visualization

- **Recharts**: React için güçlü grafik kütüphanesi
  - Güvenlik metriklerini görselleştirme
  - Responsive grafikler

## 🚀 Projeyi Çalıştırma

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Supabase hesabı ve projesi

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

```bash
npm run dev
# veya
yarn dev
```

6. **Tarayıcınızda açın:**

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
- Kullanıcı verileri Supabase veritabanında güvenli bir şekilde saklanır.

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
- Tüm veriler Supabase veritabanında saklanır.

## Zaafiyet Detay Sayfası

- Dashboard'daki panellerden veya zaafiyet tablosundan ulaşılabilir.
- Bu sayfada:
  - Zaafiyetin detaylı açıklamaları yer alır.
  - Güncelleme (edit) işlemleri yapılabilir.
