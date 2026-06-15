// Centralised mock data — gives every page the populated, lived-in feel.
// Replace with Supabase queries page-by-page as content goes live.

// ─── CTF CHALLENGES ───
export interface MockCTF {
  id: string;
  title: string;
  category: "web" | "crypto" | "forensic" | "pwn" | "osint" | "misc";
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  solves: number;
  description: string;
  solved?: boolean;
}

export const MOCK_CTFS: MockCTF[] = [
  { id: "web-01", title: "ソースを読め", category: "web", difficulty: "Easy", points: 100, solves: 287, description: "HTMLコメントに残された秘密を見つけよ。view-source は友達。", solved: true },
  { id: "crypto-01", title: "シーザー暗号を解読", category: "crypto", difficulty: "Easy", points: 100, solves: 196, description: "シフト数 3 の古典暗号。歴史的暗号の入門。", solved: true },
  { id: "web-02", title: "Cookie Monster — Session Hijack", category: "web", difficulty: "Medium", points: 150, solves: 89, description: "XSS で奪った Cookie を使って管理者になりすませ。HttpOnly フラグの罠を回避できるか。" },
  { id: "web-03", title: "SQL インジェクション — 認証バイパス", category: "web", difficulty: "Medium", points: 200, solves: 112, description: "脆弱なログインフォームを突破して管理者権限を奪取せよ。' OR 1=1-- の応用。" },
  { id: "forensic-01", title: "侵入者を割り出せ", category: "forensic", difficulty: "Easy", points: 150, solves: 154, description: "SSH ログから攻撃者の IP・タイミング・成功した認証を特定せよ。", solved: true },
  { id: "pwn-01", title: "Buffer Overflow 101", category: "pwn", difficulty: "Medium", points: 250, solves: 67, description: "スタックバッファオーバーフローの基本。win() 関数にジャンプせよ。" },
  { id: "crypto-02", title: "ハッシュを割れ", category: "crypto", difficulty: "Medium", points: 200, solves: 89, description: "MD5 レインボーテーブルを使った辞書攻撃の実践。" },
  { id: "osint-01", title: "WHOIS 調査", category: "osint", difficulty: "Easy", points: 100, solves: 203, description: "ドメイン登録情報から関係者を特定する OSINT の基本。", solved: true },
  { id: "misc-01", title: "バイナリ解析", category: "misc", difficulty: "Easy", points: 100, solves: 176, description: "ASCII 変換と単純なエンコーディングの理解。", solved: true },
  { id: "web-04", title: "XSS 反射型", category: "web", difficulty: "Medium", points: 200, solves: 91, description: "URL パラメータに JavaScript を注入して Cookie を奪取せよ。" },
  { id: "forensic-02", title: "ファイル復元", category: "forensic", difficulty: "Medium", points: 200, solves: 77, description: "削除されたファイルを復元してフラグを取り出せ。" },
  { id: "pwn-02", title: "ROP ガジェット連結", category: "pwn", difficulty: "Hard", points: 500, solves: 23, description: "Return Oriented Programming で ASLR + NX を回避せよ。" },
];

// ─── CVE FEED ───
export interface MockCVE {
  id: string;
  cvss: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  vendor: string;
  description: string;
  published: string;
  kev: boolean;
}

export const MOCK_CVES: MockCVE[] = [
  { id: "CVE-2026-0998", cvss: "9.1", severity: "Critical", vendor: "OpenSSL / 3.x", description: "X.509 証明書解析中のバッファオーバーフロー。任意コード実行が可能。", published: "6/8", kev: true },
  { id: "CVE-2026-0987", cvss: "8.1", severity: "High", vendor: "WordPress / 6.x", description: "管理ダッシュボードの XSS 脆弱性。権限昇格に悪用可能。", published: "6/7", kev: false },
  { id: "CVE-2026-0844", cvss: "7.5", severity: "High", vendor: "Drupal / 10.x", description: "コアモジュールの SQLi。認証なしで DB 全体を抽出可能。", published: "6/5", kev: false },
  { id: "CVE-2026-0712", cvss: "6.5", severity: "Medium", vendor: "Joomla / 4.x", description: "CSRF トークンバイパス。権限外の操作が可能。", published: "6/3", kev: false },
  { id: "CVE-2026-0634", cvss: "5.4", severity: "Medium", vendor: "nginx / 1.24", description: "alias ディレクティブのパストラバーサル。ファイル露出の恐れ。", published: "5/30", kev: false },
  { id: "CVE-2026-0412", cvss: "3.7", severity: "Low", vendor: "OpenSSH / 9.x", description: "公開鍵認証のタイミングリーク。実用的な悪用は現時点で不明。", published: "5/25", kev: false },
];

