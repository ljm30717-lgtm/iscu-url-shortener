import { getStats } from "../../lib/db";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  let urls = [], error = "";
  try { urls = await getStats(); } catch { error = "DB 연결을 확인하세요."; }
  return <main><h1>관리자 통계</h1><p>최근 생성된 단축 URL 및 접속 횟수</p>
    {error && <p className="error">{error}</p>}
    {urls.map(x => <div key={x.short_code} className="result" style={{marginBottom:12}}><strong>{x.short_code}</strong><p>{x.original_url}</p><span>클릭 {x.click_count}회</span></div>)}
    {!urls.length && !error && <p>생성된 URL이 없습니다.</p>}
  </main>;
}
