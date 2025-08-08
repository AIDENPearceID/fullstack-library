import Link from 'next/link';

export default function Home(){
  return (
    <div style={{maxWidth:800, margin:'30px auto', padding:20}}>
      <h1>مكتبة المحتوى الشامل — واجهة تجريبية</h1>
      <p>
        استخدم <Link href="/auth">التسجيل/تسجيل الدخول</Link> ثم اذهب إلى <Link href="/reviews">المراجعات</Link> أو <Link href="/chat">الشات</Link>.
      </p>
    </div>
  );
}
