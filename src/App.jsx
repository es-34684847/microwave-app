import { useMemo, useState } from "react";

export default function App() {
  const wattOptions = [500, 600, 700, 800, 1000];
  const keypadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["C", "0", "⌫"],
  ];

  const [fromW, setFromW] = useState(600);
  const [toW, setToW] = useState(500);
  const [input, setInput] = useState("");
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleKeyPress = (key) => {
    if (key === "C") return setInput("");
    if (key === "⌫") return setInput((prev) => prev.slice(0, -1));

    setInput((prev) => {
      if (prev.length >= 4) return prev;
      if (prev === "0") return key;
      return prev + key;
    });
  };

  const parseInputToTime = (value) => {
    if (!value) return { minutes: 0, seconds: 0, totalSeconds: 0 };

    const num = parseInt(value, 10);
    let minutes = Math.floor(num / 100);
    let seconds = num % 100;

    minutes += Math.floor(seconds / 60);
    seconds %= 60;

    return {
      minutes,
      seconds,
      totalSeconds: minutes * 60 + seconds,
    };
  };

  const formatTime = (m, s) => `${m}分${String(s).padStart(2, "0")}秒`;

  const inputTime = useMemo(() => parseInputToTime(input), [input]);

  const convertedTime = useMemo(() => {
    const raw =
      inputTime.totalSeconds === 0
        ? 0
        : Math.floor(inputTime.totalSeconds * (fromW / toW));

    // 👑 10秒刻み切り下げ
    const rounded = Math.floor(raw / 10) * 10;

    return {
      minutes: Math.floor(rounded / 60),
      seconds: rounded % 60,
    };
  }, [inputTime, fromW, toW]);

  const displayInput = input
    ? `${inputTime.minutes}:${String(inputTime.seconds).padStart(2, "0")}`
    : "0:00";

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 180 }}>
      <h2 style={{ textAlign: "center" }}>電子レンジ換算</h2>

      {/* 元W */}
      <div>
        {wattOptions.map((w) => (
          <button key={w} onClick={() => setFromW(w)}>
            {w}W
          </button>
        ))}
      </div>

      {/* 時間 */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <div style={{ fontSize: 48 }}>{displayInput}</div>
        <div>{formatTime(inputTime.minutes, inputTime.seconds)}</div>
      </div>

      {/* テンキー */}
      <div style={{ width: "90%", margin: "20px auto" }}>
        {keypadRows.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 10 }}>
            {row.map((k) => (
              <button
                key={k}
                onClick={() => handleKeyPress(k)}
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
        {wattOptions.map((w) => (
          <button key={w} onClick={() => setToW(w)}>
            {w}W
          </button>
        ))}
      </div>

      {/* 👑 ホーム追加 */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={() => setShowInstallModal(true)}>
          ホーム画面に追加する方法
        </button>
      </div>

      {/* 👑 広告（ここにiframe） */}
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <iframe
          src="/rakuten.html"
          title="楽天広告"
          style={{
            width: "300px",
            height: "160px",
            border: "none",
            overflow: "hidden",
          }}
        />
      </div>

      {/* 結果 */}
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
        <div style={{ textAlign: "right" }}>
          {fromW}Wで{formatTime(inputTime.minutes, inputTime.seconds)}
        </div>
        <div style={{ fontSize: 28 }}>
          {toW}Wなら {formatTime(convertedTime.minutes, convertedTime.seconds)}
        </div>
      </div>

      {/* モーダル */}
      {showInstallModal && (
        <div
          onClick={() => setShowInstallModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              background: "#fff",
              margin: "100px auto",
              padding: 20,
              width: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>ホーム画面に追加</h3>
            <p>iPhone：共有 → ホーム画面に追加</p>
            <p>Android：︙ → ホーム画面に追加</p>
            <button onClick={() => setShowInstallModal(false)}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}