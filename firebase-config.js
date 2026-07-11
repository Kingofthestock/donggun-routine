/* ============================================================
   Firebase 설정 — 클라우드 자동 동기화용

   Firebase 콘솔 → 프로젝트 설정(톱니) → 일반 → 내 앱 → SDK 설정에 나오는
   firebaseConfig 객체를 아래 null 자리에 붙여넣으면 동기화가 켜져요.

   이 값들은 비밀번호가 아니라 공개해도 되는 식별자예요 —
   실제 보안은 Firestore 보안 규칙 + 승인된 도메인이 담당합니다.

   예시:
   window.FIREBASE_CONFIG = {
     apiKey: "AIza....",
     authDomain: "donggun-routine.firebaseapp.com",
     projectId: "donggun-routine",
     storageBucket: "donggun-routine.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   };
   ============================================================ */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAKg8b2b8WQYF_yyA6bbPqFUnEQUGMj5NY",
  authDomain: "donggun-routine.firebaseapp.com",
  projectId: "donggun-routine",
  storageBucket: "donggun-routine.firebasestorage.app",
  messagingSenderId: "589123901967",
  appId: "1:589123901967:web:3232f7c01d64afac57a17a"
};
