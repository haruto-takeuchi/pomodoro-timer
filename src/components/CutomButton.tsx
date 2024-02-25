import { Button, ButtonProps } from '@mui/base/Button'

interface CustomButtonProps extends ButtonProps {
  onClick: () => void
}

export const CustomButton = ({ onClick, children }: CustomButtonProps) => {
  return (
    <Button
      className="py-2 px-6 text-2xl font-bold rounded-md border-4 hover:scale-105 bg-primary text-secondary border-secondary dark:bg-secondary dark:text-primary dark:border-primary"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
