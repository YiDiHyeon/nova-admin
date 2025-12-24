import { Field } from '@/app/components/common/elements/Filed'
import { auth } from '@/auth'

export default async function Dashboard() {
  const session = await auth()
  return (
    <div>
      <Field label="test" required={true} description="문제야" htmlFor="test" error="error">
        <input id="test" type="text" />
      </Field>
    </div>
  )
}
