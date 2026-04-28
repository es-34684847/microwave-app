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
    seconds = seconds % 60;

    return { minutes, seconds, totalSeconds: minutes * 60 + seconds };
  };

  const formatTime = (minutes, seconds) =>
    `${minutes}分${String(seconds).padStart(2, "0")}秒`;

  const inputTime = useMemo(() => parseInputToTime(input), [input]);

  const displayInput = input
    ? `${inputTime.minutes}:${String(inputTime.seconds).padStart(2, "0")}`
    : "0:00";

  const convertedTime = useMemo(() => {
    const rawSeconds =
      inputTime.totalSeconds === 0
        ? 0
        : Math.floor(inputTime.totalSeconds * (fromW / toW));

    const roundedSeconds = Math.floor(rawSeconds / 10) * 10;

    return {
      minutes: Math.floor(roundedSeconds / 60),
      seconds: roundedSeconds % 60,
    };
  }, [inputTime, fromW, toW]);

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f3f3f3",
      fontFamily:
        "'Hiragino Sans', 'Yu Gothic', 'Meiryo', system-ui, sans-serif",
      color: "#222",
      display: "flex",
      justifyContent: "center",
    },
    phone: {
      width: "100%",
      maxWidth: "480px",
      minHeight: "100vh",
      backgroundColor: "#f7f7f7",
      position: "relative",
      paddingBottom: "180px",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "center",
      fontSize: "20px",
      fontWeight: 700,
      padding: "18px 16px 14px",
      borderBottom: "1px solid #e5e5e5",
    },
    section: {
      padding: "18px 16px 0",
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "16px",
      fontWeight: 700,
      marginBottom: "12px",
    },
    wattRow: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "8px",
    },
    wattButton: {
      height: "44px",
      borderRadius: "10px",
      border: "1px solid #8d8d8d",
      backgroundColor: "#fff",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
    },
    wattButtonSelectedFrom: {
      backgroundColor: "#f2b632",
      border: "1px solid #c89622",
    },
    wattButtonSelectedTo: {
      backgroundColor: "#3f8f4e",
      border: "1px solid #2f6e3b",
      color: "#fff",
    },
    timeBlock: {
      textAlign: "center",
      paddingTop: "4px",
    },
    mainTime: {
      fontSize: "64px",
      lineHeight: 1,
      fontWeight: 500,
      letterSpacing: "-0.03em",
      marginBottom: "6px",
    },
    subTime: {
      fontSize: "20px",
      color: "#4a4a4a",
    },
    keypadWrap: {
      width: "90%",
      margin: "18px auto 0",
      display: "grid",
      gap: "10px",
    },
    keypadRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
    },
    keyButton: {
      height: "66px",
      borderRadius: "12px",
      border: "1px solid #9a9a9a",
      backgroundColor: "#fdfdfd",
      fontSize: "26px",
      fontWeight: 500,
      cursor: "pointer",
    },
    utilityArea: {
      padding: "14px 16px 0",
      textAlign: "center",
    },
    installLink: {
      border: "none",
      background: "transparent",
      color: "#666",
      fontSize: "13px",
      textDecoration: "underline",
      cursor: "pointer",
      padding: "6px",
    },
    adBox: {
      margin: "8px auto 0",
      width: "100%",          // ←広げる
      maxWidth: "340px",     // ←少し余裕
      height: "170px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     },
    resultBar: {
      position: "fixed",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "480px",
      backgroundColor: "#fff",
      borderTop: "1px solid #e3e3e3",
      boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
      padding: "14px 18px calc(14px + env(safe-area-inset-bottom))",
      boxSizing: "border-box",
      zIndex: 10,
    },
    resultBefore: {
      fontSize: "18px",
      color: "#555",
      textAlign: "right",
      marginBottom: "8px",
    },
    resultAfter: {
      fontSize: "clamp(32px, 8vw, 46px)",
      fontWeight: 800,
      lineHeight: 1.1,
      textAlign: "center",
      color: "#2f7a3d",
      letterSpacing: "-0.03em",
    },
    resultAfterSub: {
      fontSize: "clamp(20px, 5vw, 28px)",
      fontWeight: 700,
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      zIndex: 50,
    },
    modal: {
      width: "100%",
      maxWidth: "360px",
      backgroundColor: "#fff",
      borderRadius: "18px",
      padding: "20px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
    },
    closeButton: {
      marginTop: "16px",
      width: "100%",
      height: "42px",
      borderRadius: "10px",
      border: "1px solid #999",
      backgroundColor: "#f7f7f7",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        <div style={styles.header}>電子レンジ換算</div>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>元のW数</div>
          <div style={styles.wattRow}>
            {wattOptions.map((w) => (
              <button
                key={`from-${w}`}
                type="button"
                onClick={() => setFromW(w)}
                style={{
                  ...styles.wattButton,
                  ...(fromW === w ? styles.wattButtonSelectedFrom : {}),
                }}
              >
                {w}W
              </button>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>時間入力</div>
          <div style={styles.timeBlock}>
            <div style={styles.mainTime}>{displayInput}</div>
            <div style={styles.subTime}>
              → {formatTime(inputTime.minutes, inputTime.seconds)}
            </div>
          </div>

          <div style={styles.keypadWrap}>
            {keypadRows.map((row, rowIndex) => (
              <div key={rowIndex} style={styles.keypadRow}>
                {row.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKeyPress(key)}
                    style={styles.keyButton}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>変換先W数</div>
          <div style={styles.wattRow}>
            {wattOptions.map((w) => (
              <button
                key={`to-${w}`}
                type="button"
                onClick={() => setToW(w)}
                style={{
                  ...styles.wattButton,
                  ...(toW === w ? styles.wattButtonSelectedTo : {}),
                }}
              >
                {w}W
              </button>
            ))}
          </div>
        </section>

        <div style={styles.utilityArea}>
          <button
            type="button"
            style={styles.installLink}
            onClick={() => setShowInstallModal(true)}
          >
            ホーム画面に追加する方法
          </button>

          <div style={styles.adBox}>
            <iframe
              src="/rakuten.html"
              title="楽天広告"
              style={{
                width: "320px",
                height: "170px",
                border: "none",
                overflow: "hidden",
              }}
            />
          </div>
        </div>

        <div style={styles.resultBar}>
          <div style={styles.resultBefore}>
            {fromW}Wで{formatTime(inputTime.minutes, inputTime.seconds)}
          </div>
          <div style={styles.resultAfter}>
            {toW}W<span style={styles.resultAfterSub}>なら</span>{" "}
            {formatTime(convertedTime.minutes, convertedTime.seconds)}
          </div>
        </div>

        {showInstallModal && (
          <div
            style={styles.modalOverlay}
            onClick={() => setShowInstallModal(false)}
          >
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3>ホーム画面に追加</h3>
              <p>
                <b>iPhone</b>
                <br />
                Safariで開く → 共有ボタン → ホーム画面に追加 → 追加
              </p>
              <p>
                <b>Android</b>
                <br />
                Chromeで開く → 右上の︙ → ホーム画面に追加 → 追加
              </p>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setShowInstallModal(false)}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}