import React, {useState} from 'react'
import { Form, Input, Panel, Button, Container } from 'muicss/react';

const App = () => {
    const [targetURL,setTargetURL] = useState('')
    const [simpleTargetURL, setSimpleTargetURL] = useState('')

    const generatePDF = async () => await fetch('/generate',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            targetURL: targetURL
        })
    })
    .then(res => res.blob())
    .then(blob => {
        var link=document.createElement('a')
        link.href=window.URL.createObjectURL(blob)
        link.download= `${targetURL}.pdf`
        link.click()
    })
    .catch(err => console.error(err))

    const generateSimplePDF = async () => await fetch('/simple',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            targetURL: simpleTargetURL
        })
    })
    .then(res => res.blob())
    .then(blob => {
        var link=document.createElement('a')
        link.href=window.URL.createObjectURL(blob)
        link.download= `${simpleTargetURL}.pdf`
        link.click()
    })
    .catch(err => console.error(err))

    const handleSubmit = e => {
        e.preventDefault()
        generatePDF()
    }

    const handleSimpleSubmit = e => {
        e.preventDefault()
        generateSimplePDF()
    }

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

                <h2> Emulate Print PDF </h2>
                <Panel>
                    <Form id="urlForm" onSubmit={handleSubmit} >
                        <Input id="urlInput" value={targetURL} onChange={e => setTargetURL(e.target.value)}/>
                        <Button color="primary">submit</Button>
                    </Form>
                </Panel>

                <h2> Regular PDF </h2>
                <Panel>
                    <Form id="urlSimpleForm" onSubmit={handleSimpleSubmit} >
                        <Input id="urlInput" value={simpleTargetURL} onChange={e => setSimpleTargetURL(e.target.value)}/>
                        <Button color="primary">submit</Button>
                    </Form>
                </Panel>
            </main>
        </Container>
    )
}
export default App
