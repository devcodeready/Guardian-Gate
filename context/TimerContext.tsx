import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Tiempo inicial en segundos (30 minutos * 60 segundos)
const INITIAL_TIME = 30 * 60;

// Definimos la forma de nuestro contexto
interface TimerContextType {
  countdown: number;
  startTimer: () => void;
  isTimerActive: boolean;
}

// Creamos el contexto con valores por defecto
const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Creamos el Proveedor del contexto
export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [countdown, setCountdown] = useState(INITIAL_TIME);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    // Si el temporizador no está activo, no hacemos nada
    if (!isTimerActive) return;

    // Si el tiempo llega a cero, lo detenemos
    if (countdown <= 0) {
      setIsTimerActive(false);
      return;
    }

    // Creamos un intervalo que se ejecuta cada segundo
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Función de limpieza: se ejecuta cuando el componente se desmonta
    // para evitar fugas de memoria.
    return () => clearInterval(intervalId);
  }, [countdown, isTimerActive]); // Se vuelve a ejecutar si 'countdown' o 'isTimerActive' cambian

  // Función para iniciar/reiniciar el temporizador
  const startTimer = () => {
    setCountdown(INITIAL_TIME);
    setIsTimerActive(true);
  };

  return (
    <TimerContext.Provider value={{ countdown, startTimer, isTimerActive }}>
      {children}
    </TimerContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente en otros componentes
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};