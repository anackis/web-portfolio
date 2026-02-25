import { memo } from "react"

interface ConnectFormFieldProps {
  name: string
  id: string
  label: string
  placeholder: string
  type?: "text" | "email"
  className?: string
  isTextarea?: boolean
  required?: boolean
}

export const ConnectFormField = memo(
  ({
    name,
    id,
    label,
    placeholder,
    type = "text",
    className = "",
    isTextarea = false,
    required = true,
  }: ConnectFormFieldProps) => {
    return (
      <div className={`connect__form-field block ${className}`}>
        <div className="connect__focus-container">
          {isTextarea ? (
            <textarea
              className="connect__form-control"
              name={name}
              id={id}
              placeholder={placeholder}
            />
          ) : (
            <input
              className="connect__form-control"
              autoComplete="off"
              required={required}
              name={name}
              id={id}
              type={type}
              placeholder={placeholder}
            />
          )}

          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
)
