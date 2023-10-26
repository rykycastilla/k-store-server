export default function buildRedirect( url:string, param = '' ): string {
  return `
    <script>
      window.location.replace( '${ url }/${ param }' )
    </script>
`
}