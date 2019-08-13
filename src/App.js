import React, {useState} from 'react'
import { Form, Input, Panel, Button, Container } from 'muicss/react';

const App = () => {
    const [targetURL,setTargetURL] = useState('')

    const generatePDF = async () => await fetch('/',{
        method: 'POST',
        body: JSON.stringify({
            targetURL: targetURL
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))

    return (
        <Container id="container" fluid={true}>
            <aside id="sidebar">
                <h1>Paul Searcy</h1>
                <ul id="sideBarLinks" className="mui-list--inline mui--text-body2">
                    <li><a href="https://github.com/PaulSearcy" target="_blank">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/psearcy" target="_blank">LinkedIn</a></li>
                </ul>
            </aside>
            <main id="content">
                <h1>
                    Site PDF Snapshot
                </h1>
                <p>
                    Type in an URL and click button to download a pdf snapshot of a website.
                </p>
    
                <Panel>
                    <Form id="urlForm" >
                        <Input id="urlInput" value={targetURL} onChange={e => setTargetURL(e.target.value)}/>
                        <Button color="primary">submit</Button>
                    </Form>
                </Panel>
            </main>
        </Container>
    )
}
export default App