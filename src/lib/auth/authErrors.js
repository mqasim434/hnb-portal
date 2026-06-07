/** @param {unknown} error */
export function mapAuthError(error) {
  const code =
    error && typeof error === 'object' && 'code' in error ? String(error.code) : ''

  switch (code) {
    case 'auth/invalid-email':
      return 'Voer een geldig e-mailadres in.'
    case 'auth/user-disabled':
      return 'Dit account is gedeactiveerd. Neem contact op met H&B.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Onjuist e-mailadres of wachtwoord.'
    case 'auth/email-already-in-use':
      return 'Dit e-mailadres is al geregistreerd. Log in of reset uw wachtwoord.'
    case 'auth/weak-password':
      return 'Kies een wachtwoord van minimaal 8 tekens.'
    case 'auth/too-many-requests':
      return 'Te veel pogingen. Probeer het later opnieuw.'
    case 'auth/network-request-failed':
      return 'Netwerkfout. Controleer uw verbinding.'
    default:
      if (error instanceof Error && error.message) return error.message
      return 'Er ging iets mis. Probeer het opnieuw.'
  }
}
