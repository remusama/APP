"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen, User, LogOut, Clock, Award, BarChart, MessageSquare, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const globalStyles = `
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
}
`

const BackgroundAnimation = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900">
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          "linear-gradient(to bottom right, #1e3a8a, #312e81, #111827)",
          "linear-gradient(to bottom right, #312e81, #111827, #1e3a8a)",
          "linear-gradient(to bottom right, #111827, #1e3a8a, #312e81)",
        ],
      }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    />
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${
          i % 3 === 0 
            ? 'bg-gradient-to-r from-blue-400 to-blue-500' 
            : i % 3 === 1 
              ? 'bg-gradient-to-r from-purple-400 to-purple-500'
              : 'bg-gradient-to-r from-indigo-400 to-indigo-500'
        } opacity-20`}
        style={{
          width: Math.random() * 100 + 50,
          height: Math.random() * 100 + 50,
        }}
        animate={{
          x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
          y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
)

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <BackgroundAnimation />
      <Card className="w-full max-w-md relative z-10">
        <CardContent className="p-6 space-y-8">
          <div className="flex flex-col items-center mb-8">
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-16 h-16 mb-4 text-primary"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
            </motion.svg>
            <h1 className="text-2xl font-bold">skillmeter</h1>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-center">Bienvenido</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Introduzca su Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Introduzca su Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                No recuerda su contraseña?
              </a>
            </div>
            <Button type="submit" className="w-full">
              Loguearse
            </Button>
          </form>
          <p className="mt-8 text-center text-sm">
            Aun no te inscribiste?{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Crear cuenta
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardPage() {
  const [examProgress, setExamProgress] = useState(75)

  useEffect(() => {
    const timer = setInterval(() => {
      setExamProgress((oldProgress) => {
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <BackgroundAnimation />
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">Panel de control</h1>
        <p className="text-muted-foreground mb-8">Aquí puedes ver tu desarrollo</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="w-8 h-8 text-primary" />}
            title="Exámenes Completados"
            value="12"
            description="de 20 exámenes"
          />
          <StatCard
            icon={<Clock className="w-8 h-8 text-primary" />}
            title="Tiempo Promedio"
            value="45:30"
            description="minutos por examen"
          />
          <StatCard
            icon={<Award className="w-8 h-8 text-primary" />}
            title="Puntuación Promedio"
            value="85%"
            description="en todos los exámenes"
          />
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Próximo examen simulacro</h3>
            <p className="mb-2">Examen Pre-universitario 5 Días</p>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <motion.div
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${examProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, description }) {
  return (
    <Card>
      <CardContent className="p-6 flex items-start space-x-4">
        <div className="rounded-full bg-secondary p-3">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TimedPracticeMode() {
  const [timeLeft, setTimeLeft] = useState(300)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const questions = [
    { question: "¿Cuál es la capital de Francia?", options: ["Londres", "Berlín", "París", "Madrid"], correct: 2 },
    { question: "¿Cuánto es 7 x 8?", options: ["54", "56", "62", "64"], correct: 1 },
    { question: "¿Quién escribió 'Don Quijote de la Mancha'?", options: ["Cervantes", "Shakespeare", "Goethe", "Dante"], correct: 0 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <BackgroundAnimation />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Modo de Práctica por Tiempo</h1>
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold">Tiempo restante: {formatTime(timeLeft)}</p>
                <p className="text-lg font-semibold">Pregunta {currentQuestion + 1} de {questions.length}</p>
              </div>
              <Progress value={(timeLeft / 300) * 100} className="w-full" />
            </div>
            {timeLeft > 0 && currentQuestion < questions.length ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
                <div className="grid gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant="outline"
                      className="w-full text-left justify-start h-auto py-3 px-4"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">¡Práctica terminada!</h3>
                <p className="text-lg mb-4">Tu puntuación: {score} de {questions.length}</p>
                <Button onClick={() => {
                  setTimeLeft(300)
                  setCurrentQuestion(0)
                  setScore(0)
                }}>
                  Intentar de nuevo
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AchievementSystem() {
  const achievements = [
    {
      name: "Principiante",
      description: "Completa tu primer examen",
      unlocked: true,
      icon: BookOpen,
      date: "15 Nov 2023"
    },
    {
      name: "Estudioso",
      description: "Completa 10 exámenes",
      unlocked: false,
      icon: Award,
      progress: 3
    },
    {
      name: "Experto",
      description: "Obtén una puntuación perfecta",
      unlocked: false,
      icon: Award
    }
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <BackgroundAnimation />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Logros</h1>
        <div className="grid gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className={achievement.unlocked ? 'border-primary' : 'opacity-80'}>
              <CardContent className="p-6">
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`rounded-full p-3 ${
                    achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                      )}
                    </div>
                    {achievement.progress !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{achievement.progress}/10</span>
                        </div>
                        <Progress value={(achievement.progress / 10) * 100} className="w-full" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function StandardsComparison() {
  const standards = [
    { name: "Matemáticas", userScore: 85, standardScore: 80 },
    { name: "Ciencias", userScore: 75, standardScore: 82 },
    { name: "Literatura", userScore: 90, standardScore: 85 },
    { name: "Historia", userScore: 70, standardScore: 75 }
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <BackgroundAnimation />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Comparación con Estándares</h1>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {standards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{standard.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {standard.userScore > standard.standardScore ? '+' : ''}
                      {standard.userScore - standard.standardScore}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tu puntuación</span>
                        <span>{standard.userScore}%</span>
                      </div>
                      <Progress value={standard.userScore} className="w-full" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Estándar</span>
                        <span>{standard.standardScore}%</span>
                      </div>
                      <Progress value={standard.standardScore} className="w-full bg-secondary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SkillAnalysis() {
  const skills = [
    { name: "Matemáticas", level: 75, details: [
      { name: "Álgebra", score: 80 },
      { name: "Geometría", score: 70 },
      { name: "Estadística", score: 75 }
    ]},
    { name: "Ciencias", level: 60, details: [
      { name: "Física", score: 65 },
      { name: "Química", score: 55 },
      { name: "Biología", score: 60 }
    ]},
    { name: "Literatura", level: 85, details: [
      { name: "Comprensión", score: 90 },
      { name: "Análisis", score: 80 },
      { name: "Redacción", score: 85 }
    ]},
    { name: "Historia", level: 70, details: [
      { name: "Historia Mundial", score: 75 },
      { name: "Historia Nacional", score: 70 },
      { name: "Geografía", score: 65 }
    ]}
  ]

  const [expandedSkill, setExpandedSkill] = useState(null)

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <BackgroundAnimation />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Análisis de Habilidades</h1>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setExpandedSkill(expandedSkill === index ? null : index)}
                    className="w-full"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span className="text-sm font-medium">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="w-full mb-2" />
                  </button>
                  <AnimatePresence>
                    {expandedSkill === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3">
                          {skill.details.map((detail, detailIndex) => (
                            <div key={detailIndex}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{detail.name}</span>
                                <span>{detail.score}%</span>
                              </div>
                              <Progress value={detail.score} className="w-full" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function VirtualAssistant() {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = message
    setMessage('')
    setConversation(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    // Simulated API call - replace with actual ChatGPT API integration
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, actualmente estoy en mantenimiento. Pronto podré ayudarte con tus preguntas.'
      }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <BackgroundAnimation />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Asistente Virtual</h1>
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
                    Escribiendo...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
              />
              <Button type="submit" disabled={isTyping}>
                Enviar
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const navItems = [
    { icon: Home, label: 'Inicio', page: 'dashboard' },
    { icon: Clock, label: 'Práctica', page: 'practice' },
    { icon: Award, label: 'Logros', page: 'achievements' },
    { icon: BarChart, label: 'Comparar', page: 'comparison' },
    { icon: BookOpen, label: 'Habilidades', page: 'skills' },
    { icon: MessageSquare, label: 'Asistente', page: 'assistant' },
    { icon: User, label: 'Perfil', page: 'profile' },
    { icon: LogOut, label: 'Salir', action: () => setIsLoggedIn(false) }
  ]

  return (
    <div className="min-h-screen dark bg-background text-foreground relative z-10">
      <style jsx global>{globalStyles}</style>
      <BackgroundAnimation />
      
      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <AnimatePresence mode="wait">
            {currentPage === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <DashboardPage />
              </motion.div>
            )}
            {currentPage === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <TimedPracticeMode />
              </motion.div>
            )}
            {currentPage === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <AchievementSystem />
              </motion.div>
            )}
            {currentPage === 'comparison' && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <StandardsComparison />
              </motion.div>
            )}
            {currentPage === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <SkillAnalysis />
              </motion.div>
            )}
            {currentPage === 'assistant' && (
              <motion.div
                key="assistant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <VirtualAssistant />
              </motion.div>
            )}
          </AnimatePresence>

          <nav className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-t border-white/10 p-2 z-50">
            <div className="flex justify-around max-w-3xl mx-auto">
              {navItems.map(({ icon: Icon, label, page, action }) => (
                <motion.button
                  key={label}
                  onClick={action || (() => setCurrentPage(page))}
                  className={`flex flex-col items-center p-2 rounded-lg ${
                    currentPage === page 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{label}</span>
                </motion.button>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  )
}