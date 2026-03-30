import { useGameState } from './hooks/useGameState';
import { StartScreen } from './pages/StartScreen';
import { GoalsScreen } from './pages/GoalsScreen';
import { IntroScreen } from './pages/IntroScreen';
import { SceneScreen } from './pages/SceneScreen';
import { FeedbackScreen } from './pages/FeedbackScreen';
import { ResultScreen } from './pages/ResultScreen';
import { ReflectionScreen } from './pages/ReflectionScreen';
import { ReviewScreen } from './pages/ReviewScreen';

export default function App() {
  const {
    state,
    currentScene,
    navigate,
    makeChoice,
    advanceFromFeedback,
    addReflectionAnswer,
    getEnding,
    resetGame,
    toggleDarkMode,
    progress,
  } = useGameState();

  const renderScreen = () => {
    switch (state.screen) {
      case 'start':
        return (
          <StartScreen
            onStart={() => navigate('goals')}
            darkMode={state.darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );

      case 'goals':
        return <GoalsScreen onContinue={() => navigate('intro')} />;

      case 'intro':
        return <IntroScreen onContinue={() => navigate('scene')} />;

      case 'scene':
        if (!currentScene) return null;
        return (
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
        return (
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
        return (
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
        return (
          <ReflectionScreen
            answers={state.reflectionAnswers}
            onAnswer={addReflectionAnswer}
            onFinish={() => navigate('review')}
            onRestart={resetGame}
          />
        );

      case 'review':
        return (
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
      <div className="min-h-screen bg-warm-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <div className="max-w-lg mx-auto min-h-screen">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
