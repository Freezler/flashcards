import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useCardContext } from '../contexts/CardContext'
import { DifficultyLevel } from '../types'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: string
  gradient: string
  onClick?: () => void
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  gradient,
  onClick 
}) => (
  <div 
    className={`card-2025 glass-surface group cursor-pointer transition-all duration-300 ${gradient}`}
    onClick={onClick}
  >
    <div className="p-6 relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </div>
        </div>
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {subtitle}
        </div>
      )}
    </div>
    
    {/* Glassmorphism overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
)

interface DeckCardProps {
  name: string
  description: string
  cardCount: number
  category: string
  completionRate: number
  onClick: () => void
}

const DeckCard: React.FC<DeckCardProps> = ({
  name,
  description,
  cardCount,
  category,
  completionRate,
  onClick
}) => {
  const getCompletionColor = (rate: number): string => {
    if (rate >= 80) return 'from-green-400 to-green-600'
    if (rate >= 60) return 'from-yellow-400 to-yellow-600'
    if (rate >= 40) return 'from-orange-400 to-orange-600'
    return 'from-red-400 to-red-600'
  }

  return (
    <div 
      className="card-2025 glass-surface group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {description}
            </p>
          </div>
          <div className="difficulty-pill difficulty-pill--medium ml-4">
            {category}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getCompletionColor(completionRate)} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            {cardCount} cards
          </span>
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
            Study now
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Glassmorphism hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

const Dashboard2025: React.FC = () => {
  const { t } = useTranslation(['common', 'decks'])
  const { state } = useCardContext()

  const stats = useMemo(() => {
    const allCards = Object.values(state.decks).flat()
    
    const totalCards = allCards.length
    const studiedCards = allCards.filter(card => card.timesReviewed > 0).length
    const masteredCards = allCards.filter(card => 
      card.timesReviewed > 0 && (card.correctCount / card.timesReviewed) >= 0.8
    ).length
    
    const difficultyBreakdown = {
      [DifficultyLevel.EASY]: allCards.filter(card => card.difficulty === DifficultyLevel.EASY).length,
      [DifficultyLevel.MEDIUM]: allCards.filter(card => card.difficulty === DifficultyLevel.MEDIUM).length,
      [DifficultyLevel.HARD]: allCards.filter(card => card.difficulty === DifficultyLevel.HARD).length,
    }
    
    const overallProgress = totalCards > 0 ? Math.round((studiedCards / totalCards) * 100) : 0
    const masteryRate = studiedCards > 0 ? Math.round((masteredCards / studiedCards) * 100) : 0
    
    return {
      totalCards,
      studiedCards,
      masteredCards,
      difficultyBreakdown,
      overallProgress,
      masteryRate,
      totalDecks: Object.keys(state.decks).length
    }
  }, [state.decks])

  const deckStats = useMemo(() => {
    return Object.entries(state.decks).map(([deckName, cards]) => {
      const studiedCards = cards.filter(card => card.timesReviewed > 0).length
      const completionRate = cards.length > 0 ? Math.round((studiedCards / cards.length) * 100) : 0
      
      return {
        name: t(`decks:${deckName}.name`),
        description: t(`decks:${deckName}.description`),
        cardCount: cards.length,
        category: cards[0]?.category || 'General',
        completionRate,
        deckKey: deckName
      }
    })
  }, [state.decks, t])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
            {t('common:dashboard.welcome')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('common:dashboard.subtitle')}
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title={t('common:dashboard.totalCards')}
            value={stats.totalCards}
            icon="📚"
            gradient="hover:shadow-blue-200/50"
          />
          <StatCard
            title={t('common:dashboard.studiedCards')}
            value={stats.studiedCards}
            subtitle={`${stats.overallProgress}% ${t('common:dashboard.completed')}`}
            icon="🎯"
            gradient="hover:shadow-green-200/50"
          />
          <StatCard
            title={t('common:dashboard.masteredCards')}
            value={stats.masteredCards}
            subtitle={`${stats.masteryRate}% ${t('common:dashboard.mastery')}`}
            icon="🏆"
            gradient="hover:shadow-yellow-200/50"
          />
          <StatCard
            title={t('common:dashboard.totalDecks')}
            value={stats.totalDecks}
            icon="📖"
            gradient="hover:shadow-purple-200/50"
          />
        </div>

        {/* Difficulty Breakdown */}
        <div className="card-2025 glass-surface mb-12 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('common:dashboard.difficultyBreakdown')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="difficulty-pill difficulty-pill--easy mx-auto mb-3 text-lg">
                Easy
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.difficultyBreakdown[DifficultyLevel.EASY]}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('common:dashboard.cards')}
              </div>
            </div>
            <div className="text-center">
              <div className="difficulty-pill difficulty-pill--medium mx-auto mb-3 text-lg">
                Medium
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.difficultyBreakdown[DifficultyLevel.MEDIUM]}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('common:dashboard.cards')}
              </div>
            </div>
            <div className="text-center">
              <div className="difficulty-pill difficulty-pill--hard mx-auto mb-3 text-lg">
                Hard
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.difficultyBreakdown[DifficultyLevel.HARD]}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('common:dashboard.cards')}
              </div>
            </div>
          </div>
        </div>

        {/* Decks Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t('common:dashboard.yourDecks')}
            </h2>
            <Link 
              to="/decks" 
              className="btn-2025 btn-2025--primary"
            >
              {t('common:dashboard.viewAllDecks')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deckStats.map((deck) => (
              <DeckCard
                key={deck.deckKey}
                name={deck.name}
                description={deck.description}
                cardCount={deck.cardCount}
                category={deck.category}
                completionRate={deck.completionRate}
                onClick={() => {
                  // Navigate to deck study page
                  window.location.href = `/deck/${deck.deckKey}`
                }}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-2025 glass-surface p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('common:dashboard.quickActions')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/study" className="btn-2025 btn-2025--primary">
              <span className="text-lg">🚀</span>
              {t('common:dashboard.startStudying')}
            </Link>
            <Link to="/cards" className="btn-2025 btn-2025--ghost">
              <span className="text-lg">📝</span>
              {t('common:dashboard.manageCards')}
            </Link>
            <Link to="/search" className="btn-2025 btn-2025--ghost">
              <span className="text-lg">🔍</span>
              {t('common:dashboard.searchCards')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard2025