import React, {useState} from 'react'
import { Form, Input, Panel, Button, Container } from 'muicss/react';

let App = () => {
    let [targetURL,
        setTargetURL] = useState('n/a')
    let [links,
        setLinks] = useState('n/a')
    let [scripts,
        setScripts] = useState('n/a')
    let [page,
        setPage] = useState('n/a')

    // const scanURL = async targetURL => await fetch(targetURL)
    //     .then(data => data.text())
    //     .then(data => toHTML(data))

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
                        <Input id="urlInput"/>
                        <Button color="primary">submit</Button>
                    </Form>
                </Panel>
            </main>
        </Container>
    )
}
export default App