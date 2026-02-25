import { FormEvent, memo, RefObject } from "react"
import { ConnectFormField } from "./connect-form-field"

interface ConnectFormProps {
  formRef: RefObject<HTMLFormElement>
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
}

export const ConnectForm = memo(
  ({ formRef, onSubmit, isSubmitting }: ConnectFormProps) => {
    return (
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="connect__form"
        action="#"
      >
        <div className="connect__form-inputs">
          <ConnectFormField
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            label="Your Name"
          />

          <ConnectFormField
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            label="Your Email"
          />
        </div>

        <ConnectFormField
          name="message"
          id="message"
          placeholder="Send me a message :)"
          label="Your message"
          className="connect__form-text"
          isTextarea
          required={false}
        />

        <div className="connect__form-policy">
          <button
            type="submit"
            className="connect__submit-button block"
            disabled={isSubmitting}
          >
            Send a message
            {isSubmitting && (
              <svg className="connect__spinner" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22c5.523 0 10-4.477 10-10h-3a7 7 0 0 1-7 7zM2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    )
  },
)
