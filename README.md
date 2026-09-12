# হাফেজী কুরআন শরীফ — Flutter

এই প্রজেক্টটি আপনার দেওয়া স্ক্রিনশটের ডার্ক-গ্রিন হোম স্ক্রিনকে রেফারেন্স ধরে বানানো একটি কাজ করা Flutter ভিত্তি।

## চালানোর নিয়ম
1. Flutter SDK ইনস্টল করুন।
2. এই ফোল্ডারে terminal খুলুন।
3. `flutter pub get`
4. `flutter run`

## নোট
- কুরআনের আরবি আয়াত `AlQuran.cloud` API থেকে লোড হয়, তাই প্রথমবার সূরা খুলতে ইন্টারনেট প্রয়োজন।
- শেষ পড়া, বুকমার্ক ও তাসবিহ কাউন্ট `shared_preferences`-এ রাখা হয়।
- ১১৪টি সূরার নাম ও আয়াত সংখ্যা UI-তে দেওয়া আছে।
- Android-এ Internet permission প্রয়োজন; Flutter-এর Android template-এ এটি যোগ করুন যদি আপনার template-এ না থাকে:
  `<uses-permission android:name="android.permission.INTERNET"/>`

## পরবর্তী production কাজ
- অফলাইন পূর্ণ কুরআন ডেটা ও বাংলা অনুবাদ bundled database-এ রাখা
- হাফেজী পৃষ্ঠা (৬০৪ পৃষ্ঠা) অনুযায়ী সঠিক page/juz mapping
- অডিও reciter + background playback
- আসল আমল/ফজিলত কনটেন্টের যাচাই করা ডেটাসেট
- font assets ও screenshot-level pixel tuning
