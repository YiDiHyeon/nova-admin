'use client'

import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CircleUserRound, LockKeyhole } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
type LoginFormValues = {
  email: string
  password: string
}

export default function Home() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        alert(errorData?.message ?? '로그인 실패')
        return
      }
      router.replace('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[480px] px-8 py-6">
        <div>
          <h2 className="text-center text-2xl font-extrabold">Nova Admin</h2>
        </div>
        <Button className="h-12 w-full rounded-4xl" onClick={handleLogin}>
          구글로 로그인
        </Button>
        {/*<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">*/}
        {/*  <Field>*/}
        {/*    <div className="relative">*/}
        {/*      <CircleUserRound*/}
        {/*        className="absolute top-1/2 left-6 h-4 w-4 -translate-y-1/2"*/}
        {/*        stroke="#cdcdcd"*/}
        {/*      />*/}
        {/*      <Input*/}
        {/*        id="login-id"*/}
        {/*        placeholder="이메일 또는 아이디를 입력해 주세요"*/}
        {/*        className="h-12 rounded-4xl pl-12"*/}
        {/*        {...register('email', {*/}
        {/*          required: '이메일을 입력해주세요.',*/}
        {/*        })}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}*/}
        {/*  </Field>*/}
        {/*  <Field>*/}
        {/*    <div className="relative">*/}
        {/*      <LockKeyhole*/}
        {/*        className="absolute top-1/2 left-6 h-4 w-4 -translate-y-1/2"*/}
        {/*        stroke="#cdcdcd"*/}
        {/*      />*/}
        {/*      <Input*/}
        {/*        id="login-password"*/}
        {/*        type="password"*/}
        {/*        placeholder="비밀번호를 입력해 주세요"*/}
        {/*        className="h-12 rounded-4xl pl-12"*/}
        {/*        {...register('password', {*/}
        {/*          required: '비밀번호를 입력해주세요.',*/}
        {/*        })}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}*/}
        {/*  </Field>*/}
        {/*  <Button type="submit" className="h-12 rounded-4xl">*/}
        {/*    로그인*/}
        {/*  </Button>*/}
        {/*</form>*/}
      </Card>
    </div>
  )
}
