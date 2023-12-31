'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { persistence } from './services/persistence'

export default function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    const fetchUserByToken = async () => {
        try {
            const userByToken = await persistence()
            if (userByToken !== null) {
                router.push('/employees-management')
            } else {
                router.push('/login')
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('user')
        if (token !== null) {
            void fetchUserByToken()
        } else {
            router.push('/login')
            setIsLoading(false)
        }
    }, [])

    return (
        <div className="h-screen flex justify-center items-center">
            {isLoading ? (
                <p className="font-disketMonoBold">Cargando...</p>
            ) : (
                <p className="font-disketMonoBold">Bienvenido</p>
            )}
        </div>
    )
}
