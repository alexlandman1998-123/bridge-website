import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Something on this page crashed.</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {String(this.state.error)}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}