interface ProgressEntry {
  task: string
  date: Date
}

const progress: ProgressEntry[] = []

export const addProgress = (task: string): void => {
  progress.push({ task, date: new Date() })
}

export const getProgress = (): ProgressEntry[] => progress