// ─── LAB MISSIONS ───
export interface MockLab {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  status: "active" | "completed" | "todo";
}

export const MOCK_LABS: MockLab[] = [
  { id: "RECON-01", title: "ネットワーク偵察", description: "nmap · ポートスキャン · サービス特定", category: "Network", color: "#22C55E", status: "active" },
  { id: "FORENSIC-01", title: "ログ解析", description: "auth.log · 侵入者の特定", color: "#F59E0B", category: "Forensic", status: "completed" },
  { id: "CRYPTO-01", title: "暗号解読", description: "Base64 · Caesar · XOR", color: "#8B5CF6", category: "Crypto", status: "todo" },
  { id: "WEB-01", title: "Web 侵入テスト", description: "SQLi · XSS · Cookie 改ざん", color: "#2B7FFF", category: "Web", status: "todo" },
  { id: "PWN-01", title: "Buffer Overflow", description: "スタック BOF · win() ジャンプ", color: "#EF4444", category: "Pwn", status: "todo" },
  { id: "OSINT-01", title: "情報収集", description: "WHOIS · SNS · GitHub recon", color: "#F4564A", category: "OSINT", status: "todo" },
];

// ─── ARTICLES ───
export interface MockArticle {
  slug: string;
  title: string;
  field: string;
  level: string;
  readMin: number;
  views: number;
}

export const MOCK_ARTICLES: MockArticle[] = [
  { slug: "sqli-basics", title: "SQL インジェクションの仕組み", field: "Web", level: "L1", readMin: 12, views: 1248 },
  { slug: "csrf-token", title: "CSRF 完全ガイド — Token の役割", field: "Web", level: "L2", readMin: 14, views: 892 },
  { slug: "burp-repeater", title: "Burp Suite 実践 — Repeater を使い倒す", field: "Web", level: "L2", readMin: 18, views: 1024 },
  { slug: "jwt-attacks", title: "JWT 攻撃 — alg:none と弱い秘密鍵", field: "Web", level: "L3", readMin: 16, views: 743 },
  { slug: "linux-perms", title: "Linux パーミッション — SUID の闇", field: "Linux", level: "L1", readMin: 10, views: 1502 },
  { slug: "suid-priv-esc", title: "SUID で権限昇格 — 設定不備を突く", field: "Linux", level: "L3", readMin: 22, views: 678 },
  { slug: "nmap-flags", title: "Nmap のフラグを理解する", field: "Network", level: "L1", readMin: 15, views: 2103 },
  { slug: "wireshark-tls", title: "Wireshark で TLS を復号", field: "Network", level: "L3", readMin: 24, views: 521 },
  { slug: "caesar-vigenere", title: "古典暗号 — Caesar と Vigenère", field: "Crypto", level: "L1", readMin: 11, views: 891 },
  { slug: "rsa-attacks", title: "RSA への古典的攻撃", field: "Crypto", level: "L3", readMin: 28, views: 412 },
  { slug: "bof-101", title: "Buffer Overflow の基礎", field: "Pwn", level: "L1", readMin: 25, views: 567 },
  { slug: "memory-dump", title: "メモリダンプ解析入門", field: "Forensic", level: "L2", readMin: 20, views: 389 },
];

// ─── TOOLS ───
export interface MockTool {
  id: string;
  emoji: string;
  name: string;
  category: string;
  description: string;
  rating: string;
  color: string;
  license: string;
  users: string;
  cmd: string;
}

