import React, { useEffect, useState } from "react";
import comicData from "./aInquisicao";
import styles from "./ComicViews.module.css";


const ComicReader: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const currentPage = comicData[currentPageIndex];
  const currentPanel = currentPage.panels[currentPanelIndex];

  const nextPanel = () => {
    if (currentPanelIndex < currentPage.panels.length - 1) {
      setCurrentPanelIndex((prev) => prev + 1);
    } else if (currentPageIndex < comicData.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setCurrentPanelIndex(0);
    }
  };

  const prevPanel = () => {
    if (currentPanelIndex > 0) {
      setCurrentPanelIndex((prev) => prev - 1);
    } else if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      setCurrentPanelIndex(comicData[currentPageIndex - 1].panels.length - 1);
    }
  };

  const nextPage = () => {
    if (currentPageIndex < comicData.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setCurrentPanelIndex(0);
    }
  };

  const previousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      setCurrentPanelIndex(0);
    }
  };


  const readAloud = () => {
    const voices = window.speechSynthesis.getVoices();
    const brazilianVoice = voices.find(
      (voice) => voice.lang === "pt-BR"
    );
  
    if (!brazilianVoice) {
      console.error("Brazilian Portuguese voice not available.");
      return;
    }
  
    const narration = `
    ${currentPanel.description ? 'Descrição: ' + currentPanel.description + '.' : ''}.
    ${currentPanel.narrator ? 'Narração: ' + currentPanel.narrator + '.' : '.'}.
    ${currentPanel.dialogue ? 'Diálogo: ' + currentPanel.dialogue + '.' : '.'}.
    `.trim()
    const speech = new SpeechSynthesisUtterance(narration);
    speech.voice = brazilianVoice;
    speech.lang = "pt-BR";
    window.speechSynthesis.speak(speech);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft": // Navigate to the previous page
          previousPage();
          break;
        case "ArrowRight": // Navigate to the next page
          nextPage();
          break;
        case "ArrowDown": // Navigate to the next panel
          nextPanel();
          break;
        case "ArrowUp": // Navigate to the previous panel
          prevPanel();
          break;
        case " ": // Spacebar for reading aloud
          event.preventDefault(); // Prevent default scroll behavior
          readAloud();
          break;
        default:
          break;
      }
    };
  
    window.addEventListener("keydown", handleKeydown);
  
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentPage, currentPanelIndex]);
  

  return (
    <div className={styles["container"]}>
        <div className={styles["image-container"]}>
            <img
                src={currentPage.page}
                alt={currentPage.overall}
                className={styles["responsive-image"]}
            />
        </div>

        <div className={styles["button-container"]}>
            <button onClick={previousPage} disabled={currentPageIndex === 0}>
                Página anterior
            </button>
            <button
                onClick={prevPanel}
                disabled={currentPageIndex === 0 && currentPanelIndex === 0}
            >
                Quadro anterior
            </button>
            <button onClick={readAloud}>Ler quadro {currentPanelIndex + 1} de {currentPage.panels.length} em voz alta</button>
            <button
                onClick={nextPanel}
                disabled={
                currentPageIndex === comicData.length - 1 &&
                currentPanelIndex === currentPage.panels.length - 1
                }
            >
                Quadro seguinte
            </button>
            <button
                onClick={nextPage}
                disabled={currentPageIndex === comicData.length - 1}
            >
                Página seguinte
            </button>
        </div>
  </div>
  
  );
};

export default ComicReader;
