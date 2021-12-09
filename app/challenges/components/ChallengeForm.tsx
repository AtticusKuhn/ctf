import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { CreateChallenge } from "../mutations/createChallenge"
export { FORM_ERROR } from "app/core/components/Form"

export function ChallengeForm<S extends typeof CreateChallenge>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="title" placeholder="title" />
      <LabeledTextField name="body" label="body" placeholder="body" />
      <LabeledTextField name="difficulty" label="difficulty" placeholder="difficulty" />
      <LabeledTextField name="tags" label="tags" placeholder="tags" />

      <LabeledTextField name="title" label="title" placeholder="title" />

    </Form>
  )
}
