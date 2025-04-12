import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      // Récupérer la valeur stockée
      if (typeof window === 'undefined') {
        return
      }
      
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key, initialValue])

  // Fonction pour mettre à jour la valeur
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
} 