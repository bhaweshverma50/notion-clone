'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../../public/cypresslogo.svg'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import { actionLoginUser } from '@/lib/server-action/auth-actions'

const LoginPage = () => {
    const router = useRouter()
    const [submitError, setSubmitError] = useState('')

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: { email: '', password: '' },
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData: z.infer<typeof FormSchema>) => {
        const { error } = await actionLoginUser(formData)
        if (error) {
            form.reset()
            setSubmitError(error.message)
        } else {
            router.replace('/dashboard')
        }
    }

    return (
        <Form {...form}>
            <form
                onChange={() => {
                    if (submitError) setSubmitError('')
                }}
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm-justify-center flex w-full flex-col space-y-6 sm:w-[400px]"
            >
                <Link
                    href="/"
                    className="
          justify-left
          flex
          w-full
          items-center"
                >
                    <Image src={Logo} alt="notter Logo" width={50} height={50} />
                    <span
                        className="text-4xl
          font-semibold first-letter:ml-2 dark:text-white"
                    >
                        notter.
                    </span>
                </Link>
                <FormDescription
                    className="
        text-foreground/60"
                >
                    An all-In-One Collaboration and Productivity Platform
                </FormDescription>
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button type="submit" className="w-full p-6" size="lg" disabled={isLoading}>
                    {!isLoading ? 'Login' : <Loader />}
                </Button>
                <span className="self-container">
                    Dont have an account?{' '}
                    <Link href="/signup" className="text-primary">
                        Sign Up
                    </Link>
                </span>
            </form>
        </Form>
    )
}

export default LoginPage
