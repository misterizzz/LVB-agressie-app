import { useGameState } from './hooks/useGameState';
import { ModeSelectScreen } from './pages/ModeSelectScreen';
import { StartScreen } from './pages/StartScreen';
import { GoalsScreen } from './pages/GoalsScreen';
import { IntroScreen } from './pages/IntroScreen';
import { SceneScreen } from './pages/SceneScreen';
import { FeedbackScreen } from './pages/FeedbackScreen';
import { ResultScreen } from './pages/ResultScreen';
import { ReflectionScreen } from './pages/ReflectionScreen';
import { ReviewScreen } from './pages/ReviewScreen';
import { RetroStartScreen } from './pages/retro/RetroStartScreen';
import { RetroGoalsScreen } from './pages/retro/RetroGoalsScreen';
import { RetroSceneScreen } from './pages/retro/RetroSceneScreen';
import { RetroFeedbackScreen } from './pages/retro/RetroFeedbackScreen';
import { RetroResultScreen } from './pages/retro/RetroResultScreen';
import { RetroReflectionScreen } from './pages/retro/RetroReflectionScreen';
import { RetroReviewScreen } from './pages/retro/RetroReviewScreen';

export default function App() {
  const {
    state,
    currentScene,
    navigate,
    selectMode,
    makeChoice,
    advanceFromFeedback,
    addReflectionAnswer,
    getEnding,
    resetGame,
    backToModeSelect,
    toggleDarkMode,
    progress,
  } = useGameState();

  const isRetro = state.gameMode === 'retro';

  const renderScreen = () => {
    switch (state.screen) {
      case 'modeSelect':
        return (
          <ModeSelectScreen
            onSelect={selectMode}
            darkMode={state.darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );

      case 'start':
        return isRetro ? (
          <RetroStartScreen
            onStart={() => navigate('goals')}
            onBack={backToModeSelect}
          />
        ) : (
          <StartScreen
            onStart={() => navigate('goals')}
            darkMode={state.darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );

      case 'goals':
        return isRetro ? (
          <RetroGoalsScreen onContinue={() => navigate('intro')} />
        ) : (
          <GoalsScreen onContinue={() => navigate('intro')} />
        );

      case 'intro':
        return isRetro ? (
          <RetroGoalsScreen onContinue={() => navigate('scene')} />
        ) : (
          <IntroScreen onContinue={() => navigate('scene')} />
        );

      case 'scene':
        if (!currentScene) return null;
        return isRetro ? (
          <RetroSceneScreen
            scene={currentScene}
            stress={state.stress}
            trust={state.trust}
            progress={progress}
            onChoice={makeChoice}
          />
        ) : (
          <SceneScreen
            scene={currentScene}
            stress={state.stress}
            trust={state.trust}
            progress={progress}
            onChoice={makeChoice}
          />
        );

      case 'feedback':
        if (!state.lastChoice) return null;
        return isRetro ? (
          <RetroFeedbackScreen
            choice={state.lastChoice}
            stress={state.stress}
            trust={state.trust}
            onContinue={advanceFromFeedback}
          />
        ) : (
          <FeedbackScreen
            choice={state.lastChoice}
            stress={state.stress}
            trust={state.trust}
            progress={progress}
            onContinue={advanceFromFeedback}
          />
        );

      case 'result': {
        const { ending, percentage } = getEnding();
        return isRetro ? (
          <RetroResultScreen
            ending={ending}
            percentage={percentage}
            stress={state.stress}
            trust={state.trust}
            choices={state.choices}
            onReflection={() => navigate('reflection')}
            onRestart={resetGame}
          />
        ) : (
          <ResultScreen
            ending={ending}
            percentage={percentage}
            stress={state.stress}
            trust={state.trust}
            choices={state.choices}
            onReflection={() => navigate('reflection')}
            onRestart={resetGame}
          />
        );
      }

      case 'reflection':
        return isRetro ? (
          <RetroReflectionScreen
            answers={state.reflectionAnswers}
            onAnswer={addReflectionAnswer}
            onFinish={() => navigate('review')}
            onRestart={resetGame}
          />
        ) : (
          <ReflectionScreen
            answers={state.reflectionAnswers}
            onAnswer={addReflectionAnswer}
            onFinish={() => navigate('review')}
            onRestart={resetGame}
          />
        );

      case 'review':
        return isRetro ? (
          <RetroReviewScreen
            answers={state.reflectionAnswers}
            onRestart={resetGame}
          />
        ) : (
          <ReviewScreen
            answers={state.reflectionAnswers}
            onRestart={resetGame}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={state.darkMode ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isRetro && state.screen !== 'modeSelect'
          ? 'bg-gray-950 text-green-400'
          : 'bg-warm-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100'
      }`}>
        <div className="max-w-lg mx-auto min-h-screen">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
