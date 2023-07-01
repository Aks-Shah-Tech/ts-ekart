import Alert from 'react-bootstrap/Alert'

type MessageBoxProps = {
    variant?: string
    children: React.ReactNode
}

const MessageBox = ({variant = 'info', children}:MessageBoxProps) => {
  return (
    <Alert variant={variant || 'info'}>{children}</Alert>
  )
}

export default MessageBox