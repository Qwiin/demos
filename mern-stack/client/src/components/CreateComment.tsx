import { SyntheticEvent, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

interface CreateCommentProps {
  show: boolean; 
  dismissCallback: () => void;
}

export default function CreateComment(props: CreateCommentProps) {

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(()=>{

  })

  const submitComment = (e: SyntheticEvent) => {
    e.preventDefault();

    let children: HTMLFormControlsCollection | undefined = formRef.current?.elements;

    if(!children){
      return;
    }

  

    const name: string = (children.namedItem("Name") as HTMLInputElement).value;
    const email: string = (children.namedItem("Email") as HTMLInputElement).value;
    const text: string = (children.namedItem("Text") as HTMLInputElement).value;
    
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, text})
    }

    console.log({requestOptions});

    // const response = await fetch(`http://localhost:5005/post/comment`);
  };

  const cancelPost = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("TODO: dismiss modal");
    props.dismissCallback();
  };

  return (
    <>
    {props.show &&
      <Modal.Dialog fullscreen={true}>
        <Modal.Header>
          <Modal.Title>Post Comment</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <form ref={formRef} className='tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-start'>
            <p>Enter your comment here:</p>
            <input type="text" name="Name" id="Name" placeholder='Name' required={true}/>
            <input type="email" name="Email" id="Email" placeholder='Email' required={true}/>
            <input type="text" name="Comment" id="Comment" placeholder='comment text...' required={true}/>
            <div className='tw-flex tw-flex-row tw-gap-4'>
              <input type="submit" className='tw-rounded-md tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2' id="SubmitComment" name="Submit" onSubmit={submitComment} value="Post"/>
              <input type="button" className="tw-rounded-md tw-bg-slate-300 tw-text-slate-800 tw-px-4 tw-py-2" id="Cancel" name="Cancel" onClick={cancelPost} value='Cancel'/>
            </div>
          </form>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
      </Modal.Dialog>
    }
    </>
  );
}