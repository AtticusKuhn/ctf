import Form, { FormProps } from "app/core/components/Form";
import LabeledTextField from "app/core/components/LabeledTextField";
import TextArea from "app/core/components/TextArea";
import React from "react";
import { Field, useFormState } from "react-final-form";
import { CreateChallenge } from "../mutations/createChallenge";
import ChallengeViewer from "./ChallengeViewer";
export { FORM_ERROR } from "app/core/components/Form"

const Preivew: React.FC<{}> =()=>{
  const formState = useFormState();
 return       <ChallengeViewer
 isPreview
 authorId={1}
 body={formState.values.body}
 title={formState.values.title}
 updatedAt={new Date()}
/>
}
export function ChallengeForm<S extends typeof CreateChallenge>(props: FormProps<S>) {

  return (
    <Form<S> {...props}
    
    //  initialValues={initialValues}
  >
      
      <div style={{width:"50%"}}>
      <LabeledTextField name="title" label="title" placeholder="title" />
      <TextArea name="body" label="body" placeholder="body" />
      {/* <LabeledTextField name="difficulty" label="difficulty" placeholder="difficulty" /> */}
      <div>
              <label>Favorite Color</label>
              <Field name="difficulty" component="select">
                <option value="#ff0000">❤️ Red</option>
                <option value="#00ff00">💚 Green</option>
                <option value="#0000ff">💙 Blue</option>
              </Field>
            </div>
      <LabeledTextField name="categories" label="categories" placeholder="categories" />

      <LabeledTextField name="title" label="title" placeholder="title" />
      </div>
      <div style={{width:"50%"}}>

      <Preivew />
      </div>


    </Form>
  )
}
