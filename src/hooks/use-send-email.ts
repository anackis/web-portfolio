import { useState } from "react"
import { WEB3FORMS_ACCESS_KEY } from "constants/env"

interface UseSendEmailParams {
  onSuccess?: () => void
  onError?: () => void
}

export const useSendEmail = ({
  onSuccess,
  onError,
}: UseSendEmailParams = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    formData.append("access_key", WEB3FORMS_ACCESS_KEY)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        formElement.reset()
        formElement.querySelector("button")?.blur()
        onSuccess?.()
      } else {
        onError?.()
      }
    } catch (error) {
      onError?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return { sendEmail, isSubmitting }
}
