import { useState, useCallback } from 'react';
import { scenario, type Choice } from '../data/scenario';

export type GameMode = 'classic' | 'retro';

export type GameScreen =
  | 'modeSelect'
  | 'start'
  | 'goals'
  | 'intro'
  | 'scene'
  | 'feedback'
  | 'result'
  | 'reflection'
  | 'review';

export interface ChoiceRecord {
  sceneId: string;
  choiceId: string;
  choice: Choice;
}

export interface ReflectionAnswer {
  questionId: string;
  answer: string;
}

export interface GameState {
  screen: GameScreen;
  gameMode: GameMode;
  currentSceneId: string;
  stress: number;
  trust: number;
  choices: ChoiceRecord[];
  lastChoice: Choice | null;
  reflectionAnswers: ReflectionAnswer[];
  darkMode: boolean;
  soundOn: boolean;
}

const INITIAL_STRESS = 40;
const INITIAL_TRUST = 50;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    screen: 'modeSelect',
    gameMode: 'classic',
    currentSceneId: 'scene-1',
    stress: INITIAL_STRESS,
    trust: INITIAL_TRUST,
    choices: [],
    lastChoice: null,
    reflectionAnswers: [],
    darkMode: false,
    soundOn: false,
  });

  const currentScene = scenario.scenes.find((s) => s.id === state.currentSceneId);

  const navigate = useCallback((screen: GameScreen) => {
    setState((prev) => ({ ...prev, screen }));
  }, []);

  const makeChoice = useCallback((choice: Choice) => {
    setState((prev) => {
      const newStress = clamp(prev.stress + choice.stressDelta, 0, 100);
      const newTrust = clamp(prev.trust + choice.trustDelta, 0, 100);
      const record: ChoiceRecord = {
        sceneId: prev.currentSceneId,
        choiceId: choice.id,
        choice,
      };

      // If stress hits 100, force bad ending
      if (newStress >= 100) {
        return {
          ...prev,
          stress: 100,
          trust: newTrust,
          choices: [...prev.choices, record],
          lastChoice: choice,
          screen: 'feedback' as GameScreen,
        };
      }

      return {
        ...prev,
        stress: newStress,
        trust: newTrust,
        choices: [...prev.choices, record],
        lastChoice: choice,
        screen: 'feedback' as GameScreen,
      };
    });
  }, []);

  const advanceFromFeedback = useCallback(() => {
    setState((prev) => {
      if (!prev.lastChoice) return prev;

      // If stress is maxed out, go to results
      if (prev.stress >= 100) {
        return { ...prev, screen: 'result' as GameScreen };
      }

      if (prev.lastChoice.nextSceneId === 'end') {
        return { ...prev, screen: 'result' as GameScreen };
      }

      return {
        ...prev,
        currentSceneId: prev.lastChoice.nextSceneId,
        screen: 'scene' as GameScreen,
      };
    });
  }, []);

  const addReflectionAnswer = useCallback(
    (questionId: string, answer: string) => {
      setState((prev) => ({
        ...prev,
        reflectionAnswers: [
          ...prev.reflectionAnswers.filter((r) => r.questionId !== questionId),
          { questionId, answer },
        ],
      }));
    },
    []
  );

  const getEnding = useCallback(() => {
    const deEscalatingChoices = state.choices.filter((c) =>
      c.choice.tags.includes('de-escalatie')
    );
    const percentage = state.choices.length > 0
      ? Math.round((deEscalatingChoices.length / state.choices.length) * 100)
      : 0;

    if (state.stress >= 100 || percentage <= 20) {
      return { ending: scenario.endings[2], percentage };
    }
    if (state.stress <= 30 && state.trust >= 60 && percentage >= 60) {
      return { ending: scenario.endings[0], percentage };
    }
    return { ending: scenario.endings[1], percentage };
  }, [state.choices, state.stress, state.trust]);

  const selectMode = useCallback((mode: GameMode) => {
    setState((prev) => ({ ...prev, gameMode: mode, screen: 'start' }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      screen: 'start',
      gameMode: state.gameMode,
      currentSceneId: 'scene-1',
      stress: INITIAL_STRESS,
      trust: INITIAL_TRUST,
      choices: [],
      lastChoice: null,
      reflectionAnswers: [],
      darkMode: state.darkMode,
      soundOn: state.soundOn,
    });
  }, [state.darkMode, state.soundOn, state.gameMode]);

  const backToModeSelect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      screen: 'modeSelect' as GameScreen,
      currentSceneId: 'scene-1',
      stress: INITIAL_STRESS,
      trust: INITIAL_TRUST,
      choices: [],
      lastChoice: null,
      reflectionAnswers: [],
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundOn: !prev.soundOn }));
  }, []);

  const totalScenes = scenario.scenes.length;
  const currentSceneIndex = scenario.scenes.findIndex(
    (s) => s.id === state.currentSceneId
  );
  const progress =
    state.screen === 'result' || state.screen === 'reflection' || state.screen === 'review'
      ? 100
      : Math.round(((currentSceneIndex + 1) / totalScenes) * 100);

  return {
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
    toggleSound,
    progress,
  };
}
