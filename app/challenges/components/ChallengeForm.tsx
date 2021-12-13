// import Form, { FormProps } from "app/core/components/Form";
import LabeledTextField from "app/core/components/LabeledTextField"
import TextArea from "app/core/components/TextArea"
import React from "react"
import { FormProps, useFormState } from "react-final-form"
import { CreateChallenge } from "../mutations/createChallenge"
import ChallengeViewer, { ChallengeViewerProps } from "./ChallengeViewer"
export { FORM_ERROR } from "app/core/components/Form"
import { validateZodSchema } from "blitz"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"

import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
// import
const Preivew: React.FC<{}> = () => {
  const formState = useFormState()
  const user = useCurrentUser()
  return (
    <>
      <pre>{JSON.stringify(formState.values, null, 4)}</pre>
      <ChallengeViewer
        isPreview
        author={{ id: user?.id || 1, name: user?.name || "hi" }}
        difficulty={formState.values.difficulty}
        categories={formState.values.categories}
        body={formState.values.body}
        title={formState.values.title}
        updatedAt={new Date()}
      />
    </>
  )
}

export function ChallengeForm(props: FormProps<ChallengeViewerProps>) {
  return (
    <FinalForm
      {...props}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        form: {
          mutators: { push, pop },
        },
        handleSubmit,
      }) => (
        <>
          <div style={{ width: "50%" }}>
            <LabeledTextField name="title" label="title" placeholder="title" />
            <TextArea name="body" label="body" placeholder="body" />
            {/* <LabeledTextField name="difficulty" label="difficulty" placeholder="difficulty" /> */}
            {/* <div> */}
            <label htmlFor="difficulty">Favorite Color</label>
            <Field name="difficulty" component="select" label="difficulty" placeholder="difficulty">
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </Field>
            {/* </div> */}
            {/* <LabeledTextField name="categories" label="categories" placeholder="categories" /> */}
            <FieldArray name="categories">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div key={name}>
                    <label>category. #{index + 1}</label>
                    <Field name={`${name}.name`} component="input" placeholder="category name" />
                    <span onClick={() => fields.remove(index)} style={{ cursor: "pointer" }}>
                      ❌
                    </span>
                  </div>
                ))
              }
            </FieldArray>
            <button
              type="button"
              //@ts-ignore
              onClick={() => push("categories", "xss")}
            >
              Add category
            </button>
            {/*@ts-ignore*/}
            <button type="button" onClick={() => pop("categories")}>
              Remove category
            </button>
          </div>
          <button onClick={handleSubmit} type="submit">
            Submit Challenge
          </button>
          <div style={{ width: "50%" }}>
            <Preivew />
          </div>
        </>
      )}
    />
  )
}
