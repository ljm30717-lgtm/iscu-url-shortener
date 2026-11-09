"use client";
import { useState } from "react";
export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function shorten(event) {
    event.preventDefault(); setBusy(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/shorten", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ originalUrl: url }) });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error?.message ?? "단축에 실패했습니다.");
      setResult(body);
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  return <main>
    <h1>🔗 URL Shortener</h1>
    <p>긴 인터넷 주소를 간단한 6자리 주소로 단축합니다.</p>
    <form onSubmit={shorten}>
      <input type="url" placeholder="https://example.com/long-url" value={url} onChange={e => setUrl(e.target.value)} aria-label="원본 URL" required />
      <button disabled={busy}>{busy ? "처리 중..." : "주소 단축"}</button>
    </form>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result"><strong>단축 완료!</strong><p><a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a></p><button onClick={() => navigator.clipboard.writeText(result.shortUrl)}>주소 복사</button></div>}
    <p className="muted">HTTP/HTTPS 주소만 지원하며, 이 서비스 자신의 주소는 단축할 수 없습니다.</p>
  </main>;
}
