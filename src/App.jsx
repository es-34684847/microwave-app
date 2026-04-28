import { useMemo, useState } from "react";

export default function App() {
  const wattOptions = [500, 600, 700, 800, 1000];

  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["C", "0", "⌫"],
  ];

  // 👑 デフォルト0秒
  const [input, setInput] = useState("");
  const [fromW, setFromW] = useState(600);
  const [toW, setToW] = useState(500);
  const [showModal, setShowModal] = useState(false);

  // 入力処理
  const handleKey = (key) => {
    if (key === "C") return setInput("");
    if (key === "⌫") return setInput((v) => v.slice(0, -1));
    if (input.length >= 4) return;
    setInput((v) => (v === "0" ? key : v + key));
  };

  // 入力 → 時間変換
  const parse = (val) => {
    if (!val) return { min: 0, sec: 0, total: 0 };
    const num = parseInt(val, 10);
    let min = Math.floor(num / 100);
    let sec = num % 100;
    min += Math.floor(sec / 60);
    sec = sec % 60;
    return { min, sec, total: min * 60 + sec };
  };

  const inputTime = useMemo(() => parse(input), [input]);

  // 👑 変換
  const converted = useMemo(() => {
    if (!inputTime.total) return { min: 0, sec: 0 };

    let sec = Math.floor(inputTime.total * (fromW / toW));

    // 👑 5秒単位で切り下げ
    sec = Math.floor(sec / 5) * 5;

    return {
      min: Math.floor(sec / 60),
      sec: sec % 60,
    };
  }, [inputTime, fromW, toW]);

  const fmt = (m, s) => `${m}分${String(s).padStart(2, "0")}秒`;

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", paddingBottom: 140 }}>
      <h2 style={{ textAlign: "center" }}>電子レンジ換算</h2>

      {/* 元W */}
      <div>
        <p>元のW数</p>
        {wattOptions.map((w) => (
          <button key={w} onClick={() => setFromW(w)}>
            {w}W
          </button>
        ))}
      </div>

      {/* 時間 */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <div style={{ fontSize: 48 }}>
          {input ? `${inputTime.min}:${String(inputTime.sec).padStart(2, "0")}` : "0:00"}
        </div>
        <div>{fmt(inputTime.min, inputTime.sec)}</div>
      </div>

      {/* テンキー */}
      <div style={{ width: "90%", margin: "20px auto" }}>
        {keypad.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 10 }}>
            {row.map((k) => (
              <button
                key={k}
                onClick={() => handleKey(k)}
                style={{ flex: 1, height: 60 }}
              >
                {k}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* 変換先 */}
      <div>
        <p>変換先W数</p>
        {wattOptions.map((w) => (
          <button key={w} onClick={() => setToW(w)}>
            {w}W
          </button>
        ))}
      </div>

      {/* 👑 ホーム画面導線 */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <span
          onClick={() => setShowModal(true)}
          style={{ fontSize: 12, color: "#666", cursor: "pointer" }}
        >
          ホーム画面に追加できます
        </span>
      </div>

      {/* 👑 広告枠（ここに楽天貼る） */}
      <div style={{ marginTop: 10, textAlign: "center" }}>
        {/* 楽天ウィジェットここに貼る */}
      </div>

      {/* 👑 結果固定 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #ccc",
          padding: 12,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 14, textAlign: "right" }}>
          {fromW}Wで{fmt(inputTime.min, inputTime.sec)}
        </div>
        <div style={{ fontSize: 32, fontWeight: "bold" }}>
          {toW}Wなら {fmt(converted.min, converted.sec)}
        </div>
      </div>

      {/* 👑 モーダル */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              maxWidth: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>ホーム画面に追加</h3>

            <p><b>iPhone</b></p>
            <p>共有 → ホーム画面に追加</p>

            <p><b>Android</b></p>
            <p>︙ → ホーム画面に追加</p>

            <button onClick={() => setShowModal(false)}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}