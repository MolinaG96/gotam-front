'use client'
import { Button } from '@/app/commons/Button'
import '../../styles/signup.css'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import useInput from '@/app/hooks/useInput'
import { useState } from 'react'
import { Input } from '@/app/commons/Input'
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineMail,
} from 'react-icons/ai'
import { BiSolidUser } from 'react-icons/bi'
import { HiOutlineLockClosed } from 'react-icons/hi'
import type IUser from '@/app/interfaces/IUser'
import { signUpService } from '@/app/services/signUp'
import Logo from '@/app/commons/Logo'

const SignUp = () => {
    const router = useRouter()
    const name = useInput('')
    const email = useInput('')
    const password = useInput('')
    const confirmPassword = useInput('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const togglePasswordVisibility2 = () => {
        setShowPassword2((prevShowPassword2) => !prevShowPassword2)
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!validateEmail(email.value)) {
                await Swal.fire({
                    text: 'El email debe tener formato de mail',
                    icon: 'error',
                })
                return
            }

            if (password.value !== confirmPassword.value) {
                await Swal.fire({
                    text: 'Las contraseñas deben ser iguales',
                    icon: 'error',
                })
                return
            }

            const newUser: IUser = await signUpService(
                name.value,
                email.value,
                password.value
            )

            if (newUser !== null) {
                await Swal.fire({
                    text: 'Usuario creado éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
                router.push('/login')
            } else {
                await Swal.fire({
                    text: 'Error al crear el usuario, intente nuevamente mas tarde',
                    icon: 'error',
                })
            }
        } catch (error) {
            await Swal.fire({
                text: 'Email y/o contraseña incorrectos',
                icon: 'error',
            })
            console.error('handleLogin error', error)
        }
    }

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat w-screen h-screen"
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697137410/gotam/fondos/fondoLS_jbycrw.png)',
            }}
        >
            <Logo disable={true} />
            <div className="container-signup container-signup-back"></div>
            <div className="container-signup container-signup-front">
                <div className="nav-signup w-full h-[20%] flex justify-start items-center">
                    <div className="circle-signup bg-[#76aed6]"></div>
                    <div className="circle-signup bg-[#fda971]"></div>
                    <div className="circle-signup bg-[#aef496]"></div>
                </div>
                <div className="w-full h-[80%]">
                    <form
                        onSubmit={handleSignUp}
                        className="px-8 w-full h-full flex flex-col align-center justify-center "
                    >
                        <div className="mb-2">
                            <Input
                                placeholder="nombre completo:"
                                type="text"
                                iconType={
                                    <BiSolidUser className="w-full h-full" />
                                }
                                value={name.value}
                                onChange={name.onChange}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                placeholder="email:"
                                type="text"
                                iconType={
                                    <AiOutlineMail className="w-full h-full" />
                                }
                                value={email.value}
                                onChange={email.onChange}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="contraseña"
                                value={password.value}
                                onChange={password.onChange}
                                iconType={
                                    <HiOutlineLockClosed className="w-full h-full" />
                                }
                                iconTypeRight={
                                    showPassword ? (
                                        <AiOutlineEye className="w-full h-full cursor-pointer" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="w-full h-full cursor-pointer" />
                                    )
                                }
                                togglePasswordVisibility={
                                    togglePasswordVisibility
                                }
                            />
                        </div>
                        <div className="">
                            <Input
                                type={showPassword2 ? 'text' : 'password'}
                                placeholder="confirmar contraseña"
                                value={confirmPassword.value}
                                onChange={confirmPassword.onChange}
                                iconType={
                                    <HiOutlineLockClosed className="w-full h-full" />
                                }
                                iconTypeRight={
                                    showPassword2 ? (
                                        <AiOutlineEye className="w-full h-full cursor-pointer" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="w-full h-full cursor-pointer" />
                                    )
                                }
                                togglePasswordVisibility={
                                    togglePasswordVisibility2
                                }
                            />
                        </div>
                        <div className="flex justify-center pt-[4.5vw]">
                            <Button type={'submit'} className="btn-signup">
                                CREAR CUENTA
                            </Button>
                        </div>
                    </form>
                    <div className="flex justify-center text-align ">
                        <h1
                            className="cursor-pointer font-disketMonoRegular pt-2 "
                            onClick={() => {
                                router.push('/login')
                            }}
                        >
                            ¿ya tienes cuenta? ingresa.
                        </h1>{' '}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