export const MOCK_TOOLS: MockTool[] = [
  { id: "nmap", emoji: "🔍", name: "Nmap", category: "スキャン", description: "ポート発見・サービス検出・OS 指紋採取の標準ツール。25 年の歴史。", rating: "★★★★★", color: "#22C55E", license: "GPL v2", users: "2.8M", cmd: "nmap -sV -p- target.local" },
  { id: "burp", emoji: "🐛", name: "Burp Suite", category: "Web テスト", description: "Web セキュリティテスト用プロキシ。HTTP の傍受・改ざん・リプレイ。", rating: "★★★★★", color: "#F59E0B", license: "Pro $449/年", users: "1.5M", cmd: "burpsuite &" },
  { id: "metasploit", emoji: "⚔️", name: "Metasploit", category: "エクスプロイト", description: "エクスプロイトフレームワークの代名詞。2,000+ モジュール内蔵。", rating: "★★★★★", color: "#EF4444", license: "Open", users: "1.2M", cmd: "msfconsole" },
  { id: "wireshark", emoji: "📡", name: "Wireshark", category: "ネット解析", description: "ネットワークパケット解析。プロトコル 3,000 以上に対応。", rating: "★★★★☆", color: "#00D4FF", license: "GPL v2", users: "900K", cmd: "wireshark -i eth0" },
  { id: "sqlmap", emoji: "💉", name: "SQLMap", category: "Web テスト", description: "SQL インジェクションの自動検出・エクスプロイトツール。", rating: "★★★★☆", color: "#00D4FF", license: "GPL", users: "520K", cmd: 'sqlmap -u "http://t/p?id=1" --dbs' },
  { id: "gobuster", emoji: "🔓", name: "Gobuster", category: "偵察", description: "ディレクトリ・サブドメインのブルートフォース探索。", rating: "★★★★☆", color: "#8B5CF6", license: "MIT", users: "450K", cmd: "gobuster dir -u http://t -w wordlist" },
  { id: "john", emoji: "🔑", name: "John the Ripper", category: "パスワード", description: "オフラインパスワードクラッカーの古参。多形式対応。", rating: "★★★★☆", color: "#F4564A", license: "GPL", users: "380K", cmd: "john --wordlist=rockyou.txt hashes.txt" },
  { id: "hashcat", emoji: "⚡", name: "Hashcat", category: "パスワード", description: "GPU を使った世界最速クラスのハッシュクラッカー。", rating: "★★★★☆", color: "#F59E0B", license: "MIT", users: "420K", cmd: "hashcat -m 0 -a 0 hashes.txt wordlist" },
  { id: "aircrack", emoji: "📶", name: "Aircrack-ng", category: "ネット解析", description: "Wi-Fi セキュリティ評価ツール群。WEP/WPA 解析。", rating: "★★★☆☆", color: "#22C55E", license: "GPL", users: "290K", cmd: "airmon-ng start wlan0" },
];

// ─── FORUM POSTS ───
export const MOCK_POSTS = [
  { title: "XSS フィルタリングの回避手法 — WAF バイパスの実践", user: "hacker_user", category: "Web セキュリティ", time: "2時間前", likes: 12, replies: 5, views: 342, color: "#00D4FF" },
  { title: "リバースエンジニアリング独学ロードマップ", user: "0xFreedom", category: "一般討論", time: "3時間前", likes: 8, replies: 3, views: 198, color: "#22C55E" },
  { title: "今週末 HTB 形式 CTF 参加者募集!", user: "sec_analyst", category: "CTF ヘルプ", time: "5時間前", likes: 15, replies: 7, views: 287, color: "#F59E0B" },
  { title: "CVE-2026-1024 Apache 実践的な悪用方法", user: "cyber_ninja", category: "Web セキュリティ", time: "1日前", likes: 6, replies: 4, views: 156, color: "#EF4444" },
  { title: "2026 年版バグバウンティ偵察ツールまとめ", user: "pwn_master", category: "バグバウンティ", time: "1日前", likes: 21, replies: 9, views: 412, color: "#8B5CF6" },
  { title: "Burp 拡張機能おすすめ 10 選", user: "web_warrior", category: "ツールと技術", time: "2日前", likes: 18, replies: 11, views: 523, color: "#00D4FF" },
];

// ─── LEADERBOARD ───
export const MOCK_LEADERS = [
  { rank: 1, name: "recon_master", level: 47, xp: 89240, solves: 286, streak: 142, rank_name: "💀 エキスパート", delta: "+8" },
  { rank: 2, name: "0xDEADBEEF", level: 44, xp: 78950, solves: 254, streak: 98, rank_name: "🦅 ハンター", delta: "+3" },
  { rank: 3, name: "shell_getter", level: 42, xp: 71300, solves: 231, streak: 156, rank_name: "🦅 ハンター", delta: "+1" },
  { rank: 4, name: "cyber_ninja", level: 39, xp: 62100, solves: 198, streak: 64, rank_name: "🦅 ハンター", delta: "+5" },
  { rank: 5, name: "pwn_master", level: 37, xp: 56800, solves: 187, streak: 89, rank_name: "⚙️ オペレーター", delta: "-1" },
  { rank: 6, name: "sec_analyst", level: 35, xp: 52000, solves: 169, streak: 41, rank_name: "⚙️ オペレーター", delta: "+2" },
  { rank: 7, name: "web_warrior", level: 33, xp: 47200, solves: 154, streak: 28, rank_name: "⚙️ オペレーター", delta: "0" },
  { rank: 8, name: "crypto_kid", level: 31, xp: 42800, solves: 142, streak: 73, rank_name: "🔬 解析者", delta: "+4" },
  { rank: 9, name: "kali_user", level: 29, xp: 38900, solves: 128, streak: 22, rank_name: "🔬 解析者", delta: "-2" },
  { rank: 10, name: "hacker_user", level: 28, xp: 36500, solves: 119, streak: 56, rank_name: "🔬 解析者", delta: "+1" },
];

