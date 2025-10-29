import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Tiempos iniciales en segundos
const INITIAL_MAIN_TIME = 30 * 60;   // 30 minutos
const INITIAL_MIDDLE_TIME = 15 * 60; // 15 minutos
const INITIAL_BOTTOM_TIME = 5 * 60;  // 5 minutos

// Forma del estado de un temporizador individual
interface TimerState {
  countdown: number;
  isActive: boolean;
}

// Forma completa de nuestro contexto
interface TimerContextType {
  mainTimer: TimerState;
  middleTimer: TimerState;
  bottomTimer: TimerState;
  startTimers: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  // Estado para cada uno de los tres temporizadores
  const [mainTimer, setMainTimer] = useState<TimerState>({ countdown: INITIAL_MAIN_TIME, isActive: false });
  const [middleTimer, setMiddleTimer] = useState<TimerState>({ countdown: INITIAL_MIDDLE_TIME, isActive: false });
  const [bottomTimer, setBottomTimer] = useState<TimerState>({ countdown: INITIAL_BOTTOM_TIME, isActive: false });

  // useEffect para el temporizador principal (30 min)
  useEffect(() => {
    if (!mainTimer.isActive || mainTimer.countdown <= 0) return;
    const intervalId = setInterval(() => {
      setMainTimer(prev => ({ ...prev, countdown: prev.countdown - 1 }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [mainTimer.isActive, mainTimer.countdown]);

  // useEffect para el temporizador intermedio (15 min)
  useEffect(() => {
    if (!middleTimer.isActive || middleTimer.countdown <= 0) return;
    const intervalId = setInterval(() => {
      setMiddleTimer(prev => ({ ...prev, countdown: prev.countdown - 1 }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [middleTimer.isActive, middleTimer.countdown]);

  // useEffect para el temporizador inferior (5 min)
  useEffect(() => {
    if (!bottomTimer.isActive || bottomTimer.countdown <= 0) return;
    const intervalId = setInterval(() => {
      setBottomTimer(prev => ({ ...prev, countdown: prev.countdown - 1 }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [bottomTimer.isActive, bottomTimer.countdown]);

  // Función para iniciar TODOS los temporizadores simultáneamente
  const startTimers = () => {
    setMainTimer({ countdown: INITIAL_MAIN_TIME, isActive: true });
    setMiddleTimer({ countdown: INITIAL_MIDDLE_TIME, isActive: true });
    setBottomTimer({ countdown: INITIAL_BOTTOM_TIME, isActive: true });
  };

  const contextValue = {
    mainTimer,
    middleTimer,
    bottomTimer,
    startTimers,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};