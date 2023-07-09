import { PropsWithChildren } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

interface RHFProviderProps {
  methods: UseFormReturn<any>
  onSubmit: (formData: any) => void
}

export const RHFProvider = ({
  methods,
  onSubmit,
  children,
}: PropsWithChildren<RHFProviderProps>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
