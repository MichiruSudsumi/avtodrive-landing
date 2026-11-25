import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface QuizContextValue {
  open: (source?: string) => void
  close: () => void
  isOpen: boolean
  source: string
}

const QuizContext = createContext<QuizContextValue | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('')

  const open = useCallback((src = 'Общая кнопка') => {
    setSource(src)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <QuizContext.Provider value={{ open, close, isOpen, source }}>{children}</QuizContext.Provider>
  )
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider')
  return ctx
}
