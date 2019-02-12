export const ERROR = {
  OUT_OF_GAS: 'out of gas',
  STACK_UNDERFLOW: 'stack underflow',
  STACK_OVERFLOW: 'stack overflow',
  INVALID_JUMP: 'invalid JUMP',
  INVALID_OPCODE: 'invalid opcode',
  REVERT: 'revert',
  STATIC_STATE_CHANGE: 'static state change',
  INTERNAL_ERROR: 'internal error',
}

export class VmError {
  error: any
  errorType: any

  constructor(error: any) {
    this.error = error
    this.errorType = 'VmError'
  }
}

/**
 * This exception is thrown when ewasm modules
 * call `finish`, to halt execution immediately.
 */
export class FinishExecution {
  message: any
  name: any
  errorType: any

  constructor(message: any) {
    this.message = message
    this.name = this.errorType = 'FinishExecution'
  }
}
