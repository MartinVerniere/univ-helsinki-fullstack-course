:::mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Response HTTP status code 201
    deactivate server

    Note right of browser: Response returns JSON with content { "message": "note created" }