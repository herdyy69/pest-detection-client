import { toast as sonnerToast } from 'sonner'
import React from 'react'
import { AlertBody, AlertButton, AlertContainer, AlertTitle } from './alert'
import Icons from '../icons'

interface ToastProps {
  title?: string
  body?: string
  action?: string
  callback?: () => void
}

const Info = ({ title = 'This is an info alerts', body, action = '', callback }: ToastProps) =>
  sonnerToast.custom((t) => (
    <AlertContainer className='bg-blue-100'>
      <div className='flex gap-2'>
        <Icons.Info className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] text-blue-7' />
        <div className='flex flex-col gap-1'>
          <AlertTitle className='text-blue-700'>{title ?? 'This is an alerts'}</AlertTitle>
          <AlertBody className='text-blue-600'>
            {body ?? 'Body alerts caption should put right here, to inform the user'}
          </AlertBody>
        </div>
      </div>
      {action && (
        <AlertButton
          onClick={() => {
            if (callback) callback()
            sonnerToast.dismiss(t)
          }}
          className='btn-blue'
        >
          {action}
        </AlertButton>
      )}
    </AlertContainer>
  ))

const Success = ({ title = 'This is a success alerts', body, action = '', callback }: ToastProps) =>
  sonnerToast.custom((t) => (
    <AlertContainer className='bg-green-100'>
      <div className='flex gap-2'>
        <Icons.CircleCheck className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] text-green-7' />
        <div className='flex flex-col gap-1'>
          <AlertTitle className='text-green-700'>{title ?? 'This is an alerts'}</AlertTitle>
          <AlertBody className='text-green-600'>
            {body ?? 'Body alerts caption should put right here, to inform the user'}
          </AlertBody>
        </div>
      </div>
      {action && (
        <AlertButton
          onClick={() => {
            if (callback) callback()
            sonnerToast.dismiss(t)
          }}
          className='btn-green'
        >
          {action}
        </AlertButton>
      )}
    </AlertContainer>
  ))

const Error = ({ title = 'This is an error alerts', body, action = '', callback }: ToastProps) =>
  sonnerToast.custom((t) => (
    <AlertContainer className='bg-red-100'>
      <div className='flex gap-2'>
        <Icons.TriangleAlert className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] text-red-7' />
        <div className='flex flex-col gap-1'>
          <AlertTitle className='text-red-700'>{title ?? 'This is an alerts'}</AlertTitle>
          <AlertBody className='text-red-600'>{body}</AlertBody>
        </div>
      </div>
      {action && (
        <AlertButton
          onClick={() => {
            if (callback) callback()
            sonnerToast.dismiss(t)
          }}
          className='btn-red'
        >
          {action}
        </AlertButton>
      )}
    </AlertContainer>
  ))

const toast = {
  info: Info,
  success: Success,
  error: Error,
}

export { toast }