// ─── NEWS ───
export const MOCK_NEWS = [
  { title: "MOVEit Transfer に新たな RCE 脆弱性、Cl0p ランサムウェアが悪用", source: "CISA", time: "2時間前", color: "#EF4444", category: "ランサムウェア" },
  { title: "Microsoft、6月の Patch Tuesday で 51 件の脆弱性を修正", source: "BleepingComputer", time: "5時間前", color: "#00D4FF", category: "パッチ" },
  { title: "国内大手 SaaS で顧客情報 12 万件流出、SQL インジェクションが原因", source: "JVN", time: "8時間前", color: "#EC4899", category: "国内" },
  { title: "Lazarus グループ、新たな npm 供給チェーン攻撃を展開", source: "The Hacker News", time: "12時間前", color: "#F59E0B", category: "APT" },
  { title: "EU AI Act が施行、セキュリティ要件の詳細が明らかに", source: "Schneier on Security", time: "昨日", color: "#8B5CF6", category: "規制" },
  { title: "新型バンキングトロイ「Coyote」、Brazil で銀行 60 行を標的に", source: "Krebs on Security", time: "昨日", color: "#22C55E", category: "マルウェア" },
];

// ─── GLOSSARY (sample terms) ───
export const MOCK_GLOSSARY = [
  { term: "SQL インジェクション", short: "SQLi", category: "攻撃手法", color: "#EF4444", def: "Web アプリケーションの入力欄に悪意のある SQL を注入し、データベースを不正操作する攻撃。" },
  { term: "XSS", short: "Cross-Site Scripting", category: "攻撃手法", color: "#EF4444", def: "Web ページに悪意のあるスクリプトを埋め込み、訪問者のブラウザで実行させる攻撃。" },
  { term: "CSRF", short: "Cross-Site Request Forgery", category: "攻撃手法", color: "#EF4444", def: "認証済みユーザーになりすまして意図しないリクエストを送信させる攻撃。" },
  { term: "CVSS", short: "Common Vulnerability Scoring System", category: "標準・規格", color: "#94A3B8", def: "脆弱性の深刻度を 0.0〜10.0 で評価する業界標準スコアリング。" },
  { term: "KEV", short: "Known Exploited Vulnerabilities", category: "標準・規格", color: "#94A3B8", def: "CISA が管理する、実際の攻撃で悪用が確認された脆弱性のカタログ。" },
  { term: "MFA", short: "Multi-Factor Authentication", category: "防御技術", color: "#22C55E", def: "パスワード以外に追加の認証要素を要求する仕組み。2FA はその一形態。" },
  { term: "Zero Trust", short: "Zero Trust Architecture", category: "防御技術", color: "#22C55E", def: "「決して信頼せず、常に検証する」を基本原則とするセキュリティモデル。" },
  { term: "RSA", short: "Rivest-Shamir-Adleman", category: "暗号", color: "#8B5CF6", def: "公開鍵暗号方式の代表。素因数分解の困難性を安全性の根拠とする。" },
  { term: "AES", short: "Advanced Encryption Standard", category: "暗号", color: "#8B5CF6", def: "現代の対称鍵暗号の標準。128/192/256 bit の鍵長をサポート。" },
  { term: "TLS", short: "Transport Layer Security", category: "プロトコル", color: "#2B7FFF", def: "通信路を暗号化するプロトコル。HTTPS の土台。SSL の後継。" },
  { term: "OAuth 2.0", short: "Open Authorization", category: "認証 / 認可", color: "#F59E0B", def: "サードパーティに権限を委譲する認可フレームワーク。" },
  { term: "JWT", short: "JSON Web Token", category: "認証 / 認可", color: "#F59E0B", def: "署名付き JSON でクライアント・サーバ間の認証情報を運ぶ仕組み。" },
];

// ─── COMMUNITY STATS ───
export const MOCK_COMMUNITY_STATS = {
  online: 234,
  totalUsers: 8420,
  todayPosts: 47,
  weekReplies: 312,
  totalThreads: 1248,
  solvedQA: 891,
};
